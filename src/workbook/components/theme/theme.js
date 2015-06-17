/**
 * @file 样式池，负责维护当前工作簿内部的样式索引
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('ThemeManager', {
        base: require('../../interface/i-workbook-component'),

        init: function () {
            this.__initAPI();
            this.__initService();
        },

        __initAPI: function () {
            this.registerAPI({
                getMajorFont: this.getMajorFont,
                getMinorFont: this.getMinorFont,
                getColor: this.getColor
            });
        },

        __initService: function () {
            this.registerService({
                'get.major.font': this.getMajorFont,
                'get.minor.font': this.getMinorFont,
                'get.theme.color': this.getColor
            });
        },

        /**
         * 根据给定的theme和tint计算颜色值
         * @param theme
         * @param tint
         * @returns {*}
         */
        getColor: function (theme, tint) {
            var themeData = this.getWorkbook().theme;
            var themeValue = themeData.color.values[theme];

            return $$.calcThemeColor(themeValue, tint);
        },

        getMajorFont: function () {
            var themeData = this.getWorkbook().theme;

            return themeData.font.major.ea;
        },

        getMinorFont: function () {
            var themeData = this.getWorkbook().theme;

            return themeData.font.minor.ea;
        }
    });
});