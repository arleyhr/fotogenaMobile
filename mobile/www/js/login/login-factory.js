(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name login.factory:Login
   *
   * @description
   *
   */
  angular
    .module('login')
    .factory('LoginService', Login);

  function Login($rootScope, $state, $http, urlBase, ChatService) {

    var LoginBase = {};

    LoginBase.getSession = function(){

      return $http.get( urlBase + '/getSession/');

    }

    LoginBase.afterLogged = function () {

        $rootScope.listenMsg();

        $rootScope.notificator.emit('enterRoom', { session: localStorage['cookie'] });

        $rootScope.chatificator.emit('inMobile', {

          token: localStorage['cookie']
          
        }, function (data) {

          $rootScope.conectados = data;

          console.log(data)

        });

        ChatService.openChat(function (chats){

          $rootScope.openedChats = chats;

          angular.forEach(chats, function (value, key) {

            ChatService.openChats(value, function (data){

                //

            })

          });

        })

        $state.go('profile',{ nick: JSON.parse(localStorage['auth_user']).nick });
    }

    return LoginBase;
  }

}());

//# sourceMappingURL=../login/login-factory.js.map