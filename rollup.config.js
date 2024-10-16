import * as fs from 'fs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

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
        format: 'esm'
      },
      // config for <script nomodule>
      {
        file: pkg.browser,
        format: 'umd',
        name: 'clipboard',
        noConflict: true,
        banner: ';'
      }
    ],
    plugins: [
      commonjs(),
      nodeResolve(),
      typescript()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      // config for <script type="module">
      {
        file: pkg.module.replace('.mjs', '.min.mjs'),
        format: 'esm'
      },
      // config for <script nomodule>
      {
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'umd',
        name: 'clipboard',
        noConflict: true
      }
    ],
    plugins: [
      commonjs(),
      nodeResolve(),
      terser(),
      typescript()
    ]
  }
]