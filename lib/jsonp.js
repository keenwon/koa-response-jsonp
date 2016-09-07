'use strict';

const debug = require('debug')('koa-jsonp');
const assert = require('assert');

const defaultcallbackFn = 'callback';

module.exports = jsonp;

function jsonp(app, options = {}) {
    assert(app && app.constructor.name === 'Application', 'app is must be an instance of koa');

    var callbackFn;
    if (options.callbackFn) {
        assert(isString(options.callbackFn), 'callbackFn must be string');
        callbackFn = options.callbackFn;
    } else {
        callbackFn = defaultcallbackFn;
    }

    app.context.jsonp = function (data) {
        var callback = this.query[callbackFn];

        if (this.method !== 'GET' || !callback) {
            return;
        }

        this.type = 'application/json';
        this.body = `${callback}(${JSON.stringify(data)})`;
    }
}

function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
}