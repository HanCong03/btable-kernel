/**
 * @file 样式通用接口，供所有与样式相关的组件使用，以便统一管理对样式的通用访问
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return {
        /**
         * 获取指定列的sid
         * @param col
         */
        getColumnSid: function (col) {
            var styleData = this.getActiveSheet().style;
            var currentCol = styleData.cols[col];

            // 查找列自身样式
            if ($$.isDefined(currentCol) && $$.isDefined(currentCol.customFormat)) {
                return currentCol.si;
            }

            // 无自身样式，查找全局样式
            if ($$.isDefined(styleData.globalStyle)) {
                return styleData.globalStyle;
            }

            return undefined;
        },

        /**
         * 获取指定行的sid
         * @param row
         */
        getRowSid: function (row) {
            var styleData = this.getActiveSheet().style;
            var currentRow = styleData.rows[row];

            // 行数据存在且该行是一个自定义样式行
            if ($$.isDefined(currentRow) && $$.isDefined(currentRow.customFormat)) {
                return currentRow.si;
            }

            // 行数据无效，查看全局样式
            if ($$.isDefined(styleData.globalStyle)) {
                return styleData.globalStyle;
            }

            return undefined;
        },

        /**
         * 获取指定单元格的sid
         * @param row
         * @param col
         * @returns {*}
         */
        getCellSid: function (row, col) {
            var styleData = this.getActiveSheet().style;
            var currentRow = styleData.rows[row];
            var currentCol = styleData.cols[col];

            // 行存在
            if ($$.isDefined(currentRow)) {
                // 单元格已存在
                if ($$.isDefined(currentRow.cells) && $$.isDefined(currentRow.cells[col])) {
                    return currentRow.cells[col].si;

                } else if ($$.isDefined(currentRow.customFormat)) {
                    return currentRow.si;
                }

                // 其他情况，则读取列数据
            }

            // 不存在行数据，则查看该列数据
            if ($$.isDefined(currentCol) && $$.isDefined(currentCol.customFormat)) {
                return currentCol.si;
            }

            // 否则，检查全局数据
            if ($$.isDefined(styleData.globalStyle)) {
                return styleData.globalStyle;
            }

            return undefined;
        },


        /**
         * 获取指定列的真实sid
         * 注1：真实id是指，该列在display时，所具有的列级sid。
         * 注2：由于全局sid是列sid的一种特殊体现，所以，需要处理列id。
         * 注3：该方法同getColumnSid
         * @param col
         * @returns {*}
         */
        getRealColumnSid: function (col) {
            return this.getColumnSid(col);
        },

        /**
         * 获取指定行的真实sid
         * 注1：真实id是指，该行本身具有的行级sid。而不是通过叠加规则得到的sid。
         * 注2：由于行级样式的特殊性，所以行级真实样式的取值不能读取全局样式。
         * @param row
         */
        getRealRowSid: function (row) {
            var styleData = this.getActiveSheet().style;
            var currentRow = styleData.rows[row];

            // 行数据存在且该行是一个自定义样式行
            if ($$.isDefined(currentRow) && $$.isDefined(currentRow.customFormat)) {
                return currentRow.si;
            }

            return undefined;
        },

        /**
         * 获取指定单元格的真实sid
         * 注：该方法同getCellId
         * @param row
         * @param col
         * @returns {*}
         */
        getRealCellSid: function (row, col) {
            return this.getCellSid(row, col);
        },

        /**
         * 获取显示设置的sid
         * 注：该接口不进行叠加处理
         * @param row
         */
        getSettedCellSid: function (row, col) {
            var styleData = this.getActiveSheet().style;
            var currentRow = styleData.rows[row];

            // 行存在
            if ($$.isDefined(currentRow)) {
                // 单元格已存在
                if ($$.isDefined(currentRow.cells) && $$.isDefined(currentRow.cells[col])) {
                    return currentRow.cells[col].si || 0;
                }
            }

            return null;
        },

        /**
         * 获取显示设置的sid
         * 注：该接口不进行叠加处理
         * @param row
         */
        getSettedRowSid: function (row) {
            var styleData = this.getActiveSheet().style;
            var currentRow = styleData.rows[row];

            // 行数据存在且该行是一个自定义样式行
            if ($$.isDefined(currentRow) && $$.isDefined(currentRow.customFormat)) {
                return currentRow.si || 0;
            }

            return null;
        },

        /**
         * 获取显示设置的sid
         * 注：该接口不进行叠加处理
         * @param row
         */
        getSettedColumnSid: function (col) {
            var styleData = this.getActiveSheet().style;
            var currentCol = styleData.cols[col];

            // 查找列自身样式
            if ($$.isDefined(currentCol) && $$.isDefined(currentCol.customFormat)) {
                return currentCol.si || 0;
            }

            return null;
        },

        getSettedGlobalSid: function () {
            return this.getActiveSheet().style.globalStyle;
        },

        /**
         * 获取指定行的指定样式类别的详情
         */
        getRowClassifyStyleDetails: function (classify, row) {
            var sid = this.getRowSid(row);

            if ($$.isNdef(sid) || sid === 0) {
                return undefined;
            }

            return this.getModule('StylePool').getClassifyStyleDetailBySid(classify, sid);
        },

        getColumnClassifyStyleDetails: function (classify, col) {
            var sid = this.getColumnSid(col);

            if ($$.isNdef(sid) || sid === 0) {
                return undefined;
            }

            return this.getModule('StylePool').getClassifyStyleDetailBySid(classify, sid);
            //return this.rs('get.classify.style.detail', classify, sid);
        },

        getCellClassifyStyleDetails: function (classify, row, col) {
            var sid = this.getCellSid(row, col);

            if ($$.isNdef(sid) || sid === 0) {
                return undefined;
            }

            return this.getModule('StylePool').getClassifyStyleDetailBySid(classify, sid);
            //return this.rs('get.classify.style.detail', classify, sid);
        }
    };
});