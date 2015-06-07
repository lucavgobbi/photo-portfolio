/**
 * Created by lucavgobbi on 3/21/15.
 */

var albumCtrl = angular.module('albumCtrl', ['ui.bootstrap', 'ui-notification']);

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

albumCtrl.controller('ViewAlbum', ['$scope', '$state', '$stateParams', '$http', 'Notification',
    function ($scope, $state, $stateParams, $http, Notification) {
        //DatePicker
        $scope.format = 'MM-dd-yyyy';

        //DatePicker open
        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.photosToSelect = [];

        $scope.selectPhoto = function () {
            $http.get('/api/albums/' + $stateParams.id + '/photos')
                .success(function (data) {
                    $scope.photosToSelect = data;
                    $('#photoDialog').modal();
                });
        };

        //New
        if ($stateParams.id == 'new') {
            $scope.album = {};

            //Save Function
            $scope.saveAlbum = function () {
                $http.post('/api/albums', $scope.album)
                .success(function (data) {
                        Notification.success('Album created :)');
                        $state.go('albums');
                });
            }
        }
        //Edit
        else {
            //Get album
            $http.get('/api/albums/' + $stateParams.id)
                .success(function (data) {
                    $scope.album = data;

                    //Save function
                    $scope.saveAlbum = function () {
                        //$scope.album.cover = $scope.album.cover.id;
                        $http.put('/api/albums/' + $stateParams.id, $scope.album)
                            .success(function (data) {
                                Notification.success('Album saved ;)');
                                $state.go('albums');
                            });
                    }
                });

            $http.get('/api/albums/' + $stateParams.id + '/photos')
                .success(function (data) {
                    $scope.photos = data;
                });
        }
    }
]);

