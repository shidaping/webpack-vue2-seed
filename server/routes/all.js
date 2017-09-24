import renderUtil from '../lib/renderUtil.js';
export default (app) => {
  app.get('/todo/*', (req, res, next) => {
    const context = {};
    renderUtil.serverRender(res, 'all', context, 1, 2);
  });
};
