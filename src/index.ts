import { copyText } from './clipboard.js';

declare module 'vue' {
  interface ComponentCustomProperties {
    $copyText: typeof copyText;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $copyText: typeof copyText;
  }
}

export type { ClipboardConfig, Action } from './types.js';

export { copyText, VueClipboard } from './clipboard.js';
