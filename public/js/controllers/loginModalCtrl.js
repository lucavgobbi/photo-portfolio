/**
 * Created by lucavgobbi on 7/7/15.
 */
var loginModalCtrl = angular.module('loginModalCtrl', []);

loginModalCtrl.controller('DoLogin', ['$scope', '$http',
    function ($scope, $http) {
        this.cancel = $scope.$dismiss;

        $scope.submit = function ($event) {
            var button = $($event.target).find('button');
            button.button('loading');

            $http.post('/api/users/login', { login: $scope.login, password: $scope.password })
                .success(function (data) {
                    $scope.$close(data);
                })
                .error(function () {
                    "use strict";
                    $scope.hasError = true;
                    button.button('reset');
                });

        }
    }
]);