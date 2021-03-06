var inherits = require('./util/inherits');

function FunctionChainingError(key) {
  Error.call(this);
  this.name = "FunctionChainingError";
  this.message = "You are attempting to define " +
            "`" + key + "` on your store more than once, but that is only supported " +
            "for functions, which are chained together.";
}

inherits(FunctionChainingError, Error);

module.exports = FunctionChainingError;
