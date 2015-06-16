/**
 * @file external interface
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        /* ---- 字体设置 ---- start */
        setFont: function (fontName, start, end) {
            this.setStyle('name', fontName, start, end);
        },

        setFontToMajor: function (start, end) {
            this.setStyle('name', {
                type: 'major',
                value: this.getMajorFont()
            }, start, end);
        },

        setFontToMinor: function (start, end) {
            this.setStyle('name', {
                type: 'minor',
                value: this.getMinorFont()
            }, start, end);
        },

        unsetFont: function (start, end) {
            this.unsetStyle('name', start, end);
        },
        /* ---- 字体设置 ---- end */

        /* ---- 颜色设置 ---- start */
        setColor: function (color, start, end) {
            this.setStyle('color', color, start, end);
        },

        setThemeColor: function (theme, tint, start, end) {
            theme = theme - 0;
            tint = tint - 0;

            this.setStyle('color', {
                theme: theme,
                tint: tint,
                value: this.getThemeColor(theme, tint)
            }, start, end);
        },

        unsetColor: function (start, end) {
            this.unsetStyle('color', start, end);
        }
        /* ---- 颜色设置 ---- end */
    };
});
