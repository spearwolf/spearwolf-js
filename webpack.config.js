/* eslint-env node */
module.exports = {
  mode: 'development',
  entry: {
    'version.bundle': ['@babel/polyfill', './examples/src/version.js'],
    'hello-three-canvas.bundle': ['@babel/polyfill', './examples/src/helloThreeCanvas.js'],
    'sprite-group-buffer-geometry.bundle': ['@babel/polyfill', './examples/src/spriteGroupBufferGeometry.js'],
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                debug: true,
                useBuiltIns: 'entry',
              }],
            ],
          },
        },
      },
    ],
  },
};
