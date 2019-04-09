/* eslint-env node */
const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
  mode: 'development',
  devtool: 'source-maps',
  entry: {
    'version.bundle': ['@babel/polyfill', './examples/src/version.js'],
    'hello-three-canvas.bundle': ['@babel/polyfill', './examples/src/helloThreeCanvas.js'],
    'sprite-group-buffer-geometry.bundle': ['@babel/polyfill', './examples/src/spriteGroupBufferGeometry.js'],
    'textured-sprites.bundle': ['@babel/polyfill', './examples/src/texturedSprites.js'],
    'instanced-sprites.bundle': ['@babel/polyfill', './examples/src/instancedSprites.js'],
    'instanced-geometry.bundle': ['@babel/polyfill', './examples/src/instancedGeometry.js'],
  },
  devServer: {
    port: 3000,
    contentBase: [
      './examples',
      './dist',
      './node_modules',
    ],
    watchContentBase: true,
    compress: true,
    host: '0.0.0.0',
    open: true,
    useLocalIp: true,
    disableHostCheck: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      PACKAGE_VERSION: JSON.stringify(`${packageJson.version}-dev`),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                debug: true,
                useBuiltIns: 'entry',
                corejs: 2,
              }],
            ],
          },
        },
      },
    ],
  },
};
