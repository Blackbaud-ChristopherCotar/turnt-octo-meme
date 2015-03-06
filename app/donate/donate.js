'use strict';

angular.module('myApp.donate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/donate', {
    templateUrl: 'donate/donate.html',
    controller: 'donateCtrl'
  });
}])

.controller('donateCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    jQuery.support.cors = true;
    $http.defaults.useXDomain = true;
    $scope.formId = 1215;
    $scope.method = 'donate';
    $scope.validate = 'true';
    $scope.tokenID = '';
    Stripe.setPublishableKey('pk_test_ULZQ02ywV1lxC0kzlI9PkEd5');

    var stripeResponseHandler = function (status, response) {
      console.log(response);
      $scope.tokenID = response.id;

      $.ajax({
        type: "POST",
        url: 'https://secure-bvtpacker13.conviocloud.com/bvtpacker1301/site/CRDonationAPI',
        data: {
          v: '1.0',
          api_key: 'api_key',
          response_format: 'json',
          level_id: '1606',
          method: $scope.method,
          form_id: $scope.formId,
          validate: $scope.validate,
          tokenID: $scope.tokenID,
          'billing.address.city': 'austin',
          'billing.address.state': 'TX',
          'billing.address.street1': 'street 1',
          'billing.address.zip': '78787',
          'billing.name.first': 'a',
          'billing.name.last': 'a',
          'donor.email': 'a@a.com'
        },
        crossDomain: true,
        success: function() { console.log("yay this is posting to LO"); $location.path('/thanks');},
        error: function() { console.log("error"); $location.path('/thanks');},
        //dataType: 'jsonp',
        xhrFields: {
          withCredentials: true
        }
      });

      //
      //$http({
      //  url: 'https://secure-bvtpacker13.conviocloud.com/bvtpacker1301/CRDonationAPI',
      //  data: {
      //    v: '1.0',
      //    api_key: 'api_key',
      //    response_format: 'json',
      //    level_id: '1606',
      //    method: $scope.method,
      //    form_id: $scope.formId,
      //    validate: $scope.validate,
      //    tokenID: $scope.tokenID,
      //    'billing.address.city': 'austin',
      //    'billing.address.state': 'TX',
      //    'billing.address.street1': 'street 1',
      //    'billing.address.zip': '78787',
      //    'billing.name.first': 'a',
      //    'billing.name.last': 'a',
      //    'donor.email': 'a@a.com'
      //  },
      //  method: 'POST',
      //  withCredentials: true
      //
      //})
      //  .success(function (data, status, headers, config) {
      //    alert(data);
      //    console.log(headers);
      //  }).error(function (data, status, headers, config) {
      //    alert(data);
      //    console.log(headers);
      //  });
    };

    jQuery('#donate-submit').click(function(event) {
        var form = jQuery(this);

        // Disable the submit button to prevent repeated clicks
        form.find('button').prop('disabled', true);

        console.log($scope.formId);
        console.log($scope.method);
        console.log($scope.validate);
        console.log($scope.tokenID);

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

    $scope.donateCallback = {
      error: function(){alert('fail')}, success: function(){alert('winning')}
    };

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