/**
 * Created by lucavgobbi on 3/21/15.
 */
var ppApp = angular.module('ppApp', ['ngRoute', 'homeCtrl', 'albumCtrl']);

ppApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/home/index',
                controller: 'ShowHome'
            })
            .when('/albums', {
                templateUrl: '/album/index',
                controller: 'ListAlbums'
            })
            .when('/photos', {
                templateUrl: '/photo/index',
                controller: 'ListPhotos'
            })
            .when('/photos/:id', {
                templateUrl: '/photo/view',
                controller: 'ViewPhoto'
            })
            .otherwise({
                redirectTo: '/home'
            })
    }]);