/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {

    module.exports = {
        __cellMoveToRange: function (cell, range) {
            // 检查源区域是否有数据
            if (this.__hasDataRange()) {

            }

            // 检查目标区域是否可写入
            if (!this.__writableRange(range)) {
                return false;
            }

            var sheetData = this.getActiveSheet();

        }
    };
});