/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var BORDER_LOCATION = require('../../definition/location');
    var NONE = require('NONE');

    module.exports = {
        getCellBorder: function (row, col) {
            return {
                top: this.getCellTopBorder(row, col),
                left: this.getCellLeftBorder(row, col),
                right: this.getCellRightBorder(row, col),
                bottom: this.getCellBottomBorder(row, col)
            };
        },

        /**
         * 获取单元格的上边框值
         * 注：该接口返回的边框值是经过叠加处理后的值。
         * @param row
         * @param col
         * @returns {*}
         * @private
         */
        getCellTopBorder: function (row, col) {
            var sid = this.getRealCellSid(row, col);
            var borderValue = this.__getBorderValue(BORDER_LOCATION.TOP, sid);

            if (borderValue) {
                return borderValue;
            }

            // 检测边缘
            if (row === 0) {
                return borderValue;
            }

            sid = this.getRealCellSid(row - 1, col);

            return this.__getBorderValue(BORDER_LOCATION.BOTTOM, sid);
        },

        /**
         * 获取单元格的下边框值
         * 注：该接口返回的边框值是经过叠加处理后的值。
         * @param row
         * @param col
         * @returns {*}
         * @private
         */
        getCellBottomBorder: function (row, col) {
            var sid = this.getRealCellSid(row, col);
            var borderValue = this.__getBorderValue(BORDER_LOCATION.BOTTOM, sid);

            if (borderValue) {
                return borderValue;
            }

            // 检测边缘
            if (row === this.getConfig('MAX_ROW') - 1) {
                return borderValue;
            }

            sid = this.getRealCellSid(row + 1, col);

            return this.__getBorderValue(BORDER_LOCATION.TOP, sid);
        },

        /**
         * 获取单元格的左边框值
         * 注：该接口返回的边框值是经过叠加处理后的值。
         * @param row
         * @param col
         * @returns {*}
         * @private
         */
        getCellLeftBorder: function (row, col) {
            var sid = this.getRealCellSid(row, col);
            var borderValue = this.__getBorderValue(BORDER_LOCATION.LEFT, sid);

            if (borderValue) {
                return borderValue;
            }

            // 检测边缘
            if (col === 0) {
                return borderValue;
            }

            sid = this.getRealCellSid(col - 1, col);

            return this.__getBorderValue(BORDER_LOCATION.RIGHT, sid);
        },

        /**
         * 获取单元格的右边框值
         * 注：该接口返回的边框值是经过叠加处理后的值。
         * @param row
         * @param col
         * @returns {*}
         * @private
         */
        getCellRightBorder: function (row, col) {
            var sid = this.getRealCellSid(row, col);
            var borderValue = this.__getBorderValue(BORDER_LOCATION.RIGHT, sid);

            if (borderValue) {
                return borderValue;
            }

            // 检测边缘
            if (col === this.getConfig('MAX_COLUMN') - 1) {
                return borderValue;
            }

            sid = this.getRealCellSid(col + 1, col);

            return this.__getBorderValue(BORDER_LOCATION.LEFT, sid);
        },

        /* ----- 行级边框 start ----- */
        getRowTopBorder: function (row) {
            var sid = this.getRealRowSid(row);
            var borderValue = this.__getBorderValue(BORDER_LOCATION.TOP, sid);

            if (borderValue) {
                return borderValue;
            }

            // 检测边缘
            if (row === 0) {
                return borderValue;
            }

            sid = this.getRealRowSid(row - 1);

            return this.__getBorderValue(BORDER_LOCATION.BOTTOM, sid);
        },

        getRowBottomBorder: function (row) {
            var sid = this.getRealRowSid(row);
            var borderValue = this.__getBorderValue(BORDER_LOCATION.BOTTOM, sid);

            if (borderValue) {
                return borderValue;
            }

            // 检测边缘
            if (row === this.getConfig('MAX_ROW') - 1) {
                return borderValue;
            }

            sid = this.getRealRowSid(row + 1);

            return this.__getBorderValue(BORDER_LOCATION.TOP, sid);
        },

        getRowLeftBorder: function (row) {
            var sid = this.getRealRowSid(row);
            return this.__getBorderValue(BORDER_LOCATION.LEFT, sid);
        },

        getRowRightBorder: function (row) {
            var sid = this.getRealRowSid(row);
            return this.__getBorderValue(BORDER_LOCATION.RIGHT, sid);
        },
        /* ----- 行级边框 end ----- */

        /* ----- 列级边框 start ----- */
        getColumnTopBorder: function (col) {
            var sid = this.getRealColumnSid(col);
            return this.__getBorderValue(BORDER_LOCATION.TOP, sid);
        },

        getColumnBottomBorder: function (col) {
            var sid = this.getRealColumnSid(col);
            return this.__getBorderValue(BORDER_LOCATION.BOTTOM, sid);
        },

        getColumnLeftBorder: function (col) {
            var sid = this.getRealColumnSid(col);
            var borderValue = this.__getBorderValue(BORDER_LOCATION.LEFT, sid);

            if (borderValue) {
                return borderValue;
            }

            // 检测边缘
            if (col === 0) {
                return borderValue;
            }

            sid = this.getRealColumnSid(col - 1);

            return this.__getBorderValue(BORDER_LOCATION.RIGHT, sid);
        },

        getColumnRightBorder: function (col) {
            var sid = this.getRealColumnSid(col);
            var borderValue = this.__getBorderValue(BORDER_LOCATION.RIGHT, sid);

            if (borderValue) {
                return borderValue;
            }

            // 检测边缘
            if (col === this.getConfig('MAX_COLUMN') - 1) {
                return borderValue;
            }

            sid = this.getRealColumnSid(col + 1);

            return this.__getBorderValue(BORDER_LOCATION.LEFT, sid);
        },
        /* ----- 列级边框 end ----- */

        __getBorderValue: function (location, sid) {
            var details = this.getModule('StylePool').getClassifyStyleDetailBySid('borders', sid);

            if (details) {
                details = details.border[location];

                if (details === NONE) {
                    return null;
                }

                return details;
            } else {
                return null;
            }
        }
    };
});