const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const classPrefix = require('postcss-class-prefix')
const TerserPlugin = require('terser-webpack-plugin')

const banner = pkg.name + ' v' + pkg.version + ' ' + pkg.homepage

// Scope every selector under the eruda container.
const namespacePlugin = (prefix) => ({
  postcssPlugin: 'postcss-namespace',
  Once(root) {
    root.walkRules(function (rule) {
      if (!rule.selectors) return rule

      rule.selectors = rule.selectors.map(function (selector) {
        return prefix + selector
      })
    })
  },
})

module.exports = (env, argv) => {
  const config = {
    context: __dirname,
    devtool: 'source-map',
    entry: './src/index.js',
    devServer: {
      static: [
        {
          directory: path.join(__dirname, './'),
        },
        {
          // Dependencies are hoisted to the workspace root by npm, so expose
          // them under the same /node_modules path the demo page expects.
          directory: path.resolve(__dirname, '../../node_modules'),
          publicPath: '/node_modules',
        },
      ],
      port: 8085,
    },
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'eruda-code.js',
      publicPath: '/assets/',
      library: ['erudaCode'],
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
                    // Add '.dev-tools .tools ' to every selector.
                    namespacePlugin('.dev-tools .tools '),
                    classPrefix('eruda-'),
                    autoprefixer,
                  ],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    // CodeMirror ships its own class names, so scope them
                    // without prefixing them.
                    namespacePlugin('.eruda-dev-tools .eruda-tools '),
                    autoprefixer,
                  ],
                },
              },
            },
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
