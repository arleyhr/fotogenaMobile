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

  function ProfileCtrl(ProfileService, LoginService, $state) {

    var self = this;

    this.logout = function(){
      LoginService.logout()
    }

    ProfileService.getProfileData($state.params.nick, function(data){

      self.data = data

      console.log(data)


      switch (self.data.tabla) {
        case 'Pesado':
          self.style = '#4e4c4e'
          break;
        case 'Bicolor':
          self.style = '#b5ccea'
          break;
        case 'Soledad':
          self.style = '#a90329'
          break;
        case 'Ocaso':
          self.style = '#ccc373'
          break;
        case 'Hojas':
          self.style = '#60a36e'
          break;
        case 'Primavera':
          self.style = '#feb8ff'
          break;
        case 'dark':
          self.style = 'black'
          break;
        case 'Nothing':
          self.style = 'white'
        case 'transparent':
          self.style = 'rgba(0,0,0,.4)'
        break;
        default:
          self.style = 'beige'
      }

    })

  }
}());

//# sourceMappingURL=profile-controller.js.map
