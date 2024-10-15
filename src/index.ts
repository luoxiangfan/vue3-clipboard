import Clipboard from 'clipboard'
import { createApp } from 'vue'
import type { App } from 'vue'

let VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true,
}
export function copyText(text: string, container: HTMLElement | undefined, callback: Function) {
  const fakeElement = document.createElement('button')
  const clipboard = new Clipboard(fakeElement, {
    text: () => text,
    action: () => 'copy',
    container: container || document.body
  })
  clipboard.on('success', function (e) {
    clipboard.destroy()
    callback(undefined, e)
  })
  clipboard.on('error', function (e) {
    clipboard.destroy()
    callback(e, undefined)
  })
  if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement)
  fakeElement.click()
  if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement)
}

function vClipboard (app: App, vueClipboardConfig?: typeof VueClipboardConfig) {
  if (vueClipboardConfig) VueClipboardConfig = Object.assign(VueClipboardConfig, vueClipboardConfig)
  app.config.globalProperties.$copyText = copyText
  app.directive('clipboard', {
    beforeMount(el, binding) {
      const { value, arg } = binding;
      switch (arg) {
        case 'success':
          el._v_clipboard_success = value;
          break;
        case 'error':
          el._v_clipboard_error = value;
          break;
        default:
          const clipboard = new Clipboard(el, {
            text: () => value,
            action: () => (arg === 'cut' ? 'cut' : 'copy')
          });
          clipboard.on('success', (e) => {
            const callback = el._v_clipboard_success;
            if (callback) {
              callback(e);
            }
          });
          clipboard.on('error', (e) => {
            const callback = el._v_clipboard_error;
            if (callback) {
              callback(e);
            }
          });
          el._v_clipboard = clipboard;
          break;
      }
    },
    beforeUpdate(el, binding) {
      const { value, arg } = binding;
      if (arg === 'success') {
        el._v_clipboard_success = value;
      } else if (arg === 'error') {
        el._v_clipboard_error = value;
      } else {
        el._v_clipboard.text = () => value;
        el._v_clipboard.action = () => (arg === 'cut' ? 'cut' : 'copy');
      }
    },
    unmounted(el, binding) {
      const { arg } = binding;
      if (arg === 'success') {
        delete el._v_clipboard_success;
      } else if (arg === 'error') {
        delete el._v_clipboard_error;
      } else {
        el._v_clipboard.destroy();
        delete el._v_clipboard;
      }
    }
  })
}

const app = createApp({})

vClipboard(app, VueClipboardConfig)

export type ClipboardConfig = typeof VueClipboardConfig