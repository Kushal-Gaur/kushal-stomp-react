const webpack = require('webpack')
const merge = require('lodash.merge')

const commonConfig = require('./webpack-common')
const eslintDev = require('./eslint-dev.json')
const eslintCommon = require('./eslint-common.json')

const eslintConfig = merge(eslintCommon, eslintDev)
const includes = [/\/jsx\//, /\/es6\//]

module.exports = function(entries, output) {
  const devConfig = merge(commonConfig(entries, output, includes), {
    environment: 'dev',
    module: {
      // preLoaders: [
      //   {
      //     test: /\.jsx?$/,
      //     loader: "eslint",
      //     query: eslintConfig,
      //     include: includes
      //   }
      // ],
      loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'], plugins: ["transform-decorators-legacy", "transform-class-properties"] }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
    },
    devServer: {
      contentBase: output,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST || "localhost",
      port: process.env.PORT || 8011
    },
    devtool: 'eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })

  return devConfig
}