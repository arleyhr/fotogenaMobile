(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name myProfile.controller:MyProfileCtrl
   *
   * @description
   *
   */
  angular
    .module('myProfile')
    .controller('MyProfileCtrl', MyProfileCtrl);

  function MyProfileCtrl() {
    var vm = this;
    vm.ctrlName = 'MyProfileCtrl';
  }
}());
