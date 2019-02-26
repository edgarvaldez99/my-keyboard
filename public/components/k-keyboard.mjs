import KKeyboardParent from '/public/components/k-keyboard-parent.mjs'

const template = self => `
  <k-keyboard-${self.type} keysize="${self.keysize}"></k-keyboard-${self.type}>
`

const defaultType = 'default'

export default class KKeyboard extends KKeyboardParent {
  constructor () {
    super()
  }

  get type () {
    return this.getAttribute('type')
  }

  set type (type) {
    this.setAttribute('type', type || defaultType)
  }

  addEventListenerInKKeyboard () {
    this.shadowRoot.lastElementChild.addEventListener('keychain', event => this.createAndDispatchEventWithData(event.data))
  }

  getTemplate () {
    return template(this)
  }

  connectedCallback () {
    this.type = this.type ? this.type : defaultType
    super.connectedCallback()
    this.addEventListenerInKKeyboard()
  }
}
