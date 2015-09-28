(function () {
  'use strict';

  angular
    .module('chat')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat/:nick/:id_user',
        templateUrl: 'chat/chat.tpl.html',
        controller: 'ChatCtrl',
        controllerAs: 'chat'
      });
  }
}());

//# sourceMappingURL=../chat/chat-routes.js.map