const path = require('path');

const buildDirectory = './dist/';

module.exports = {
  "entry": ['babel-polyfill', './src/index.tsx'],
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(buildDirectory),
    filename: 'bundle.js',
    publicPath: 'http://localhost:7700/dist',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'ts-loader'],
    }],
  },
  plugins: [],
  mode: 'production',
};
