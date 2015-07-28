/**
 * @file
 * @author hancong03@baiud.com
 */
define(function (require) {
    var CONFIG = require('./config');

    var DMU = require('./dmu/dmu');

    /* --- workbook components start --- */
    var Heap = require('./components/heap');
    var Standard = require('./components/standard');
    var ThemeManager = require('./components/theme/theme');
    var StylePool = require('./components/style-pool/style-pool');
    var Direction = require('./components/direction');
    var Sheet = require('./components/sheet/sheet');
    var Name = require('./components/name');
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
        standard: null,
        themeManager: null,
        direction: null,
        stylePool: null,
        sheet: null,
        name: null,

        constructor: function (config) {
            this.__initConfig(config);

            this.dmu = new DMU(this);

            this.__initComponents();

            this.__initAPI();

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
            this.standard = new Standard(this);
            this.themeManager = new ThemeManager(this);
            this.stylePool = new StylePool(this);
            this.direction = new Direction(this);
            this.sheet = new Sheet(this);
            this.name = new Name(this);
        },

        __initAPI: function () {
            this.registerAPI(this, {
                getActiveSheetIndex: this.getActiveSheetIndex
            });
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

        getWorkbookHeap: function (name) {
            return this.heap.getWorkbookHeap(name);
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