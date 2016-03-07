// Use ProvidePlugin (Webpack) or loose-envify (Browserify)
// together with Uglify to strip the dev branch in prod build.
// console.log(ENVIRONMENT);
if (ENVIRONMENT === 'production') {
  module.exports = require('./store.prod');
} else {
  module.exports = require('./store.dev');
}
