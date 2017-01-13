function makeTypeError(fn, vrble, expType, gotType) {
  return new TypeError(fn + ": <" + vrble + "> expected type \'" + expType + "\'. Got \'" + gotType + "\'");
}

var InvalidArguementError = (function(){
  function InvalidArgError(message){
    this.message = message || 'Argument contain invalid value';
    this.stack = (new Error()).stack;
  }
  InvalidArgError.prototype = Object.create(Error.prototype);
  InvalidArgError.prototype.name = 'InvalidArgError';
  InvalidArgError.constructor = InvalidArgError;
})();
function Modal() {
  $('.modal-holder').find('.btn-close').on('click.closeModal',function(){
    $(this).closest('.modal-holder.show').removeClass('show');
  });
  $('.modal-holder').on('click.closeModal', function(e){
    if(!$(e.target).closest('.modal-box').length){
      $(this).removeClass('show');
    }
  });
  $('[data-toggle="modal"][data-target]').each(function(i){
    $(this).on('click.showSearch', function(){
      $($(this).data('target')+'.modal-holder').addClass('show');
    });
  });
}

$(document).ready(function(){
  Modal();
});
/* jslint node: true */
var CoPlayer = CoPlayer || {};

(function () {
  'use strict';
  //used for scope access inside interal objects/functions, remove if unused
  var ns = this;

  /***** Private members *****/
  var _curPlayer = new _AbstractPlayer("", function(){}, function(){}, function(){});
  var _players = {};
   var _playlist = [];
  var _state = {
    repeat: 0,
    shuffle: false,
    curIndex: 0,
  };

  /***** Private functions *****/


  /***** Private classes *****/
  var _RepeatStates = {
    OFF: 0,
    SINGLE: 1,
    ALL: 2,
  };

  var _AbstractPlayer = function(){
    var _AbstractPlayer = function(name, playFn, pauseFn, stopFn){
      this.name = name;
      this.play = playFn;
      this.pause = pauseFn;
      this.stop = stopFn;
    };
  };

  /***** Public member *****/


  /***** Public functions *****/

  /**
   * Adds a new player with the given name to the list of usable players.
   *  If player already exist, replace old player.
   */
  this.addPlayer = function (name, playFn, pauseFn, stopFn) {
    if (typeof name !== 'string') {
      throw makeTypeError('addPlayer', 'name', 'string', typeof name);
    }
    if (name) {
      throw makeTypeError();
    }
    if (typeof playFn !== 'function') {
      throw makeTypeError('addPlayer', 'playFn', 'function', typeof playFn);
    }
    if (typeof pauseFn !== 'function') {
      throw makeTypeError('addPlayer', 'pauseFn', 'function', typeof pauseFn);
    }
    if (typeof stopFn !== 'function') {
      throw makeTypeError('addPlayer', 'stopFn', 'function', typeof stopFn);
    }
    _players[name] = new _AbstractPlayer(name, playFn, pauseFn, stopFn);
    return _players[name];
  };
}).call(CoPlayer);


module.exports = CoPlayer;
/* test */