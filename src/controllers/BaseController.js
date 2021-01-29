const ResponseManager = require("../helpers/response");
const AutoBindedClass = require("../helpers/autobind");

class BaseController extends AutoBindedClass {
  constructor() {
    super();
    if (new.target === BaseController) {
      throw new TypeError("Cannot construct BaseController instances directly");
    }
    this.responseManager = ResponseManager;
  }
}

module.exports = BaseController;
