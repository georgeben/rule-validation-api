const autoBind = require("auto-bind-inheritance");

class BaseAutoBindedClass {
  constructor() {
    autoBind(this);
  }
}
module.exports = BaseAutoBindedClass;
