import { App } from 'vue';

export type Action = 'copy' | 'cut';

export type ClipboardConfig = {
  autoSetContainer: boolean;
  appendToBody: boolean;
};

export interface IVueClipboard {
  config(config: ClipboardConfig): void;
  install(app: App): void;
}
