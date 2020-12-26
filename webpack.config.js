const path = require(`path`)
const yargs = require('yargs')
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`)
const isProduction = yargs.argv.mode === `production`

module.exports = {
  mode: isProduction ? `production` : `development`,
  devtool: `source-map`,
  resolve: {
    alias: {
      'src': path.resolve(__dirname, `src/`),
      '@core': path.resolve(__dirname, `src/core/`),
      '@views': path.resolve(__dirname, `src/views/`),
      '@styles': path.resolve(__dirname, `src/styles/`),
    },
    extensions: [`.ts`, `.tsx`],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: `ts-loader`,
            options: {
              configFile: `tsconfig.json`,
            },
          },
        ],
      },
      {
        enforce: `pre`,
        test: /\.js$/,
        loader: `source-map-loader`,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: `url-loader`,
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          `css-modules-typescript-loader`,
          {
            loader: `css-loader`,
            options: {
              modules: {
                localIdentName: isProduction
                  ? `[hash:base64:5]`
                  : `[path][name]__[local]--[hash:base64:5]`,
              },
              importLoaders: 2,
            },
          },
          `sass-loader`,
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `styles.css`,
    }),
  ],
  externals: {
    'react': `React`,
    'react-dom': `ReactDOM`,
    'redux': `Redux`,
    'react-redux': `ReactRedux`,
  },
  output: {
    library: `Streams`,
    libraryTarget: `umd`,
    filename: `index.js`,
  },
}
