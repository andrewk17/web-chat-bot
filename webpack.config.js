const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const appPath = __dirname + '/client/app';
const publicPath = __dirname + '/client/public';

module.exports = {
  context: appPath,
  entry: {
    app: './app.js'
  },
  output: {
    path: publicPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [new CopyWebpackPlugin([
      {
        from: appPath + '/index.html',
        to: publicPath
      }
    ])]
};
