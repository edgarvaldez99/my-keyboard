import KKeyboardParent from '/public/components/k-keyboard-parent.mjs'

export default class KKeyboardType extends KKeyboardParent {
  constructor () {
    super()
    this._keychain = ''
  }

  updateKeychain (keyBtn) {
    const key = keyBtn.getKey(this)
    if (key === -1) {
      this._keychain = this._keychain.substring(0, this._keychain.length - 1)
    } else if (key) {
      this._keychain += key
    }
  }

  getKeyBtnByEvent (event) {
    return event.path ? event.path.find(e => e.tagName === 'KEY-BTN') : (event.target || event.srcElement || event.currentTarget)
  }

  keyBtnEventListener (event) {
    const keyBtn = this.getKeyBtnByEvent(event)
    this.keyBtnEventListenerForDifferentType({ event, keyBtn })
    this.createAndDispatchEventWithData(this._keychain)
  }

  addEventListenerInAllKeyBtn () {
    const allKeyBtn = this.shadowRoot.querySelectorAll('key-btn')
    for (let i = 0,len = allKeyBtn.length; i < len; i++) {
      allKeyBtn[i].addEventListener('click', event => this.keyBtnEventListener(event))
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this.addEventListenerInAllKeyBtn()
  }
}
