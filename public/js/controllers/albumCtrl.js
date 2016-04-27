/**
 * Created by lucavgobbi on 3/21/15.
 */

var albumCtrl = angular.module('albumCtrl', ['ui.bootstrap', 'ui-notification']);

albumCtrl.controller('ListPublicAlbums', ['$scope','$http',
    function ($scope, $http) {
        $http.get('/api/albums/public')
            .success(function (data) {
                $scope.albums = data.map(function (item) {
                    return {
                        name: item._id,
                        title: item.title,
                        shortDescription: item.shortDescription,
                        cover: item.cover != undefined ? item.cover.url : undefined,
                        coverDetails: item.coverDetails
                    }
                });
            })
    }
]);

albumCtrl.controller('ListAlbums', ['$scope','$http',
    function ($scope, $http) {
        $http.get('/api/albums?token=' + $scope.currentUser.token)
            .success(function (data) {
                $scope.albums = data.map(function (item) {
                    return {
                        name: item._id,
                        title: item.title,
                        shortDescription: item.shortDescription,
                        cover: item.cover != undefined ? item.cover.url : undefined,
                        coverDetails: item.coverDetails
                    }
                });
            })
    }
]);

albumCtrl.controller('ViewPublicAlbum', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
        $scope.avoidClick = function(e) {
            e.preventDefault();
            return false;
        };

        $http.get('/api/albums/public/' + $stateParams.id)
            .success(function (data) {
                $scope.album = data;
            });

        $http.get('/api/albums/public/' + $stateParams.id + '/photos')
            .success(function (data) {
                $scope.photos = data;
            });
    }
]);

albumCtrl.controller('ViewAlbum', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
        $scope.avoidClick = function(e) {
            e.preventDefault();
            return false;
        };
        
        $http.get('/api/albums/' + $stateParams.id + '?token=' + $scope.currentUser.token)
            .success(function (data) {
                $scope.album = data;
            });

        $http.get('/api/albums/' + $stateParams.id + '/photos?token=' + $scope.currentUser.token)
            .success(function (data) {
                $scope.photos = data;
            });
    }
]);

albumCtrl.controller('AdminListAlbums', ['$scope','$http',
    function ($scope, $http) {
        $http.get('/api/albums?token=' + $scope.currentUser.token)
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

albumCtrl.controller('AdminViewAlbum', ['$scope', '$timeout', '$state', '$stateParams', '$http', 'Notification',
    function ($scope, $timeout, $state, $stateParams, $http, Notification) {
        $('[data-toggle="tooltip"]').tooltip();

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
            $('#cropper-img').cropper($scope.cropperOpt);
        }

        $scope.reloadCropper = function () {
            $('#cropper-img').cropper($scope.cropperOpt);
            $('#cropper-img').cropper('replace', $scope.album.cover.url);
        };
        //end of cover selection

        //Get users
        $http.get('/api/users?token=' + $scope.currentUser.token)
            .success(function (data) {
                $scope.users = data;
            });

        //New
        if ($stateParams.id == 'new') {
            $scope.album = {};

            //Save Function
            $scope.saveAlbum = function ($event) {
                $($event.currentTarget).button('loading');
                $http.post('/api/albums?token=' + $scope.currentUser.token, $scope.album)
                .success(function (data) {
                        Notification.success('Album created :)');
                        $state.go('adminAlbums');
                });
            }
        }
        //Edit
        else {
            //Get album
            $http.get('/api/albums/' + $stateParams.id + '?token=' + $scope.currentUser.token)
                .success(function (data) {
                    $scope.album = data;
                    if ($scope.album.coverDetails != null) {
                        $scope.cropperOpt['built'] = function () {
                            $('#cropper-img').cropper('setData', data.coverDetails);
                        };
                        $timeout(showCropper);
                    }

                    $scope.removePhotoFromAlbum = function (album) {
                        $scope.photos.splice($scope.photos.indexOf(album), 1);
                    };

                    //Save function
                    $scope.saveAlbum = function ($event) {
                        $($event.currentTarget).button('loading');
                        if ($scope.album.cover != undefined) {
                            $scope.album.coverDetails = $('#cropper-img').cropper('getData');
                        }
                        $scope.album.photos = $scope.photos.map((i) => ({ photo: i.photoId, order: i.order }));
                        $http.put('/api/albums/' + $stateParams.id + '?token=' + $scope.currentUser.token, $scope.album)
                            .success(function (data) {
                                Notification.success('Album saved ;)');
                                $state.go('adminAlbums');
                            });
                    }
                });

            $http.get('/api/albums/' + $stateParams.id + '/listPhotos?token=' + $scope.currentUser.token)
                .success(function (data) {
                    $scope.photos = data;
                });
        }
    }
]);

