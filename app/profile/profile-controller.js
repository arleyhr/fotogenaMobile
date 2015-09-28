(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name profile.controller:ProfileCtrl
   *
   * @description
   *
   */
  angular
    .module('profile')
    .controller('ProfileCtrl', ProfileCtrl);

  function ProfileCtrl(ProfileService, $state) {

    var self = this;

    ProfileService.getProfileData($state.params.nick, function(data){

      self.data = data
      
    })

  }
}());
