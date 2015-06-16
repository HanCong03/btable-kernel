/**
 * @file
 * @author hancong03@baiud.com
 */
define(function (require) {
    var DMU = require('./dmu/dmu');

    /* --- workbook components start --- */
    var Heap = require('./components/heap');
    var ThemeManager = require('./components/theme/theme');
    var StylePool = require('./components/style-pool/style-pool');
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

        constructor: function () {
            this.dmu = new DMU(this);

            this.__initComponents();

            // 各组件都加载完毕，触发 sheetready 事件
            //this.__notifySheets();

            // 所有工作已就绪，触发 workbookready 事件
            this.postMessage('workbook.reday');
        },

        __initComponents: function () {
            this.heap = new Heap(this);
            this.themeManager = new ThemeManager(this);
            this.stylePool = new StylePool(this);
            //this.sheet = new Sheet(this);
        },

        switchSheet: function (index) {
            return this.dmu.switchSheet(index);
        },

        getActiveIndex: function () {
            return this.dmu.getActiveIndex();
        },

        getActiveSheetIndex: function () {
            return this.dmu.getActiveSheetIndex();
        },

        getActiveSheet: function () {
            return this.dmu.getActiveSheet();
        },

        getWorkbookData: function () {
            return this.dmu.getWorkbookData();
        }
        //
        //__notifySheets: function () {
        //    var data = this.data;
        //    var sheets = data.sheets;
        //
        //    sheets.forEach(function (current, index) {
        //        // 临时更改当前活动工作表
        //        data.active = index;
        //        this.postMessage('sheetready', index);
        //    }, this);
        //
        //    // 恢复活动工作表记录
        //    data.active = 0;
        //}
    });
});