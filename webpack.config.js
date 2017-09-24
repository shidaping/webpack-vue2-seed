var webpack = require('webpack');
var path = require('path');
var nodeModulesDir = path.join(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var config = require('./config');
var env = config.env;
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AssetsWebpackPlugin = require('assets-webpack-plugin');
var webackConfig = {
  entry: {
    //all: ['./client/modules/all/index.js'],
    todo: './client/modules/todo/index.js',
    staticList: './client/modules/todo/pages/list/static.js',
    // 'todo-list': ['./client/modules/todo/index.js'],
    vendor: [],
  },
  output: {
    publicPath: `http://${config.staticFileHost}:${config.staticFilePort}/${config.staticFilePrefix}/`,
    path: path.resolve(__dirname, "dist"),
    filename: env === 'development' ? '[name].js' : '[name]-[chunkhash].js',
    // chunkFilename: "[id].js"
  },

  // externals: {
  // require('jquery') is external and available
  //  on the global var jQuery
  //   'jquery': 'jQuery'
  // },
  resolve: {
    alias: {
      'font-awesome.css': path.resolve(nodeModulesDir, 'font-awesome/css/font-awesome.min.css'),
      jquery: path.resolve(nodeModulesDir, 'jquery/dist/jquery.min.js'),
      // client: path.resolve('./client'),
      config: path.resolve('config'),
      vue: 'vue/dist/vue.js',
    },
    modules: [
      'node_modules',
      'client',
    ],
    extensions: ['.js', '.jsx', '.less', '.ts'],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin(
      (env !== 'development') ? '[name]-[chunkhash].css' : '[name].css',
      { allChunks: true }
    ),
    // function() {
    //   this.plugin('done', function(stats) {
    //     fs.writeFileSync(
    //       path.join(__dirname, 'manifest.json'),
    //       JSON.stringify(stats.toJson().assetsByChunkName)
    //     );
    //   });
    // },
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /(node_modules)/,
    // }, {
    //   test: /\.less$/,
    //  css?-autoprefixer!postcss!less
    //   loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!less')
    // }, {
    //   test: /\.css$/,
    //   loader: 'style!css'

    }, {
      test: /\.ts$/,
      loaders: ['babel-loader'],
      exclude: /(node_modules)/,
  
    }, {
      test: /(\.less|\.css)$/,
      use: ['css-loader', 'less-loader', 'postcss-loader'],
      // use: env === 'development' ? ['css-loader', 'less-loader', 'postcss-loader'] :
      //   ExtractTextPlugin.extract({
      //     use: ['css-loader', 'less-loader', 'postcss-loader'],
      //   })

    // }, {
    //   test: /\.css$/,
    //   loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    }, {
      test: /\.jpg|\.png$/,
      loader: 'file-loader',
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff',
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }],

  },
  devServer: {
    host: '0.0.0.0',
    port: config.staticFilePort,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
// if (env === 'production') {
webackConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: config.env !== 'development' ? JSON.stringify('production') : JSON.stringify('development'),
  },
}));
// }

webackConfig.plugins.push(
  new AssetsWebpackPlugin()
);

webackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename: 'views/all.html',
    template: path.join(__dirname, './client/views/template.html'),
    chunks: ['vendor', 'all'],
    minify: {
      collapseWhitespace: true
    },
  })
);

webackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename: 'views/todo.html',
    title: 'todo',
    template: path.join(__dirname, './client/views/template.html'),
    chunks: ['vendor', 'todo'],
    minify: {
      collapseWhitespace: true
    }
  })
);
module.exports = webackConfig;
