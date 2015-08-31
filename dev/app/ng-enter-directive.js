(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name fotogena.directive:ngEnter
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="fotogena">
       <file name="index.html">
        <ng-enter></ng-enter>
       </file>
     </example>
   *
   */
  angular
    .module('fotogena')
    .directive('ngEnter', ngEnter);

  function ngEnter() {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
  }
}());
