/**
 * Created by lucavgobbi on 7/7/15.
 */
var loginService = angular.module('loginService', ['ui.bootstrap']);

loginService.factory('loginModal', ['$modal', '$rootScope',
    function ($modal, $rootScope) {
        function assignAndSaveUser (user) {
            user.expires = Math.floor(Date.now() / 1000) + 86400;

            localStorage.setItem('photo-portifolio-user', JSON.stringify(user));
            return assignCurrentUser(user);
        }

        function assignCurrentUser (user) {
            $rootScope.currentUser = user;
            return user;
        }

        return function() {
            var user = localStorage.getItem('photo-portifolio-user');
            if (user) {
                user = JSON.parse(user);
                if (user.expires > Math.floor(Date.now() / 1000)) {
                    return new Promise(function (resolve) {
                        resolve();
                    }).then(assignCurrentUser(user));
                }
            }

            var instance = $modal.open({
                templateUrl: '/views/home/loginModal',
                controller: 'DoLogin',
                controllerAs: 'DoLogin',
                size: 'sm'
            });

            return instance.result.then(assignAndSaveUser);
        }
    }
]);