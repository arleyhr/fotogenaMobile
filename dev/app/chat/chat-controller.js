(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name chat.controller:ChatCtrl
   *
   * @description
   *
   */
  angular
    .module('chat')
    .controller('ChatCtrl', ChatCtrl);

  function ChatCtrl($scope, $rootScope, $state, $ionicScrollDelegate, $timeout, $ionicSideMenuDelegate) {

    var chat = this;

    chat.nick = $state.params.nick;

    console.log($rootScope.auth_user)

    $rootScope.chatificator.emit('historychat', {
      user: '68458' + $rootScope.auth_user.cod,
      userNick: $rootScope.auth_user.nick,
      userRep: '3546841' + $state.params.id_user
    }, function (messages) {

      $rootScope.messages[$state.params.nick] = messages;

      $timeout(function () {

        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
      }, 0);
    });

    chat.sendMessage = function () {

      if (chat.message === '' || chat.message === null) return;

      $rootScope.chatificator.emit('mgss', {

        usaer: '587458125487' + $state.params.id_user,

        me: {
          nick: $rootScope.auth_user.nick,
          user: $rootScope.auth_user.cod
        },
        mens: chat.message

      }, function (msg) {

        $rootScope.messages[$state.params.nick].push(msg);

        chat.message = '';

        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
      });
    };
  }
}());
