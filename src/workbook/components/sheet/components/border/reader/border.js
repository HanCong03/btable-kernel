/**
 * @file border识别组件，负责提供外部border读取支持。
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');

    var BORDER_LOCATION = require('../definition/location');

    var AllBorder = require('./all');
    var RowBorder = require('./row');
    var ColBorder = require('./col');
    var RangeBorder = require('./range');

    return $$.createClass('BorderReader', {
        base: require('sheet-component'),

        mixin: require('../../common/style'),

        allBorder: null,
        rowBorder: null,
        colBorder: null,
        rangeBorder: null,

        init: function () {
            this.__initComponent();
            this.__initService();
            this.__initAPI();
        },

        __initComponent: function () {
            this.allBorder = this.createComponent(AllBorder);
            this.rowBorder = this.createComponent(RowBorder);
            this.colBorder = this.createComponent(ColBorder);
            this.rangeBorder = this.createComponent(RangeBorder);
        },

        __initService: function () {
            this.registerService({
                'getcellborder': this.getCellBorder,
                'getouterborder': this.getOuterBorder
            });
        },

        __initAPI: function () {
            this.registerAPI({
                getCellBorder: this.getCellBorder,
                getRangeBorder: this.getRangeBorder
            });
        },

        /**
         * 获取指定单元格的“可见”边框
         * 注：该接口获取到的是叠加后的边框
         * @param row
         * @param col
         * @returns {*}
         */
        getCellBorder: function (row, col) {
            //var styleData = this.getActiveSheet().style;
            //var sid = this.getCellSid(row, col);
            //console.log(sid)
            //var borderDetails = this.getClassifyStyleDetailsById('borders', sid);

        },

        getOuterBorder: function (start, end) {
            return this.getRangeBorder(BORDER_LOCATION.OUTER, start, end);
        },

        getRangeBorder: function (location, start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    return this.allBorder.getRangeBorder(location);
                    break;

                case 'col':
                    return this.colBorder.getRangeBorder(location, start.col, end.col);
                    break;

                case 'row':
                    return this.rowBorder.getRangeBorder(location, start.row, end.row);
                    break;

                case 'range':
                    return this.rangeBorder.getRangeBorder(location, start, end);
                    break;
            }
        }
    });
});