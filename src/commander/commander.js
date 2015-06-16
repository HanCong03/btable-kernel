/**
 * @file 命令解释器
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var COMMAND_MAP = require('./cmd-map');

    return $$.createClass('WorkbookFacade', {
        __$apis: null,
        __query: [],
        __exec: [],

        constructor: function (apis) {
            this.__$apis = apis;
            this.__initCommand();
        },

        __initCommand: function () {
            for (var key in COMMAND_MAP) {
                if (!COMMAND_MAP.hasOwnProperty(key)) {
                    continue;
                }

                this.__register(COMMAND_MAP[key]);
            }
        },

        exec: function (command) {
            command = this.__getExecCommand(command);

            if (!command) {
                throw new Error('query command is not found: ' + command);
            }

            var args = [].slice.call(arguments, 1);

            return command.handler.apply(command.provider, args);
        },

        queryValue: function (command) {
            command = this.__getQueryCommand(command);

            if (!command) {
                throw new Error('query command is not found: ' + command);
            }

            return command.handler.apply(command.provider, null);
        },

        querySupportExec: function (command) {
            return this.__$commander.querySupportQuery(command);
        },

        querySupportQuery: function (command) {
            return this.__$commander.queryValue(command);
        },

        __getExecCommand: function (command) {
            var pool = this.__exec;

            if (pool[command]) {
                return pool[command];
            }

            return null;
        },

        __getQueryCommand: function (command) {
            var pool = this.__query;

            if (pool[command]) {
                return pool[command];
            }

            return null;
        },

        __register: function (Command) {
            var command = new Command(this.__$apis);

            if (command.$query) {
                this.__registerQuery(command);
            }

            if (command.$exec) {
                this.__registerExec(command);
            }
        },

        __registerExec: function (instance) {
            var pool = this.__exec;

            instance.$exec.forEach(function (commandName) {
                pool[commandName] = {
                    provider: instance,
                    handler: instance['exec_' + commandName]
                };
            });
        },

        __registerQuery: function (instance) {
            var pool = this.__query;

            instance.$query.forEach(function (commandName) {
                pool[commandName] = {
                    provider: instance,
                    handler: instance['query_' + commandName]
                };
            });
        }
    });
});