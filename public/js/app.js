/**
 * Created by lucavgobbi on 3/21/15.
 */
var ppApp = angular.module('ppApp', ['ui.router', 'homeCtrl', 'albumCtrl', 'photoCtrl']);

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
                controller: 'ListAlbums'
            })
            .state('photos', {
                url: '/photos',
                templateUrl: '/photo/index',
                controller: 'ListPhotos'
            })
            .state('photoDetails', {
                url: '/photos/:id',
                templateUrl: '/photo/view',
                controller: 'ViewPhoto'
            });
    }]);