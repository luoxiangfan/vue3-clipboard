import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.js',
  output: [
    {
      file: './dist/index.min.js',
      format: 'umd',
      name: 'Vue3Clipboard',
      exports: 'named'
    },
    {
      file: './dist/index.min.cjs',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: './dist/index-es.min.js',
      format: 'es',
      exports: 'named'
    }
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ]
}