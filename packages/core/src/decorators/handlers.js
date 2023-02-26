"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remote = exports.ChatCommand = exports.Export = exports.LocalEvent = exports.NetEvent = void 0;
var handler_decorator_factory_1 = require("./handler-decorator.factory");
exports.NetEvent = (0, handler_decorator_factory_1.createHandlerDecorator)('NET_EVENT', function (name) { return ({ name: name }); });
exports.LocalEvent = (0, handler_decorator_factory_1.createHandlerDecorator)('LOCAL_EVENT', function (name) { return ({ name: name }); });
exports.Export = (0, handler_decorator_factory_1.createHandlerDecorator)('EXPORT', function (name) { return ({ name: name }); });
exports.ChatCommand = (0, handler_decorator_factory_1.createHandlerDecorator)('CHAT_COMMAND', function (name, isRestricted) { return ({ name: name, isRestricted: isRestricted }); });
exports.Remote = (0, handler_decorator_factory_1.createHandlerDecorator)('Remote', function (name) { return ({ name: name }); });
//# sourceMappingURL=handlers.js.map