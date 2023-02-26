"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCollection = void 0;
var inversify_1 = require("inversify");
var ServiceProvider = /** @class */ (function () {
    function ServiceProvider(container) {
        this._container = container;
    }
    ServiceProvider.prototype.get = function (key) {
        return this.has(key) ? this._container.get(key) : undefined;
    };
    ServiceProvider.prototype.getAll = function (key) {
        return this.has(key) ? this._container.getAll(key) : [];
    };
    ServiceProvider.prototype.has = function (key) {
        return this._container.isBound(key);
    };
    return ServiceProvider;
}());
var ServiceCollection = /** @class */ (function () {
    function ServiceCollection() {
        this._container = new inversify_1.Container({
            defaultScope: 'Singleton',
            skipBaseClassChecks: true,
            autoBindInjectable: false,
        });
    }
    ServiceCollection.prototype.add = function (key, provider) {
        if (typeof provider === 'function') {
            // class
            this.tryDecorate(provider);
            this._container
                .bind(key)
                .to(provider)
                .inSingletonScope();
        }
        else {
            // instance
            this._container.bind(key).toConstantValue(provider);
        }
        return this;
    };
    ServiceCollection.prototype.addFactory = function (key, factory) {
        var _this = this;
        this._container
            .bind(key)
            .toDynamicValue(function (ctx) {
            var _a;
            var target = (_a = ctx.currentRequest.parentRequest) === null || _a === void 0 ? void 0 : _a.bindings[0].implementationType;
            return factory(_this._provider, target);
        })
            .inRequestScope();
        return this;
    };
    ServiceCollection.prototype.has = function (key) {
        return this._container.isBound(key);
    };
    ServiceCollection.prototype.remove = function (key) {
        this._container.unbind(key);
        return this;
    };
    ServiceCollection.prototype.build = function () {
        if (!this._provider) {
            this._provider = new ServiceProvider(this._container);
        }
        return this._provider;
    };
    ServiceCollection.prototype.tryDecorate = function (target) {
        try {
            (0, inversify_1.decorate)((0, inversify_1.injectable)(), target);
        }
        catch (e) { }
    };
    return ServiceCollection;
}());
exports.ServiceCollection = ServiceCollection;
//# sourceMappingURL=service-collection.js.map