(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name login.controller:LoginCtrl
   *
   * @description
   *
   */
  angular
    .module('login')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl(urlBase, $rootScope, $http) {

    var login = this;

    login.login_data = {
      user: 'fecace2',
      password: '123456'
    };

    $http.get( urlBase + '/getSession/').success(function (data) {
      login.cookie = data;
    });

    login.logear = function () {
      $rootScope.chatificator.emit('SessionStart', {
        vii: login.cookie,
        txt_usuario: login.login_data.user,
        txt_password: login.login_data.password
      }, function (a) {
        if (angular.equals(a.val, 1) || angular.equals(a.val, 2)) $ionicPopup.alert({
          title: 'Usuario o Contraseña Incorrectos',
          subTitle: 'Usuario o Contraseña Incorrectos .l.'
        });else if (angular.equals(a.val, 3)) {

          $rootScope.auth_user = a;

          localStorage['auth_user'] = JSON.stringify(a);

          localStorage['cookie'] = 'node=' + a.cook + '--';

          $rootScope.afterLogged();
        }
      });
    };
  }
}());
