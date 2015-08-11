/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    var Cell = require('./components/cell/cell');
    var Dimension = require('./components/dimension/dimension');
    var Content = require('./components/content/content');
    var Style = require('./components/style/style');
    var StyleCache = require('./components/style-cache');
    var TypeStyle = require('./components/type-style/type-style');
    var Comment = require('./components/comment');
    var Hyperlink = require('./components/hyperlink');
    var View = require('./components/view');
    var MergeCell = require('./components/merge-cell/merge-cell');
    var RowColumn = require('./components/row-column');
    var Border = require('./components/border/border');
    var RenderInfo = require('./components/render-info');
    var Insert = require('./components/insert/insert');
    var FormatBrush = require('./components/format-brush/format-brush');
    var Writable = require('./components/writable');

    return $$.createClass('Sheet', {
        base: require('../../interface/i-workbook-component'),
        mixin: require('./clean/cleaner'),

        components: null,

        init: function () {
            this.components = {
                cell: this.createComponent(Cell),
                dimension: this.createComponent(Dimension),
                content: this.createComponent(Content),
                style: this.createComponent(Style),
                StyleCache: this.createComponent(StyleCache),
                RenderInfo: this.createComponent(RenderInfo),
                comment: this.createComponent(Comment),
                view: this.createComponent(View),
                mergeCell: this.createComponent(MergeCell),
                rowColumn: this.createComponent(RowColumn),
                border: this.createComponent(Border),
                typeStyle: this.createComponent(TypeStyle),
                insert: this.createComponent(Insert),
                hyperlink: this.createComponent(Hyperlink),
                formatBrush: this.createComponent(FormatBrush),
                writable: this.createComponent(Writable)
            };
        },

        createComponent: function (clazz) {
            return new clazz(this.__$workbook, this);
        }
    });
});