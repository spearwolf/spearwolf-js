/* eslint-env node */
import path from 'path';
import config from './rollup.config.common';

export default config({
  filename: 'spearwolf',
  root: path.resolve(__dirname, '..'),
  outputAsModule: true,
});
