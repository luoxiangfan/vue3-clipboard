declare module 'vue3-copy-clipboard' {
  import { FunctionPlugin } from 'vue'
  module "vue/types/vue" {
    interface Vue {
      $clipboardConfig: {
        autoSetContainer: boolean,
        appendToBody: boolean
      }
      $copyText(text: string, container: object | HTMLElement | null | undefined, callback: Function): void
    }
  }

  class VueClipboard {
    static install: FunctionPlugin<never>
    static config: {
      autoSetContainer: boolean
      appendToBody: boolean
    }
  }
  export default VueClipboard
}