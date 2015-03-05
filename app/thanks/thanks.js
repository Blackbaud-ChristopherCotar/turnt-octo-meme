'use strict';

angular.module('myApp.thanks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/thanks', {
    templateUrl: 'thanks/thanks.html',
    controller: 'thanksCtrl'
  });
}])

.controller('thanksCtrl', [function() {

}]);