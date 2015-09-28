/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Profile', function () {
  var factory;

  beforeEach(module('profile'));

  beforeEach(inject(function (Profile) {
    factory = Profile;
  }));

  it('should have someValue be Profile', function () {
    expect(factory.someValue).toEqual('Profile');
  });

  it('should have someMethod return Profile', function () {
    expect(factory.someMethod()).toEqual('Profile');
  });
});
