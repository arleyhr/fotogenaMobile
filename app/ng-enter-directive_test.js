/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ngEnter', function () {
  var scope
    , element;

  beforeEach(module('fotogena', '/ng-enter-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<ng-enter></ng-enter>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().ngEnter.name).toEqual('ngEnter');
  });
});
