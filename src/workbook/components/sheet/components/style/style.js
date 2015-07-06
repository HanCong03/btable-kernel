/**
 * @file 样式组件，维护工作表内的样式
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');

    var RowStyle = require('./row');
    var ColStyle = require('./col');
    var RangeStyle = require('./range');
    var AllStyle = require('./all');

    return $$.createClass('Style', {
        base: require('sheet-component'),
        mixin: [
            require('../common/style')
        ],

        allStyle: null,
        rowStyle: null,
        colStyle: null,
        rangeStyle: null,

        init: function () {
            this.rowStyle = this.createComponent(RowStyle);
            this.colStyle = this.createComponent(ColStyle);
            this.rangeStyle = this.createComponent(RangeStyle);
            this.allStyle = this.createComponent(AllStyle);

            this.__initService();
            this.__initAPI();
        },

        __initService: function () {
            this.registerService({
                'setsid': this.setSid,
                'setstyle': this.setStyle,
                'clearstyle': this.clearStyle,
                'getcellsid': this.getCellSid
            });
        },

        __initAPI: function () {
            this.registerAPI({
                setStyle: this.setStyle,
                unsetStyle: this.unsetStyle,
                getStyle: this.getStyle,
                getClassifyStyle: this.getClassifyStyle,

                getDefaultClassifyStyle: this.getDefaultClassifyStyle,
                getEffectiveClassifyStyle: this.getEffectiveClassifyStyle,
                getEffectiveStyle: this.getEffectiveStyle,
                getSettedCellStyle: this.getSettedCellStyle,
                getSettedRowStyle: this.getSettedRowStyle,
                getSettedColumnStyle: this.getSettedColumnStyle,
                getSettedGlobalStyle: this.getSettedGlobalStyle
            });
        },

        /**
         * 设置样式的核心接口，仅供kernel调用。
         * @param styleName
         * @param styleValue
         * @param start
         * @param end
         */
        setStyle: function (styleName, styleValue, start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.allStyle.setStyle(styleName, styleValue);
                    break;

                case 'col':
                    this.colStyle.setStyle(styleName, styleValue, start.col, end.col);
                    break;

                case 'row':
                    this.rowStyle.setStyle(styleName, styleValue, start.row, end.row);
                    break;

                case 'range':
                    this.rangeStyle.setStyle(styleName, styleValue, start, end);
                    break;
            }

            // 维度变更通知
            if (rangeType !== 'all') {
                this.postMessage('style.dimension.change');
            }
        },

        /* --- setted 接口，非常底层的接口。不建议外层大量使用 start  --- */
        /**
         * 获取设置的单元格样式。
         * 注：如果无有效行样式，则返回null。不进行层叠规则处理。
         * @param styleName
         * @param row
         * @returns {*}
         */
        getSettedCellStyle: function (styleName, row, col) {
            var sid = this.getSettedCellSid(row, col);

            if ($$.isNdef(sid)) {
                return null;
            }

            return this.rs('get.style.detail', styleName, sid);
        },

        getClassifyStyle: function (classify, row, col) {
            var sid = this.getSettedCellSid(row, col);
            return this.rs('get.classify.style.detail',classify,  sid);
        },

        getDefaultClassifyStyle: function (classify) {
            return this.rs('get.default.classify', classify);
        },

        /**
         * 获取设置的行样式。
         * 注：如果无有效行样式，则返回null。不进行层叠规则处理。
         * @param styleName
         * @param row
         * @returns {*}
         */
        getSettedRowStyle: function (styleName, row) {
            var sid = this.getSettedRowSid(row);

            if ($$.isNdef(sid)) {
                return null;
            }

            return this.rs('get.style.detail', styleName, sid);
        },

        /**
         * 获取设置的列样式。
         * 注：如果无有效行样式，则返回null。不进行层叠规则处理。
         * @param styleName
         * @param row
         * @returns {*}
         */
        getSettedColumnStyle: function (styleName, col) {
            var sid = this.getSettedColumnSid(col);

            if ($$.isNdef(sid)) {
                return null;
            }

            return this.rs('get.style.detail', styleName, sid);
        },

        /**
         * 获取设置的全局样式。
         * 注：如果无有效行样式，则返回null。不进行层叠规则处理。
         * @param styleName
         * @param row
         * @returns {*}
         */
        getSettedGlobalStyle: function (styleName) {
            var sid = this.getSettedGlobalSid();

            if ($$.isNdef(sid)) {
                return null;
            }

            return this.rs('get.style.detail', styleName, sid);
        },
        /* --- setted 接口，非常底层的接口。不建议外层大量使用 end  --- */

        getStyle: function (styleName, row, col) {
            var sid = this.getCellSid(row, col);
            return this.rs('get.style.detail', styleName, sid);
        },

        /**
         * 获取用户设置的指定的样式，如果用户未设置该样式，则返回null
         * @param styleName
         * @param row
         * @param col
         * @returns {*}
         */
        getEffectiveStyle: function (styleName, row, col) {
            var sid = this.getCellSid(row, col);
            return this.rs('get.effective.style.detail', styleName, sid);
        },

        getEffectiveClassifyStyle: function (classify, row, col) {
            var sid = this.getCellSid(row, col);
            return this.rs('get.effective.classify.style.detail', classify, sid);
        },

        setSid: function (sid, start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.allStyle.setSid(sid);
                    break;

                case 'col':
                    this.colStyle.setSid(sid, start.col, end.col);
                    break;

                case 'row':
                    this.rowStyle.setSid(sid, start.row, end.row);
                    break;

                case 'range':
                    this.rangeStyle.setSid(sid, start, end);
                    break;
            }

            // 维度变更通知
            if (rangeType !== 'all') {
                this.postMessage('style.dimension.change');
            }
        },

        /**
         * 移除指定的样式
         * @param styleName
         * @param start
         * @param end
         */
        unsetStyle: function (styleName, start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.allStyle.setStyle(styleName, null);
                    break;

                case 'col':
                    this.colStyle.setStyle(styleName, null, start.col, end.col);
                    break;

                case 'row':
                    this.rowStyle.setStyle(styleName, null, start.row, end.row);
                    break;

                case 'range':
                    this.rangeStyle.setStyle(styleName, null, start, end);
                    break;
            }

            // 维度变更通知
            if (rangeType !== 'all') {
                this.postMessage('style.dimension.change');
            }
        },

        /**
         * 清除所有样式
         * @param start
         * @param end
         */
        clearStyle: function (start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.allStyle.clearStyle();
                    break;

                case 'col':
                    this.colStyle.clearStyle(start.col, end.col);
                    break;

                case 'row':
                    this.rowStyle.clearStyle(start.row, end.row);
                    break;

                case 'range':
                    this.rangeStyle.clearStyle(start, end);
                    break;
            }

            // 维度变更通知，由于clear操作影响了所有单元格，
            // 所以不需要对操作范围进行判断，必须对维度进行重新计算
            this.postMessage('style.dimension.change');
        }
    });
});