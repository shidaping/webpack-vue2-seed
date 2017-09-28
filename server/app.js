import express from 'express';
import path from 'path';
import assetsHelper from './lib/assetsHelper';
import config from '../config';
import routes from './routes';


const app = express();

if (config.env === 'testing') {
  app.use('/projectName', express.static(path.join(__dirname, '../assets')));
}

if (config.notUseDevServer) {
  var webpack = require('webpack');
  var webpackConfig = require('..//webpack.config.js');
  var compiler = webpack(webpackConfig);
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var serverOptions = {
    // contentBase: 'http://' + host + ':' + port,
    // quiet: true,
    noInfo: true,
    hot: true,
    // inline: true,
    // lazy: false,
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    // stats: { colors: true }
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  };
  app.use(webpackDevMiddleware(compiler, serverOptions));
  app.use(webpackHotMiddleware(compiler));
}

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
assetsHelper(app);
routes(app);


// 设置模板路径，默认为./views
if (config.env === 'development') {
  app.set('views', path.join(__dirname, '../client/views/'));
} else {
  app.set('views', path.join(__dirname, '../assets/views/'));
}
app.disable('x-powered-by');
app.enable('trust proxy');
app.listen(config.port, function () {
  console.log(`app listen at ${config.port}`);
});
