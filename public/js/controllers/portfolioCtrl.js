/**
 * Created by lucavgobbi on 7/18/15.
 */

var portfolioCtrl = angular.module('portfolioCtrl', ['ui.bootstrap', 'lvgCamanMod']);

portfolioCtrl.controller('ListPortfolios', ['$scope','$http',
    function ($scope, $http) {
        $http.get('/api/portfolios')
            .success(function (data) {
                $scope.portfolios = data.map(function (item) {
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

portfolioCtrl.controller('ViewPortfolio', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
        $http.get('/api/portfolios/' + $stateParams.id)
            .success(function (data) {
                $scope.portfolio = data;
                console.log(data);
            });

        $http.get('/api/portfolios/' + $stateParams.id + '/photos')
            .success(function (data) {
                $scope.photos = data;
            });
    }
]);
