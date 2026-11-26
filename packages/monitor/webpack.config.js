const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const classPrefix = require('postcss-class-prefix')
const TerserPlugin = require('terser-webpack-plugin')

const banner = pkg.name + ' v' + pkg.version + ' ' + pkg.homepage

// Dependencies are hoisted to the workspace root by npm, so resolve the
// package location instead of assuming a local node_modules folder.
const lunaDir = path.dirname(
  require.resolve('luna-performance-monitor/package.json')
)

// Add '.dev-tools .tools ' to every selector.
const namespacePlugin = {
  postcssPlugin: 'postcss-namespace',
  Once(root) {
    root.walkRules(function (rule) {
      if (!rule.selectors) return rule

      rule.selectors = rule.selectors.map(function (selector) {
        return '.dev-tools .tools ' + selector
      })
    })
  },
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        namespacePlugin,
        classPrefix('eruda-', {
          ignore: [/luna-*/]
        }),
        autoprefixer
      ]
    }
  }
}

module.exports = (env, argv) => {
  const config = {
    context: __dirname,
    devtool: 'source-map',
    entry: './src/index.js',
    resolve: {
      mainFields: ['main', 'module']
    },
    devServer: {
      static: [
        {
          directory: path.join(__dirname, './')
        },
        {
          // Dependencies are hoisted to the workspace root by npm, so expose
          // them under the same /node_modules path the demo page expects.
          directory: path.resolve(__dirname, '../../node_modules'),
          publicPath: '/node_modules'
        }
      ],
      port: 8081
    },
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'eruda-monitor.js',
      publicPath: '/assets/',
      library: ['erudaMonitor'],
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, './src'),
            lunaDir
          ],
          use: {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'css-loader',
            postcssLoader
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'css-loader',
            postcssLoader,
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [new webpack.BannerPlugin(banner)]
  }

  if (argv.mode === 'production') {
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    }
  }

  return config
}
