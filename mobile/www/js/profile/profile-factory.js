(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name profile.factory:Profile
   *
   * @description
   *
   */
  angular
    .module('profile')
    .factory('ProfileService', ProfileService);

  function ProfileService($rootScope) {

    var ProfileBase = {};

    ProfileBase.getProfileData = function(nick, cb){

      $rootScope.chatificator.emit('loadDoms', {opt: 0, nick: nick }, 
              function(a){
                cb(a)
              });
    }


    return ProfileBase;
  }
}());

//# sourceMappingURL=../profile/profile-factory.js.map