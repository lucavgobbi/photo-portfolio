/**
 * Created by lucavgobbi on 7/7/15.
 */
var loginService = angular.module('loginService', ['ui.bootstrap']);

loginService.factory('loginModal', ['$modal', '$rootScope',
    function ($modal, $rootScope) {
        function assignCurrentUser (user) {
            $rootScope.currentUser = user;
            return user;
        }

        return function() {
            var instance = $modal.open({
                templateUrl: '/home/loginModal',
                controller: 'DoLogin',
                controllerAs: 'DoLogin'
            });

            return instance.result.then(assignCurrentUser);
        }
    }
]);