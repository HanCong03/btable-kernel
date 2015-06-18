/**
 * @file 样式池，负责维护当前工作簿内部的样式索引
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    var DEFAULT_STYLE = require('../../defaults/style');
    var STYLE_NAME_CLASSIFY_MAP = require('./definition/style-name-classify-map');
    var STYLE_CLASSIFY_APPLYNAME_MAP = require('./definition/style-classify-applyname-map');

    module.exports = $$.createClass('StylePool', {
        base: require('../../interface/i-workbook-component'),

        // 样式分类索引缓存
        __classifyMap: {},
        // 样式组索引映射
        __groupMap: {},

        mixin: [
            require('./map')
        ],

        init: function () {
            this.__initMap();
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'generate.style': this.generateStyle,
                'generate.border': this.generateBorder,
                'get.classify.style.detail': this.getClassifyStyleDetailBySid,
                'get.style.detail': this.getStyleBySid,
                'get.cellstyle.detail': this.getClassifyCellStyleDetailBySid,
                'get.full.style.detail': this.getStyleDetailBySid
            });
        },

        /**
         * 在给定sid的基础上，根据新给定的styleName和styleValue生成新的sid。
         * 注意：1、如果给定的styleValue为null活着undefined，则把该样式置为默认值。效果相当于清除该样式。
         *      2、如果未给出sid，则以默认样式作为基础样式。
         * @param styleName
         * @param styleValue
         * @param sid
         * @returns {*}
         */
        generateStyle: function (styleName, styleValue, sid) {
            // 默认id
            if ($$.isNdef(sid)) {
                sid = 0;
            }

            var classify = STYLE_NAME_CLASSIFY_MAP[styleName];
            var classifyDetails = $$.clone(this.getClassifyStyleDetailBySid(classify, sid));

            if ($$.isNdef(classifyDetails)) {
                classifyDetails = $$.clone(DEFAULT_STYLE[classify]);
            }

            // 样式值无效，则设置为默认值，以清除该样式。
            if ($$.isNdef(styleValue)) {
                styleValue = DEFAULT_STYLE[classify][styleName];
            }

            classifyDetails[styleName] = styleValue;

            return this.__generateSidByClassify(classify, classifyDetails, sid);
        },

        generateBorder: function (borderOption, sid) {
            return this.generateStyle('border', borderOption, sid);
        },

        getStyleDetailBySid: function (sid) {
            return {
                numfmts: this.getClassifyStyleDetailBySid('numfmts', sid),
                fonts: this.getClassifyStyleDetailBySid('fonts', sid),
                fills: this.getClassifyStyleDetailBySid('fills', sid),
                borders: this.getClassifyStyleDetailBySid('borders', sid),
                alignments: this.getClassifyStyleDetailBySid('alignments', sid)
            };
        },

        getStyleBySid: function (styleName, sid) {
            var classify = STYLE_NAME_CLASSIFY_MAP[styleName];
            var classifyDetails = $$.clone(this.getClassifyStyleDetailBySid(classify, sid));

            if ($$.isNdef(classifyDetails)) {
                return null;
            }

            return classifyDetails[styleName];
        },

        getClassifyStyleDetailBySid: function (classify, sid) {
            if ($$.isNdef(sid)) {
                sid = 0;
            }

            var data = this.getWorkbook();
            var styleGroup = data.styleGroup[sid];
            var applyName = STYLE_CLASSIFY_APPLYNAME_MAP[classify];

            var pool = data.stylePool[classify];

            if (styleGroup[applyName]) {
                return pool[styleGroup[classify]];
            } else {
                return this.getClassifyCellStyleDetailBySid(classify, styleGroup.xf);
            }
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

            return undefined;
        },

        __generateSidByClassify: function (classify, classifyDetails, sid) {
            var data = this.getWorkbook();
            var currentGroup = data.styleGroup[sid];
            var applyName = STYLE_CLASSIFY_APPLYNAME_MAP[classify];

            var classifyId = this.__generateClassifyId(classify, classifyDetails);

            // 样式一致，则不生成新样式
            if (currentGroup[applyName] && currentGroup[classify] === classifyId) {
                return sid;
            }

            // 否则，执行新样式匹配
            currentGroup = $$.clone(currentGroup);
            currentGroup[applyName] = 1;
            currentGroup[classify] = classifyId;

            return this.__generateStyleGroupId(currentGroup);
        },

        __generateStyleGroupId: function (group) {
            var key = JSON.stringify(group);
            var styleGroup = this.getWorkbook().styleGroup;
            var groupMap = this.__groupMap;

            if ($$.isDefined(groupMap[key])) {
                return groupMap[key];
            }

            var groupId = styleGroup.length;

            styleGroup.push(group);
            groupMap[key] = groupId;

            return groupId;
        },

        __generateClassifyId: function (classify, details) {
            var data = this.getWorkbook();
            var pool = data.stylePool;
            var key = JSON.stringify(details);
            var classifyMap = this.__classifyMap;

            if ($$.isDefined(classifyMap[key])) {
                return classifyMap[key];
            }

            var classifyPool = pool[classify];
            var classifyId = classifyPool.length;

            classifyMap[key] = classifyId;
            classifyPool.push(details);

            return classifyId;
        }
    });
});