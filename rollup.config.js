/*
 * Created on Fri Jan 29 2021
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

import nodeResolve from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default () => {

  const plugins = [
    commonjs({
      include: 'node_modules/**',
    }),
    nodePolyfills(),
    nodeResolve(),
    typescript({
      // bug fix 
      rollupCommonJSResolveHack: true,
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext',
          removeComments: true,
        }
      }
    })
  ];

  return [
    {
      input: 'src/index.ts',
      external: [
        // Excluded
        'axios',
        'form-data',
        'net',
        'tls',
        'util',
    
        // Substituted
        'bson',
        'hash-wasm'
      ],
      shimMissingExports: true,
      output: [
        {
          dir: 'dist_esm',
          format: 'esm',
          sourcemap: true,
          paths: {
            'bson': 'https://unpkg.com/bson/dist/bson.browser.esm.js',
            'hash-wasm': 'https://cdn.jsdelivr.net/npm/hash-wasm/dist/index.esm.min.js',
          }
        },
      ],
      plugins
    }
  ];
}