/* global describe, beforeEach, it, browser, expect */
'use strict';

var ChatPagePo = require('./chat.po');

describe('Chat page', function () {
  var chatPage;

  beforeEach(function () {
    chatPage = new ChatPagePo();
    browser.get('/#/chat');
  });

  it('should say ChatCtrl', function () {
    expect(chatPage.heading.getText()).toEqual('chat');
    expect(chatPage.text.getText()).toEqual('ChatCtrl');
  });
});
