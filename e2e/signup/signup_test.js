/* global describe, beforeEach, it, browser, expect */
'use strict';

var SignupPagePo = require('./signup.po');

describe('Signup page', function () {
  var signupPage;

  beforeEach(function () {
    signupPage = new SignupPagePo();
    browser.get('/#/signup');
  });

  it('should say SignupCtrl', function () {
    expect(signupPage.heading.getText()).toEqual('signup');
    expect(signupPage.text.getText()).toEqual('SignupCtrl');
  });
});
