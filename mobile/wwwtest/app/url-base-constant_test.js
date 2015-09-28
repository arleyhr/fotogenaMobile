/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('urlBase', function () {
  var constant;

  beforeEach(module('fotogena'));

  beforeEach(inject(function (urlBase) {
    constant = urlBase;
  }));

  it('should equal 0', function () {
    expect(constant).toBe(0);
  });
});
