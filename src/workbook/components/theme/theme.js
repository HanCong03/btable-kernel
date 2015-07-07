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
                getThemeColor: this.getThemeColor,
                getBaseSize: this.getBaseSize
            });
        },

        __initService: function () {
            this.registerService([
                'getMajorFont',
                'getMinorFont',
                'getThemeColor'
            ]);
        },

        /**
         * 根据给定的theme和tint计算颜色值
         * @param theme
         * @param tint
         * @returns {*}
         */
        getThemeColor: function (theme, tint) {
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
        },

        getBaseSize: function () {
            return this.getWorkbook().stylePool.fonts[0].size;
        }
    });
});