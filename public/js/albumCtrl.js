/**
 * Created by lucavgobbi on 3/21/15.
 */

var albumCtrl = angular.module('albumCtrl', []);

albumCtrl.controller('ListAlbumsThumbs', ['$scope','$http',
    function ($scope, $http) {
        $http.get('/api/albums')
            .success(function (data) {
                $scope.albums = data.map(function (item) {
                    return {
                        name: item._id,
                        title: item.title,
                        description: item.description,
                        cover: item.cover != undefined ? item.cover.url : undefined
                    }
                });
            })
    }
]);

albumCtrl.controller('ListAlbums', ['$scope','$http',
    function ($scope, $http) {
        $http.get('/api/albums')
            .success(function (data) {
                $scope.albums = data.map(function (item) {
                    return {
                        name: item._id,
                        title: item.title
                    }
                });
            })
    }
]);

