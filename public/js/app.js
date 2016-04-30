/**
 * Created by lucavgobbi on 3/21/15.
 */
var ppApp = angular.module('ppApp', ['ui.router', 'ngSanitize', 'homeCtrl', 'albumCtrl',
    'photoCtrl', 'userCtrl', 'portfolioCtrl', 'loginModalCtrl', 'loginService', 'dndLists']);

ppApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/views/home/index',
                controller: 'ShowHome',
                data: {
                    transparentNavBar: true
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: '/views/home/about',
                controller: 'ShowAbout'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: '/views/home/contact',
                controller: 'ShowContact'
            })
            .state('portfolio', {
                url: '/portfolio',
                templateUrl: '/views/portfolio/index',
                controller: 'ListPortfolios'
            })
            .state('portfolioDetails', {
                url: '/portfolio/:id',
                templateUrl: '/views/portfolio/view',
                controller: 'ViewPortfolio'
            })
            .state('publicAlbums', {
                url: '/albums/public',
                templateUrl: '/views/album/indexPublic',
                controller: 'ListPublicAlbums'
            })
            .state('albums', {
                url: '/albums',
                templateUrl: '/views/album/index',
                controller: 'ListAlbums',
                data: {
                    requireLogin: true
                }
            })
            .state('publicAlbumDetails', {
                url: '/album/public/:id',
                templateUrl: '/views/album/viewPublic',
                controller: 'ViewPublicAlbum'
            })
            .state('albumDetails', {
                url: '/album/:id',
                templateUrl: '/views/album/view',
                controller: 'ViewAlbum',
                data: {
                    requireLogin: true
                }
            })
            .state('changePassword', {
                url: '/changePassword',
                templateUrl: '/views/home/changePassword',
                controller: 'ChangePassword',
                data: {
                    requireLogin: true
                }
            })
            .state('adminAlbums', {
                url: '/admin/albums',
                templateUrl: '/views/admin/album/index',
                controller: 'AdminListAlbums',
                data: {
                    requireLogin: true
                }
            })
            .state('adminAlbumDetails', {
                url: '/admin/album/:id',
                templateUrl: '/views/admin/album/view',
                controller: 'AdminViewAlbum',
                data: {
                    requireLogin: true
                }
            })
            .state('adminPhotos', {
                url: '/admin/photos',
                templateUrl: '/views/admin/photo/index',
                controller: 'AdminListPhotos',
                data: {
                    requireLogin: true
                }
            })
            .state('adminPhotoDetails', {
                url: '/admin/photo/:id',
                templateUrl: '/views/admin/photo/view',
                controller: 'AdminViewPhoto',
                data: {
                    requireLogin: true
                }
            })
            .state('adminUsers', {
                url: '/admin/users',
                templateUrl: '/views/admin/user/index',
                controller: 'AdminListUsers',
                data: {
                    requireLogin: true
                }
            })
            .state('adminUserDetails', {
                url: '/admin/user/:id',
                templateUrl: '/views/admin/user/view',
                controller: 'AdminViewUser',
                data: {
                    requireLogin: true
                }
            });

        $locationProvider.html5Mode({
            enabled: true
        });
    }]);

ppApp.run(['$window', '$location', '$rootScope', '$state', 'loginModal', 'websiteConfig', function ($window, $location, $rootScope, $state, loginModal, websiteConfig) {
    $window.ga('create', websiteConfig.ga, 'auto');
    $rootScope.$on('$stateChangeSuccess', function (event) {
        $window.ga('send', 'pageview', $location.path());
    });
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