(self["webpackChunkCeloCashAgent"] = self["webpackChunkCeloCashAgent"] || []).push([["src_app_home_home_module_ts"],{

/***/ 6977:
/*!*******************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/bootstrap.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkReady": function() { return /* binding */ checkReady; }
/* harmony export */ });
function checkReady() {
    var DEVICE_READY_TIMEOUT = 5000;
    // To help developers using cordova, we listen for the device ready event and
    // log an error if it didn't fire in a reasonable amount of time. Generally,
    // when this happens, developers should remove and reinstall plugins, since
    // an inconsistent plugin is often the culprit.
    var before = Date.now();
    var didFireReady = false;
    document.addEventListener('deviceready', function () {
        console.log("Ionic Native: deviceready event fired after " + (Date.now() - before) + " ms");
        didFireReady = true;
    });
    setTimeout(function () {
        if (!didFireReady && window.cordova) {
            console.warn("Ionic Native: deviceready did not fire within " + DEVICE_READY_TIMEOUT + "ms. This can happen when plugins are in an inconsistent state. Try removing plugins from plugins/ and reinstalling them.");
        }
    }, DEVICE_READY_TIMEOUT);
}
//# sourceMappingURL=bootstrap.js.map

/***/ }),

/***/ 89870:
/*!***************************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/common.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ERR_CORDOVA_NOT_AVAILABLE": function() { return /* binding */ ERR_CORDOVA_NOT_AVAILABLE; },
/* harmony export */   "ERR_PLUGIN_NOT_INSTALLED": function() { return /* binding */ ERR_PLUGIN_NOT_INSTALLED; },
/* harmony export */   "getPromise": function() { return /* binding */ getPromise; },
/* harmony export */   "wrapPromise": function() { return /* binding */ wrapPromise; },
/* harmony export */   "checkAvailability": function() { return /* binding */ checkAvailability; },
/* harmony export */   "instanceAvailability": function() { return /* binding */ instanceAvailability; },
/* harmony export */   "setIndex": function() { return /* binding */ setIndex; },
/* harmony export */   "callCordovaPlugin": function() { return /* binding */ callCordovaPlugin; },
/* harmony export */   "callInstance": function() { return /* binding */ callInstance; },
/* harmony export */   "getPlugin": function() { return /* binding */ getPlugin; },
/* harmony export */   "get": function() { return /* binding */ get; },
/* harmony export */   "pluginWarn": function() { return /* binding */ pluginWarn; },
/* harmony export */   "cordovaWarn": function() { return /* binding */ cordovaWarn; },
/* harmony export */   "wrap": function() { return /* binding */ wrap; },
/* harmony export */   "wrapInstance": function() { return /* binding */ wrapInstance; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 69165);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 22759);

var ERR_CORDOVA_NOT_AVAILABLE = { error: 'cordova_not_available' };
var ERR_PLUGIN_NOT_INSTALLED = { error: 'plugin_not_installed' };
function getPromise(callback) {
    var tryNativePromise = function () {
        if (Promise) {
            return new Promise(function (resolve, reject) {
                callback(resolve, reject);
            });
        }
        else {
            console.error('No Promise support or polyfill found. To enable Ionic Native support, please add the es6-promise polyfill before this script, or run with a library like Angular or on a recent browser.');
        }
    };
    if (window.angular) {
        var injector = window.angular
            .element(document.querySelector('[ng-app]') || document.body)
            .injector();
        if (injector) {
            var $q = injector.get('$q');
            return $q(function (resolve, reject) {
                callback(resolve, reject);
            });
        }
        console.warn("Angular 1 was detected but $q couldn't be retrieved. This is usually when the app is not bootstrapped on the html or body tag. Falling back to native promises which won't trigger an automatic digest when promises resolve.");
    }
    return tryNativePromise();
}
function wrapPromise(pluginObj, methodName, args, opts) {
    if (opts === void 0) { opts = {}; }
    var pluginResult, rej;
    var p = getPromise(function (resolve, reject) {
        if (opts.destruct) {
            pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return resolve(args);
            }, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return reject(args);
            });
        }
        else {
            pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, resolve, reject);
        }
        rej = reject;
    });
    // Angular throws an error on unhandled rejection, but in this case we have already printed
    // a warning that Cordova is undefined or the plugin is uninstalled, so there is no reason
    // to error
    if (pluginResult && pluginResult.error) {
        p.catch(function () { });
        typeof rej === 'function' && rej(pluginResult.error);
    }
    return p;
}
function wrapOtherPromise(pluginObj, methodName, args, opts) {
    if (opts === void 0) { opts = {}; }
    return getPromise(function (resolve, reject) {
        var pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts);
        if (pluginResult) {
            if (pluginResult.error) {
                reject(pluginResult.error);
            }
            else if (pluginResult.then) {
                pluginResult.then(resolve).catch(reject);
            }
        }
        else {
            reject({ error: 'unexpected_error' });
        }
    });
}
function wrapObservable(pluginObj, methodName, args, opts) {
    if (opts === void 0) { opts = {}; }
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable(function (observer) {
        var pluginResult;
        if (opts.destruct) {
            pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return observer.next(args);
            }, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return observer.error(args);
            });
        }
        else {
            pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, observer.next.bind(observer), observer.error.bind(observer));
        }
        if (pluginResult && pluginResult.error) {
            observer.error(pluginResult.error);
            observer.complete();
        }
        return function () {
            try {
                if (opts.clearFunction) {
                    if (opts.clearWithArgs) {
                        return callCordovaPlugin(pluginObj, opts.clearFunction, args, opts, observer.next.bind(observer), observer.error.bind(observer));
                    }
                    return callCordovaPlugin(pluginObj, opts.clearFunction, []);
                }
            }
            catch (e) {
                console.warn('Unable to clear the previous observable watch for', pluginObj.constructor.getPluginName(), methodName);
                console.warn(e);
            }
        };
    });
}
/**
 * Wrap the event with an observable
 * @private
 * @param event even name
 * @param element The element to attach the event listener to
 * @returns {Observable}
 */
function wrapEventObservable(event, element) {
    element = element ? get(window, element) : window;
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(element, event);
}
function checkAvailability(plugin, methodName, pluginName) {
    var pluginRef, pluginInstance, pluginPackage;
    if (typeof plugin === 'string') {
        pluginRef = plugin;
    }
    else {
        pluginRef = plugin.constructor.getPluginRef();
        pluginName = plugin.constructor.getPluginName();
        pluginPackage = plugin.constructor.getPluginInstallName();
    }
    pluginInstance = getPlugin(pluginRef);
    if (!pluginInstance || (!!methodName && typeof pluginInstance[methodName] === 'undefined')) {
        if (!window.cordova) {
            cordovaWarn(pluginName, methodName);
            return ERR_CORDOVA_NOT_AVAILABLE;
        }
        pluginWarn(pluginName, pluginPackage, methodName);
        return ERR_PLUGIN_NOT_INSTALLED;
    }
    return true;
}
/**
 * Checks if _objectInstance exists and has the method/property
 * @private
 */
function instanceAvailability(pluginObj, methodName) {
    return (pluginObj._objectInstance &&
        (!methodName || typeof pluginObj._objectInstance[methodName] !== 'undefined'));
}
function setIndex(args, opts, resolve, reject) {
    if (opts === void 0) { opts = {}; }
    // ignore resolve and reject in case sync
    if (opts.sync) {
        return args;
    }
    // If the plugin method expects myMethod(success, err, options)
    if (opts.callbackOrder === 'reverse') {
        // Get those arguments in the order [resolve, reject, ...restOfArgs]
        args.unshift(reject);
        args.unshift(resolve);
    }
    else if (opts.callbackStyle === 'node') {
        args.push(function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    }
    else if (opts.callbackStyle === 'object' && opts.successName && opts.errorName) {
        var obj = {};
        obj[opts.successName] = resolve;
        obj[opts.errorName] = reject;
        args.push(obj);
    }
    else if (typeof opts.successIndex !== 'undefined' || typeof opts.errorIndex !== 'undefined') {
        var setSuccessIndex = function () {
            // If we've specified a success/error index
            if (opts.successIndex > args.length) {
                args[opts.successIndex] = resolve;
            }
            else {
                args.splice(opts.successIndex, 0, resolve);
            }
        };
        var setErrorIndex = function () {
            // We don't want that the reject cb gets spliced into the position of an optional argument that has not been
            // defined and thus causing non expected behavior.
            if (opts.errorIndex > args.length) {
                args[opts.errorIndex] = reject; // insert the reject fn at the correct specific index
            }
            else {
                args.splice(opts.errorIndex, 0, reject); // otherwise just splice it into the array
            }
        };
        if (opts.successIndex > opts.errorIndex) {
            setErrorIndex();
            setSuccessIndex();
        }
        else {
            setSuccessIndex();
            setErrorIndex();
        }
    }
    else {
        // Otherwise, let's tack them on to the end of the argument list
        // which is 90% of cases
        args.push(resolve);
        args.push(reject);
    }
    return args;
}
function callCordovaPlugin(pluginObj, methodName, args, opts, resolve, reject) {
    if (opts === void 0) { opts = {}; }
    // Try to figure out where the success/error callbacks need to be bound
    // to our promise resolve/reject handlers.
    args = setIndex(args, opts, resolve, reject);
    var availabilityCheck = checkAvailability(pluginObj, methodName);
    if (availabilityCheck === true) {
        var pluginInstance = getPlugin(pluginObj.constructor.getPluginRef());
        return pluginInstance[methodName].apply(pluginInstance, args);
    }
    else {
        return availabilityCheck;
    }
}
function callInstance(pluginObj, methodName, args, opts, resolve, reject) {
    if (opts === void 0) { opts = {}; }
    args = setIndex(args, opts, resolve, reject);
    if (instanceAvailability(pluginObj, methodName)) {
        return pluginObj._objectInstance[methodName].apply(pluginObj._objectInstance, args);
    }
}
function getPlugin(pluginRef) {
    return get(window, pluginRef);
}
function get(element, path) {
    var paths = path.split('.');
    var obj = element;
    for (var i = 0; i < paths.length; i++) {
        if (!obj) {
            return null;
        }
        obj = obj[paths[i]];
    }
    return obj;
}
function pluginWarn(pluginName, plugin, method) {
    if (method) {
        console.warn('Native: tried calling ' +
            pluginName +
            '.' +
            method +
            ', but the ' +
            pluginName +
            ' plugin is not installed.');
    }
    else {
        console.warn("Native: tried accessing the " + pluginName + " plugin but it's not installed.");
    }
    if (plugin) {
        console.warn("Install the " + pluginName + " plugin: 'ionic cordova plugin add " + plugin + "'");
    }
}
/**
 * @private
 * @param pluginName
 * @param method
 */
function cordovaWarn(pluginName, method) {
    if (method) {
        console.warn('Native: tried calling ' +
            pluginName +
            '.' +
            method +
            ', but Cordova is not available. Make sure to include cordova.js or run in a device/simulator');
    }
    else {
        console.warn('Native: tried accessing the ' +
            pluginName +
            ' plugin but Cordova is not available. Make sure to include cordova.js or run in a device/simulator');
    }
}
/**
 * @private
 */
var wrap = function (pluginObj, methodName, opts) {
    if (opts === void 0) { opts = {}; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (opts.sync) {
            // Sync doesn't wrap the plugin with a promise or observable, it returns the result as-is
            return callCordovaPlugin(pluginObj, methodName, args, opts);
        }
        else if (opts.observable) {
            return wrapObservable(pluginObj, methodName, args, opts);
        }
        else if (opts.eventObservable && opts.event) {
            return wrapEventObservable(opts.event, opts.element);
        }
        else if (opts.otherPromise) {
            return wrapOtherPromise(pluginObj, methodName, args, opts);
        }
        else {
            return wrapPromise(pluginObj, methodName, args, opts);
        }
    };
};
/**
 * @private
 */
function wrapInstance(pluginObj, methodName, opts) {
    if (opts === void 0) { opts = {}; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (opts.sync) {
            return callInstance(pluginObj, methodName, args, opts);
        }
        else if (opts.observable) {
            return new rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable(function (observer) {
                var pluginResult;
                if (opts.destruct) {
                    pluginResult = callInstance(pluginObj, methodName, args, opts, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return observer.next(args);
                    }, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return observer.error(args);
                    });
                }
                else {
                    pluginResult = callInstance(pluginObj, methodName, args, opts, observer.next.bind(observer), observer.error.bind(observer));
                }
                if (pluginResult && pluginResult.error) {
                    observer.error(pluginResult.error);
                }
                return function () {
                    try {
                        if (opts.clearWithArgs) {
                            return callInstance(pluginObj, opts.clearFunction, args, opts, observer.next.bind(observer), observer.error.bind(observer));
                        }
                        return callInstance(pluginObj, opts.clearFunction, []);
                    }
                    catch (e) {
                        console.warn('Unable to clear the previous observable watch for', pluginObj.constructor.getPluginName(), methodName);
                        console.warn(e);
                    }
                };
            });
        }
        else if (opts.otherPromise) {
            return getPromise(function (resolve, reject) {
                var result;
                if (opts.destruct) {
                    result = callInstance(pluginObj, methodName, args, opts, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return resolve(args);
                    }, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return reject(args);
                    });
                }
                else {
                    result = callInstance(pluginObj, methodName, args, opts, resolve, reject);
                }
                if (result && result.then) {
                    result.then(resolve, reject);
                }
                else {
                    reject();
                }
            });
        }
        else {
            var pluginResult_1, rej_1;
            var p = getPromise(function (resolve, reject) {
                if (opts.destruct) {
                    pluginResult_1 = callInstance(pluginObj, methodName, args, opts, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return resolve(args);
                    }, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return reject(args);
                    });
                }
                else {
                    pluginResult_1 = callInstance(pluginObj, methodName, args, opts, resolve, reject);
                }
                rej_1 = reject;
            });
            // Angular throws an error on unhandled rejection, but in this case we have already printed
            // a warning that Cordova is undefined or the plugin is uninstalled, so there is no reason
            // to error
            if (pluginResult_1 && pluginResult_1.error) {
                p.catch(function () { });
                typeof rej_1 === 'function' && rej_1(pluginResult_1.error);
            }
            return p;
        }
    };
}
//# sourceMappingURL=common.js.map

/***/ }),

/***/ 29849:
/*!**********************************************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-function-override.js ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cordovaFunctionOverride": function() { return /* binding */ cordovaFunctionOverride; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 69165);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ 89870);


function overrideFunction(pluginObj, methodName) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(function (observer) {
        var availabilityCheck = (0,_common__WEBPACK_IMPORTED_MODULE_0__.checkAvailability)(pluginObj, methodName);
        if (availabilityCheck === true) {
            var pluginInstance_1 = (0,_common__WEBPACK_IMPORTED_MODULE_0__.getPlugin)(pluginObj.constructor.getPluginRef());
            pluginInstance_1[methodName] = observer.next.bind(observer);
            return function () { return (pluginInstance_1[methodName] = function () { }); };
        }
        else {
            observer.error(availabilityCheck);
            observer.complete();
        }
    });
}
function cordovaFunctionOverride(pluginObj, methodName, args) {
    if (args === void 0) { args = []; }
    return overrideFunction(pluginObj, methodName);
}
//# sourceMappingURL=cordova-function-override.js.map

/***/ }),

/***/ 71784:
/*!*************************************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-instance.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cordovaInstance": function() { return /* binding */ cordovaInstance; }
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ 89870);

function cordovaInstance(pluginObj, methodName, config, args) {
    args = Array.from(args);
    return (0,_common__WEBPACK_IMPORTED_MODULE_0__.wrapInstance)(pluginObj, methodName, config).apply(this, args);
}
//# sourceMappingURL=cordova-instance.js.map

/***/ }),

/***/ 49418:
/*!*************************************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova-property.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cordovaPropertyGet": function() { return /* binding */ cordovaPropertyGet; },
/* harmony export */   "cordovaPropertySet": function() { return /* binding */ cordovaPropertySet; }
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ 89870);

function cordovaPropertyGet(pluginObj, key) {
    if ((0,_common__WEBPACK_IMPORTED_MODULE_0__.checkAvailability)(pluginObj, key) === true) {
        return (0,_common__WEBPACK_IMPORTED_MODULE_0__.getPlugin)(pluginObj.constructor.getPluginRef())[key];
    }
    return null;
}
function cordovaPropertySet(pluginObj, key, value) {
    if ((0,_common__WEBPACK_IMPORTED_MODULE_0__.checkAvailability)(pluginObj, key) === true) {
        (0,_common__WEBPACK_IMPORTED_MODULE_0__.getPlugin)(pluginObj.constructor.getPluginRef())[key] = value;
    }
}
//# sourceMappingURL=cordova-property.js.map

/***/ }),

/***/ 24234:
/*!****************************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/cordova.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cordova": function() { return /* binding */ cordova; }
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ 89870);

function cordova(pluginObj, methodName, config, args) {
    return (0,_common__WEBPACK_IMPORTED_MODULE_0__.wrap)(pluginObj, methodName, config).apply(this, args);
}
//# sourceMappingURL=cordova.js.map

/***/ }),

/***/ 25938:
/*!**************************************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/instance-property.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "instancePropertyGet": function() { return /* binding */ instancePropertyGet; },
/* harmony export */   "instancePropertySet": function() { return /* binding */ instancePropertySet; }
/* harmony export */ });
function instancePropertyGet(pluginObj, key) {
    if (pluginObj._objectInstance && pluginObj._objectInstance[key]) {
        return pluginObj._objectInstance[key];
    }
    return null;
}
function instancePropertySet(pluginObj, key, value) {
    if (pluginObj._objectInstance) {
        pluginObj._objectInstance[key] = value;
    }
}
//# sourceMappingURL=instance-property.js.map

/***/ }),

/***/ 26264:
/*!*******************************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/decorators/interfaces.js ***!
  \*******************************************************************************/
/***/ (function() {

//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ 60399:
/*!***************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/index.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IonicNativePlugin": function() { return /* reexport safe */ _ionic_native_plugin__WEBPACK_IMPORTED_MODULE_1__.IonicNativePlugin; },
/* harmony export */   "checkAvailability": function() { return /* reexport safe */ _decorators_common__WEBPACK_IMPORTED_MODULE_2__.checkAvailability; },
/* harmony export */   "instanceAvailability": function() { return /* reexport safe */ _decorators_common__WEBPACK_IMPORTED_MODULE_2__.instanceAvailability; },
/* harmony export */   "wrap": function() { return /* reexport safe */ _decorators_common__WEBPACK_IMPORTED_MODULE_2__.wrap; },
/* harmony export */   "getPromise": function() { return /* reexport safe */ _decorators_common__WEBPACK_IMPORTED_MODULE_2__.getPromise; },
/* harmony export */   "cordova": function() { return /* reexport safe */ _decorators_cordova__WEBPACK_IMPORTED_MODULE_3__.cordova; },
/* harmony export */   "cordovaFunctionOverride": function() { return /* reexport safe */ _decorators_cordova_function_override__WEBPACK_IMPORTED_MODULE_4__.cordovaFunctionOverride; },
/* harmony export */   "cordovaInstance": function() { return /* reexport safe */ _decorators_cordova_instance__WEBPACK_IMPORTED_MODULE_5__.cordovaInstance; },
/* harmony export */   "cordovaPropertyGet": function() { return /* reexport safe */ _decorators_cordova_property__WEBPACK_IMPORTED_MODULE_6__.cordovaPropertyGet; },
/* harmony export */   "cordovaPropertySet": function() { return /* reexport safe */ _decorators_cordova_property__WEBPACK_IMPORTED_MODULE_6__.cordovaPropertySet; },
/* harmony export */   "instancePropertyGet": function() { return /* reexport safe */ _decorators_instance_property__WEBPACK_IMPORTED_MODULE_7__.instancePropertyGet; },
/* harmony export */   "instancePropertySet": function() { return /* reexport safe */ _decorators_instance_property__WEBPACK_IMPORTED_MODULE_7__.instancePropertySet; }
/* harmony export */ });
/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap */ 6977);
/* harmony import */ var _ionic_native_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ionic-native-plugin */ 92948);
/* harmony import */ var _decorators_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./decorators/common */ 89870);
/* harmony import */ var _decorators_cordova__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./decorators/cordova */ 24234);
/* harmony import */ var _decorators_cordova_function_override__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./decorators/cordova-function-override */ 29849);
/* harmony import */ var _decorators_cordova_instance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./decorators/cordova-instance */ 71784);
/* harmony import */ var _decorators_cordova_property__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./decorators/cordova-property */ 49418);
/* harmony import */ var _decorators_instance_property__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./decorators/instance-property */ 25938);
/* harmony import */ var _decorators_interfaces__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./decorators/interfaces */ 26264);
/* harmony import */ var _decorators_interfaces__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_decorators_interfaces__WEBPACK_IMPORTED_MODULE_8__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _decorators_interfaces__WEBPACK_IMPORTED_MODULE_8__) if(["default","IonicNativePlugin","checkAvailability","instanceAvailability","wrap","getPromise","cordova","cordovaFunctionOverride","cordovaInstance","cordovaPropertyGet","cordovaPropertySet","instancePropertyGet","instancePropertySet"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _decorators_interfaces__WEBPACK_IMPORTED_MODULE_8__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


// Decorators







(0,_bootstrap__WEBPACK_IMPORTED_MODULE_0__.checkReady)();

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 92948:
/*!*****************************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/ionic-native-plugin.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IonicNativePlugin": function() { return /* binding */ IonicNativePlugin; }
/* harmony export */ });
/* harmony import */ var _decorators_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorators/common */ 89870);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ 19746);


var IonicNativePlugin = /** @class */ (function () {
    function IonicNativePlugin() {
    }
    /**
     * Returns a boolean that indicates whether the plugin is installed
     * @return {boolean}
     */
    IonicNativePlugin.installed = function () {
        return (0,_decorators_common__WEBPACK_IMPORTED_MODULE_0__.checkAvailability)(this.pluginRef) === true;
    };
    /**
     * Returns the original plugin object
     */
    IonicNativePlugin.getPlugin = function () {
        return (0,_util__WEBPACK_IMPORTED_MODULE_1__.get)(window, this.pluginRef);
    };
    /**
     * Returns the plugin's name
     */
    IonicNativePlugin.getPluginName = function () {
        return this.pluginName;
    };
    /**
     * Returns the plugin's reference
     */
    IonicNativePlugin.getPluginRef = function () {
        return this.pluginRef;
    };
    /**
     * Returns the plugin's install name
     */
    IonicNativePlugin.getPluginInstallName = function () {
        return this.plugin;
    };
    /**
     * Returns the plugin's supported platforms
     */
    IonicNativePlugin.getSupportedPlatforms = function () {
        return this.platforms || [];
    };
    return IonicNativePlugin;
}());

//# sourceMappingURL=ionic-native-plugin.js.map

/***/ }),

/***/ 19746:
/*!**************************************************************!*\
  !*** ./node_modules/@ionic-native/core/__ivy_ngcc__/util.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": function() { return /* binding */ get; },
/* harmony export */   "getPromise": function() { return /* binding */ getPromise; }
/* harmony export */ });
/**
 * @private
 */
function get(element, path) {
    var paths = path.split('.');
    var obj = element;
    for (var i = 0; i < paths.length; i++) {
        if (!obj) {
            return null;
        }
        obj = obj[paths[i]];
    }
    return obj;
}
/**
 * @private
 */
function getPromise(callback) {
    if (callback === void 0) { callback = function () { }; }
    var tryNativePromise = function () {
        if (window.Promise) {
            return new Promise(function (resolve, reject) {
                callback(resolve, reject);
            });
        }
        else {
            console.error('No Promise support or polyfill found. To enable Ionic Native support, please add the es6-promise polyfill before this script, or run with a library like Angular or on a recent browser.');
        }
    };
    return tryNativePromise();
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ 7160:
/*!*************************************************************************!*\
  !*** ./node_modules/@ionic-native/qr-scanner/__ivy_ngcc__/ngx/index.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QRScanner": function() { return /* binding */ QRScanner; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/core */ 60399);





var QRScanner = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(QRScanner, _super);
    function QRScanner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QRScanner.prototype.prepare = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "prepare", { "callbackStyle": "node" }, arguments); };
    QRScanner.prototype.scan = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "scan", { "callbackStyle": "node", "observable": true, "clearFunction": "cancelScan" }, arguments); };
    QRScanner.prototype.show = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "show", {}, arguments); };
    QRScanner.prototype.hide = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "hide", {}, arguments); };
    QRScanner.prototype.enableLight = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "enableLight", { "callbackStyle": "node" }, arguments); };
    QRScanner.prototype.destroy = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "destroy", {}, arguments); };
    QRScanner.prototype.disableLight = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "disableLight", { "callbackStyle": "node" }, arguments); };
    QRScanner.prototype.useFrontCamera = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "useFrontCamera", { "callbackStyle": "node" }, arguments); };
    QRScanner.prototype.useBackCamera = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "useBackCamera", { "callbackStyle": "node" }, arguments); };
    QRScanner.prototype.useCamera = function (camera) { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "useCamera", { "callbackStyle": "node" }, arguments); };
    QRScanner.prototype.pausePreview = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "pausePreview", {}, arguments); };
    QRScanner.prototype.resumePreview = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "resumePreview", {}, arguments); };
    QRScanner.prototype.getStatus = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "getStatus", {}, arguments); };
    QRScanner.prototype.openSettings = function () { return (0,_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.cordova)(this, "openSettings", { "sync": true }, arguments); };
    QRScanner.pluginName = "QRScanner";
    QRScanner.plugin = "cordova-plugin-qrscanner";
    QRScanner.pluginRef = "QRScanner";
    QRScanner.repo = "https://github.com/bitpay/cordova-plugin-qrscanner";
    QRScanner.platforms = ["Android", "Browser", "iOS", "Windows"];
QRScanner.ɵfac = /*@__PURE__*/ function () { var ɵQRScanner_BaseFactory; return function QRScanner_Factory(t) { return (ɵQRScanner_BaseFactory || (ɵQRScanner_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetInheritedFactory"](QRScanner)))(t || QRScanner); }; }();
QRScanner.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: QRScanner, factory: function (t) { return QRScanner.ɵfac(t); } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](QRScanner, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable
    }], null, null); })();
    return QRScanner;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_0__.IonicNativePlugin));


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvcXItc2Nhbm5lci9uZ3gvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUNsQztBQUdTLElBNkdzQiw2QkFBaUI7QUFBQztBQUU5QjtBQUdoQjtBQUFNLElBR1AsMkJBQU87QUFLOEIsSUFRckMsd0JBQUk7QUFLdUYsSUFJM0Ysd0JBQUk7QUFLSyxJQUlULHdCQUFJO0FBS0ssSUFNVCwrQkFBVztBQU1MLElBR04sMkJBQU87QUFLSyxJQU1aLGdDQUFZO0FBTVEsSUFLcEIsa0NBQWM7QUFNUyxJQUt2QixpQ0FBYTtBQU1FLElBTWYsNkJBQVMsYUFBQyxNQUFjO0FBS0csSUFJM0IsZ0NBQVk7QUFLSyxJQUlqQixpQ0FBYTtBQUtLLElBSWxCLDZCQUFTO0FBS0ssSUFLZCxnQ0FBWTtBQUUyRDtBQUF3QztBQUFtRDtBQUF1QztBQUEyRTs2Q0FoSnJSLFVBQVU7Ozs7MEJBQ0w7QUFBQyxvQkFuSFA7QUFBRSxFQW1INkIsaUJBQWlCO0FBQy9DLFNBRFksU0FBUztBQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZG92YSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUVJTY2FubmVyU3RhdHVzIHtcbiAgLyoqXG4gICAqIE9uIGlPUyBhbmQgQW5kcm9pZCA2LjArLCBjYW1lcmEgYWNjZXNzIGlzIGdyYW50ZWQgYXQgcnVudGltZSBieSB0aGUgdXNlciAoYnkgY2xpY2tpbmcgXCJBbGxvd1wiIGF0IHRoZSBkaWFsb2cpLlxuICAgKiBUaGUgYXV0aG9yaXplZCBwcm9wZXJ0eSBpcyBhIGJvb2xlYW4gdmFsdWUgd2hpY2ggaXMgdHJ1ZSBvbmx5IHdoZW4gdGhlIHVzZXIgaGFzIGFsbG93ZWQgY2FtZXJhIGFjY2VzcyB0byB5b3VyIGFwcCAoQVZBdXRob3JpemF0aW9uU3RhdHVzLkF1dGhvcml6ZWQpLlxuICAgKiBPbiBwbGF0Zm9ybXMgd2l0aCBwZXJtaXNzaW9ucyBncmFudGVkIGF0IGluc3RhbGwgKEFuZHJvaWQgcHJlLTYuMCwgV2luZG93cyBQaG9uZSkgdGhpcyBwcm9wZXJ0eSBpcyBhbHdheXMgdHJ1ZS5cbiAgICovXG4gIGF1dGhvcml6ZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gdmFsdWUgd2hpY2ggaXMgdHJ1ZSBpZiB0aGUgdXNlciBwZXJtYW5lbnRseSBkZW5pZWQgY2FtZXJhIGFjY2VzcyB0byB0aGUgYXBwIChBVkF1dGhvcml6YXRpb25TdGF0dXMuRGVuaWVkKS5cbiAgICogT25jZSBkZW5pZWQsIGNhbWVyYSBhY2Nlc3MgY2FuIG9ubHkgYmUgZ2FpbmVkIGJ5IHJlcXVlc3RpbmcgdGhlIHVzZXIgY2hhbmdlIHRoZWlyIGRlY2lzaW9uIChjb25zaWRlciBvZmZlcmluZyBhIGxpbmsgdG8gdGhlIHNldHRpbmcgdmlhIG9wZW5TZXR0aW5ncygpKS5cbiAgICovXG4gIGRlbmllZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEEgYm9vbGVhbiB2YWx1ZSB3aGljaCBpcyB0cnVlIGlmIHRoZSB1c2VyIGlzIHVuYWJsZSB0byBncmFudCBwZXJtaXNzaW9ucyBkdWUgdG8gcGFyZW50YWwgY29udHJvbHMsIG9yZ2FuaXphdGlvbiBzZWN1cml0eSBjb25maWd1cmF0aW9uIHByb2ZpbGVzLCBvciBzaW1pbGFyIHJlYXNvbnMuXG4gICAqL1xuICByZXN0cmljdGVkOiBib29sZWFuO1xuICAvKipcbiAgICogQSBib29sZWFuIHZhbHVlIHdoaWNoIGlzIHRydWUgaWYgUVJTY2FubmVyIGlzIHByZXBhcmVkIHRvIGNhcHR1cmUgdmlkZW8gYW5kIHJlbmRlciBpdCB0byB0aGUgdmlldy5cbiAgICovXG4gIHByZXBhcmVkOiBib29sZWFuO1xuICAvKipcbiAgICogQSBib29sZWFuIHZhbHVlIHdoaWNoIGlzIHRydWUgd2hlbiB0aGUgcHJldmlldyBsYXllciBpcyB2aXNpYmxlIChhbmQgb24gYWxsIHBsYXRmb3JtcyBidXQgYnJvd3NlciwgdGhlIG5hdGl2ZSB3ZWJ2aWV3IGJhY2tncm91bmQgaXMgdHJhbnNwYXJlbnQpLlxuICAgKi9cbiAgc2hvd2luZzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEEgYm9vbGVhbiB2YWx1ZSB3aGljaCBpcyB0cnVlIGlmIFFSU2Nhbm5lciBpcyBhY3RpdmVseSBzY2FubmluZyBmb3IgYSBRUiBjb2RlLlxuICAgKi9cbiAgc2Nhbm5pbmc6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gdmFsdWUgd2hpY2ggaXMgdHJ1ZSBpZiBRUlNjYW5uZXIgaXMgZGlzcGxheWluZyBhIGxpdmUgcHJldmlldyBmcm9tIHRoZSBkZXZpY2UncyBjYW1lcmEuIFNldCB0byBmYWxzZSB3aGVuIHRoZSBwcmV2aWV3IGlzIHBhdXNlZC5cbiAgICovXG4gIHByZXZpZXdpbmc6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gdmFsdWUgd2hpY2ggaXMgdHJ1ZSBpZiB0aGUgbGlnaHQgaXMgZW5hYmxlZC5cbiAgICovXG4gIGxpZ2h0RW5hYmxlZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEEgYm9vbGVhbiB2YWx1ZSB3aGljaCBpcyB0cnVlIG9ubHkgaWYgdGhlIHVzZXJzJyBvcGVyYXRpbmcgc3lzdGVtIGlzIGFibGUgdG8gUVJTY2FubmVyLm9wZW5TZXR0aW5ncygpLlxuICAgKi9cbiAgY2FuT3BlblNldHRpbmdzOiBib29sZWFuO1xuICAvKipcbiAgICogQSBib29sZWFuIHZhbHVlIHdoaWNoIGlzIHRydWUgb25seSBpZiB0aGUgdXNlcnMnIGRldmljZSBjYW4gZW5hYmxlIGEgbGlnaHQgaW4gdGhlIGRpcmVjdGlvbiBvZiB0aGUgY3VycmVudENhbWVyYS5cbiAgICovXG4gIGNhbkVuYWJsZUxpZ2h0OiBib29sZWFuO1xuICAvKipcbiAgICogQSBib29sZWFuIHZhbHVlIHdoaWNoIGlzIHRydWUgb25seSBpZiB0aGUgY3VycmVudCBkZXZpY2UgXCJzaG91bGRcIiBoYXZlIGEgZnJvbnQgY2FtZXJhLlxuICAgKiBUaGUgY2FtZXJhIG1heSBzdGlsbCBub3QgYmUgY2FwdHVyYWJsZSwgd2hpY2ggd291bGQgZW1pdCBlcnJvciBjb2RlIDMsIDQsIG9yIDUgd2hlbiB0aGUgc3dpdGNoIGlzIGF0dGVtcHRlZC5cbiAgICogKE9uIHRoZSBicm93c2VyIHBsYXRmb3JtLCB0aGlzIHZhbHVlIGlzIGZhbHNlIHVudGlsIHRoZSBwcmVwYXJlIG1ldGhvZCBpcyBjYWxsZWQuKVxuICAgKi9cbiAgY2FuQ2hhbmdlQ2FtZXJhOiBib29sZWFuO1xuICAvKipcbiAgICogQSBudW1iZXIgcmVwcmVzZW50aW5nIHRoZSBpbmRleCBvZiB0aGUgY3VycmVudENhbWVyYS4gMCBpcyB0aGUgYmFjayBjYW1lcmEsIDEgaXMgdGhlIGZyb250LlxuICAgKi9cbiAgY3VycmVudENhbWVyYTogbnVtYmVyO1xufVxuXG4vKipcbiAqIEBuYW1lIFFSIFNjYW5uZXJcbiAqIEBjYXBhY2l0b3JpbmNvbXBhdGlibGUgdHJ1ZVxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGZhc3QsIGVuZXJneSBlZmZpY2llbnQsIGhpZ2hseS1jb25maWd1cmFibGUgUVIgY29kZSBzY2FubmVyIGZvciBDb3Jkb3ZhIGFwcHMuXG4gKlxuICogUmVxdWlyZXMgQ29yZG92YSBwbHVnaW46IGBjb3Jkb3ZhLXBsdWdpbi1xcnNjYW5uZXJgLiBGb3IgbW9yZSBpbmZvLCBwbGVhc2Ugc2VlIHRoZSBbUVIgU2Nhbm5lciBwbHVnaW4gZG9jc10oaHR0cHM6Ly9naXRodWIuY29tL2JpdHBheS9jb3Jkb3ZhLXBsdWdpbi1xcnNjYW5uZXIpLlxuICpcbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgUVJTY2FubmVyLCBRUlNjYW5uZXJTdGF0dXMgfSBmcm9tICdAaW9uaWMtbmF0aXZlL3FyLXNjYW5uZXIvbmd4JztcbiAqXG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBxclNjYW5uZXI6IFFSU2Nhbm5lcikgeyB9XG4gKlxuICogLi4uXG4gKlxuICogLy8gT3B0aW9uYWxseSByZXF1ZXN0IHRoZSBwZXJtaXNzaW9uIGVhcmx5XG4gKiB0aGlzLnFyU2Nhbm5lci5wcmVwYXJlKClcbiAqICAgLnRoZW4oKHN0YXR1czogUVJTY2FubmVyU3RhdHVzKSA9PiB7XG4gKiAgICAgIGlmIChzdGF0dXMuYXV0aG9yaXplZCkge1xuICogICAgICAgIC8vIGNhbWVyYSBwZXJtaXNzaW9uIHdhcyBncmFudGVkXG4gKlxuICpcbiAqICAgICAgICAvLyBzdGFydCBzY2FubmluZ1xuICogICAgICAgIGxldCBzY2FuU3ViID0gdGhpcy5xclNjYW5uZXIuc2NhbigpLnN1YnNjcmliZSgodGV4dDogc3RyaW5nKSA9PiB7XG4gKiAgICAgICAgICBjb25zb2xlLmxvZygnU2Nhbm5lZCBzb21ldGhpbmcnLCB0ZXh0KTtcbiAqXG4gKiAgICAgICAgICB0aGlzLnFyU2Nhbm5lci5oaWRlKCk7IC8vIGhpZGUgY2FtZXJhIHByZXZpZXdcbiAqICAgICAgICAgIHNjYW5TdWIudW5zdWJzY3JpYmUoKTsgLy8gc3RvcCBzY2FubmluZ1xuICogICAgICAgIH0pO1xuICpcbiAqICAgICAgfSBlbHNlIGlmIChzdGF0dXMuZGVuaWVkKSB7XG4gKiAgICAgICAgLy8gY2FtZXJhIHBlcm1pc3Npb24gd2FzIHBlcm1hbmVudGx5IGRlbmllZFxuICogICAgICAgIC8vIHlvdSBtdXN0IHVzZSBRUlNjYW5uZXIub3BlblNldHRpbmdzKCkgbWV0aG9kIHRvIGd1aWRlIHRoZSB1c2VyIHRvIHRoZSBzZXR0aW5ncyBwYWdlXG4gKiAgICAgICAgLy8gdGhlbiB0aGV5IGNhbiBncmFudCB0aGUgcGVybWlzc2lvbiBmcm9tIHRoZXJlXG4gKiAgICAgIH0gZWxzZSB7XG4gKiAgICAgICAgLy8gcGVybWlzc2lvbiB3YXMgZGVuaWVkLCBidXQgbm90IHBlcm1hbmVudGx5LiBZb3UgY2FuIGFzayBmb3IgcGVybWlzc2lvbiBhZ2FpbiBhdCBhIGxhdGVyIHRpbWUuXG4gKiAgICAgIH1cbiAqICAgfSlcbiAqICAgLmNhdGNoKChlOiBhbnkpID0+IGNvbnNvbGUubG9nKCdFcnJvciBpcycsIGUpKTtcbiAqXG4gKlxuICogYGBgXG4gKiBAaW50ZXJmYWNlc1xuICogUVJTY2FubmVyU3RhdHVzXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnUVJTY2FubmVyJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tcXJzY2FubmVyJyxcbiAgcGx1Z2luUmVmOiAnUVJTY2FubmVyJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9iaXRwYXkvY29yZG92YS1wbHVnaW4tcXJzY2FubmVyJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnQnJvd3NlcicsICdpT1MnLCAnV2luZG93cyddLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRUlNjYW5uZXIgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBSZXF1ZXN0IHBlcm1pc3Npb24gdG8gdXNlIFFSIHNjYW5uZXIuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZScsXG4gIH0pXG4gIHByZXBhcmUoKTogUHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB0aGlzIG1ldGhvZCB0byBlbmFibGUgc2Nhbm5pbmcuIFlvdSBtdXN0IHRoZW4gY2FsbCB0aGUgYHNob3dgIG1ldGhvZCB0byBtYWtlIHRoZSBjYW1lcmEgcHJldmlldyB2aXNpYmxlLlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPHN0cmluZz59IHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBzY2FubmVkIHRleHQuIFVuc3Vic2NyaWJlIGZyb20gdGhlIG9ic2VydmFibGUgdG8gc3RvcCBzY2FubmluZy5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZScsXG4gICAgb2JzZXJ2YWJsZTogdHJ1ZSxcbiAgICBjbGVhckZ1bmN0aW9uOiAnY2FuY2VsU2NhbicsXG4gIH0pXG4gIHNjYW4oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlcyB0aGUgbmF0aXZlIHdlYnZpZXcgdG8gaGF2ZSBhIHRyYW5zcGFyZW50IGJhY2tncm91bmQsIHRoZW4gc2V0cyB0aGUgYmFja2dyb3VuZCBvZiB0aGUgPGJvZHk+IGFuZCA8aHRtbD4gRE9NIGVsZW1lbnRzIHRvIHRyYW5zcGFyZW50LCBhbGxvd2luZyB0aGUgd2VidmlldyB0byByZS1yZW5kZXIgd2l0aCB0aGUgdHJhbnNwYXJlbnQgYmFja2dyb3VuZC5cbiAgICogQHJldHVybnMge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgc2hvdygpOiBQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZSBuYXRpdmUgd2VidmlldyB0byBiZSBvcGFxdWUgd2l0aCBhIHdoaXRlIGJhY2tncm91bmQsIGNvdmVyaW5nIHRoZSB2aWRlbyBwcmV2aWV3LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBoaWRlKCk6IFByb21pc2U8UVJTY2FubmVyU3RhdHVzPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZSB0aGUgZGV2aWNlJ3MgbGlnaHQgKGZvciBzY2FubmluZyBpbiBsb3ctbGlnaHQgZW52aXJvbm1lbnRzKS5cbiAgICogQHJldHVybnMge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZScsXG4gIH0pXG4gIGVuYWJsZUxpZ2h0KCk6IFByb21pc2U8UVJTY2FubmVyU3RhdHVzPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIHNjYW5uZXIgaW5zdGFuY2UuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGRlc3Ryb3koKTogUHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogRGlzYWJsZSB0aGUgZGV2aWNlJ3MgbGlnaHQuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZScsXG4gIH0pXG4gIGRpc2FibGVMaWdodCgpOiBQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgZnJvbnQgY2FtZXJhXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZScsXG4gIH0pXG4gIHVzZUZyb250Q2FtZXJhKCk6IFByb21pc2U8UVJTY2FubmVyU3RhdHVzPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSBiYWNrIGNhbWVyYVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz59XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tTdHlsZTogJ25vZGUnLFxuICB9KVxuICB1c2VCYWNrQ2FtZXJhKCk6IFByb21pc2U8UVJTY2FubmVyU3RhdHVzPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBjYW1lcmEgdG8gYmUgdXNlZC5cbiAgICogQHBhcmFtIGNhbWVyYSB7bnVtYmVyfSBQcm92aWRlIGAwYCBmb3IgYmFjayBjYW1lcmEsIGFuZCBgMWAgZm9yIGZyb250IGNhbWVyYS5cbiAgICogQHJldHVybiB7UHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrU3R5bGU6ICdub2RlJyxcbiAgfSlcbiAgdXNlQ2FtZXJhKGNhbWVyYTogbnVtYmVyKTogUHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogUGF1c2VzIHRoZSB2aWRlbyBwcmV2aWV3IG9uIHRoZSBjdXJyZW50IGZyYW1lIGFuZCBwYXVzZXMgc2Nhbm5pbmcuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgcGF1c2VQcmV2aWV3KCk6IFByb21pc2U8UVJTY2FubmVyU3RhdHVzPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3Vtc2UgdGhlIHZpZGVvIHByZXZpZXcgYW5kIHJlc3VtZXMgc2Nhbm5pbmcuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgcmVzdW1lUHJldmlldygpOiBQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHBlcm1pc3Npb24gc3RhdHVzXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZ2V0U3RhdHVzKCk6IFByb21pc2U8UVJTY2FubmVyU3RhdHVzPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHNldHRpbmdzIHRvIGVkaXQgYXBwIHBlcm1pc3Npb25zLlxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHN5bmM6IHRydWUsXG4gIH0pXG4gIG9wZW5TZXR0aW5ncygpOiB2b2lkIHt9XG59XG4iXX0=

/***/ }),

/***/ 61205:
/*!***************************************************!*\
  !*** ./src/app/home/account/account.component.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccountComponent": function() { return /* binding */ AccountComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_account_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./account.component.html */ 69014);
/* harmony import */ var _account_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account.component.scss */ 39825);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);




let AccountComponent = class AccountComponent {
    constructor() { }
    ngOnInit() { }
};
AccountComponent.ctorParameters = () => [];
AccountComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-account',
        template: _raw_loader_account_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_account_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AccountComponent);



/***/ }),

/***/ 69612:
/*!***************************************************!*\
  !*** ./src/app/home/cash-in/cash-in.component.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CashInComponent": function() { return /* binding */ CashInComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_cash_in_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./cash-in.component.html */ 71493);
/* harmony import */ var _cash_in_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cash-in.component.scss */ 11441);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _techiediaries_ngx_qrcode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @techiediaries/ngx-qrcode */ 89156);





let CashInComponent = class CashInComponent {
    constructor() {
        this.showQRCode = false;
        // We can have Canvas/Img/Url as elementType
        this.elementType = _techiediaries_ngx_qrcode__WEBPACK_IMPORTED_MODULE_2__.NgxQrcodeElementTypes.URL;
        // We can have High/Low/Medium/Quartile
        this.correctionLevel = _techiediaries_ngx_qrcode__WEBPACK_IMPORTED_MODULE_2__.NgxQrcodeErrorCorrectionLevels.HIGH;
        // Need to specify the valid website address
        this.value = '';
        this.amount = '';
    }
    ngOnInit() { }
    showQR() {
        let QRMetaData = {
            account: "this is the account agent needs to pay to",
            amount: this.amount
        };
        this.value = JSON.stringify(QRMetaData);
        this.showQRCode = true;
    }
};
CashInComponent.ctorParameters = () => [];
CashInComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-profile',
        template: _raw_loader_cash_in_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_cash_in_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], CashInComponent);



/***/ }),

/***/ 74014:
/*!*****************************************************!*\
  !*** ./src/app/home/cash-out/cash-out.component.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CashOutComponent": function() { return /* binding */ CashOutComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_cash_out_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./cash-out.component.html */ 15381);
/* harmony import */ var _cash_out_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cash-out.component.scss */ 91142);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/qr-scanner/ngx */ 7160);





let CashOutComponent = class CashOutComponent {
    constructor(qrScanner) {
        this.qrScanner = qrScanner;
    } //
    ngOnInit() {
        this.scanner();
    }
    scanner() {
        this.qrScanner.prepare().then((status) => {
            if (status.authorized) {
                this.qrScanner.show();
                document.getElementsByTagName("body")[0].style.opacity = "0.5";
                this.qrScanner.scan().subscribe((val) => {
                    alert(val);
                    document.getElementsByTagName("body")[0].style.opacity = "1";
                });
            }
            else if (status.denied) {
                //redirect user to settings to allow
            }
            else {
                //redirect user to settings to allow
            }
        });
    }
};
CashOutComponent.ctorParameters = () => [
    { type: _ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__.QRScanner }
];
CashOutComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-cash-out',
        template: _raw_loader_cash_out_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_cash_out_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], CashOutComponent);

/*


*/ 


/***/ }),

/***/ 9997:
/*!*********************************************************!*\
  !*** ./src/app/home/contact-us/contact-us.component.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactUsComponent": function() { return /* binding */ ContactUsComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_contact_us_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./contact-us.component.html */ 88970);
/* harmony import */ var _contact_us_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact-us.component.scss */ 90195);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);




let ContactUsComponent = class ContactUsComponent {
    constructor() { }
    ngOnInit() { }
};
ContactUsComponent.ctorParameters = () => [];
ContactUsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-contact-us',
        template: _raw_loader_contact_us_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_contact_us_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ContactUsComponent);



/***/ }),

/***/ 39065:
/*!*********************************************************!*\
  !*** ./src/app/home/find-agent/find-agent.component.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FindAgentComponent": function() { return /* binding */ FindAgentComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_find_agent_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./find-agent.component.html */ 74700);
/* harmony import */ var _find_agent_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./find-agent.component.scss */ 36116);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);




let FindAgentComponent = class FindAgentComponent {
    constructor() { }
    ngOnInit() { }
    ionViewDidEnter() {
        this.createMap();
    }
    createMap() {
        const boundingRect = this.mapView.nativeElement.getBoundingClientRect();
        console.log(boundingRect);
        // CapacitorGoogleMaps.create({
        // })
    }
};
FindAgentComponent.ctorParameters = () => [];
FindAgentComponent.propDecorators = {
    mapView: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild, args: ['map',] }]
};
FindAgentComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-find-agent',
        template: _raw_loader_find_agent_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_find_agent_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], FindAgentComponent);



/***/ }),

/***/ 52003:
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageRoutingModule": function() { return /* binding */ HomePageRoutingModule; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 62267);




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage,
    },
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    })
], HomePageRoutingModule);



/***/ }),

/***/ 3467:
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": function() { return /* binding */ HomePageModule; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 62267);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-routing.module */ 52003);
/* harmony import */ var _techiediaries_ngx_qrcode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @techiediaries/ngx-qrcode */ 89156);
/* harmony import */ var _ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/qr-scanner/ngx */ 7160);
/* harmony import */ var _cash_in_cash_in_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cash-in/cash-in.component */ 69612);
/* harmony import */ var _cash_out_cash_out_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cash-out/cash-out.component */ 74014);











let HomePageModule = class HomePageModule {
};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule,
            _home_routing_module__WEBPACK_IMPORTED_MODULE_1__.HomePageRoutingModule,
            _techiediaries_ngx_qrcode__WEBPACK_IMPORTED_MODULE_10__.NgxQRCodeModule,
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage, _cash_in_cash_in_component__WEBPACK_IMPORTED_MODULE_3__.CashInComponent, _cash_out_cash_out_component__WEBPACK_IMPORTED_MODULE_4__.CashOutComponent],
        providers: [_ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__.QRScanner]
    })
], HomePageModule);



/***/ }),

/***/ 62267:
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": function() { return /* binding */ HomePage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./home.page.html */ 49764);
/* harmony import */ var _home_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.scss */ 2610);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _models_home_cards_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/home-cards.models */ 40967);
/* harmony import */ var _cash_in_cash_in_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cash-in/cash-in.component */ 69612);
/* harmony import */ var _cash_out_cash_out_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cash-out/cash-out.component */ 74014);








let HomePage = class HomePage {
    constructor(modalController) {
        this.modalController = modalController;
        this.optionCardsFirstRow = _models_home_cards_models__WEBPACK_IMPORTED_MODULE_2__.HomePageCards.slice(0, 3);
        this.optionCardsSecondRow = _models_home_cards_models__WEBPACK_IMPORTED_MODULE_2__.HomePageCards.slice(3, 6);
        this.optionCardsThirdRow = _models_home_cards_models__WEBPACK_IMPORTED_MODULE_2__.HomePageCards.slice(6);
        this.cardRows = [this.optionCardsFirstRow, this.optionCardsSecondRow, this.optionCardsThirdRow];
    }
    onClick(id) {
        let component;
        switch (id) {
            case "cashin":
                component = _cash_in_cash_in_component__WEBPACK_IMPORTED_MODULE_3__.CashInComponent;
                break;
            case "cashout":
                component = _cash_out_cash_out_component__WEBPACK_IMPORTED_MODULE_4__.CashOutComponent;
                break;
        }
        this.displayModal({ component: component });
    }
    displayModal(row) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const account = yield this.modalController.create({
                component: row.component,
                showBackdrop: true,
                cssClass: "my-custom-modal-css",
                backdropDismiss: true,
                swipeToClose: true
            });
            return yield account.present();
        });
    }
};
HomePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController }
];
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-home',
        template: _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_home_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], HomePage);



/***/ }),

/***/ 18075:
/*!*****************************************************!*\
  !*** ./src/app/home/sign-out/sign-out.component.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignOutComponent": function() { return /* binding */ SignOutComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_sign_out_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./sign-out.component.html */ 44017);
/* harmony import */ var _sign_out_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign-out.component.scss */ 90869);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);




let SignOutComponent = class SignOutComponent {
    constructor() { }
    ngOnInit() { }
};
SignOutComponent.ctorParameters = () => [];
SignOutComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-sign-out',
        template: _raw_loader_sign_out_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_sign_out_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], SignOutComponent);



/***/ }),

/***/ 11641:
/*!***********************************************!*\
  !*** ./src/app/home/terms/terms.component.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TermsComponent": function() { return /* binding */ TermsComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_terms_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./terms.component.html */ 31139);
/* harmony import */ var _terms_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./terms.component.scss */ 74024);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);




let TermsComponent = class TermsComponent {
    constructor() { }
    ngOnInit() { }
};
TermsComponent.ctorParameters = () => [];
TermsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-terms',
        template: _raw_loader_terms_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_terms_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], TermsComponent);



/***/ }),

/***/ 57275:
/*!*************************************************************!*\
  !*** ./src/app/home/transactions/transactions.component.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransactionsComponent": function() { return /* binding */ TransactionsComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_transactions_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./transactions.component.html */ 60578);
/* harmony import */ var _transactions_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transactions.component.scss */ 4725);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);




let TransactionsComponent = class TransactionsComponent {
    constructor() { }
    ngOnInit() { }
};
TransactionsComponent.ctorParameters = () => [];
TransactionsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-transactions',
        template: _raw_loader_transactions_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_transactions_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], TransactionsComponent);



/***/ }),

/***/ 79841:
/*!*****************************************************!*\
  !*** ./src/app/home/transfer/transfer.component.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransferComponent": function() { return /* binding */ TransferComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_transfer_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./transfer.component.html */ 69357);
/* harmony import */ var _transfer_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transfer.component.scss */ 38773);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);




let TransferComponent = class TransferComponent {
    constructor() { }
    ngOnInit() { }
};
TransferComponent.ctorParameters = () => [];
TransferComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-transfer',
        template: _raw_loader_transfer_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_transfer_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], TransferComponent);



/***/ }),

/***/ 40967:
/*!*********************************************!*\
  !*** ./src/app/models/home-cards.models.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageCards": function() { return /* binding */ HomePageCards; }
/* harmony export */ });
/* harmony import */ var _home_account_account_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../home/account/account.component */ 61205);
/* harmony import */ var _home_cash_out_cash_out_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../home/cash-out/cash-out.component */ 74014);
/* harmony import */ var _home_contact_us_contact_us_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../home/contact-us/contact-us.component */ 9997);
/* harmony import */ var _home_find_agent_find_agent_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../home/find-agent/find-agent.component */ 39065);
/* harmony import */ var _home_cash_in_cash_in_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../home/cash-in/cash-in.component */ 69612);
/* harmony import */ var _home_sign_out_sign_out_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../home/sign-out/sign-out.component */ 18075);
/* harmony import */ var _home_terms_terms_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../home/terms/terms.component */ 11641);
/* harmony import */ var _home_transactions_transactions_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../home/transactions/transactions.component */ 57275);
/* harmony import */ var _home_transfer_transfer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../home/transfer/transfer.component */ 79841);









const HomePageCards = [
    {
        icon: "locate-outline",
        name: "search agent",
        component: _home_find_agent_find_agent_component__WEBPACK_IMPORTED_MODULE_3__.FindAgentComponent
    },
    {
        icon: "person-outline",
        name: "account",
        component: _home_account_account_component__WEBPACK_IMPORTED_MODULE_0__.AccountComponent
    },
    {
        icon: "file-tray-full-outline",
        name: "transactions",
        component: _home_transactions_transactions_component__WEBPACK_IMPORTED_MODULE_7__.TransactionsComponent
    },
    {
        icon: "wallet-outline",
        name: "cash out",
        component: _home_cash_out_cash_out_component__WEBPACK_IMPORTED_MODULE_1__.CashOutComponent
    },
    {
        icon: "cash-outline",
        name: "remit",
        component: _home_transfer_transfer_component__WEBPACK_IMPORTED_MODULE_8__.TransferComponent
    },
    {
        icon: "card-outline",
        name: "cash in",
        component: _home_cash_in_cash_in_component__WEBPACK_IMPORTED_MODULE_4__.CashInComponent
    },
    {
        icon: "document-text-outline",
        name: "terms",
        component: _home_terms_terms_component__WEBPACK_IMPORTED_MODULE_6__.TermsComponent
    },
    {
        icon: "call-outline",
        name: "contact us",
        component: _home_contact_us_contact_us_component__WEBPACK_IMPORTED_MODULE_2__.ContactUsComponent
    },
    {
        icon: "log-out-outline",
        name: "sign out",
        component: _home_sign_out_sign_out_component__WEBPACK_IMPORTED_MODULE_5__.SignOutComponent
    },
];


/***/ }),

/***/ 39825:
/*!*****************************************************!*\
  !*** ./src/app/home/account/account.component.scss ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhY2NvdW50LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ 11441:
/*!*****************************************************!*\
  !*** ./src/app/home/cash-in/cash-in.component.scss ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYXNoLWluLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ 91142:
/*!*******************************************************!*\
  !*** ./src/app/home/cash-out/cash-out.component.scss ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYXNoLW91dC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ 90195:
/*!***********************************************************!*\
  !*** ./src/app/home/contact-us/contact-us.component.scss ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb250YWN0LXVzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ 36116:
/*!***********************************************************!*\
  !*** ./src/app/home/find-agent/find-agent.component.scss ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmaW5kLWFnZW50LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ 2610:
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#container {\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n#container strong {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container p {\n  font-size: 16px;\n  line-height: 22px;\n  color: #8c8c8c;\n  margin: 0;\n}\n\n#container a {\n  text-decoration: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFFQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUVBLGNBQUE7RUFFQSxTQUFBO0FBRkY7O0FBS0E7RUFDRSxxQkFBQTtBQUZGIiwiZmlsZSI6ImhvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2NvbnRhaW5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xufVxuXG4jY29udGFpbmVyIHN0cm9uZyB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgbGluZS1oZWlnaHQ6IDI2cHg7XG59XG5cbiNjb250YWluZXIgcCB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDIycHg7XG5cbiAgY29sb3I6ICM4YzhjOGM7XG5cbiAgbWFyZ2luOiAwO1xufVxuXG4jY29udGFpbmVyIGEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59Il19 */");

/***/ }),

/***/ 90869:
/*!*******************************************************!*\
  !*** ./src/app/home/sign-out/sign-out.component.scss ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWduLW91dC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ 74024:
/*!*************************************************!*\
  !*** ./src/app/home/terms/terms.component.scss ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0ZXJtcy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ 4725:
/*!***************************************************************!*\
  !*** ./src/app/home/transactions/transactions.component.scss ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0cmFuc2FjdGlvbnMuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ 38773:
/*!*******************************************************!*\
  !*** ./src/app/home/transfer/transfer.component.scss ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0cmFuc2Zlci5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ 69014:
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/account/account.component.html ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  account works!\n</p>\n");

/***/ }),

/***/ 71493:
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/cash-in/cash-in.component.html ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <ion-header>\n  <ion-toolbar translucent>\n    <ion-title></ion-title>\n  </ion-toolbar>\n</ion-header> -->\n<ion-content>\n  <div *ngIf=\"!showQRCode\">\n\n    <ion-card style=\"height: fit-content;\">\n      <ion-card-header>\n        <ion-card-subtitle></ion-card-subtitle>\n        <ion-card-title>Cash-In @ Agent</ion-card-title>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-label>Please enter the cZAR value to cash in</ion-label>\n        <ion-item>\n          <ion-label position=\"floating\">Enter amount</ion-label>\n          <ion-input [(ngClass)]=\"amount\"></ion-input>\n        </ion-item>\n      </ion-card-content>\n    </ion-card>\n  \n    <ion-button (click)=\"showQR()\" expand=\"block\" fill=\"solid\" shape=\"round\">\n      Generate Cash-In QR\n    </ion-button>\n\n  </div>\n\n\n  <div style=\"text-align: center; height: 100%; width: 100%;\" *ngIf=\"showQRCode\">\n    <ion-card>\n      <ion-card-header>\n        <ion-card-subtitle>Allow agent to scan the QR Code</ion-card-subtitle>\n        <br>\n        <ion-card-title>QR Code: </ion-card-title>\n      </ion-card-header>\n      <br>\n      <ion-card-content>\n        <ngx-qrcode\n        [elementType]=\"elementType\"\n        [errorCorrectionLevel]=\"correctionLevel\"\n        [value]=\"value\">\n        </ngx-qrcode>\n      </ion-card-content>\n    </ion-card>\n    \n  \n  </div>\n\n</ion-content>\n\n\n");

/***/ }),

/***/ 15381:
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/cash-out/cash-out.component.html ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  cash-out works!\n</p>\n");

/***/ }),

/***/ 88970:
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/contact-us/contact-us.component.html ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  contact-us works!\n</p>\n");

/***/ }),

/***/ 74700:
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/find-agent/find-agent.component.html ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar translucent>\n    <ion-title></ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <div id=\"map\" #map  style=\"border: 1px; height: 50vh; margin: 20px;\"></div>\n</ion-content>");

/***/ }),

/***/ 49764:
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      CELO CASH AGENT\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"background\">\n  \n  <ion-card style=\"box-shadow: none !important; border: #72c3fb solid 2px; background-color: #72c3fb;\">\n    <ion-card-header>\n      <ion-card-subtitle>Welcome Issa</ion-card-subtitle>\n      <ion-card-title>Account Balance:</ion-card-title>\n      <ion-card-subtitle style=\"text-align: left;\">cZAR: 30</ion-card-subtitle>\n    </ion-card-header>\n    <ion-card-content>\n      <ion-row>\n        <ion-col size=\"6\">\n          <ion-button #cashIn (click)=\"onClick('cashin')\" expand=\"block\" fill=\"solid\" shape=\"round\">\n            cash in\n          </ion-button> \n        </ion-col>\n        <ion-col size=\"6\">\n          <ion-button #cashOut (click)=\"onClick('cashout')\" expand=\"block\" fill=\"solid\" shape=\"round\">\n            cash out\n          </ion-button>\n        </ion-col>\n      </ion-row>  \n    </ion-card-content>\n  </ion-card>\n\n  <ion-grid fixed class=\"ion-no-padding\">\n    <ion-row *ngFor=\"let row of cardRows\" class=\"ion-no-padding\">\n      <ion-col size=\"4\" *ngFor=\"let col of row\" class=\"ion-no-padding\">\n        <ion-card button (click)=\"displayModal(col)\" style=\"height: fit-content;\">\n          <ion-card-content style=\"text-align: center;\">\n            <div>\n              <ion-icon slot=\"start\" name=\"{{col.icon}}\" size=\"large\"></ion-icon>\n            </div>\n            <ion-label>{{col.name}}</ion-label>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>  \n    </ion-row>  \n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n  </ion-toolbar>\n</ion-footer>\n\n<style>\n  ion-content.background{\n    --background: url(../../assets/img/app_background.jpg) 0 0/100% 100% no-repeat;\n  }\n</style>\n\n");

/***/ }),

/***/ 44017:
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/sign-out/sign-out.component.html ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  sign-out works!\n</p>\n");

/***/ }),

/***/ 31139:
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/terms/terms.component.html ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n  <h1>Terms and Conditions</h1>\n<p>Last updated: November 20, 2021</p>\n<p>Please read these terms and conditions carefully before using Our Service.</p>\n<h1>Interpretation and Definitions</h1>\n<h2>Interpretation</h2>\n<p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>\n<h2>Definitions</h2>\n<p>For the purposes of these Terms and Conditions:</p>\n<ul>\n<li>\n<p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>\n</li>\n<li>\n<p><strong>Country</strong> refers to:  South Africa</p>\n</li>\n<li>\n<p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Celo Cash Agent.</p>\n</li>\n<li>\n<p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>\n</li>\n<li>\n<p><strong>Service</strong> refers to the Website.</p>\n</li>\n<li>\n<p><strong>Terms and Conditions</strong> (also referred as &quot;Terms&quot;) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement has been created with the help of the <a href=\"https://www.termsfeed.com/terms-conditions-generator/\" target=\"_blank\">Terms and Conditions Generator</a>.</p>\n</li>\n<li>\n<p><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</p>\n</li>\n<li>\n<p><strong>Website</strong> refers to Celo Cash Agent, accessible from <a href=\"http://celocashagent.app\" rel=\"external nofollow noopener\" target=\"_blank\">http://celocashagent.app</a></p>\n</li>\n<li>\n<p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>\n</li>\n</ul>\n<h1>Acknowledgment</h1>\n<p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>\n<p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>\n<p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>\n<p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>\n<p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</p>\n<h1>Links to Other Websites</h1>\n<p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>\n<p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>\n<p>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>\n<h1>Termination</h1>\n<p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>\n<p>Upon termination, Your right to use the Service will cease immediately.</p>\n<h1>Limitation of Liability</h1>\n<p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>\n<p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>\n<p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>\n<h1>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h1>\n<p>The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>\n<p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>\n<p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>\n<h1>Governing Law</h1>\n<p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>\n<h1>Disputes Resolution</h1>\n<p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>\n<h1>For European Union (EU) Users</h1>\n<p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.</p>\n<h1>United States Legal Compliance</h1>\n<p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>\n<h1>Severability and Waiver</h1>\n<h2>Severability</h2>\n<p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>\n<h2>Waiver</h2>\n<p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.</p>\n<h1>Translation Interpretation</h1>\n<p>These Terms and Conditions may have been translated if We have made them available to You on our Service.\nYou agree that the original English text shall prevail in the case of a dispute.</p>\n<h1>Changes to These Terms and Conditions</h1>\n<p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>\n<p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>\n<h1>Contact Us</h1>\n<p>If you have any questions about these Terms and Conditions, You can contact us:</p>\n<ul>\n<li>By email: issa@celocashagent.app</li>\n</ul>\n</ion-content>\n");

/***/ }),

/***/ 60578:
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/transactions/transactions.component.html ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  transactions works!\n</p>\n");

/***/ }),

/***/ 69357:
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/transfer/transfer.component.html ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  transfer works!\n</p>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_home_home_module_ts-es2015.js.map