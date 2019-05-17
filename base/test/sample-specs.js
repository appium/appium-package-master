'use strict';

const sample = require('..');
const chai = require('chai');

chai.should();

describe('sample', function () {
  it('should-work', function () {
    sample.func().should.equal('123');
  });
});
