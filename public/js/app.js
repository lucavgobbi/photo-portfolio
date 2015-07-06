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
            .state('albumDetails', {
                url: '/album/:id',
                templateUrl: '/album/view',
                controller: 'ViewAlbum'
            })
            .state('adminAlbums', {
                url: '/admin/albums',
                templateUrl: '/admin/album/index',
                controller: 'AdminListAlbums'
            })
            .state('adminAlbumDetails', {
                url: '/admin/album/:id',
                templateUrl: '/admin/album/view',
                controller: 'AdminViewAlbum'
            })
            .state('adminPhotos', {
                url: '/admin/photos',
                templateUrl: '/admin/photo/index',
                controller: 'AdminListPhotos'
            })
            .state('adminPhotoDetails', {
                url: '/admin/photo/:id',
                templateUrl: '/admin/photo/view',
                controller: 'AdminViewPhoto'
            });
    }]);