/**
 * Created by lucavgobbi on 7/7/15.
 */
var loginModalCtrl = angular.module('loginModalCtrl', []);

loginModalCtrl.controller('DoLogin', ['$scope', '$http',
    function ($scope, $http) {
        this.cancel = $scope.$dismiss;

        $scope.submit = function ($event) {
            $($event.currentTarget).button('loading');

            $http.post('/api/users/login', { login: $scope.login, password: $scope.password })
                .success(function (data) {
                    $scope.$close(data);
                });

        }
    }
]);