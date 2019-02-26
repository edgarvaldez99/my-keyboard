import KKeyboardParent from '/public/components/k-keyboard-parent.mjs'

export default class KKeyboardType extends KKeyboardParent {
  constructor () {
    super()
  }

  keyBtnEventListener (event) { }

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
