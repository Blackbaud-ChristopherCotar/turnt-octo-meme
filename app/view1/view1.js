'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {
    $(function() {
        luminateExtend.init({
            apiKey: 'open',
            path: {
                nonsecure: 'http://localhost/site/',
                secure: 'https://secure2.convio.net/myorg/site/'
            }
        });

        var myLoginTestCallback = function(data) {
            console.log(data);
        };

        luminateExtend.api({
            api: 'cons',
            callback: myLoginTestCallback,
            data: 'method=loginTest'
        });
    });
}]);