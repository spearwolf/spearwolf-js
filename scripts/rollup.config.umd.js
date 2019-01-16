/* eslint-env node */
import path from 'path';
import config from './rollup.config.common';

export default config({
  name: 'spearwolf',
  filename: 'spearwolf',
  root: path.resolve(__dirname, '..'),
});
