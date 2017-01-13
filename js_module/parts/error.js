function makeTypeError(fn, vrble, expType, gotType) {
  return new TypeError(fn + ": <" + vrble + "> expected type \'" + expType + "\'. Got \'" + gotType + "\'");
}

var InvalidArgError = (function(){
  /**
   * @param {string} message must be string 
   */
  function InvalidArgError(message){
    var err = Error.apply(this, arguments)
    this.message = err.message || 'Argument contain invalid value';
    this.stack = err.stack;
  }
  InvalidArgError.prototype = Object.create(Error.prototype);
  InvalidArgError.prototype.name = 'InvalidArgError';
  InvalidArgError.prototype.constructor = InvalidArgError;
  return InvalidArgError;
})();