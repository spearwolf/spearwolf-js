import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

import bannerPlugin from './bannerPlugin';

const globals = {
  three: 'THREE',
};

const external = [
  'three',
];

export default ({
  root,
  filename,
  name, // The variable name, representing your iife/umd bundle, by which other scripts on the same page can access it.
  outputAsModule,
}) => {
  const packageJson = require(path.join(root, 'package.json'))

  return {
    external,
    input: 'src/index.js',
    output: outputAsModule
      ? {
          globals,
          file: path.join(root, 'dist', `${filename}.module.js`),
          sourcemap: true,
          sourcemapFile: path.join(root, 'dist', `${filename}.module.js.map`),
          format: 'esm',
        }
      : {
          name,
          globals,
          file: path.join(root, 'dist', `${filename}.js`),
          sourcemap: true,
          sourcemapFile: path.join(root, 'dist', `${filename}.js.map`),
          format: 'umd',
        },
    plugins: [
      bannerPlugin(packageJson), // eslint-disable-line
      babel({
        exclude: [/node_modules/],
        presets: [
          [
            '@babel/preset-env',
            outputAsModule
              ? {
                  debug: false,
                  useBuiltIns: 'usage',
                  targets: {
                    esmodules: true,
                  },
                }
              : {
                  debug: false,
                  modules: false,
                  useBuiltIns: 'usage',
                },
          ],
        ],
      }),
      commonjs(),
      resolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules',
        },
      }),
      replace({
        NODE_ENV: JSON.stringify('production'),
        PACKAGE_VERSION: JSON.stringify(packageJson.version),
      }),
      sizeSnapshot(),
      terser({
        output: { comments: /^!/ },
      }),
    ],
  };
};
