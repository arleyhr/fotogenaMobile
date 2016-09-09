(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name fotogena.factory:Socket
   *
   * @description
   *
   */
  angular
    .module('fotogena')
    .factory('SocketFactory', SocketFactory);

  function SocketFactory($rootScope) {

    var Socket = function(url){
      this.socket = io.connect(url)
    }

    Socket.prototype.on = function (eventName, callback) {

      var self = this;

      this.socket.on(eventName, function () {

        var args = arguments;

        $rootScope.$apply(function () {

          callback.apply(self.socket, args);

        });

      });

    }

    Socket.prototype.emit = function (eventName, data, callback) {

      var self = this;

      this.socket.emit(eventName, data, function () {

        var args = arguments;

        $rootScope.$apply(function () {

          if (callback)
            callback.apply(self.socket, args);

        });

      });

    }
    
    return Socket;
  }
}());

//# sourceMappingURL=socket-factory.js.map
