import * as fs from 'fs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))

const pkg = loadJSON('./package.json')

export default [
  {
    input: 'src/index.ts',
    output: [
      // config for <script type="module">
      {
        file: pkg.module,
        format: 'esm',
        globals: {
          clipboard: 'Clipboard',
          vue: 'vue'
        },
        exports: 'named'
      },
      // config for <script nomodule>
      {
        file: pkg.browser,
        format: 'umd',
        name: 'ClipBoard',
        noConflict: true,
        banner: ';',
        globals: {
          clipboard: 'Clipboard',
          vue: 'vue'
        },
        exports: 'named'
      }
    ],
    plugins: [
      commonjs(),
      resolve(),
      babel({ babelHelpers: 'bundled' }),
      typescript()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      // config for <script type="module">
      {
        file: pkg.module.replace('.mjs', '.min.mjs'),
        format: 'esm',
        globals: {
          clipboard: 'Clipboard',
          vue: 'vue'
        },
        exports: 'named'
      },
      // config for <script nomodule>
      {
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'umd',
        name: 'ClipBoard',
        noConflict: true,
        globals: {
          clipboard: 'Clipboard',
          vue: 'vue'
        },
        exports: 'named'
      }
    ],
    plugins: [
      commonjs(),
      resolve(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
      typescript()
    ]
  }
]