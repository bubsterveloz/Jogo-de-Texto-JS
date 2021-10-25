const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Você acorda em um lugar estranho. É um laboratório, você está dentro de uma câmara e há várias outras câmaras cobrindo o resto do cômodo. o que você faz?',
    options: [
      {
        text: 'Explorar',
        setState: { explorar: true },
        nextText: 2
      },
      {
        text: 'Gritar por socorro',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'Você percebe que sua câmara não está fechada como as outras e que tem um pequeno pedaço de papel preso à porta. o que você faz?',
    options: [
      {
        text: 'Tentar abrir a porta da câmara',
        setState: { papel: false },
        nextText: 4
      },
      {
        text: 'Pegar o papel',
        setState: { papel: true },
        nextText: 5
      },
      {
        text: 'Gritar por socorro',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Ao gritar um alarme dispara, as luzes e sons causam uma dor profunda que paraliza todo seu corpo. Em pouco tempo você irá desmaiar. o que você faz?',
    options: [
      {
        text: 'Tentar se mover',
        nextText: 6
      },
      {
        text: 'Desmaiar',
        nextText: 7
      }
    ]
  },
  {
    id: 4,
    text: 'você consegue abrir a porta, deixando o papel cair para fora da câmara. há um sistema de segurança com detecção de movimento na sala e dispara o alarme. As luzes e sons causam uma dor profunda que paraliza todo seu corpo. O que você faz?',
    options: [
      {
        text: 'Tentar se mover',
        nextText: 6
      },
      {
        text: 'Desmaiar',
        nextText: 7
      }
    ]
  },
  {
    id: 6,
    text: 'A porta da sua cÂmara explode, destruindo o alarme.',
    options: [
      {
        text: '?',
        nextText: 6
      },
      {
        text: '?',
        nextText: 6
      }
    ]
  },
  {
    id: 7, //GAME OVER
    text: 'Tu Merreu.',
    options: [
      {
        text: 'tentar dnv',
        nextText: -1
      }
    ]
  },
  
]

startGame()