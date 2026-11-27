const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const classPrefix = require('postcss-class-prefix')
const TerserPlugin = require('terser-webpack-plugin')

const banner = pkg.name + ' v' + pkg.version + ' ' + pkg.homepage

const namespacePlugin = {
  postcssPlugin: 'postcss-namespace',
  Once(root) {
    // Add '.dev-tools .tools ' to every selector.
    root.walkRules(function (rule) {
      if (!rule.selectors) return rule

      rule.selectors = rule.selectors.map(function (selector) {
        return '.dev-tools .tools ' + selector
      })
    })
  },
}

module.exports = (env, argv) => {
  const config = {
    devtool: 'source-map',
    entry: './src/index.js',
    devServer: {
      static: {
        directory: path.join(__dirname, './'),
      },
      port: 8080,
    },
    output: {
      path: __dirname,
      filename: 'eruda-plugin.js',
      publicPath: '/assets/',
      library: ['erudaPlugin'],
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    namespacePlugin,
                    classPrefix('eruda-'),
                    autoprefixer,
                  ],
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [new webpack.BannerPlugin(banner)],
  }

  if (argv.mode === 'production') {
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    }
  }

  return config
}
