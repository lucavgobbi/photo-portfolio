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

userCtrl.controller('AdminViewUser', ['$scope', '$http', '$state', '$stateParams', 'Notification',
    function ($scope, $http, $state, $stateParams, Notification) {
        //New
        if ($stateParams.id == 'new') {
            $scope.user = {};

            //Save Function
            $scope.saveUser = function ($event) {
                $($event.currentTarget).button('loading');
                $http.post('/api/users?token=' + $scope.currentUser.token, $scope.user)
                    .success(function (data) {
                        Notification.success('User created :)');
                        $state.go('adminUsers');
                    });
            }
        }
        //Edit
        else {
            //Get album
            $http.get('/api/users/' + $stateParams.id + '?token=' + $scope.currentUser.token)
                .success(function (data) {
                    $scope.user = data;

                    //Save function
                    $scope.saveUser = function ($event) {
                        $($event.currentTarget).button('loading');
                        $http.put('/api/users/' + $stateParams.id + '?token=' + $scope.currentUser.token, $scope.user)
                            .success(function (data) {
                                Notification.success('User saved ;)');
                                $state.go('adminUsers');
                            });
                    }
                });

        }
    }
]);
