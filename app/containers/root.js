if (ENVIRONMENT === 'production') {
  module.exports = require('./root.prod');
} else {
  module.exports = require('./root.dev');
}
