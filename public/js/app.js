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
            .when('/album', {
                templateUrl: '/album/index',
                controller: 'ListAlbums'
            })
            .otherwise({
                redirectTo: '/home'
            })
    }]);