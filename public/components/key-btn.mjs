import { parseNumber } from '/public/utils/number.mjs'
import {
  BACKSPACE_CODE,
  ENTER_CODE,
  MAYUS_CODE,
  SPACE_CODE,
  TAB_CODE
} from '/public/utils/key_code.mjs'

const template = self => `
  <style>
    :host {
      --primary-color: #e67e22;
      grid-column-end: span ${Math.ceil(self.colspan)};
      grid-row-end: span ${Math.ceil(self.rowspan)};
      user-select: none;
    }
    .key-btn {
      text-align: center;
    }
    .btn {
      background-color: var(--primary-color);
      border: 0;
      border-radius: 5px;
      color: white;
      padding: 8px;
      text-transform: uppercase;
      height: calc(${self.size} * ${self.rowspan});
      width: 100%;
    }
    .shiftkey,
    .shiftkey + div {
      text-align: left;
    }
    .with-altkey .key-content {
      display: flex;
      justify-content: space-between;
      flex: 1 1 100%;
    }
    .active .key-content {
      text-shadow: 3px 3px 4px white;
    }
  </style>

  <div class="key-btn">
    <button class="btn ${self.altkey ? 'with-altkey':''}">
      ${self.shiftkey ? '<div class="shiftkey">' + self.shiftkey + '</div>':''}
      <div class="key-content">
        <span>${self.key}</span>
        ${self.altkey ? '<span class="altkey">' + self.altkey + '</span>':''}
      </div>
    </button>
  </div>
`

const defaultSize = '3rem'
const defaultSpan = 1

export default class KeyBtn extends HTMLElement {
  constructor () {
    super()
  }

  get key () {
    return this.getAttribute('key')
  }

  set key (key) {
    this.setAttribute('key', key)
  }

  get keycode () {
    return this.getAttribute('keycode')
  }

  set keycode (keycode) {
    this.setAttribute('keycode', keycode)
  }

  get size () {
    return this.getAttribute('size')
  }

  set size (size) {
    this.setAttribute('size', size)
  }

  get colspan () {
    return this.getAttribute('colspan')
  }

  set colspan (span) {
    this.setAttribute('colspan', (parseNumber(span) || defaultSpan))
  }

  get rowspan () {
    return this.getAttribute('rowspan')
  }

  set rowspan (span) {
    this.setAttribute('rowspan', (parseNumber(span) || defaultSpan))
  }

  get altkey () {
    return this.getAttribute('altkey')
  }

  set altkey (altkey) {
    this.setAttribute('altkey', altkey)
  }

  get shiftkey () {
    return this.getAttribute('shiftkey')
  }

  set shiftkey (shiftkey) {
    this.setAttribute('shiftkey', shiftkey)
  }

  get ctrlkey () {
    return this.getAttribute('ctrlkey')
  }

  set ctrlkey (ctrlkey) {
    this.setAttribute('ctrlkey', ctrlkey)
  }

  get modifierkey () {
    return this.getAttribute('modifierkey')
  }

  set modifierkey (modifierkey) {
    this.setAttribute('modifierkey', modifierkey)
  }

  isModifierKey () {
    return this.hasAttribute('modifierkey')
  }

  shouldAddActiveClass () {
    return this.isModifierKey()
  }

  addActiveClass () {
    if (this.shouldAddActiveClass()) this.shadowRoot.lastElementChild.classList.add('active')
  }

  removeActiveClass () {
    this.shadowRoot.lastElementChild.classList.remove('active')
  }

  hasActiveClass () {
    return this.shadowRoot.lastElementChild.classList.contains('active')
  }

  isMayusKey () {
    return this.keycode === MAYUS_CODE
  }

  getKeyCode () {
    return this.keycode
  }

  getKey ({ keychain, altKey, ctrlKey, mayusKey, shiftKey }) {
    if (this.keycode === BACKSPACE_CODE) return -1
    if (this.keycode === ENTER_CODE) return '\n'
    if (this.keycode === SPACE_CODE) return ' '
    if (this.keycode === TAB_CODE) return '\t'
    if (this.keycode) return ''
    if (altKey) return this.altkey || ''
    if (ctrlKey) return this.ctrlkey || ''
    if (shiftKey) {
      if (this.shiftkey) return this.shiftkey
      else if (!mayusKey) return this.key.toUpperCase()
    } else if (mayusKey) return this.key.toUpperCase()
    return this.key
  }

  connectedCallback () {
    this.size = this.size ? this.size : defaultSize
    this.colspan = this.colspan ? this.colspan : defaultSpan
    this.rowspan = this.rowspan ? this.rowspan : defaultSpan
    let shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = template(this)
  }
}
