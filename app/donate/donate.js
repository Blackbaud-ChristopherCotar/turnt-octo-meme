'use strict';

angular.module('myApp.donate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/donate', {
    templateUrl: 'donate/donate.html',
    controller: 'donateCtrl'
  });
}])

.controller('donateCtrl', ['$scope', function($scope) {
    Stripe.setPublishableKey('pk_test_ULZQ02ywV1lxC0kzlI9PkEd5');

    var stripeResponseHandler = function(status, response) {
        console.log(response);
    };

    jQuery('.donation-form').submit(function(event) {
        var form = jQuery(this);

        // Disable the submit button to prevent repeated clicks
        form.find('button').prop('disabled', true);

        Stripe.card.createToken({
            number: $scope.cardNumber,
            cvc: $scope.cardCvc,
            exp_month: $scope.cardExpiry.month,
            exp_year: $scope.cardExpiry.year
        }, stripeResponseHandler);
        console.log($scope.cardNumber);
        console.log($scope.cardExpiry);
        console.log($scope.cardCvc);
        //Stripe.card.createToken($form, stripeResponseHandler);

        // Prevent the form from submitting with the default action
        return false;
    });

    jQuery(function() {
      luminateExtend.init({
        apiKey: 'api_key',
        path: {
          nonsecure: 'http://bvtpacker1301.bvtpacker13.conviocloud.com/site/',
          secure: 'https://secure-bvtpacker13.conviocloud.com/bvtpacker1301/site/'
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