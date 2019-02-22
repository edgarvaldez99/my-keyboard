const template = self => `
  <style>
    :host {
      --primary-color: #e67e22;
      --space: 1em;
    }
    .key-btn {
      border: 2px dashed var(--primary-color);
      display: inline-block;
      padding: 5px;
      text-align: center;
    }
    .btn {
      background-color: var(--primary-color);
      border: 0;
      border-radius: 5px;
      color: white;
      padding: var(--space);
      text-transform: uppercase;
      width: ${self.size};
    }
  </style>

  <div class="key-btn">
    <button class="btn">${self.key}</button>
  </div>
`

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

  get size () {
    return this.getAttribute('size')
  }

  set size (size) {
    this.setAttribute('size', size)
  }

  connectedCallback () {
    let shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = template(this)
  }
}
