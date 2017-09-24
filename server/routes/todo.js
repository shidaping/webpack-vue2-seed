import config from '../../config';
import renderUtil from '../lib/renderUtil.js';
import request from 'request';
import Vue from 'vue';
import List from '../../client/modules/todo/pages/list/list';

const renderer = require('vue-server-renderer').createRenderer()

export default (app) => {
  app.get('/staticList', (req, res) => {
    renderer.renderToString(new Vue(List), (err, html) => {
      if (err) throw err
      console.log(html)
      renderUtil.serverStaticRender(res, 'staticList', html);
      // => <div data-server-rendered="true">Hello World</div>
    })

  })
  app.get(['/todo/*', '/todo'], (req, res, next) => {
    console.log('111111111111');
    const context = {};
    renderUtil.serverRender(res, 'todo', context, 1, 2);
  });
};
