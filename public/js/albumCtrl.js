/**
 * Created by lucavgobbi on 3/21/15.
 */

var albumCtrl = angular.module('albumCtrl', ['ui.bootstrap', 'ui-notification'])
    .directive('lvgCaman', ['$timeout', function ($timeout) {
        return {
            link: function ($scope, element, attrs) {
                $timeout(function () { // You might need this timeout to be sure its run after DOM render.
                    Caman("#" + attrs.id, function () {

                        if (attrs.lvgCamanCropX != undefined &&
                            attrs.lvgCamanCropY != undefined &&
                            attrs.lvgCamanCropHeight != undefined &&
                            attrs.lvgCamanCropWidth != undefined) {
                            // width, height, x, y
                            this.crop(attrs.lvgCamanCropWidth, attrs.lvgCamanCropHeight,
                                attrs.lvgCamanCropX, attrs.lvgCamanCropY);
                        }
                        this.resize({
                            width: 300,
                            height: 300
                        })
                        .render();
                    });
                });
            }
        };
    }]);

albumCtrl.controller('ListAlbums', ['$scope','$http',
    function ($scope, $http) {
        $http.get('/api/albums')
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
        $http.get('/api/albums/' + $stateParams.id)
            .success(function (data) {
                $scope.album = data;
                console.log(data);
            });

        $http.get('/api/albums/' + $stateParams.id + '/photos')
            .success(function (data) {
                $scope.photos = data;
            });
    }
]);

albumCtrl.controller('AdminListAlbums', ['$scope','$http',
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
                $http.post('/api/albums', $scope.album)
                .success(function (data) {
                        Notification.success('Album created :)');
                        $state.go('adminAlbums');
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
                        $http.put('/api/albums/' + $stateParams.id, $scope.album)
                            .success(function (data) {
                                Notification.success('Album saved ;)');
                                $state.go('adminAlbums');
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

