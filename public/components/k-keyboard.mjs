const template = self => `
  <style>
    .keyboard {
      display: grid;
      grid-template-rows: ${self.keysize};
      grid-template-columns: repeat(15, ${self.keysize});
      grid-gap: 5px 5px;
    }
  </style>

  <div class="keyboard">
    <!-- row -->
    <key-btn key="º" size="${self.keysize}"></key-btn>
    <key-btn key="1" size="${self.keysize}"></key-btn>
    <key-btn key="2" size="${self.keysize}"></key-btn>
    <key-btn key="3" size="${self.keysize}"></key-btn>
    <key-btn key="4" size="${self.keysize}"></key-btn>
    <key-btn key="5" size="${self.keysize}"></key-btn>
    <key-btn key="6" size="${self.keysize}"></key-btn>
    <key-btn key="7" size="${self.keysize}"></key-btn>
    <key-btn key="8" size="${self.keysize}"></key-btn>
    <key-btn key="9" size="${self.keysize}"></key-btn>
    <key-btn key="0" size="${self.keysize}"></key-btn>
    <key-btn key="'" size="${self.keysize}"></key-btn>
    <key-btn key="¡" size="${self.keysize}"></key-btn>
    <key-btn key="ç" size="${self.keysize}"></key-btn>
    <key-btn key="←" size="${self.keysize}"></key-btn>
    <!-- row -->
    <key-btn key="⇆" size="${self.keysize}"></key-btn>
    <key-btn key="q" size="${self.keysize}"></key-btn>
    <key-btn key="w" size="${self.keysize}"></key-btn>
    <key-btn key="e" size="${self.keysize}"></key-btn>
    <key-btn key="r" size="${self.keysize}"></key-btn>
    <key-btn key="t" size="${self.keysize}"></key-btn>
    <key-btn key="y" size="${self.keysize}"></key-btn>
    <key-btn key="u" size="${self.keysize}"></key-btn>
    <key-btn key="i" size="${self.keysize}"></key-btn>
    <key-btn key="o" size="${self.keysize}"></key-btn>
    <key-btn key="p" size="${self.keysize}"></key-btn>
    <key-btn key="\`" size="${self.keysize}"></key-btn>
    <key-btn key="+" size="${self.keysize}"></key-btn>
    <key-btn key="↵ Intro" size="${self.keysize}" colspan="2" rowspan="2"></key-btn>
    <!-- row -->
    <key-btn key="Bloq Mayús" size="${self.keysize}" colspan="2"></key-btn>
    <key-btn key="a" size="${self.keysize}"></key-btn>
    <key-btn key="s" size="${self.keysize}"></key-btn>
    <key-btn key="d" size="${self.keysize}"></key-btn>
    <key-btn key="f" size="${self.keysize}"></key-btn>
    <key-btn key="g" size="${self.keysize}"></key-btn>
    <key-btn key="h" size="${self.keysize}"></key-btn>
    <key-btn key="j" size="${self.keysize}"></key-btn>
    <key-btn key="k" size="${self.keysize}"></key-btn>
    <key-btn key="l" size="${self.keysize}"></key-btn>
    <key-btn key="ñ" size="${self.keysize}"></key-btn>
    <key-btn key="´" size="${self.keysize}"></key-btn>
    <!-- row -->
    <key-btn key="⇧ Shif" size="${self.keysize}" colspan="2"></key-btn>
    <key-btn key="< >" size="${self.keysize}"></key-btn>
    <key-btn key="z" size="${self.keysize}"></key-btn>
    <key-btn key="x" size="${self.keysize}"></key-btn>
    <key-btn key="c" size="${self.keysize}"></key-btn>
    <key-btn key="v" size="${self.keysize}"></key-btn>
    <key-btn key="b" size="${self.keysize}"></key-btn>
    <key-btn key="n" size="${self.keysize}"></key-btn>
    <key-btn key="m" size="${self.keysize}"></key-btn>
    <key-btn key="," size="${self.keysize}"></key-btn>
    <key-btn key="." size="${self.keysize}"></key-btn>
    <key-btn key="-" size="${self.keysize}"></key-btn>
    <key-btn key="⇧ Shif" size="${self.keysize}" colspan="2"></key-btn>
    <!-- row -->
    <key-btn key="Ctrl" size="${self.keysize}" colspan="2"></key-btn>
    <key-btn key="Alt" size="${self.keysize}" colspan="2"></key-btn>
    <key-btn key="" size="${self.keysize}" colspan="7"></key-btn>
    <key-btn key="Alt Gr" size="${self.keysize}" colspan="2"></key-btn>
    <key-btn key="Control" size="${self.keysize}" colspan="2"></key-btn>
  </div>
`

const defaultKeySize = '3rem'

export default class KeyBtn extends HTMLElement {
  constructor () {
    super()
    this._onKeyChainFn = null
    this._keyBoardString = ''
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
      this.removeEventListener('check', this._onKeyChainFn)
      this._onKeyChainFn = null
    }
    if (typeof handler === 'function') {
      this._onKeyChainFn = handler
      this.addEventListener('check', this._onKeyChainFn)
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

  connectedCallback () {
    this.keysize = this.keysize ? this.keysize : defaultKeySize
    let shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = template(this)
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
