(function () {
  'use strict';

  /* @ngdoc object
   * @name fotogena
   * @description
   *
   */
  angular
    .module('fotogena', [
      'ngMaterial',
      'ui.router',
      'ionic',
      'home',
      'login',
      'signup',
      'myProfile',
      'chat'
    ])
    .controller('AppCtrl', AppCtrl)
    .run(RunApp);

    // AppCtrl.$inject = ['urlBase', 'SocketFactory', '$rootScope', '$ionicSideMenuDelegate', '$location', '$state', '$filter'];

    function AppCtrl(urlBase, SocketFactory, $rootScope, $ionicSideMenuDelegate, $location, $state, $filter, $ionicScrollDelegate) {

      var app = this;

      $rootScope.messages = [];

      $rootScope.URL = urlBase;

      $rootScope.chatificator = new SocketFactory(urlBase+'/HistChat');
      
      $rootScope.notificator = new SocketFactory(urlBase+'/notific');


      $rootScope.logged = false;

      //Toggle Menus
      app.toggleMenu = function (a) {
        if (a === 'right') $ionicSideMenuDelegate.toggleLeft(true);
        else if (a === 'left') $ionicSideMenuDelegate.toggleRight(true);
        else console.log('¿sidemenu?');
      };

      //Handle connect || disconnect
      $rootScope.notificator.on('notific1', function (a) {

        switch (a.type) {

          case 46: //Connected

            var desconectado = $filter('filter')($rootScope.conectados, { us: parseInt(a.us) }, true)[0];

            var index = $rootScope.conectados.indexOf(desconectado);

            $rootScope.conectados.splice(index, 1);

            break;

          case 47: //Disconnect

            var data = a;

            var conectado = $filter('filter')($rootScope.conectados, { us: data.us });

            $rootScope.conectados.push(data);

            break;
        }
      });

      $rootScope.afterLogged = function () {

        $rootScope.listenMsg();

        $rootScope.notificator.emit('enterRoom', { session: localStorage['cookie'] });

        $rootScope.chatificator.emit('inMobile', {

          token: localStorage['cookie']
          
        }, function (data) {

          $rootScope.conectados = data;
        });

        $rootScope.chatificator.emit('openChat', $rootScope.auth_user.cod, function (chats) {
          $rootScope.openedChats = chats;
        });

        $state.go('myProfile');
      };

      $rootScope.goToChat = function (conectado) {

      console.log(conectado)

        $ionicSideMenuDelegate.toggleRight();

        setTimeout(function () {
          $state.go('chat', { nick: conectado.nick, id_user: conectado.us });
        }, 200);
      };

      $rootScope.listenMsg = function () {

        $rootScope.chatificator.on('chat:' + $rootScope.auth_user.nick, function (msg) {
          console.log(msg)
          // var audio = document.createElement('audio');

          // audio.src = './audios/blackhole_shot.mp3';

          // audio.play();

          // $cordovaLocalNotification.add({
          //   id: '1',
          //   title: 'Fotogena!!',
          //   text: msg.msg
          // }).then(function () {});

          // $cordovaVibration.vibrate(1000);
          
          $rootScope.messages[msg.nick].push(msg);

          $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        });
      };

      if (localStorage['cookie'] && localStorage['auth_user']) {

        $rootScope.chatificator.emit('loadDoms', {
          opt: 0,
          nick: JSON.parse(localStorage['auth_user']).nick
        }, function (a) {

          $rootScope.auth_user = a;

          $rootScope.auth_user.cod = '5487' + a.cod;

          console.log($rootScope.auth_user);

          localStorage['auth_user'] = JSON.stringify(a);

          $rootScope.afterLogged();
        });
      }

    }

    function RunApp ($ionicPlatform, $rootScope, $http, $state) {

        $rootScope.messages = [];

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

          var state = toState.name;

        });

        $ionicPlatform.ready(function () {

          if (window.cordova && window.cordova.plugins.Keyboard) cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          if (window.StatusBar) StatusBar.styleDefault();

        });

    }
}());
