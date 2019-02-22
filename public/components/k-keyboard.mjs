const template = () => `
  <style>
    .keyboard__row {
      display: flex;
      justify-content: center;
    }
  </style>

  <div class="keyboard">
    <div class="keyboard__row">
      <key-btn key="q" size="3rem"></key-btn>
      <key-btn key="w" size="3rem"></key-btn>
      <key-btn key="e" size="3rem"></key-btn>
      <key-btn key="r" size="3rem"></key-btn>
      <key-btn key="t" size="3rem"></key-btn>
      <key-btn key="y" size="3rem"></key-btn>
      <key-btn key="u" size="3rem"></key-btn>
      <key-btn key="i" size="3rem"></key-btn>
      <key-btn key="o" size="3rem"></key-btn>
      <key-btn key="p" size="3rem"></key-btn>
    </div>
    <div class="keyboard__row">
      <key-btn key="a" size="3rem"></key-btn>
      <key-btn key="s" size="3rem"></key-btn>
      <key-btn key="d" size="3rem"></key-btn>
      <key-btn key="f" size="3rem"></key-btn>
      <key-btn key="g" size="3rem"></key-btn>
      <key-btn key="h" size="3rem"></key-btn>
      <key-btn key="j" size="3rem"></key-btn>
      <key-btn key="k" size="3rem"></key-btn>
      <key-btn key="l" size="3rem"></key-btn>
      <key-btn key="ñ" size="3rem"></key-btn>
    </div>
    <div class="keyboard__row">
      <key-btn key="z" size="3rem"></key-btn>
      <key-btn key="x" size="3rem"></key-btn>
      <key-btn key="c" size="3rem"></key-btn>
      <key-btn key="v" size="3rem"></key-btn>
      <key-btn key="b" size="3rem"></key-btn>
      <key-btn key="n" size="3rem"></key-btn>
      <key-btn key="m" size="3rem"></key-btn>
    </div>
  </div>
`

export default class KeyBtn extends HTMLElement {
  constructor () {
    super()
    this._onCheckFn = null
    this._keyBoardString = ''
  }

  get oncheck () {
    return this._onCheckFn
  }

  set oncheck (handler) {
    if (this._onCheckFn) {
      this.removeEventListener('check', this._onCheckFn)
      this._onCheckFn = null
    }
    if (typeof handler === 'function') {
      this._onCheckFn = handler
      this.addEventListener('check', this._onCheckFn)
    }
  }

  static get observedAttributes () {
    return ['oncheck']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    if (attrName === 'oncheck' && oldVal !== newVal) {
      if (newVal === null) {
        this.oncheck = null
      } else {
        this.oncheck = Function(`return function oncheck(event) {\n\t${newVal};\n}`)()
      }
    }
  }

  connectedCallback () {
    let shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = template()
    const allKeyBtn = shadowRoot.querySelectorAll('key-btn')
    for (let i = 0,len = allKeyBtn.length; i < len; i++) {
      allKeyBtn[i].addEventListener('click', event => {
        const keyBtn = event.path.find(e => e.tagName === 'KEY-BTN')
        this._keyBoardString += keyBtn.key
        let checkEvent = new CustomEvent('check', { bubbles: true, cancelable: true, detail: this._keyBoardString })
        checkEvent.data = this._keyBoardString
        this.dispatchEvent(checkEvent)
      })
    }
  }
}
