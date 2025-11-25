import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

export default {
  input: 'app/statics/js/tawct.js',
  output: {
    file: 'dist/statics/js/scripts.js',
    format: 'iife',
    sourcemap: false
  },
  plugins: [
    resolve(),
    commonjs(),

    // Minify JS
    terser(),

    // Copy non-JS/CSS statics
    copy({
      targets: [
        {src: 'app/index.php', dest: 'dist'},
        {src: 'app/data/**/*', dest: 'dist/data'},
        {src: 'app/statics/img/**/*', dest: 'dist/statics/img'},
        {src: 'app/statics/fonts/**/*', dest: 'dist/statics/fonts'},
      ]
    })
  ]
};
