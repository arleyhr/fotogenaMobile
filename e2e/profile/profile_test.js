/* global describe, beforeEach, it, browser, expect */
'use strict';

var ProfilePagePo = require('./profile.po');

describe('Profile page', function () {
  var profilePage;

  beforeEach(function () {
    profilePage = new ProfilePagePo();
    browser.get('/#/profile');
  });

  it('should say ProfileCtrl', function () {
    expect(profilePage.heading.getText()).toEqual('profile');
    expect(profilePage.text.getText()).toEqual('ProfileCtrl');
  });
});
