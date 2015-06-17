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

albumCtrl.controller('ViewAlbum', ['$scope', '$timeout', '$state', '$stateParams', '$http', 'Notification',
    function ($scope, $timeout, $state, $stateParams, $http, Notification) {
        //DatePicker
        $scope.format = 'MM-dd-yyyy';

        //DatePicker open
        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        //Cover select
        $scope.photosToSelect = [];

        $scope.cropperOpt = {
            aspectRatio: 4 / 4,
            autoCropArea: 0.95,
            strict: true,
            guides: true,
            responsive: false,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            checkImageOrigin: false
        };

        function showCropper() {
            $('#cropper-img').cropper('destroy');
            $('#cropper-img').cropper($scope.cropperOpt);
        }

        $scope.reloadCropper = function () {
            //broadcast the event to show cropper
            //$scope.$broadcast('hide.cropper');
            $timeout(showCropper);
        };

        $scope.selectPhoto = function () {
            var cropData = $('#cropper-img').cropper('getData');
            $scope.album.coverDetails = cropData;
        };

        $scope.selectPhotoDialog = function () {
            $http.get('/api/albums/' + $stateParams.id + '/photos')
                .success(function (data) {
                    $scope.photosToSelect = data;
                    $('#photoDialog').modal();
                    $timeout(showCropper);
                });
        };
        //end of cover selection

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

                    if ($scope.album.coverDetails != null) {
                        $scope.cropperOpt['built'] = function () {
                            $('#cropper-img').cropper('setData', $scope.album.coverDetails);
                        };
                    }

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

