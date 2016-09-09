(function () {
  'use strict';

  /* @ngdoc object
   * @name fotogena
   * @description
   *
   */

    function AppCtrl(urlBase, $rootScope, $ionicSideMenuDelegate, $location, $state, $filter, $ionicScrollDelegate, LoginService, ProfileService, $ionicPopup) {

      var app = this;

      app.tempMessageID = ''

      $rootScope.$on('notification', function(data){
        alert(JSON.stringify(data))
      })


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

      $rootScope.goToChat = function (conectado) {

        console.log(conectado)

        $ionicSideMenuDelegate.toggleRight();

        setTimeout(function () {
          $state.go('chat', { nick: conectado.nick, id_user: conectado.us, iChat: conectado.iChat });
        }, 200);

      };

      $rootScope.listenMsg = function () {

        console.log('listening...', $rootScope.auth_user.nick)

        // $rootScope.chatificator.on('chatJoin:'+$rootScope.auth_user.nick, function(data){
        // 	console.log(data, 'uyagefbrf')
        // 	$rootScope.chatificator.emit('joinChat', data)
        // 	// console.log(data)
        //   $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        // })

        $rootScope.chatificator.on('readMsg', function (msg) {
console.log(msg)



          if (msg.id == app.tempMessageID) return

          $rootScope.tempChatImages[msg.chat] = msg.pDir

          if ($rootScope.messages[msg.chat]){

            $rootScope.messages[msg.chat].push(msg);

            app.tempMessageID = msg.id


          }

          else{
            $rootScope.messages[msg.chat] = msg;

            app.tempMessageID = msg.id

          }


          $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        });
      };

    }

    function RunApp ($ionicPlatform, $rootScope, $http, $state, urlBase, ProfileService, SocketFactory, LoginService ) {

        


        




        $rootScope.messages = [];

        $rootScope.tempChatImages = [];

        $rootScope.URL = urlBase;

        $rootScope.chatificator = new SocketFactory(urlBase+'/HistChat');

        $rootScope.notificator = new SocketFactory(urlBase+'/notific');

        $rootScope.logged = false;

        if (localStorage['cookie'] && localStorage['auth_user']) {

          ProfileService.getProfileData( JSON.parse(localStorage['auth_user']).nick,

            function(data){

            $rootScope.auth_user = data;

            $rootScope.auth_user.cod = '5487' + data.cod;

            localStorage['auth_user'] = JSON.stringify(data);

            LoginService.afterLogged();

          })
        }else{
          console.log('Isn\'t logged')
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

          var state = toState.name;

        });

        $ionicPlatform.ready(function () {

           


           if (window.plugins && window.plugins.OneSignal){
            window.plugins.OneSignal.init("7c18cf30-04c3-459b-9fb8-df42b192d5e0",
                                   {googleProjectNumber: "78551362945"},
                                   function(data){

                                      $rootScope.$broadcast('notification', data)

                                   });
            
              window.plugins.OneSignal.sendTag("developer", "true")

            }

          if (window.cordova && window.cordova.plugins.Keyboard) cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          if (window.StatusBar) StatusBar.styleDefault();

        });

    }


    angular
    .module('fotogena', [
      'ngMaterial',
      'ui.router',
      'ionic',
      'home',
      'login',
      'signup',
      'myProfile',
      'chat',
      'profile'
    ])
    .controller('AppCtrl', AppCtrl)
    .run(RunApp);


}());

//# sourceMappingURL=app-module.js.map
