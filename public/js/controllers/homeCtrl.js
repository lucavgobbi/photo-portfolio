/**
 * Created by lucavgobbi on 3/21/15.
 */

var homeCtrl = angular.module('homeCtrl', []);

homeCtrl.controller('ShowHome', ['$scope', 'websiteConfig',
    function ($scope, websiteConfig) {
        $scope.config = websiteConfig;
    }
]);

homeCtrl.controller('ShowAbout', ['$scope', 'websiteConfig',
    function ($scope, websiteConfig) {
        $scope.config = websiteConfig;
    }
]);

homeCtrl.controller('ShowContact', ['$scope', 'websiteConfig', '$http',
    function ($scope, websiteConfig, $http) {
        $('#contactForm').validator();

        $scope.config = websiteConfig;

        $scope.submitContact = function () {
            if ($scope.name && $scope.email && $scope.message) {
                var data = {
                    name: $scope.name,
                    email: $scope.email,
                    message: $scope.message
                };

                $http.post('sendEmail', data)
                    .success(function (data) {
                        $scope.successMessage = "Thanks for your message! I'll be in touch soon :)";
                    });
            }
        }
    }
]);