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

        var logConsole = function(data) {
            console.log(data);
        };

        luminateExtend.api.request({
            api: 'cons',
            requestType: 'POST',
            callback: logConsole,
            data: 'method=login&user_name=api_guy&password=api_guy&remember_me=true'
        });
    });
}]);