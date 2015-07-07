/**
 * @file 定义内置单元格样式
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var NONE = require('NONE');

    module.exports = {
        0: {
            name: '常规',
            format: require('./format/0')
        },

        27: {
            name: '差',
            format: require('./format/1')
        },

        26: {
            name: '好',
            format: require('./format/2')
        },

        28: {
            name: '适中',
            format: require('./format/3')
        },

        22: {
            name: '计算',
            format: require('./format/4')
        },

        23: {
            name: '检查单元格',
            format: require('./format/5')
        },

        53: {
            name: '解释性文本',
            format: require('./format/6')
        },

        11: {
            name: '警告文本',
            format: require('./format/7')
        },

        24: {
            name: '链接单元格',
            format: require('./format/8')
        },

        21: {
            name: '输出',
            format: require('./format/9')
        },

        20: {
            name: '输入',
            format: require('./format/10')
        },

        10: {
            name: '注释',
            format: require('./format/11')
        },

        15: {
            name: '标题',
            format: require('./format/12')
        },

        16: {
            name: '标题1',
            format: require('./format/13')
        }
    };
});