/**
 * @file 初始化样式池映射关系
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        __initMap: function () {
            this.__initGroupMap();
            this.__initClassifyMap();
        },

        __initGroupMap: function () {
            var map = {};
            var styleGroup = this.getWorkbook().styleGroup;

            $$.forEach(styleGroup, function (group, index) {
                map[JSON.stringify(group)] = index;
            });

            this.__groupMap = map;
        },

        __initClassifyMap: function () {
            var map = {};
            var stylePool = this.getWorkbook().stylePool;

            for (var classifyName in stylePool) {
                if (!stylePool.hasOwnProperty(classifyName)) {
                    continue;
                }

                $$.forEach(stylePool[classifyName], function (classify, index) {
                    map[JSON.stringify(classify)] = index;
                });
            }

            this.__classifyMap = map;
        }
    };
});