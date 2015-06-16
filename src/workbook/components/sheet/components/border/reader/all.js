/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var BORDER_LOCATION = require('../definition/location');

    return require('utils').createClass('Border', {
        base: require('sheet-component'),

        mixin: require('../../common/style'),

        getRangeBorder: function (location) {
            switch (location) {
                case BORDER_LOCATION.TOP:
                    return this.getRangeTopBorder();

                case BORDER_LOCATION.BOTTOM:
                    return this.getRangeBottomBorder();

                case BORDER_LOCATION.RIGHT:
                    return this.getRangeRightBorder();

                case BORDER_LOCATION.LEFT:
                    return this.getRangeLeftBorder();

                case BORDER_LOCATION.OUTER:
                    return this.getRangeOuterBorder();

                case BORDER_LOCATION.INNER:
                    return this.getRangeInnerBorder();
                    break;
            }
        },

        // 全选情况下，外边框为null
        getRangeTopBorder: function () {
            return null;
        },

        getRangeBottomBorder: function () {
            return null;
        },

        getRangeRightBorder: function () {
            return null;
        },

        getRangeLeftBorder: function () {
            return null;
        },

        getRangeOuterBorder: function () {
            return {
                top: this.getRangeTopBorder(),
                left: this.getRangeLeftBorder(),
                bottom: this.getRangeBottomBorder(),
                right: this.getRangeRightBorder()
            };
        },

        getRangeInnerBorder: function () {}
    });
});