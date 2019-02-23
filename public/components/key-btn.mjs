import { parseNumber } from '../utils/number.mjs'

const template = self => `
  <style>
    :host {
      --primary-color: #e67e22;
      grid-column-end: span ${Math.ceil(self.colspan)};
      grid-row-end: span ${Math.ceil(self.rowspan)};
    }
    .key-btn {
      text-align: center;
    }
    .btn {
      background-color: var(--primary-color);
      border: 0;
      border-radius: 5px;
      color: white;
      text-transform: uppercase;
      height: calc(${self.size} * ${self.rowspan});
      width: 100%;
    }
  </style>

  <div class="key-btn">
    <button class="btn">${self.key}</button>
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

  connectedCallback () {
    this.size = this.size ? this.size : defaultSize
    this.colspan = this.colspan ? this.colspan : defaultSpan
    this.rowspan = this.rowspan ? this.rowspan : defaultSpan
    let shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = template(this)
  }
}
