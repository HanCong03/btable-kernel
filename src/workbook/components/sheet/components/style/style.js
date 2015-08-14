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
            require('../common/style'),
            require('./raw-style'),
            require('./insert-cell'),
            require('./insert-row'),
            require('./insert-column')
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
            this.__initMessage();
            this.__initAPI();
        },

        __initMessage: function () {
            this.onMessage({
                'insert.cell': this.__insertCell,
                'insert.row': this.__insertRow,
                'insert.column': this.__insertColumn
            });
        },

        __initService: function () {
            this.registerService([
                'setSid',
                'setStyle',
                'clearStyle',
                'unsetStyle',
                'getCellSid',
                'getRawStyle',
                'getRawCellStyle',
                'getRangeSid',
                'applyCellStyle'
            ]);
        },

        __initAPI: function () {
            this.registerAPI({
                setStyle: this.setStyle,
                unsetStyle: this.unsetStyle,
                getStyle: this.getStyle,
                getClassifyStyle: this.getClassifyStyle,

                getBatchClassifyStyle: this.getBatchClassifyStyle,

                getDefaultClassifyStyle: this.getDefaultClassifyStyle,
                getEffectiveClassifyStyle: this.getEffectiveClassifyStyle,
                getEffectiveStyle: this.getEffectiveStyle,
                getSettedCellStyle: this.getSettedCellStyle,
                getSettedRowStyle: this.getSettedRowStyle,
                getSettedColumnStyle: this.getSettedColumnStyle,
                getSettedGlobalStyle: this.getSettedGlobalStyle,

                applyCellStyle: this.applyCellStyle,

                isMajor: this.isMajor,
                isMinor: this.isMinor,
                isThemeColor: this.isThemeColor,

                getFontDetail: this.getFontDetail,
                getColorDetail: this.getColorDetail
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

            if (styleName === 'color' || styleName === 'fill') {
                if (typeof styleValue === 'string') {
                    styleValue = {
                        value: styleValue
                    };
                }
            }

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

            this.postMessage('stylechange', start, end);
        },

        isMajor: function (row, col) {
            var fontDetail = this.getClassifyStyle('fonts', row, col);
            return fontDetail.name.type === 'major';
        },

        isMinor: function (row, col) {
            var fontDetail = this.getClassifyStyle('fonts', row, col);
            return fontDetail.name.type === 'minor';
        },

        isThemeColor: function (row, col) {
            var fontDetail = this.getClassifyStyle('fonts', row, col);
            return $$.isDefined(fontDetail.color.theme);
        },

        getFontDetail: function (row, col) {
            var fontDetail = this.getClassifyStyle('fonts', row, col);
            return $$.clone(fontDetail.name);
        },

        getColorDetail: function (row, col) {
            var fontDetail = this.getClassifyStyle('fonts', row, col);
            return $$.clone(fontDetail.color);
        },

        applyCellStyle: function (csid, start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.allStyle.applyCellStyle(csid);
                    break;

                case 'col':
                    this.colStyle.applyCellStyle(csid, start.col, end.col);
                    break;

                case 'row':
                    this.rowStyle.applyCellStyle(csid, start.row, end.row);
                    break;

                case 'range':
                    this.rangeStyle.applyCellStyle(csid, start, end);
                    break;
            }

            // 维度变更通知
            if (rangeType !== 'all') {
                this.postMessage('style.dimension.change');
            }

            this.postMessage('stylechange', start, end);
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

            return this.getModule('StylePool').getStyleBySid(styleName, sid);
        },

        getClassifyStyle: function (classify, row, col) {
            var sid = this.getSettedCellSid(row, col);
            return this.getModule('StylePool').getClassifyStyleDetailBySid(classify, sid);
        },

        /**
         * 获取给定区域的sid，如果给定区域的所有单元格都包含相同的sid，则返回该sid，
         * 如果区域内某个单元格没有sid，或者含有不同sid的单元格，则返回null。
         * @param start 区域起始点
         * @param end 区域结束点
         * @returns {null}
         */
        getRangeSid: function (start, end) {
            var startRow = start.row;
            var endRow = end.row;
            var startCol = start.col;
            var endCol = end.col;

            var targetSid;
            var sid;

            for (var i = startRow; i <= endRow; i++) {
                for (var j = startCol; j <= endCol; j++) {
                    sid = this.getCellSid(i, j);

                    if ($$.isNdef(sid)) {
                        return null;
                    }

                    if (targetSid === undefined) {
                        targetSid = sid;
                    } else if (targetSid !== sid) {
                        return null;
                    }
                }
            }

            return targetSid;
        },

        getBatchStyle: function (cells) {
            var result = {};
            var StylePool = this.getModule('StylePool');

            $$.forEach(cells, function (cell) {
                var sid = this.getCellSid(cell.row, cell.col);
                var key = cell.row + ',' + cell.col;

                result[key] = StylePool.getStyleDetailBySid(sid);
            }, this);

            return result;
        },

        getBatchClassifyStyle: function (classify, cells) {
            var result = {};

            $$.forEach(cells, function (cell) {
                var sid = this.getCellSid(cell.row, cell.col);
                var key = cell.row + ',' + cell.col;

                result[key] = this.getModule('StylePool').getClassifyStyleDetailBySid(classify, sid);
            }, this);

            return result;
        },

        getDefaultClassifyStyle: function (classify) {
            return this.getModule('StylePool').getDefaultClassifyStyle(classify);
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

            return this.getModule('StylePool').getStyleBySid(styleName, sid);
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

            return this.getModule('StylePool').getStyleBySid(styleName, sid);
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

            return this.getModule('StylePool').getStyleBySid(styleName, sid);
        },
        /* --- setted 接口，非常底层的接口。不建议外层大量使用 end  --- */

        getStyle: function (styleName, row, col) {
            var sid = this.getCellSid(row, col);
            return this.getModule('StylePool').getStyleBySid(styleName, sid);
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
            return this.getModule('StylePool').getEffectiveStyleBySid(styleName, sid);
        },

        getEffectiveClassifyStyle: function (classify, row, col) {
            var sid = this.getCellSid(row, col);
            return this.getModule('StylePool').getEffectiveClassifyStyleBySid(classify, sid);
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

            this.postMessage('stylechange', start, end);
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

            this.postMessage('stylechange', start, end);
        }
    });
});