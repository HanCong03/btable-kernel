/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        // 维度信息
        dimension: {
            min: {
                row: -1,
                col: -1
            },
            max: {
                row: -1,
                col: -1
            }
        },
        view: {
            //showGridLine: true,
            //showRowColHeader: true,
            //pane: {
            //    start: {
            //        row: -1,
            //        col: -1
            //    },
            //    end: {
            //        row: -1,
            //        col: -1
            //    }
            //},
            //rowHeight: 18,
            //colWidth: 72,
            //zeroHeight: false,
            //zeroWidth: false
        },
        cell: {
            //rows: [{
            //    height: -1,
            //    // 具体值无意义，如果存在该属性，表示是自动适应的高度
            //    bestFit: 1,
            //    hidden: false,
            //    cells: [{
            //        comment: 0,
            //        hyperlink: 0,
            //        /*
            //         s => 'string',
            //         n => 'number',
            //         ns => 'number_string',
            //         f => 'formula',
            //         t => 'time',
            //         dt = > 'datetime',
            //         c => 'currency',
            //         u => 'custom === > user',
            //         a => 'accountant',
            //         p => 'percent',
            //         f => 'fraction',
            //         sc => 'scientific',
            //         l => 'logical',
            //         e => 'error'
            //        */
            //        type: 's',
            //        value: '0'
            //    }]
            //}],
            //cols: [{
            //    width: -1,
            //    // 具体值无意义，如果存在该属性，表示是自动适应的宽度
            //    bestFit: 1,
            //    hidden: false
            //}]
            // 行信息
            rows: [],
            // 列信息
            cols: []
        },
        style: {
            //rows: [{
            //    si: 0,
            //    // 自定义样式标记，与取值无关，只要有该标记即表示该行样式为自定义样式
            //    customFormat: 1,
            //    cells: {
            //        si: 0
            //    }
            //}],
            //cols: [{
            //    si: 0,
            //    customFormat: 1
            //}],
            rows: [],
            cols: [],
            globalStyle: null
        },
        mergeCells: {},
        hyperlinks: {},
        comment: {}
    };
});