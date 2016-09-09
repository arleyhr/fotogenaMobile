(function () {
  'use strict';

  angular
    .module('fotogena')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  }
}());

//# sourceMappingURL=app-routes.js.map
