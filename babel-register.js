var fs = require('fs');
var babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));
require('babel-register')({
  presets: ['es2015', 'stage-1']
});
