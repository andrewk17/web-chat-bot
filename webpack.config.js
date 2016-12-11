const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const appPath = __dirname + '/client/app';
const publicPath = __dirname + '/client/public';

module.exports = {
  context: appPath,
  devtool: "#source-map",
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
      }, {
        test: /\.js$/,
        loaders: [
          'ng-annotate', 'babel-loader?presets[]=es2015'
        ],
        exclude: /node_modules/,
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
