/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Chat', function () {
  var factory;

  beforeEach(module('chat'));

  beforeEach(inject(function (Chat) {
    factory = Chat;
  }));

  it('should have someValue be Chat', function () {
    expect(factory.someValue).toEqual('Chat');
  });

  it('should have someMethod return Chat', function () {
    expect(factory.someMethod()).toEqual('Chat');
  });
});
