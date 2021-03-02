const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  target: 'node',
};