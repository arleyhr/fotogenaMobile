(function () {
  'use strict';

  angular
    .module('profile')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile/:nick',
        templateUrl: 'profile/profile.tpl.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      });
  }
}());

//# sourceMappingURL=../profile/profile-routes.js.map