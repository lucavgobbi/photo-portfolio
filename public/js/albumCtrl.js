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

albumCtrl.controller('ViewAlbum', ['$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {
        //Default functions and scope

        //Alerts
        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        //DatePicker
        $scope.format = 'MM-dd-yyyy';

        //DatePicker open
        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        //New
        if ($stateParams.id == 'new') {
            $scope.album = {};

            //Save Function
            $scope.saveAlbum = function () {
                $http.post('/api/albums', $scope.album)
                .success(function (data) {
                    $scope.alerts.push({ type: 'success', msg: 'Album created with success ;)'});
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
                        $http.put('/api/albums/' + $stateParams.id, $scope.album)
                            .success(function (data) {
                                $scope.alerts.push({ type: 'success', msg: 'Album updated with success ;)'});
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

