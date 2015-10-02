(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chat.factory:Chat
   *
   * @description
   *
   */
  angular
    .module('chat')
    .factory('ChatService', ChatService);

  function ChatService($rootScope, $q) {

    var ChatBase = {};

    ChatBase.openChat = function (cb){
      $rootScope.chatificator.emit('openChat', $rootScope.auth_user.cod, 
        function (chats) {
          cb(chats)
        });
    }

    ChatBase.openChats = function (chat, cb){

      var options = {
        chat: chat.chat,
         user: $rootScope.auth_user.cod
       }

      $rootScope.chatificator.emit('chatCreate',options,function(data){
        cb(data)
      })

    }

    ChatBase.loadMessages = function (options, cb){

      var options = {
        user: '68458' + options.cod,
        userNick: options.nick,
        userRep: '3546841' + options.id_user
      }

      $rootScope.chatificator.emit('historychat', options, 
        function (messages) {
          cb(messages)
        }, 
      0)

    }

    ChatBase.typing = function(options){
      $rootScope.chatificator.emit('typing', {
        me: options.me,
        you: '548783541234'+ options.you
      });
    }

    ChatBase.createChat = function (options, cb){

      console.log(options)
      
      this.open.verify(options.us, options.cod.substr(4)).then(function(){

        $rootScope.chatificator.emit('chatCreate', {
          chat: 'user_'+options.us,
          user: options.cod
        }, function(c){
           cb(c)
        })

      })
      
    }

    ChatBase.open = {

        set: function (newVal){

          if (localStorage['chats']){

            localStorage['chats'] = JSON.stringify(JSON.parse(localStorage['chats']).push(newVal))

            return true

          }else
            return false
        },

        get: function(){

          return localStorage['chats'] ? JSON.parse(localStorage['chats']) : []

        },

        verify: function (a, b){

          var defer = $q.defer(), self = this, a = parseInt(a), b = parseInt(b)

          if (self.get().length < 1 || self.get() == undefined)
            defer.resolve()
          else
            for (var i = 0; i < self.get().length; i++){

              var substr4 = parseInt(self.get()[i].substr(4))

              var substr5 = parseInt(self.get()[i].substr(5))

              var val1 = substr4 === a && substr5 === b;

              var val2 = substr4 === b && substr5 === a;

              if (val1 || val2){
                defer.reject()
                break;
              }
              else if(self.get().length -1 === i )
                defer.resolve()

            }

          // if (('.user_'+localStorage.user.substr(4)+'_'+a.chat.substr(5))&&!('.user_'+a.chat.substr(5)+'_'+localStorage.user.substr(4))) {};

          return defer.promise

        }
    }

    return ChatBase;
  }
}());
