/**
 * Created by lucavgobbi on 3/21/15.
 */
var ppApp = angular.module('ppApp', ['ui.router', 'homeCtrl', 'albumCtrl', 'photoCtrl', 'loginModalCtrl', 'loginService']);

ppApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/home/index',
                controller: 'ShowHome'
            })
            .state('albums', {
                url: '/albums',
                templateUrl: '/album/index',
                controller: 'ListAlbums',
                data: {
                    requireLogin: true
                }
            })
            .state('albumDetails', {
                url: '/album/:id',
                templateUrl: '/album/view',
                controller: 'ViewAlbum',
                data: {
                    requireLogin: true
                }
            })
            .state('adminAlbums', {
                url: '/admin/albums',
                templateUrl: '/admin/album/index',
                controller: 'AdminListAlbums',
                data: {
                    requireLogin: true
                }
            })
            .state('adminAlbumDetails', {
                url: '/admin/album/:id',
                templateUrl: '/admin/album/view',
                controller: 'AdminViewAlbum',
                data: {
                    requireLogin: true
                }
            })
            .state('adminPhotos', {
                url: '/admin/photos',
                templateUrl: '/admin/photo/index',
                controller: 'AdminListPhotos',
                data: {
                    requireLogin: true
                }
            })
            .state('adminPhotoDetails', {
                url: '/admin/photo/:id',
                templateUrl: '/admin/photo/view',
                controller: 'AdminViewPhoto',
                data: {
                    requireLogin: true
                }
            });
    }]);

ppApp.run(['$rootScope', '$state', 'loginModal', function ($rootScope, $state, loginModal) {
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;

            if (requireLogin && typeof $rootScope.currentUser == 'undefined') {
                //Login window
                loginModal()
                    .then(function () {
                        return $state.go(toState.name, toParams);
                    });
            }
        });
    }
]);