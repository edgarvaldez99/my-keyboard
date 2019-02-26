import KeyBtn from './components/key-btn.mjs'
import KKeyboard from './components/k-keyboard.mjs'
import KKeyboardDefault from './components/k-keyboard-types/k-keyboard-default.mjs'
import KKeyboardNumeric from './components/k-keyboard-types/k-keyboard-numeric.mjs'

window.customElements.define('key-btn', KeyBtn)
window.customElements.define('k-keyboard', KKeyboard)
window.customElements.define('k-keyboard-default', KKeyboardDefault)
window.customElements.define('k-keyboard-numeric', KKeyboardNumeric)
