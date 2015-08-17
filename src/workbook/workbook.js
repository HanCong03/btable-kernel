/**
 * @file
 * @author hancong03@baiud.com
 */
define(function (require) {
    var CONFIG = require('./config');

    var DMU = require('./dmu/dmu');

    /* --- workbook components start --- */
    var Standard = require('./components/standard');
    var ThemeManager = require('./components/theme/theme');
    var StylePool = require('./components/style-pool/style-pool');
    var Direction = require('./components/direction');
    var Sheet = require('./components/sheet/sheet');
    var Name = require('./components/name');
    var BuiltinManager = require('./components/builtin');
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
        standard: null,
        themeManager: null,
        direction: null,
        stylePool: null,
        builtinManager: null,
        sheet: null,
        name: null,

        constructor: function (config) {
            this.__initConfig(config);

            this.dmu = new DMU(this);
            this.__initComponents();
            this.__initAPI();
        },

        __ready: function () {
            // 各组件都加载完毕，触发 sheetready 事件
            //this.__notifySheetReady();
        },

        __initConfig: function (config) {
            this.__$config = $.extend($$.clone(CONFIG), config);
        },

        __initComponents: function () {
            this.standard = new Standard(this);
            this.themeManager = new ThemeManager(this);
            this.builtinManager = new BuiltinManager(this);
            this.stylePool = new StylePool(this);
            this.direction = new Direction(this);
            this.sheet = new Sheet(this);
            this.name = new Name(this);
        },

        __initAPI: function () {
            this.registerAPI(this, {
                load: this.load,
                getActiveSheetIndex: this.getActiveSheetIndex,
                addSheet: this.addSheet,
                getSheetNames: this.getSheetNames,
                switchSheet: this.switchSheet,
                renameSheet: this.renameSheet,
                getBuiltinCellStyles: this.getBuiltinCellStyles
            });
        },

        load: function (data) {
            this.dmu.load(data);
            this.__notifySheetReady();
            this.postMessage('loaded');
            this.postMessage('beforedataready');
            this.postMessage('dataready');
        },

        getConfig: function (key) {
            if (key) {
                return this.__$config[key];
            }

            return this.__$config;
        },

        switchSheet: function (index) {
            this.dmu.switchSheet(index);
            this.postMessage('sheetswitch');
        },

        addSheet: function (sheetName) {
            if (!this.dmu.addSheet(sheetName)) {
                return false;
            }

            var index = this.getSheetsCount() - 1;
            this.switchSheet(index);

            this.postMessage('sheetschange');

            return true;
        },

        renameSheet: function (sheetName, index) {
            var result = this.dmu.renameSheet(sheetName, index);

            if (result) {
                this.postMessage('sheetschange');
            }

            return result;
        },

        getSheetsCount: function () {
            return this.dmu.getSheetsCount();
        },

        getSheetNames: function () {
            return this.dmu.getSheetNames();
        },

        getActiveSheetIndex: function () {
            return this.dmu.getActiveSheetIndex();
        },

        getActiveSheet: function () {
            return this.dmu.getActiveSheet();
        },

        getActiveKernelHeap: function (name) {
            return this.dmu.getActiveKernelHeap(name);
        },

        getActiveHeap: function (name) {
            return this.dmu.getActiveHeap(name);
        },

        getWorkbookHeap: function (name) {
            return this.dmu.getWorkbookHeap(name);
        },

        getWorkbook: function () {
            return this.dmu.getWorkbook();
        },

        getBuiltinCellStyles: function () {
            return this.builtinManager.getBuiltinCellStyles();
        },

        __notifySheetReady: function () {
            var index = this.getActiveSheetIndex();

            $$.forEach(this.dmu.checkSheet(), function (index) {
                this.switchSheet(index);
            }, this);

            this.dmu.switchSheet(index);
        }

    });
});