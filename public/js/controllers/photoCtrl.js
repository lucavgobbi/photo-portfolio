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

photoCtrl.controller('AdminViewPhoto', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'Notification',
    function ($scope, $rootScope, $state, $stateParams, $http, Notification) {
        $('[data-toggle="tooltip"]').tooltip();

        //DatePicker
        $scope.format = 'MM-dd-yyyy';

        //DatePicker open
        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
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

                    //Save function
                    $scope.savePhoto = function () {
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