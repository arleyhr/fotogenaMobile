(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name chat.controller:ChatCtrl
   *
   * @description
   *
   */
  angular
    .module('chat')
    .controller('ChatCtrl', ChatCtrl);

  function ChatCtrl($rootScope, $timeout, $state, $ionicScrollDelegate, $ionicSideMenuDelegate, $filter, ChatService) {

    var self = this;

    this.typing

    this.tempUser = JSON.parse(localStorage['auth_user'])

    this.cod = $rootScope.auth_user ? $rootScope.auth_user.cod : self.tempUser.cod

    this.auth_nick = $rootScope.auth_user ? $rootScope.auth_user.nick : self.tempUser.nick

    this.id_user = $state.params.id_user;

    this.nick = $state.params.nick;

    ChatService.createChat(
      {
        us: self.id_user, 
        cod: self.cod
      },
      function (response){
        console.log(response)

        ChatService.open.set(response.id);

        self.backgroundImage = response.data.optChat[0].bg

      }
    )

    ChatService.loadMessages(
      {
        
        cod: self.cod, 
        
        nick: self.nick, 

        id_user: self.id_user

      },

      function (messages){

        var filter

        $rootScope.messages[self.nick] = messages;
        
        filter = $filter('filter')($rootScope.messages[self.nick], {id_inicia: self.id_user})

        $rootScope.tempChatImages[self.nick] = filter[filter.length-1].pDir

        $timeout(function () {

          $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);

        })
    
    });


    $rootScope.chatificator.on('typing' + self.cod, function(a){

        if (angular.equals(a, self.id_user))
          self.workTyping()

    })

    this.workTyping = function(){

      self.scrollToBottom()
      if(self.typing){

      var msgTag=document.querySelector('li.typing');
        msgTag.dataset.hide=0;
        /*self.showTyping = true*/

        $timeout.cancel(self.typing);

      }
        
      self.typing = $timeout(function(){
        var msgTag=document.querySelector('li.typing');
        msgTag.dataset.hide=1;
        //self.showTyping = false

        //self.scrollToBottom()
        
      },1000);
    }

    this.emitTyping = function(){

        ChatService.typing({me: self.cod, you: self.id_user })
      

    }

    this.scrollToBottom = function(){

      $timeout(function () {

          $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);

        })

    }


    this.sendMessage = function () {

      if (self.message === '' || self.message === null) return;

      $rootScope.chatificator.emit('mgss', {

        usaer: '587458125487' + self.id_user,

        me: {

          nick: self.auth_nick,

          user: self.cod

        },

        mens: self.message

      }, function (msg) {

        $rootScope.messages[self.nick].push(msg);

        self.message = '';

        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);

      });

    };

  }

}());
