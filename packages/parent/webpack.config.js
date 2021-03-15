const path = require('path');
const slsw = require("serverless-webpack");

module.exports = {
  devtool: "source-map",
  entry: slsw.lib.entries,
  //externals: './config.json',
  mode: 'production',
  output: {
    filename: '[name].js',
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, '.webpack'),
  },
  target: 'node'
};
