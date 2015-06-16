/**
 * @file
 * @author hancong03@baiud.com
 */
define(function (require) {
    var CONFIG = require('./config');

    var DMU = require('./dmu/dmu');

    /* --- workbook components start --- */
    var Heap = require('./components/heap');
    var ThemeManager = require('./components/theme/theme');
    var StylePool = require('./components/style-pool/style-pool');
    var Sheet = require('./components/sheet/sheet');
    /* --- workbook components end --- */

    var $$ = require('utils');

    return $$.createClass('Workbook', {
        base: require('../interface/i-api'),

        mixin: [
            require('./message'),
            require('./service')
        ],

        dmu: null,

        // components
        heap: null,
        themeManager: null,
        stylePool: null,

        constructor: function (config) {
            this.__initConfig(config);

            this.dmu = new DMU(this);

            this.__initComponents();

            // 各组件都加载完毕，触发 sheetready 事件
            this.__notifySheetReady();

            // 所有工作已就绪，触发 workbookready 事件
            this.postMessage('workbook.reday');
        },

        __initConfig: function (config) {
            this.__$config = $.extend($$.clone(CONFIG), config);
        },

        __initComponents: function () {
            this.heap = new Heap(this);
            this.themeManager = new ThemeManager(this);
            this.stylePool = new StylePool(this);
            this.sheet = new Sheet(this);
        },

        getConfig: function (key) {
            if (key) {
                return this.__$config[key];
            }

            return this.__$config;
        },

        switchSheet: function (index) {
            return this.dmu.switchSheet(index);
        },

        getSheetsCount: function () {
            return this.dmu.getSheetsCount();
        },

        getActiveSheetIndex: function () {
            return this.dmu.getActiveSheetIndex();
        },

        getActiveSheet: function () {
            return this.dmu.getActiveSheet();
        },

        getActiveKernelHeap: function (name) {
            return this.heap.getActiveKernelHeap(name);
        },

        getActiveHeap: function (name) {
            return this.heap.getActiveHeap(name);
        },

        getWorkbook: function () {
            return this.dmu.getWorkbook();
        },

        __notifySheetReady: function () {
            var indexCopy = this.getActiveSheetIndex();

            $$.forEach(this.dmu.checkSheet(), function (index) {
                this.switchSheet(index);
                this.postMessage('sheetready', index);
            }, this);

            this.switchSheet(indexCopy);
        }

    });
});