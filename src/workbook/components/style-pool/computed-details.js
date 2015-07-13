/**
 * @file 提供对style-detail的计算支持
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        /**
         * 获取给定detail的计算后的值。
         * 该接口会对fontName和所有的color进行运算，使其包含计算后的值。
         * @param details
         * @returns {*}
         * @private
         */
        __getComputedDetails: function (details) {
            if (details.name && !details.name.value) {
                details.name.value = this.__getComputedFontName(details.name.type);
            }

            if (details.color && !details.color.value) {
                details.color.value = this.__getComputedColor(details.color.theme, details.color.tint);
            }

            /* --- 边框颜色处理 --- */
            var currentBorder;
            if (details.border) {
                for (var key in details.border) {
                    if (!details.border.hasOwnProperty(key)) {
                        continue;
                    }

                    currentBorder = details.border[key];

                    if (currentBorder && !currentBorder.color.value) {
                        currentBorder.color.value = this.__getComputedColor(currentBorder.color.theme, currentBorder.color.tint);
                    }
                }
            }

            /* --- 填充颜色处理 --- */
            if (details.fill && !details.fill.value) {
                details.fill.value = this.__getComputedColor(details.fill.theme, details.fill.tint);
            }

            return details;
        },

        __getComputedFontName: function (type) {
            var ThemeManager = this.getModule('ThemeManager');

            if (type === 'minor') {
                return ThemeManager.getMinorFont();
            }

            return ThemeManager.getMajorFont();
        },

        __getComputedColor: function (theme, tint) {
            return this.getModule('ThemeManager').getThemeColor(theme, tint);
        }
    };
});