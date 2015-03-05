'use strict';

angular.module('myApp.donate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/donate', {
    templateUrl: 'donate/donate.html',
    controller: 'donateCtrl'
  });
}])

.controller('donateCtrl', [function() {
    Stripe.setPublishableKey('pk_test_ULZQ02ywV1lxC0kzlI9PkEd5');

    var stripeResponseHandler = function(status, response) {
        console.log(response);
    };

    jQuery(function($) {
        $('.donation-form').submit(function(event) {
            var $form = $(this);

            // Disable the submit button to prevent repeated clicks
            $form.find('button').prop('disabled', true);

            Stripe.card.createToken({
                number: 4242424242424242,
                cvc: 123,
                exp_month: 12,
                exp_year: 2016
            }, stripeResponseHandler);
            //Stripe.card.createToken($form, stripeResponseHandler);

            // Prevent the form from submitting with the default action
            return false;
        });
    });

    $(function() {
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