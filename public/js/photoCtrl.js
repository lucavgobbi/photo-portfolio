/**
 * Created by lucavgobbi on 4/4/15.
 */
var photoCtrl = angular.module('photoCtrl', ['ui.bootstrap']);

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

photoCtrl.controller('ViewPhoto', ['$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {
        $scope.alerts = [];
        //New
        if ($stateParams.id == 'new') {
            $scope.photo = {};

            //Save Function
            $scope.savePhoto = function () {
                console.log($scope.photo);
                $http.post('/api/photos', $scope.photo)
                    .success(function (data) {
                        $scope.alerts.push({ type: 'success', msg: 'Photo added with success ;)'});
                        alert('Saved');
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
                        console.log($scope.photo);
                        $http.put('/api/photos/' + $stateParams.id, $scope.photo)
                            .success(function (data) {
                                $scope.alerts.push({ type: 'success', msg: 'Photo updated with success ;)'});
                            });
                    }
                });
        }
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }
]);