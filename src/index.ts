import { ClipboardConfig, Action } from './types.js';
import { copyText } from './clipboard.js';

declare global {
  const $copyText: typeof copyText;
}

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

export type { ClipboardConfig, Action };

export { copyText, VueClipboard } from './clipboard.js';
