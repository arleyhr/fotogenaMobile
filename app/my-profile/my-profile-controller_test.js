/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('MyProfileCtrl', function () {
  var ctrl;

  beforeEach(module('myProfile'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('MyProfileCtrl');
  }));

  it('should have ctrlName as MyProfileCtrl', function () {
    expect(ctrl.ctrlName).toEqual('MyProfileCtrl');
  });
});
