/**
 * @file border组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');
    var BORDER_LOCATION = require('../definition/location');

    var RowBorder = require('./row/row');
    var ColBorder = require('./col/col');
    var RangeBorder = require('./range/range');
    var AllBorder = require('./all/all');

    var BorderUtils = require('../utils');

    return require('base/clazz').create('Border', {
        base: require('sheet-component'),

        allBorder: null,
        rowBorder: null,
        colBorder: null,
        rangeBorder: null,

        init: function () {
            this.__initComponent();
            this.__initAPI();
            this.__initService();
        },

        __initComponent: function () {
            this.rowBorder = this.createComponent(RowBorder, this);
            this.colBorder = this.createComponent(ColBorder, this);
            this.rangeBorder = this.createComponent(RangeBorder, this);
            this.allBorder = this.createComponent(AllBorder, this);
        },

        __initAPI: function () {
            this.registerAPI({
                // 单边添加
                addLeftBorder: this.addLeftBorder,
                addRightBorder: this.addRightBorder,
                addTopBorder: this.addTopBorder,
                addBottomBorder: this.addBottomBorder,
                addOuterBorder: this.addOuterBorder,
                addInnerBorder: this.addInnerBorder,

                // 单边擦除
                removeLeftBorder: this.removeLeftBorder,
                removeRightBorder: this.removeRightBorder,
                removeTopBorder: this.removeTopBorder,
                removeBottomBorder: this.removeBottomBorder,
                removeOuterBorder: this.removeOuterBorder,
                removeInnerBorder: this.removeInnerBorder
            });
        },

        __initService: function () {
            this.registerService({
                // 非受限增加边框
                'add.border.left': this.addLeftBorder,
                'add.border.right': this.addRightBorder,
                'add.border.top': this.addTopBorder,
                'add.border.bottom': this.addBottomBorder,
                'add.border.outer': this.addOuterBorder,
                'add.border.inner': this.addInnerBorder,

                // 非受限擦除
                'remove.border.left': this.removeLeftBorder,
                'remove.border.right': this.removeRightBorder,
                'remove.border.top': this.removeTopBorder,
                'remove.border.bottom': this.removeBottomBorder,
                'remove.border.outer': this.removeOuterBorder,
                'remove.border.inner': this.removeInnerBorder,
                'remove.border': this.removeBorder,

                // 受限擦除
                'restrict.remove.border': this.restrictRemoveBorder
            });
        },

        addLeftBorder: function (borderValue, start, end) {
            this.addBorder(BORDER_LOCATION.LEFT, borderValue, start, end);
        },

        addRightBorder: function (borderValue, start, end) {
            this.addBorder(BORDER_LOCATION.RIGHT, borderValue, start, end);
        },

        addTopBorder: function (borderValue, start, end) {
            this.addBorder(BORDER_LOCATION.TOP, borderValue, start, end);
        },

        addBottomBorder: function (borderValue, start, end) {
            this.addBorder(BORDER_LOCATION.BOTTOM, borderValue, start, end);
        },

        addOuterBorder: function (borderValue, start, end) {
            this.addBorder(BORDER_LOCATION.OUTER, borderValue, start, end);
        },

        addInnerBorder: function (borderValue, start, end) {
            this.addBorder(BORDER_LOCATION.INNER, borderValue, start, end);
        },

        removeLeftBorder: function (start, end) {
            this.removeBorder(BORDER_LOCATION.LEFT, start, end);
        },

        removeRightBorder: function (start, end) {
            this.removeBorder(BORDER_LOCATION.RIGHT, start, end);
        },

        removeTopBorder: function (start, end) {
            this.removeBorder(BORDER_LOCATION.TOP, start, end);
        },

        removeBottomBorder: function (start, end) {
            this.removeBorder(BORDER_LOCATION.BOTTOM, start, end);
        },

        removeOuterBorder: function (start, end) {
            this.removeBorder(BORDER_LOCATION.OUTER, start, end);
        },

        removeInnerBorder: function (start, end) {
            this.removeBorder(BORDER_LOCATION.INNER, start, end);
        },

        /**
         * 在给定区域内所有单元格的指定位置上设置边框。
         * @param location
         * @param borderValue
         * @param start
         * @param end
         */
        addBorder: function (location, borderValue, start, end) {
            borderValue = BorderUtils.standardizingBorderValue(borderValue);

            if ($$.isNdef(borderValue)) {
                return this.removeBorder(location, borderValue, start, end);
            }

            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.allBorder.addBorder(location, borderValue);
                    break;

                case 'col':
                    this.colBorder.addBorder(location, borderValue, start.col, end.col);
                    break;

                case 'row':
                    this.rowBorder.addBorder(location, borderValue, start.row, end.row);
                    break;

                case 'range':
                    this.rangeBorder.addBorder(location, borderValue, start, end);
                    break;
            }

            // 维度变更通知
            if (rangeType !== 'all') {
                this.postMessage('style.dimension.change');
            }
        },

        /**
         * 受限地增加边框
         * 注意1：受限是指，擦除动作仅影响指定区域的单元格的边框，
         *      而其相邻的单元格的边框不受影响。
         * 注意2：受限操作不支持对inner位置的操作，因为inner操作一定会擦除相邻边框。
         */
        restrictAddBorder: function (location, borderValue, start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            borderValue = BorderUtils.standardizingBorderValue(borderValue);

            if ($$.isNdef(borderValue)) {
                return this.restrictRemoveBorder(location, borderValue, start, end);
            }

            switch (rangeType) {
                case 'all':
                    this.allBorder.restrictAddBorder(location, borderValue);
                    break;

                case 'col':
                    this.colBorder.restrictAddBorder(location, borderValue, start.col, end.col);
                    break;

                case 'row':
                    this.rowBorder.restrictAddBorder(location, borderValue, start.row, end.row);
                    break;

                case 'range':
                    this.rangeBorder.restrictAddBorder(location, borderValue, start, end);
                    break;
            }
        },

        /**
         * 擦除给定区域内所有单元格的指定位置的边框。
         * 注意：该操作将擦除相邻单元格的边框。
         * @param location 需要擦除的边框位置： top, left, right, bottom, outer, inner
         * @param start 擦除区域开始位置
         * @param end 擦除区域结束位置
         */
        removeBorder: function (location, start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.allBorder.removeBorder(location);
                    break;

                case 'col':
                    this.colBorder.removeBorder(location, start.col, end.col);
                    break;

                case 'row':
                    this.rowBorder.removeBorder(location, start.row, end.row);
                    break;

                case 'range':
                    this.rangeBorder.removeBorder(location, start, end);
                    break;
            }

            // 维度变更通知
            if (rangeType !== 'all') {
                this.postMessage('style.dimension.change');
            }
        },

        /**
         * 受限地擦除边框
         * 注意1：受限是指，擦除动作仅影响指定区域的单元格的边框，
         *      而其相邻的单元格的边框不受影响。
         * 注意2：受限操作不支持对inner位置的操作，因为inner操作一定会擦除相邻边框。
         */
        restrictRemoveBorder: function (location, start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.allBorder.restrictRemoveBorder(location);
                    break;

                case 'col':
                    this.colBorder.restrictRemoveBorder(location, start.col, end.col);
                    break;

                case 'row':
                    this.rowBorder.restrictRemoveBorder(location, start.row, end.row);
                    break;

                case 'range':
                    this.rangeBorder.restrictRemoveBorder(location, start, end);
                    break;
            }
        }
    });
});