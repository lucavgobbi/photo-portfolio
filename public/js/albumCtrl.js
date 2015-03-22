/**
 * Created by lucavgobbi on 3/21/15.
 */

var albumCtrl = angular.module('albumCtrl', []);

albumCtrl.controller('ListAlbums', ['$scope','$http',
    function ($scope, $http) {
        $http.get('/api/albums')
            .success(function (data) {
                $scope.albums = data.map(function (item) {
                    return {
                        title: item.title,
                        description: item.description,
                        currentCover: item.covers[Math.floor((Math.random() * item.covers.length))].url
                    }
                });
            })
    }
]);