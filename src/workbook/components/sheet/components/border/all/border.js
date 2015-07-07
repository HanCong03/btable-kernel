/**
 * @file border组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');

    var BORDER_DEFAULT = require('../defaults/border');

    var RowBorder = require('./row');
    var ColBorder = require('./col');
    var RangeBorder = require('./range');
    var AllBorder = require('./all');

    return require('utils').createClass('Border', {
        base: require('sheet-component'),

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
            this.rowBorder = this.createComponent(RowBorder, this);
            this.colBorder = this.createComponent(ColBorder, this);
            this.rangeBorder = this.createComponent(RangeBorder, this);
            this.allBorder = this.createComponent(AllBorder, this);
        },

        __initService: function () {
            //this.registerService({
            //    'set.border': this.setBorder,
            //    'unset.border': this.unsetBorder
            //});
            this.registerService([
                'setBorder',
                'unsetBorder'
            ]);
        },

        __initAPI: function () {
            this.registerAPI({
                setBorder: this.setBorder,
                unsetBorder: this.unsetBorder
            });
        },

        /**
         * 为指定区域内的所有单元格添加边框。
         * 如果给定的边框选项不够完整，则将擦除不完整的边。
         * @param borderOptions
         * @param start
         * @param end
         * @returns {*}
         */
        setBorder: function (borderOptions, start, end) {
            if ($$.isNdef(borderOptions)) {
                return this.unsetBorder(start, end);
            }

            if ($$.isDefined(borderOptions.style)) {
                borderOptions = $$.clone({
                    top: borderOptions,
                    left: borderOptions,
                    right: borderOptions,
                    bottom: borderOptions
                });
            } else {
                borderOptions = $$.extend({}, BORDER_DEFAULT, borderOptions);
            }

            this.postMessage('lock');

            /* ---- 进行通用样式处理 ---- */
            this.getModule('Style').setStyle('border', borderOptions, start, end);
            //this.rs('setstyle', 'border', borderOptions, start, end);

            /* ---- border 特殊处理 ----- */
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.allBorder.setBorder(borderOptions);
                    break;

                case 'col':
                    this.colBorder.setBorder(borderOptions, start.col, end.col);
                    break;

                case 'row':
                    this.rowBorder.setBorder(borderOptions, start.row, end.row);
                    break;

                case 'range':
                    this.rangeBorder.setBorder(borderOptions, start, end);
                    break;
            }

            this.postMessage('unlock');

            // 维度变更通知
            if (rangeType !== 'all') {
                this.postMessage('style.dimension.change');
            }
        },

        /**
         * 移除指定区域内所有单元格的边框
         * @param start
         * @param end
         */
        unsetBorder: function (start, end) {
            this.postMessage('lock');

            /* ---- 进行通用样式处理 ---- */
            this.getModule('Style').setStyle('border', null, start, end);
            //this.rs('setstyle', 'border', null, start, end);

            /* ---- border 特殊处理 ----- */
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.allBorder.setBorder(null);
                    break;

                case 'col':
                    this.colBorder.setBorder(null, start.col, end.col);
                    break;

                case 'row':
                    this.rowBorder.setBorder(null, start.row, end.row);
                    break;

                case 'range':
                    this.rangeBorder.setBorder(null, start, end);
                    break;
            }

            this.postMessage('unlock');

            // 维度变更通知
            if (rangeType !== 'all') {
                this.postMessage('style.dimension.change');
            }
        }
    });
});