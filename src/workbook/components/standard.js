/**
 * @file 提供标准参考数据。如：标准字体，标准字号等
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var STANDARD_VALUE = require('../definition/standard');

    return $$.createClass('Heap', {
        base: require('../interface/i-workbook-component'),

        init: function () {
            this.__initAPI();
        },

        __initAPI: function () {
            this.registerAPI({
                getStandardFontSize: this.getStandardFontSize,
                getStandardFont: this.getStandardFont,
                getStandardColor: this.getStandardColor,
                getStandardWidth: this.getStandardHeight,
                getStandardHeight: this.getStandardHeight
            });
        },

        getStandardFontSize: function () {
            return STANDARD_VALUE.fontsize;
        },

        getStandardFont: function () {
            return this.getActiveSheet().stylePool.fonts[0].name.value;
        },

        getStandardColor: function () {
            return this.getActiveSheet().stylePool.fonts[0].color.value;
        },

        getStandardWidth: function () {
            return STANDARD_VALUE.width;
        },

        getStandardHeight: function () {
            return STANDARD_VALUE.height;
        }
    });
});