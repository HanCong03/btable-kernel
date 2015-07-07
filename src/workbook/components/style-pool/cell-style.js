/**
 * @file 单元格样式
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var STYLE_CLASSIFY_APPLYNAME_MAP = require('./definition/style-classify-applyname-map');

    var BUILTINT_CELL_STYLE = require('../../builtin/cell-style/cell-style');

    module.exports = {
        generateCellStyle: function (csid, sid) {
            if ($$.isNdef(sid)) {
                sid = 0;
            }

            var data = this.getWorkbook();
            var styleGroup = $$.clone(data.styleGroup[sid]);
            var cellStyles = BUILTINT_CELL_STYLE[csid].format;

            var gid;
            var applyName;
            var cellStyleGroup = $$.clone(data.cellStyleGroup[0]);

            for (var key in cellStyles) {
                if (!cellStyles.hasOwnProperty(key)) {
                    continue;
                }

                gid = this.__generateClassifyId(key, $.extend({}, this.getDefaultClassifyStyle(key), cellStyles[key]));

                applyName = STYLE_CLASSIFY_APPLYNAME_MAP[key];
                styleGroup[applyName] = 0;
                styleGroup[key] = gid;

                cellStyleGroup[applyName] = 1;
                cellStyleGroup[key] = gid;
            }

            styleGroup.xf = this.__generateCellStyleGroupId(cellStyleGroup);

            return this.__generateStyleGroupId(styleGroup);
        },

        /**
         * 根据样式xfid，获取指定类别的cellstyle detail
         * @param classify
         * @param xfid
         * @returns {*}
         */
        getClassifyCellStyleDetailBySid: function (classify, xfid) {
            var data = this.getWorkbook();
            var cellStyleGroup = data.cellStyleGroup[xfid];
            var pool = data.stylePool[classify];
            var applyName = STYLE_CLASSIFY_APPLYNAME_MAP[classify];

            if (cellStyleGroup[applyName]) {
                return pool[cellStyleGroup[classify]];
            }

            return null;
        },

        /**
         * 根据给定的xfid，获取有效的分类样式
         * @param classify
         * @param xfid
         */
        getEffectiveClassifyCellStyleDetailBySid: function (classify, xfid) {
            var data = this.getWorkbook();
            var cellStyleGroup = data.cellStyleGroup[xfid];
            var pool = data.stylePool[classify];
            var applyName = STYLE_CLASSIFY_APPLYNAME_MAP[classify];

            if (cellStyleGroup[applyName]) {
                // 默认样式
                if (cellStyleGroup[classify] === 0) {
                    return null;
                }

                return pool[cellStyleGroup[classify]];
            }

            return null;
        },

        __generateCellStyleGroupId: function (group) {
            var key = JSON.stringify(group);
            var cellStyleGroup = this.getWorkbook().cellStyleGroup;
            var groupMap = this.__cellStyleGroupMap;

            if ($$.isDefined(groupMap[key])) {
                return groupMap[key];
            }

            var groupId = cellStyleGroup.length;

            cellStyleGroup.push(group);
            groupMap[key] = groupId;

            return groupId;
        }
    };
});