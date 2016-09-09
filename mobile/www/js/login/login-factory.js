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

  function Login($rootScope, $state, $http, urlBase, ChatService, $filter) {

    var self = this;

    this.getSession = function(){

      return $http.get( urlBase + '/getSession/');

    }

    this.afterLogged = function () {


      $rootScope.listenMsg();


        $rootScope.notificator.emit('enterRoom', { session: localStorage['cookie'] });



        $rootScope.chatificator.emit('inMobile', {

          token: localStorage['cookie']

        }, function (data) {

          if (data.res && data.res == 3) {

            self.logout();

            return;
          }

          $rootScope.conectados =  data;

          console.log(data)

          ChatService.openChat(function (chats){

            $rootScope.openedChats = chats || [];

            angular.forEach(chats, function (value, key) {

              var filtered = $filter('filter')($rootScope.conectados, {us: value.user2})[0]

              if (filtered)

                $rootScope.conectados[$rootScope.conectados.indexOf(filtered)].iChat = value.chat


              // ChatService.openChats(value, function (data){
              //
              //     //
              //
              // })

            });

          })


        });



        $state.go('profile',{ nick: JSON.parse(localStorage['auth_user']).nick });
    }

    this.logout = function(){

      delete localStorage['cookie']

      $state.go('login')

    }

    return this;
  }

}());

//# sourceMappingURL=login-factory.js.map
