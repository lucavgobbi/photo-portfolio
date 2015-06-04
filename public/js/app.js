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
            .state('albumsThumbs', {
                url: '/albumsThumbs',
                templateUrl: '/album/indexThumbs',
                controller: 'ListAlbumsThumbs'
            })
            .state('albums', {
                url: '/albums',
                templateUrl: '/album/index',
                controller: 'ListAlbums'
            })
            .state('albumDetails', {
                url: '/album/:id',
                templateUrl: '/album/view',
                controller: 'ViewAlbum'
            })
            .state('photos', {
                url: '/photos',
                templateUrl: '/photo/index',
                controller: 'ListPhotos'
            })
            .state('photoDetails', {
                url: '/photo/:id',
                templateUrl: '/photo/view',
                controller: 'ViewPhoto'
            });
    }]);