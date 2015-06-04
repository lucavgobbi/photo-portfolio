/**
 * Created by lucavgobbi on 4/4/15.
 */
var photoCtrl = angular.module('photoCtrl', ['ui.bootstrap', 'ui-notification']);

photoCtrl.controller('ListPhotos', ['$scope','$http',
    function ($scope, $http) {
        $http.get('/api/photos')
            .success(function (data) {
                $scope.photos = data.map(function (item) {
                    return {
                        id: item._id,
                        title: item.title,
                        shortDescription: item.shortDescription
                    }
                });
            })
    }
]);

photoCtrl.controller('ViewPhoto', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'Notification',
    function ($scope, $rootScope, $state, $stateParams, $http, Notification) {
        //DatePicker
        $scope.format = 'MM-dd-yyyy';

        //DatePicker open
        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        //Album Dialog open
        $scope.openAlbumDialog = function () {
            $('#albumDialog').modal();
            $scope.albumToAdd = undefined;
            $http.get('/api/albums')
                .success(function (data) {
                    $scope.albums = data;
                });
        };

        $scope.addPhotoToAlbum = function () {
            if ($scope.photo.albums == undefined) {
                $scope.photo.albums = [];
            }

            if ($scope.albumToAdd._id != undefined
                && $.inArray($scope.albumToAdd._id, $scope.photo.albums) == -1) {
                $scope.photo.albums.push($scope.albumToAdd._id);
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
                $http.post('/api/photos', $scope.photo)
                    .success(function (data) {
                        Notification.success('Photo added ;)');
                        $state.go('photos');
                    });
            }
        }
        //Edit
        else {
            //Get photo
            $http.get('/api/photos/' + $stateParams.id)
                .success(function (data) {
                    $scope.photo = data;

                    //Save function
                    $scope.savePhoto = function () {
                        $http.put('/api/photos/' + $stateParams.id, $scope.photo)
                            .success(function (data) {
                                Notification.success('Photo updated :)');
                                $state.go('photos');
                            });
                    }
                });
        }

    }
]);