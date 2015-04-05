/**
 * Created by lucavgobbi on 4/4/15.
 */
var photoCtrl = angular.module('photoCtrl', []);

albumCtrl.controller('ListPhotos', ['$scope','$http',
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

albumCtrl.controller('ViewPhoto', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {

        //New
        if ($routeParams.id == 'new') {
            $scope.photo = {};

            //Save Function
            $scope.savePhoto = function () {
                console.log($scope.photo);
                $http.post('/api/photos', $scope.photo)
                    .success(function (data) {
                        alert('Saved');
                    });
            }
        }
        //Edit
        else {
            //Get photo
            $http.get('/api/photos/' + $routeParams.id)
                .success(function (data) {
                    $scope.photo = data;

                    //Save function
                    $scope.savePhoto = function () {
                        console.log($scope.photo);
                        $http.put('/api/photos/' + $routeParams.id, $scope.photo)
                            .success(function (data) {
                                alert('Saved');
                            });
                    }
                });
        }

    }
]);