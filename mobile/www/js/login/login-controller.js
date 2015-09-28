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

  function LoginCtrl(urlBase, $rootScope, $http, LoginService) {

    var self = this;

    this.login_data = {
      user: 'fecace2',
      password: '123456'
    };

    LoginService.getSession().then(function (response) {

      console.log(response)

      self.cookie = response.data
      
      localStorage['cookie'] =response.data;

    });

    this.logear = function () {

      $rootScope.chatificator.emit('SessionStart', {

        vii: self.cookie,

        txt_usuario: self.login_data.user,

        txt_password: self.login_data.password

      }, function (a) {


        if (angular.equals(a.val, 1) || angular.equals(a.val, 2)) 
          $ionicPopup.alert({
            title: 'Usuario o Contraseña Incorrectos',
            subTitle: 'Usuario o Contraseña Incorrectos .l.'
          });

        else if (angular.equals(a.val, 3)) {

          $rootScope.auth_user = a;

          console.log(a)

          localStorage['auth_user'] = JSON.stringify(a);

          localStorage['cookie'] = 'node=' + a.cook + '--';

          LoginService.afterLogged();

        }

      });

    };
    
  }
}());

//# sourceMappingURL=../login/login-controller.js.map