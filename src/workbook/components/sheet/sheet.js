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
    var Comment = require('./components/comment');
    var View = require('./components/view');
    var MergeCell = require('./components/merge-cell');
    var RowColumn = require('./components/row-column');
    var Border = require('./components/border/border');

    var Cleaner = require('./clean/cleaner');

    return $$.createClass('Sheet', {
        base: require('../../interface/i-workbook-component'),

        __$cleaner: null,

        components: null,

        init: function () {
            this.__$cleaner = this.createComponent(Cleaner);

            this.components = {
                cell: this.createComponent(Cell),
                dimension: this.createComponent(Dimension),
                content: this.createComponent(Content),
                style: this.createComponent(Style),
                comment: this.createComponent(Comment),
                view: this.createComponent(View),
                mergeCell: this.createComponent(MergeCell),
                rowColumn: this.createComponent(RowColumn),
                border: this.createComponent(Border)
            };
        },

        createComponent: function (clazz) {
            return new clazz(this.__$workbook, this.__$cleaner);
        }
    });
});