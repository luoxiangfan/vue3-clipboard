import Clipboard, { Event } from 'clipboard';
import { IVueClipboard } from './types.js';

const VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true
};

export function copyText(
  text: string,
  container: HTMLElement | undefined,
  callback?: (statusTxt: 'success' | 'error', evt: Event) => void
) {
  const fakeElement = document.createElement('button');
  const clipboard = new Clipboard(fakeElement, {
    text: () => text,
    action: () => 'copy',
    container: container || document.body
  });
  clipboard.on('success', function (e) {
    clipboard.destroy();
    if (callback) {
      callback('success', e);
    }
  });
  clipboard.on('error', function (e) {
    clipboard.destroy();
    if (callback) {
      callback('error', e);
    }
  });
  if (VueClipboardConfig.appendToBody) {
    document.body.appendChild(fakeElement);
  }
  fakeElement.click();
  if (VueClipboardConfig.appendToBody) {
    document.body.removeChild(fakeElement);
  }
}

export const VueClipboard: IVueClipboard = {
  config: (options) => {
    const { autoSetContainer, appendToBody } = options;
    VueClipboardConfig.autoSetContainer = autoSetContainer
      ? autoSetContainer
      : false;
    VueClipboardConfig.appendToBody = appendToBody ? appendToBody : true;
  },
  install(app) {
    app.config.globalProperties.$copyText = copyText;
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
              action: () => (arg === 'cut' ? 'cut' : 'copy'),
              container: VueClipboardConfig.autoSetContainer ? el : undefined
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
    });
  }
};
