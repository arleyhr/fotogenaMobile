/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Login', function () {
  var factory;

  beforeEach(module('login'));

  beforeEach(inject(function (Login) {
    factory = Login;
  }));

  it('should have someValue be Login', function () {
    expect(factory.someValue).toEqual('Login');
  });

  it('should have someMethod return Login', function () {
    expect(factory.someMethod()).toEqual('Login');
  });
});
