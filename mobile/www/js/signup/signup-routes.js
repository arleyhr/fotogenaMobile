(function () {
  'use strict';

  angular
    .module('signup')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'signup/signup.tpl.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      });
  }
}());

//# sourceMappingURL=../signup/signup-routes.js.map