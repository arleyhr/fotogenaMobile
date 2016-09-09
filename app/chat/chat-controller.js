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

    var textarea = angular.element(document.querySelector('textarea'));

    var messages_box = angular.element(document.querySelector('.messages'))


    this.keepKeyboardOpen = function () {

      textarea.one('blur', function() {

        textarea[0].focus();

      });
    }


    this.typing

    this.tempUser = JSON.parse(localStorage['auth_user'])

    this.cod = $rootScope.auth_user ? $rootScope.auth_user.cod : self.tempUser.cod

    this.auth_nick = $rootScope.auth_user ? $rootScope.auth_user.nick : self.tempUser.nick

    this.id_user = $state.params.id_user;

    this.nick = $state.params.nick;

// { chat: 'user_273', user: '54871', nick: 'SonickSeven' }
    // $rootScope.chatificator.emit('chatCreate',{
    //     iChat: $state.params.iChat,
    //     uss: self.id_user,
    //     me: self.cod
    //   },function(data){
    //     console.log('hey!')
    //     console.log(data)
    //
    //     $rootScope.messages[data.id] = data.data.msg
    //
    // })

    $rootScope.chatificator.emit('chatCreate',{ chat: 'user_'+self.id_user, user: self.cod, nick: self.nick },function(data){
        console.log('hey!')
        console.log(data)

        $rootScope.messages[data.id] = data.data.msg

        self.idChat = data.id

        self.backgroundImage = data.uss.bDir

        self.scrollToBottom()

    })

    // ChatService.createChat(
    //   {
    //     iChat: $state.params.iChat,
    //     uss: self.id_user,
    //     me: self.cod
    //   },
    //   function (response){
    //     console.log(response)
    //
    //     self.idChat = response.id
    //
    //     ChatService.open.set(response.id);
    //
    //     self.backgroundImage = response.uss.bDir
    //
    //   }
    // )

//     ChatService.loadMessages(
//       {
//
//         cod: self.cod,
//
//         nick: self.nick,
//
//         id_user: self.id_user
//
//       },
//
//       function (messages){
// console.log(messages)
//         var filter
//
//         $rootScope.messages[self.nick] = messages || [];
//
//         filter = $filter('filter')($rootScope.messages[self.nick], {id_inicia: self.id_user})
//
//         $rootScope.tempChatImages[self.nick] = filter[filter.length-1].pDir
//
//         $timeout(function () {
//
//           $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
//
//         })
//
//     });

    $rootScope.chatificator.on('typing' + self.cod, function(a){

        if (angular.equals(a, self.id_user))
          self.workTyping()

    })

    this.onFocus = function(){
      $timeout(function(){
        messages_box.classList.add('margin_bottom')
      self.scrollToBottom()
    }, 0)
    }
    this.onBlur = function(){
      $timeout(function(){
        messages_box.classList.remove('margin_bottom')
        self.scrollToBottom()
      }, 0)
    }

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

    console.log($rootScope.openedChats)

    this.sendMessage = function () {

      self.keepKeyboardOpen();

      if (self.message === '' || self.message === null || self.sending || !self.message) return;


      self.sending = true


      $rootScope.chatificator.emit('mgss', {

        // usaer: '587458125487' + self.id_user,

        me: {

          pDir: $rootScope.auth_user.pDir,

          nick: self.auth_nick,

          user: self.cod

        },

        chat: self.idChat,

        device: 1,

        mens: self.message

      }, function (msg) {
        console.log(msg)


        if (!$rootScope.messages[msg.chat])
          $rootScope.messages[msg.chat] = []

        $rootScope.messages[msg.chat].push(msg);
        self.message = '';

        self.sending = false

        $timeout(function() {

          self.keepKeyboardOpen();
          self.scrollToBottom()
        }, 0);

        

      });

    };

  }

}());
