# vue3-clipboard

A simple vuejs 3 binding for clipboard.js, based on [Inndy/vue-clipboard2](https://github.com/Inndy/vue-clipboard2)

## Install

`npm install @lxf2513/vue3-clipboard` or use `<script type="module">` without npm

## Usage

For vite user:

```javascript
import { createApp } from 'vue'
import { VueClipboard } from '@lxf2513/vue3-clipboard'

const app = createApp({})

app.use(VueClipboard)
```

For standalone usage:

```html
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/vue@3.5.12/dist/vue.global.prod.min.js"></script>
</head>
<body>
  <button onclick="module.copy()">Copy</button>
  <script type="module">
  import { copyText } from 'https://cdn.jsdelivr.net/npm/@lxf2513/vue3-clipboard@1.0.7/+esm'
  function copy() {
    copyText('https://github.com/luoxiangfan/vue3-clipboard', undefined, (statusTxt, evt) => {
      console.log(statusTxt) // 'success' or 'error'
      console.log(evt) // Clipboard Event
    })
  }
  module.copy = copy
  </script>
  <script>
    const module = {}
  </script>
</body>
</html>
```

## I want to copy texts without a specific button!

`container` option is available like this:

In Options API:

```js
const container = this.$refs.container
this.$copyText((text: 'https://github.com/luoxiangfan/vue3-clipboard'), container)
```

In Composition API:

```js
import { copyText } from '@lxf2513/vue3-clipboard'
import { ref } from 'vue'

const container = ref(null)
copyText('https://github.com/luoxiangfan/vue3-clipboard', container.value)
```

Or you can let `@lxf2513/vue3-clipboard` set `container` to current element by doing this:

```js
import { createApp } from 'vue'
import { VueClipboard } from '@lxf2513/vue3-clipboard'

const app = createApp({})

app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
})
```

## Sample 1

```html
<template>
  <div class="container">
    <button
      v-clipboard:copy="message"
      v-clipboard:success="handleSuccess"
      v-clipboard:error="handleError"
    >
      Copy
    </button>
  </div>
</template>

<script setup>
  const message = 'https://github.com/luoxiangfan/vue3-clipboard'
  const handleSuccess = (e) => {
    alert('Copied text: ' + e.text)
  }
  const handleError = (e) => {
    alert('Copy failed')
  }
</script>
```

## Sample 2

```html
<template>
  <div class="container">
    <button
      @click="$copyText('https://github.com/luoxiangfan/vue3-clipboard')"
    >
      Copy
    </button>
  </div>
</template>
```

## Sample 3

```html
<template>
  <div class="container">
    <button type="button" @click="copy">Copy</button>
  </div>
</template>

<script setup>
  import { copyText } from '@lxf2513/vue3-clipboard'

  const copy = () => {
    copyText('https://github.com/luoxiangfan/vue3-clipboard', undefined, (statusTxt, evt) => {
      console.log(statusTxt) // 'success' or 'error'
      console.log(evt) // Clipboard Event
    })
  }
</script>
```