'use strict';
require('ts-node/register');
const loopback     = require('loopback');
const boot         = require('loopback-boot');
const cookieParser = require('cookie-parser');
const ConfigLoader = require('loopback-boot').ConfigLoader;
const deepmerge    = require('deepmerge');

const app = module.exports = loopback();

app.use(cookieParser());

app.start = function() {
  // start the web server
  const server = app.listen(function() {
    app.emit('started', server);
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
};

const config = loadConfig();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, config, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// Load the default models along with the special 'block' models
function loadConfig() {
  const env = process.env.NODE_ENV || app.get('env') || 'development';
  const models1 = ConfigLoader.loadModels(__dirname, env);
  const models2 = ConfigLoader.loadModels('./common/blocks', env);
  return {
    appRootDir: __dirname,
    models: deepmerge(models1, models2),
  };
}
