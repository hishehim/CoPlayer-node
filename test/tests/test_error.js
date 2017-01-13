/*
  Tests to be written
 */
var chai   = require('chai');
var assert = chai.assert;
var expect = chai.expect;

describe('Error', function(){
  var validErrors,
      invalidErrors;
  before(function(){
    validErrors = [new InvalidArgError(),
                   new InvalidArgError("test")];
    invalidErrors = [];
  });
  it('Messages', function(){
    expect(new InvalidArgError().message, 'No param').to.be.equal('Argument contain invalid value');
    expect(new InvalidArgError('test message', 'with param').message).to.be.equal('test message');
  });
  it('All valid error are type of Error', function(){
    for(var i = 0; i < validErrors.length; i++) {
      assert.instanceOf(validErrors[i], Error, 'No parameter is instance of Error');
    }
  });
  it('All valid error has name \'InvalidArgError\'',function(){
    assert.strictEqual(InvalidArgError.prototype.name, 'InvalidArgError', 'prototype to string');
    for(var i = 0; i < validErrors.length; i++) {
      assert.strictEqual(validErrors[i].constructor.name, InvalidArgError.prototype.name, i + ' to prototype');
    }
  });
  it('All invalid error', function(){
    expect(new InvalidArgError({}).message, 'empty object').to.be.equal(new Error({}).message);
    // expect(new InvalidArgError([]).message, 'empty array').to.be.equal(new Error([]).message);
    expect(new InvalidArgError(1332).message, 'number').to.be.equal(new Error(1332).message);
  });
});