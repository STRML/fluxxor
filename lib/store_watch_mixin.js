var _each = require("lodash/forEach");

var StoreWatchMixin = function() {
  var storeNames = Array(arguments.length);
  for (var i = 0; i < arguments.length; i++) {
    storeNames[i] = arguments[i];
  }
  return {
    componentDidMount: function() {
      var flux = this.props.flux || this.context.flux;
      this.mounted = true;
      // No autobinding in ES6 classes
      if (!this.__reactAutoBindPairs) {
        this._setStateFromFlux = this._setStateFromFlux.bind(this);
      }
      var me = this;
      _each(storeNames, function(store) {
        flux.store(store).on("change", me._setStateFromFlux);
      });
    },

    componentWillUnmount: function() {
      var flux = this.props.flux || this.context.flux;
      this.mounted = false;
      var me = this;
      _each(storeNames, function(store) {
        flux.store(store).removeListener("change", me._setStateFromFlux);
      });
    },

    _setStateFromFlux: function() {
      if (this.mounted) {
        this.setState(this.getStateFromFlux());
      }
    },

    getInitialState: function() {
      return this.getStateFromFlux();
    }
  };
};

StoreWatchMixin.componentWillMount = function() {
  throw new Error("Fluxxor.StoreWatchMixin is a function that takes one or more " +
    "store names as parameters and returns the mixin, e.g.: " +
    "mixins: [Fluxxor.StoreWatchMixin(\"Store1\", \"Store2\")]");
};

module.exports = StoreWatchMixin;
