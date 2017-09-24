import manifest from '../../webpack-assets.json';
export default (app) => {
  app.locals.css = (file) => {
    if(!manifest[file]) {
      return '';
    }
    let realFile = manifest[file].css;
    if(!realFile) {
      return '';
    }
    return `<link rel="stylesheet" href="${realFile}" />`;
  };
  app.locals.script = (file) => {
    if (!manifest[file]) {
      return '';
    }
    let realFile = manifest[file].js;
    if(!realFile) {
      return '';
    }
    return `<script type="text/javascript" src="${realFile}"></script>`;
  };
};
