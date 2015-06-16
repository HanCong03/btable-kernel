/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var Messenger = require('kernel/workbook/workbook/messenger');
    var API = require('kernel/workbook/workbook/api');
    var Service = require('kernel/workbook/workbook/service');

    return require('base/clazz').create('IWorkbook', {
        __$api: null,
        __$messenger: null,
        __$service: null,

        constructor: function () {
            this.__$api = new API();
            this.__$messenger = new Messenger();
            this.__$service= new Service();

            this.init();
        },

        init: function () {},

        createComponent: function (clazz) {
            var args = [].slice.call(arguments, 1);
            var instance = new clazz(this);

            instance.init.apply(instance, args);

            return instance;
        },

        getActiveSheet: function () {
            throw new Error('abstruct method');
        },

        getWorkbook: function () {
            throw new Error('abstruct method');
        },

        getAPI: function () {
            return this.__$api;
        },

        generateStyle: function (styleName, styleValue, sid) {
            return this.__$workbook.generateStyle.apply(this.__$workbook, arguments);
        },

        generateBorder: function (borderOptions, sid) {
            return this.__$workbook.generateBorder.apply(this.__$workbook, arguments);
        },

        registerService: function (services) {
            this.__$service.register(services);
        },

        rs: function (name) {
            return this.__$service.rs.apply(this.__$service, arguments);
        },

        registerAPI: function (provider, name, handler) {
            var apis = {};

            if (typeof name === 'object') {
                for (var key in name) {
                    if (!name.hasOwnProperty(key)) {
                        continue;
                    }

                    apis[key] = {
                        provider: provider,
                        handler: name[key]
                    };
                }
            } else {
                apis[name] = {
                    provider: provider,
                    handler: handler
                };
            }

            this.__$api.register(apis);
        },

        onMessage: function () {
            this.__$messenger.on.apply(this.__$messenger, arguments);
        },

        postMessage: function () {
            this.__$messenger.post.apply(this.__$messenger, arguments);
        }
    });
});