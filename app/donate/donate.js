'use strict';

angular.module('myApp.donate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/donate', {
    templateUrl: 'donate/donate.html',
    controller: 'donateCtrl'
  });
}])

.controller('donateCtrl', [function() {
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
        var loginResponse = data.loginResponse;
        luminateExtend.global.update({
          cons_id: loginResponse.cons_id,
          token: loginResponse.token
        });
        console.log(luminateExtend.global);
      };

      luminateExtend.api.request({
        api: 'cons',
        requestType: 'POST',
        callback: logConsole,
        data: 'method=login&user_name=api_guy&password=api_guy&remember_me=true'
      });
    });
}]);