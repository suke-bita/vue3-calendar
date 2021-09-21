const path = require('path');
const Sass = require('sass');
const Fiber = require('fibers');
const { DefinePlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

const mode = process.env.NODE_ENV;
const isProduction = mode === 'production';
const excludeNodeModules = /node_modules/;

const entry = {
  'index.js': './index.ts',
};

module.exports = {
  mode,
  context: path.resolve(__dirname, 'src'),
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
  },
  devServer: {
    static: {
      staticOptions: {
        contentBase: './public',
      }
    },
    historyApiFallback: true,
    port: '8080',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|ts)$/,
        exclude: excludeNodeModules,
        loader: 'eslint-loader',
      },
      {
        test: /\.vue$/,
        exclude: excludeNodeModules,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        exclude: excludeNodeModules,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.scss$/,
        exclude: excludeNodeModules,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: `${isProduction ? '[name]-[local]-' : ''}[sha512:hash:base64:5]`,
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: Sass,
              sassOptions: {
                fiber: Fiber,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
  resolve: {
    // import文で省略を許可する拡張子
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { vue: 'vue/dist/vue.esm-bundler.js' },
  },
};
