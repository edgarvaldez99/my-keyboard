export const defaultKeySize = '3rem'

export default class KKeyboardParent extends HTMLElement {
  constructor () {
    super()
    this._onKeyChainFn = null
  }

  get keysize () {
    return this.getAttribute('keysize')
  }

  set keysize (keysize) {
    this.setAttribute('keysize', keysize || defaultKeySize)
  }

  get onkeychain () {
    return this._onKeyChainFn
  }

  set onkeychain (handler) {
    if (this._onKeyChainFn) {
      this.removeEventListener('keychain', this._onKeyChainFn)
      this._onKeyChainFn = null
    }
    if (typeof handler === 'function') {
      this._onKeyChainFn = handler
      this.addEventListener('keychain', this._onKeyChainFn)
    }
  }

  static get observedAttributes () {
    return ['onkeychain']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    if (attrName === 'onkeychain' && oldVal !== newVal) {
      if (newVal === null) {
        this.onkeychain = null
      } else {
        this.onkeychain = Function(`return function onkeychain(event) {\n\t${newVal};\n}`)()
      }
    }
  }

  createAndDispatchEventWithData (data) {
    let customEvent = new CustomEvent('keychain', { bubbles: true, cancelable: true, detail: data })
    customEvent.data = data
    this.dispatchEvent(customEvent)
  }

  getTemplate () { }

  connectedCallback () {
    this.keysize = this.keysize ? this.keysize : defaultKeySize
    let shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = this.getTemplate()
  }
}
