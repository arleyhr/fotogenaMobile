/* global describe, beforeEach, it, browser, expect */
'use strict';

var MyProfilePagePo = require('./my-profile.po');

describe('My profile page', function () {
  var myProfilePage;

  beforeEach(function () {
    myProfilePage = new MyProfilePagePo();
    browser.get('/#/my-profile');
  });

  it('should say MyProfileCtrl', function () {
    expect(myProfilePage.heading.getText()).toEqual('myProfile');
    expect(myProfilePage.text.getText()).toEqual('MyProfileCtrl');
  });
});
