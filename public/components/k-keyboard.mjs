import {
  ALT_1_CODE,
  ALT_2_CODE,
  BACKSPACE_CODE,
  CTRL_1_CODE,
  CTRL_2_CODE,
  ENTER_CODE,
  MAYUS_CODE,
  SHIFT_1_CODE,
  SHIFT_2_CODE,
  SPACE_CODE,
  TAB_CODE
} from '../utils/key_code.mjs'

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
    <key-btn key="º" size="${self.keysize}" shiftkey="ª" altkey="\"></key-btn>
    <key-btn key="1" size="${self.keysize}" shiftkey="!" altkey="|"></key-btn>
    <key-btn key="2" size="${self.keysize}" shiftkey='"' altkey="@"></key-btn>
    <key-btn key="3" size="${self.keysize}" shiftkey="·" altkey="#"></key-btn>
    <key-btn key="4" size="${self.keysize}" shiftkey="$" altkey="~"></key-btn>
    <key-btn key="5" size="${self.keysize}" shiftkey="%" altkey="½"></key-btn>
    <key-btn key="6" size="${self.keysize}" shiftkey="&" altkey="¬"></key-btn>
    <key-btn key="7" size="${self.keysize}" shiftkey="/" altkey="{"></key-btn>
    <key-btn key="8" size="${self.keysize}" shiftkey="(" altkey="["></key-btn>
    <key-btn key="9" size="${self.keysize}" shiftkey=")" altkey="]"></key-btn>
    <key-btn key="0" size="${self.keysize}" shiftkey="=" altkey="}"></key-btn>
    <key-btn key="'" size="${self.keysize}" shiftkey="?" altkey="\"></key-btn>
    <key-btn key="¡" size="${self.keysize}" shiftkey="¿" altkey="~"></key-btn>
    <key-btn key="ç" size="${self.keysize}" altkey="}" ></key-btn>
    <key-btn key="←" size="${self.keysize}" keycode="${BACKSPACE_CODE}"></key-btn>
    <!-- row -->
    <key-btn key="⇆" size="${self.keysize}" keycode="${TAB_CODE}"></key-btn>
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
    <key-btn key="\`" size="${self.keysize}" shiftkey="^" altkey="["></key-btn>
    <key-btn key="+" size="${self.keysize}" shiftkey="*" altkey="]"></key-btn>
    <key-btn key="↵ Intro" size="${self.keysize}" keycode="${ENTER_CODE}" colspan="2" rowspan="2"></key-btn>
    <!-- row -->
    <key-btn key="Bloq Mayús" size="${self.keysize}" keycode="${MAYUS_CODE}" colspan="2" modifierkey></key-btn>
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
    <key-btn key="´" size="${self.keysize}" shiftkey="¨" altkey="{"></key-btn>
    <!-- row -->
    <key-btn key="⇧ Shif" size="${self.keysize}" keycode="${SHIFT_1_CODE}" colspan="2" modifierkey></key-btn>
    <key-btn key="<" size="${self.keysize}" shiftkey=">"></key-btn>
    <key-btn key="z" size="${self.keysize}"></key-btn>
    <key-btn key="x" size="${self.keysize}"></key-btn>
    <key-btn key="c" size="${self.keysize}"></key-btn>
    <key-btn key="v" size="${self.keysize}"></key-btn>
    <key-btn key="b" size="${self.keysize}"></key-btn>
    <key-btn key="n" size="${self.keysize}"></key-btn>
    <key-btn key="m" size="${self.keysize}"></key-btn>
    <key-btn key="," size="${self.keysize}" shiftkey=";" altkey="─"></key-btn>
    <key-btn key="." size="${self.keysize}" shiftkey=":" altkey="·"></key-btn>
    <key-btn key="-" size="${self.keysize}" shiftkey="_"></key-btn>
    <key-btn key="⇧ Shif" size="${self.keysize}" keycode="${SHIFT_2_CODE}" colspan="2" modifierkey></key-btn>
    <!-- row -->
    <key-btn key="Ctrl" size="${self.keysize}" keycode="${CTRL_1_CODE}" colspan="2" modifierkey></key-btn>
    <key-btn key="Alt" size="${self.keysize}" keycode="${ALT_1_CODE}" colspan="2" modifierkey></key-btn>
    <key-btn key="" size="${self.keysize}" keycode="${SPACE_CODE}" colspan="7"></key-btn>
    <key-btn key="Alt Gr" size="${self.keysize}" keycode="${ALT_2_CODE}" colspan="2" modifierkey></key-btn>
    <key-btn key="Control" size="${self.keysize}" keycode="${CTRL_2_CODE}" colspan="2" modifierkey></key-btn>
  </div>
`

const defaultKeySize = '3rem'

export default class KeyBtn extends HTMLElement {
  constructor () {
    super()
    this._onKeyChainFn = null
    this._keychain = ''
    this._keyChainElements = []
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

  existKeyBtnInKeyChainElements (keyBtn) {
    return this._keyChainElements.find(el => el.key === keyBtn.key)
  }

  addKeyChainElements (keyBtn) {
    if (!this.existKeyBtnInKeyChainElements(keyBtn)) this._keyChainElements.push(keyBtn)
  }

  removeKeyChainElements (keyBtn) {
    for(let i = this._keyChainElements.length - 1; i >= 0; i--) {
      if (this._keyChainElements[i].key === keyBtn.key) this._keyChainElements.splice(i, 1);
    }
  }

  changeModifierKeyStatusByKeyCode (keyBtn, newValue = false) {
    switch (keyBtn.getKeyCode()) {
      case ALT_1_CODE:
      case ALT_2_CODE:
        this.altKey = newValue
        break
      case SHIFT_1_CODE:
      case SHIFT_2_CODE:
        this.shiftKey = newValue
        break
      case MAYUS_CODE:
        this.mayusKey = newValue
        break
      case CTRL_1_CODE:
      case CTRL_2_CODE:
        this.ctrlKey = newValue
        break
    }
    if (!newValue && keyBtn.hasActiveClass()) keyBtn.removeActiveClass()
    else keyBtn.addActiveClass()
  }

  updateKeychain (keyBtn) {
    const key = keyBtn.getKey(this)
    if (key === -1) {
      this._keychain = this._keychain.substring(0, this._keychain.length - 1)
    } else if (key) {
      this._keychain += key
    }
  }

  createAndDispatchEvent () {
    let customEvent = new CustomEvent('keychain', { bubbles: true, cancelable: true, detail: this._keychain })
    customEvent.data = this._keychain
    this.dispatchEvent(customEvent)
  }

  getKeyBtnByEvent (event) {
    return event.path ? event.path.find(e => e.tagName === 'KEY-BTN') : (event.target || event.srcElement || event.currentTarget)
  }

  keyBtnEventListener (event) {
    const keyBtn = this.getKeyBtnByEvent(event)
    if (keyBtn.isModifierKey()) {
      if (keyBtn.hasActiveClass()) {
        this.removeKeyChainElements(keyBtn)
        this.changeModifierKeyStatusByKeyCode(keyBtn)
      } else {
        this.addKeyChainElements(keyBtn)
        this.changeModifierKeyStatusByKeyCode(keyBtn, true)
      }
    } else {
      this.updateKeychain(keyBtn)
    }
    this.createAndDispatchEvent()
  }

  addEventListenerInAllKeyBtn (shadowRoot) {
    const allKeyBtn = shadowRoot.querySelectorAll('key-btn')
    for (let i = 0,len = allKeyBtn.length; i < len; i++) {
      allKeyBtn[i].addEventListener('click', event => this.keyBtnEventListener(event))
    }
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
    this.addEventListenerInAllKeyBtn(shadowRoot)
  }
}
