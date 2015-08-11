/**
 * @file 向应用提供运行时“堆”，该堆由kernel进行管理，会为各层提供一个数据空间以便存储临时数据。
 *      注意：每一层的“堆”空间都会被分配为一个数组，该数组和当前workbook内的sheet一一对应，
 *      且kernel会维护该关系，使其在任何情况下都成立。
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return require('utils').createClass('Heap', {
        heap: {
            kernel: [],
            other: [],
            workbook: {}
        },

        base: require('../interface/i-workbook-component'),

        // 内核级活动堆
        getActiveKernelHeap: function (name) {
            var heap = this.heap.kernel;
            return this.__getHeap(heap, name);
        },

        // 应用级活动堆
        getActiveHeap: function (name) {
            var heap = this.heap.other;
            return this.__getHeap(heap, name);
        },

        // 全局
        getWorkbookHeap: function (name) {
            var heap = this.heap.workbook;

            if (!heap[name]) {
                heap[name] = {};
            }

            return heap[name];
        },

        __getHeap: function (heap, name) {
            var index = this.getActiveSheetIndex();
            var currentHeap;

            // 缺页
            if ($$.isNdef(heap[index])) {
                heap[index] = {};
            }

            currentHeap = heap[index];

            if ($$.isNdef(currentHeap[name])) {
                currentHeap[name] = {};
            }

            return currentHeap[name];
        }
    });
});