/**
 * Created by lucavgobbi on 4/4/15.
 */
var photoCtrl = angular.module('photoCtrl', ['ui.bootstrap', 'ui-notification']);

function openAlbumDialog ($event, $scope, $http) {
    $($event.currentTarget).button('loading');
    $scope.albumToAdd = undefined;
    $http.get('/api/albums?token=' + $scope.currentUser.token)
        .success(function (data) {
            $scope.albums = data;
            $('#albumDialog').modal();
            $($event.currentTarget).button('reset');
        });
}

photoCtrl.controller('AdminListPhotos', ['$scope','$http', 'Notification',
    function ($scope, $http, Notification) {
        $scope.importPhotos = function ($event) {
            $($event.currentTarget).button('loading');

            $http.post('/api/photos/import?token=' + $scope.currentUser.token)
                .success(function (data) {
                    if (data.error) {
                        Notification.error('An error occured :(');
                    } else {
                        Notification.success(data.data.length + ' images imported :)');
                    }
                    $($event.currentTarget).button('reset');

                });
        }

        $scope.openAlbumDialog = function ($event) {
            openAlbumDialog($event, $scope, $http);
        };

        $scope.addPhotosToAlbum = function () {
            var selectedPhotos = $('.add-to-album:checked');
            var selectedAlbum = $scope.albumToAdd;
            _.each(selectedPhotos, function (inputHtml) {
                var photoId = $(inputHtml).data('id');
                $http.post('/api/photos/' + photoId + '/addToAlbum/' + selectedAlbum._id + '?token=' + $scope.currentUser.token)
                    .success(function (photo) {
                        Notification.success(photo.title + ' added to album ' + selectedAlbum.title);
                    });
            });
            $('#albumDialog').modal('hide');
        };

        $http.get('/api/photos?token=' + $scope.currentUser.token)
            .success(function (data) {
                $scope.photos = data.map(function (item) {
                    return {
                        _id: item._id,
                        title: item.title,
                        shortDescription: item.shortDescription,
                        description: item.description,
                        url: item.url
                    }
                });
            })
    }
]);

photoCtrl.controller('AdminViewPhoto', ['$scope', '$timeout', '$rootScope', '$state', '$stateParams', '$http', 'Notification',
    function ($scope, $timeout, $rootScope, $state, $stateParams, $http, Notification) {
        $('[data-toggle="tooltip"]').tooltip();

        //DatePicker
        $scope.format = 'MM-dd-yyyy';

        //DatePicker open
        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

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
            $('#cropper-img').cropper('replace', $scope.photo.url);
        };

        //Album Dialog open
        $scope.openAlbumDialog = function ($event) {
            openAlbumDialog($event, $scope, $http);
        };

        $scope.addPhotoToAlbum = function () {
            if ($scope.photo.albums == undefined) {
                $scope.photo.albums = [];
            }

            if ($scope.albumToAdd._id != undefined) {
                $scope.photo.albums.push($scope.albumToAdd);
                $('#albumDialog').modal('hide');
            }
        };

        $scope.removePhotoFromAlbum = function (album) {
            $scope.photo.albums.splice($scope.photo.albums.indexOf(album), 1);
        };

        //New
        if ($stateParams.id == 'new') {
            $scope.photo = {};

            //Save Function
            $scope.savePhoto = function () {
                $scope.photo.thumbDetails = $('#cropper-img').cropper('getData');
                $http.post('/api/photos?token=' + $scope.currentUser.token, $scope.photo)
                    .success(function (data) {
                        Notification.success('Photo added ;)');
                        $state.go('adminPhotos');
                    });
            }
        }
        //Edit
        else {
            //Get photo
            $http.get('/api/photos/' + $stateParams.id + '?token=' + $scope.currentUser.token)
                .success(function (data) {
                    $scope.photo = data;
                    console.log('Test');
                    $scope.cropperOpt['built'] = function () {
                        $('#cropper-img').cropper('setData', data.thumbDetails);
                    };
                    $timeout(showCropper);

                    //Save function
                    $scope.savePhoto = function () {
                        $scope.photo.thumbDetails = $('#cropper-img').cropper('getData');
                        $http.put('/api/photos/' + $stateParams.id + '?token=' + $scope.currentUser.token, $scope.photo)
                            .success(function (data) {
                                Notification.success('Photo updated :)');
                                $state.go('adminPhotos');
                            });
                    }
                });
        }

    }
]);