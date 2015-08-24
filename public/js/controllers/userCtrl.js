/**
 * Created by lucavgobbi on 2015-08-24.
 */
var userCtrl = angular.module('userCtrl', ['ui.bootstrap', 'ui-notification']);

userCtrl.controller('AdminListUsers', ['$scope','$http',
    function ($scope, $http) {
        $http.get('/api/users?token=' + $scope.currentUser.token)
            .success(function (data) {
                $scope.users = data;
            })
    }
]);
