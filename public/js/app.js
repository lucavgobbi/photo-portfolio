/**
 * Created by lucavgobbi on 3/21/15.
 */
var ppApp = angular.module('ppApp', ['ui.router', 'ngAnimate', 'homeCtrl', 'albumCtrl',
    'photoCtrl', 'userCtrl', 'portfolioCtrl', 'loginModalCtrl', 'loginService']);

ppApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/home/index',
                controller: 'ShowHome',
                data: {
                    transparentNavBar: true
                }
            })
            .state('portfolio', {
                url: '/portfolio',
                templateUrl: '/portfolio/index',
                controller: 'ListPortfolios'
            })
            .state('portfolioDetails', {
                url: '/portfolio/:id',
                templateUrl: '/portfolio/view',
                controller: 'ViewPortfolio'
            })
            .state('albums', {
                url: '/albums',
                templateUrl: '/album/index',
                controller: 'ListAlbums'
            })
            .state('privateAlbums', {
                url: '/privateAlbums',
                templateUrl: '/album/index',
                controller: 'ListPrivateAlbums',
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
            })
            .state('adminUsers', {
                url: '/admin/users',
                templateUrl: '/admin/user/index',
                controller: 'AdminListUsers',
                data: {
                    requireLogin: true
                }
            });
    }]);

ppApp.run(['$rootScope', '$state', 'loginModal', function ($rootScope, $state, loginModal) {
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams) {
            var requireLogin = false;
            var transparentNavBar = false;

            if (toState.data != undefined) {
                if (toState.data.requireLogin != undefined) {
                    requireLogin = toState.data.requireLogin;
                }

                if (toState.data.transparentNavBar != undefined) {
                    transparentNavBar = toState.data.transparentNavBar;
                }
            }

            $rootScope.transparentNavBar = transparentNavBar;

            if (requireLogin && typeof $rootScope.currentUser == 'undefined') {
                event.preventDefault();
                //Login window

                loginModal()
                    .then(function () {
                        return $state.go(toState.name, toParams);
                    });
            }
        });
    }
]);