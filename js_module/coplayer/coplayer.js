/* jslint node: true */
function CoPlayer(){
  'use strict';
  //used for scope access inside interal objects/functions, remove if unused
  var ns = this;

  /***** Private classes *****/
  function _makePlayer(name, playFn, pauseFn, stopFn){
      return {
        name: name,
        play: playFn,
        pause: pauseFn,
        stop: stopFn
      };
    };
  /***** Private members *****/
  var _curPlayer = new _makePlayer("", function(){}, function(){}, function(){});
  var _state = {
    repeat: 0,
    shuffle: false,
    curIndex: 0,
  };
  this._players = {};
  this._playlist = [];
  var _RepeatStates = {
    OFF: 0,
    SINGLE: 1,
    ALL: 2,
  };

  /***** Private functions *****/


  /***** Public member *****/


  /***** Public functions *****/

  /**
   * Adds a new player with the given name to the list of usable players.
   *  If player already exist, replace old player.
   * 
   * @param {string} name a none-empty string that indicates the name of the player. i.e YouTube
   * @param {function} playFn the function that triggers 'play' for the given player
   * @param {function} pauseFn the function that triggers 'puase' for the given player
   * @param {function} stopFn the function that tiggers 'stop' for the given player.
   *                           Stop function should prevent further loading of the player content.
   * @return {object} returns the constructed player object
   */
  this.addPlayer = function (name, playFn, pauseFn, stopFn) {
    if (typeof name !== 'string') {
      throw makeTypeError('addPlayer', 'name', 'string', typeof name);
    }
    if (name) {
      throw new InvalidArgError('name must not be empty');
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
    ns._players[name] = new _makePlayer(name.subString(0, 16), playFn, pauseFn, stopFn);
    return ns._players[name];
  };
  
  this.getPlayer = function(playerName) {
    return ns._players[playerName];
  }
}