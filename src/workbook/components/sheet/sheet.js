/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    var Cell = require('./components/cell/cell');
    var Dimension = require('./components/dimension/dimension');
    var Content = require('./components/content');
    var Style = require('./components/style/style');
    var FinalStyle = require('./components/final-style/final-style');
    var TypeStyle = require('./components/type-style/type-style');
    var Comment = require('./components/comment');
    var View = require('./components/view');
    var MergeCell = require('./components/merge-cell');
    var RowColumn = require('./components/row-column');
    var Border = require('./components/border/border');

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
                comment: this.createComponent(Comment),
                view: this.createComponent(View),
                mergeCell: this.createComponent(MergeCell),
                rowColumn: this.createComponent(RowColumn),
                border: this.createComponent(Border),
                finalStyle: this.createComponent(FinalStyle),
                typeStyle: this.createComponent(TypeStyle)
            };
        },

        createComponent: function (clazz) {
            return new clazz(this.__$workbook, this);
        }
    });
});