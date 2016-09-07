'use strict';

const debug = require('debug')('koa-jsonp');
const assert = require('assert');

const defaultOptions = {
    callbackFn: 'callback'
};

module.exports = jsonp;

function jsonp(app, options = {}) {
    assert(app && app.constructor.name === 'Application', 'app is must be an instance of koa');

    options = Object.assign({}, options, defaultOptions);

    var callbackFn = options.callbackFn;

    app.context.jsonp = function (data) {
        var callback = this.query[callbackFn];

        if (!callback) {
            return;
        }

        this.type = 'application/json';
        this.body = `${callback}(${JSON.stringify(data)})`;
    }
}