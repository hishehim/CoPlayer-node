
/*
  Tests to be written
  Units
  1. Added new players
  2. Adding playlist item
  3. Per source type: run search
  4. Per soruce type: run adding links
  5. Per source type: play each item
  6. Player switching -> automatic player switch (stub for player required)
  
  Functions
 */
var chai = require('chai');
var expect   = chai.expect;
var assert   = chai.assert;

describe.only('Create CoPlayer Object', function(){
  it('type of CoPlayer', function(){
    var cp1 = new CoPlayer(),
        cp2 = CoPlayer();
    assert.typeOf(CoPlayer, 'function', 'type of CoPlayer should be function');
    expect(cp1, 'new CoPlayer() should create object').to.be.a('object');
    expect(cp2, 'CoPlayer() should create object').to.be.a('object');
    assert.equal(typeof cp1, typeof cp2);
  });
  it('create empty', function(){
    var cp = new CoPlayer();
    assert.instanceOf(cp, CoPlayer, 'cp should be instance of CoPlayer');
  });
  it('create parameter', function(){
    var cp = new CoPlayer("asdfgd", 'cp should be instance of CoPlayer');
    assert.instanceOf(cp, CoPlayer);
  })
});

describe('Player creation', function(){
  var coPlayer;
  var stubPlay, stubPause, stubStop;
  before(function(){
    stubPlay = function(){};
    stubPlay = function(){};
    stubStop = function(){};
  });
  beforeEach(function(){
    coPlayer = new CoPlayer();
  });
  it('adding named player', function(){
    var namedPlayer = coPlayer.addPlayer('named',
                                         stubPlay,
                                         stubPause,
                                         stubStop);
    expect(namedPlayer).to.be.a('object');
  });
});