"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationBuilder = void 0;
var container_1 = require("../container");
var CONTROLLER_TAG = '00a54152-d339-490c-8122-ac4e73c513fb';
var BINDER_TAG = '8e90de0d-6929-4b04-85ba-338d50d45605';
var Application = /** @class */ (function () {
    function Application(provider) {
        this._beforeStartCallbacks = [];
        this._provider = provider;
    }
    Object.defineProperty(Application.prototype, "provider", {
        get: function () {
            return this._provider;
        },
        enumerable: false,
        configurable: true
    });
    Application.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, cb, controllers, binders;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this._beforeStartCallbacks;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        cb = _a[_i];
                        return [4 /*yield*/, cb()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        controllers = this._provider.getAll(CONTROLLER_TAG);
                        if (controllers.length === 0) {
                            throw new Error('Could not start the app. No controllers were found.');
                        }
                        binders = this._provider.getAll(BINDER_TAG);
                        controllers.forEach(function (controller) { return binders.forEach(function (binder) { return binder.bind(controller); }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Application.prototype.beforeStart = function (fn) {
        this._beforeStartCallbacks.push(fn);
    };
    return Application;
}());
var ApplicationBuilder = /** @class */ (function () {
    function ApplicationBuilder() {
        this._modules = new Set();
        this._controllers = new Set();
        this._binders = new Set();
        this.services = new container_1.ServiceCollection();
    }
    ApplicationBuilder.prototype.removeModule = function (module) {
        this._modules.delete(module);
        return this;
    };
    ApplicationBuilder.prototype.addModule = function (module) {
        this._modules.add(module);
        return this;
    };
    ApplicationBuilder.prototype.addBinder = function (binder) {
        this._binders.add(binder);
        return this;
    };
    ApplicationBuilder.prototype.removeBinder = function (binder) {
        this._binders.delete(binder);
        return this;
    };
    ApplicationBuilder.prototype.addController = function (controller) {
        this._controllers.add(controller);
        return this;
    };
    ApplicationBuilder.prototype.removeController = function (controller) {
        this._controllers.delete(controller);
        return this;
    };
    ApplicationBuilder.prototype.build = function () {
        var _this = this;
        var _a = this.getModules(), dynamicModules = _a[0], asyncModules = _a[1];
        dynamicModules.forEach(function (x) {
            x.load(_this);
        });
        var provider = this.services.build();
        var app = new Application(provider);
        app.beforeStart(function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, asyncModules_1, asyncModule;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, asyncModules_1 = asyncModules;
                        _a.label = 1;
                    case 1:
                        if (!(_i < asyncModules_1.length)) return [3 /*break*/, 4];
                        asyncModule = asyncModules_1[_i];
                        return [4 /*yield*/, asyncModule.loadAsync(this, provider)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this._controllers.forEach(function (x) { return _this.services.add(CONTROLLER_TAG, x); });
                        this._binders.forEach(function (x) { return _this.services.add(BINDER_TAG, x); });
                        return [2 /*return*/];
                }
            });
        }); });
        return app;
    };
    ApplicationBuilder.prototype.getModules = function () {
        var dynamicModules = [];
        var asyncModules = [];
        this._modules.forEach(function (module) {
            if ('load' in module) {
                dynamicModules.push(module);
            }
            if ('loadAsync' in module) {
                asyncModules.push(module);
            }
        });
        return [dynamicModules, asyncModules];
    };
    return ApplicationBuilder;
}());
exports.ApplicationBuilder = ApplicationBuilder;
//# sourceMappingURL=application-builder.js.map