/**
 * Created by lucavgobbi on 7/7/15.
 */
var loginModalCtrl = angular.module('loginModalCtrl', []);

loginModalCtrl.controller('DoLogin', ['$scope', '$http',
    function ($scope, $http) {
        this.cancel = $scope.$dismiss;

        this.submit = function (email, password) {

            $scope.close(user);
        }
    }
]);