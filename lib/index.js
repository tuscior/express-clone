
const app = require("./express-clone");

// routing management. Each http request can be distinguished based
// on the policy
function createApplication() {
  return app;
}

module.exports = createApplication;