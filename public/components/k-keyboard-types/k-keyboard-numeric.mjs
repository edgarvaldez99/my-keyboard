import { BACKSPACE_CODE } from '/public/utils/key_code.mjs'
import KKeyboardType from '/public/components/k-keyboard-types/k-keyboard-type.mjs'

const template = self => `
  <style>
    .keyboard {
      align-items: center;
      display: grid;
      grid-template-rows: ${self.keysize};
      grid-template-columns: repeat(3, ${self.keysize});
      grid-gap: 5px 5px;
    }
    .center {
      grid-column-start: 2;
    }
  </style>

  <div class="keyboard">
    <!-- row -->
    <key-btn key="←" size="${self.keysize}" keycode="${BACKSPACE_CODE}" colspan="3"></key-btn>
    <!-- row -->
    <key-btn key="1" size="${self.keysize}"></key-btn>
    <key-btn key="2" size="${self.keysize}"></key-btn>
    <key-btn key="3" size="${self.keysize}"></key-btn>
    <key-btn key="4" size="${self.keysize}"></key-btn>
    <key-btn key="5" size="${self.keysize}"></key-btn>
    <key-btn key="6" size="${self.keysize}"></key-btn>
    <key-btn key="7" size="${self.keysize}"></key-btn>
    <key-btn key="8" size="${self.keysize}"></key-btn>
    <key-btn key="9" size="${self.keysize}"></key-btn>
    <key-btn key="0" size="${self.keysize}" class="center"></key-btn>
  </div>
`

export default class KKeyboard extends KKeyboardType {
  constructor () {
    super()
  }

  keyBtnEventListenerForDifferentType ({ keyBtn }) {
    this.updateKeychain(keyBtn)
  }

  getTemplate () {
    return template(this)
  }
}
