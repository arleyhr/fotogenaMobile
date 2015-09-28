(function () {
  'use strict';

  angular
    .module('myProfile')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('myProfile', {
        url: '/my-profile',
        templateUrl: 'my-profile/my-profile.tpl.html',
        controller: 'MyProfileCtrl',
        controllerAs: 'myProfile'
      });
  }
}());
