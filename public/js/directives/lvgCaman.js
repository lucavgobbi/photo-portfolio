/**
 * Created by lucavgobbi on 7/18/15.
 */
var lvgCaman = angular.module('lvgCamanMod', ['ui.bootstrap', 'ui-notification'])
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