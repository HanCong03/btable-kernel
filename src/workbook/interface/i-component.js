/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('base/clazz').create('IComponent', {
        __$workbook: null,

        constructor: function (workbook) {
            this.__$workbook = workbook;
        },

        init: function () {},

        createComponent: function (clazz) {
            var args = [].slice.call(arguments, 1);
            var instance = new clazz(this.__$workbook);

            instance.init.apply(instance, args);

            return instance;
        },

        getActiveSheet: function () {
            return this.__$workbook.getActiveSheet();
        },

        getWorkbook: function () {
            return this.__$workbook.getWorkbook();
        },

        getActiveHeap: function () {
            return this.__$workbook.getActiveHeap('kernel');
        },

        generateStyle: function () {
            return this.__$workbook.generateStyle.apply(this.__$workbook, arguments);
        },

        generateBorder: function () {
            return this.__$workbook.generateBorder.apply(this.__$workbook, arguments);
        },

        getClassifyStyleDetailsById: function () {
            return this.__$workbook.getClassifyStyleDetailsById.apply(this.__$workbook, arguments);
        },

        getThemeColor: function (theme, tint) {
            return this.__$workbook.getThemeColor(theme, tint);
        },

        getMajorFont: function () {
            return this.__$workbook.getMajorFont();
        },

        getMinorFont: function () {
            return this.__$workbook.getMinorFont();
        },

        registerAPI: function (name, handler) {
            this.__$workbook.registerAPI(this, name, handler);
        },

        rs: function (name) {
            return this.__$workbook.rs.apply(this.__$workbook, arguments);
        },

        registerService: function (name, handler) {
            var services = {};

            if (typeof name === 'object') {
                for (var key in name) {
                    if (!name.hasOwnProperty(key)) {
                        continue;
                    }

                    services[key] = {
                        provider: this,
                        handler: name[key]
                    };
                }
            } else {
                services[name] = {
                    provider: this,
                    handler: handler
                };
            }

            this.__$workbook.registerService(services);
        },

        onMessage: function (name, handler) {
            var listeners = {};

            if (typeof name === 'object') {
                for (var key in name) {
                    if (!name.hasOwnProperty(key)) {
                        continue;
                    }

                    listeners[key] = {
                        provider: this,
                        handler: name[key]
                    };
                }
            } else {
                listeners[name] = {
                    provider: this,
                    handler: handler
                };
            }

            this.__$workbook.onMessage(listeners);
        },

        postMessage: function () {
            this.__$workbook.postMessage.apply(this.__$workbook, arguments);
        }
    });
});