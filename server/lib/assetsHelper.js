import config from '../../config';
import manifest from '../../webpack-assets.json';

let func;
if (config.notUseDevServer) {
  func = (app) => {
    app.locals.css = (file) => {
      if (!manifest.styles) {
        return '';
      }
      let realFile = manifest.styles[file];
      console.log(realFile);

      if (!realFile) {
        return '';
      }
      return `<link rel="stylesheet" href="${realFile}" />`;
    };
    app.locals.script = (file) => {
      if (!manifest.javascript) {
        return '';
      }
      let realFile = manifest.javascript[file];
      if (!realFile) {
        return '';
      }
      return `<script type="text/javascript" src="${realFile}"></script>`;
    };
  };
} else {
  func = (app) => {
    app.locals.css = (file) => {
      if (!manifest[file]) {
        return '';
      }
      let realFile = manifest[file].css;
      if (!realFile) {
        return '';
      }
      return `<link rel="stylesheet" href="${realFile}" />`;
    };
    app.locals.script = (file) => {
      if (!manifest[file]) {
        return '';
      }
      let realFile = manifest[file].js;
      if (!realFile) {
        return '';
      }
      return `<script type="text/javascript" src="${realFile}"></script>`;
    };
  };
}

export default func;
