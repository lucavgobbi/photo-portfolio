/**
 * Created by lucavgobbi on 3/21/15.
 */
var albumCtrl = angular.module('albumCtrl', ['ui.bootstrap', 'ui-notification', 'lvgCamanMod']);

albumCtrl.controller('ListAlbums', ['$scope','$http',
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

albumCtrl.controller('ListPrivateAlbums', ['$scope','$http',
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

albumCtrl.controller('ViewAlbum', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
        $http.get('/api/albums/' + $stateParams.id + '?token=' + $scope.currentUser.token)
            .success(function (data) {
                $scope.album = data;
                console.log(data);
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
            $('#cropper-img').cropper('replace', $scope.album.cover.url);
        };

        $scope.selectPhoto = function () {
            var cropData = $('#cropper-img').cropper('getData');
            $scope.album.coverDetails = cropData;
        };

        //end of cover selection

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
                    console.log(data);
                    if ($scope.album.coverDetails != null) {
                        $scope.cropperOpt['built'] = function () {
                            $('#cropper-img').cropper('setData', data.coverDetails);
                        };
                        $timeout(showCropper);
                    }

                    //Save function
                    $scope.saveAlbum = function ($event) {
                        $($event.currentTarget).button('loading');
                        if ($scope.album.cover != undefined) {
                            $scope.album.coverDetails = $('#cropper-img').cropper('getData');
                        }
                        console.log($scope.album);
                        $http.put('/api/albums/' + $stateParams.id + '?token=' + $scope.currentUser.token, $scope.album)
                            .success(function (data) {
                                Notification.success('Album saved ;)');
                                $state.go('adminAlbums');
                            });
                    }
                });

            $http.get('/api/albums/' + $stateParams.id + '/photos?token=' + $scope.currentUser.token)
                .success(function (data) {
                    $scope.photos = data;
                });

            $http.get('/api/users?token=' + $scope.currentUser.token)
                .success(function (data) {
                    $scope.users = data;
                });

        }
    }
]);

