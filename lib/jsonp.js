'use strict';

const debug = require('debug')('koa-jsonp');
const assert = require('assert');

const defaultOptions = {
    callbackFn: 'callback'
};

module.exports = jsonp;

function jsonp(app, options = {}) {
    assert(app && app.constructor.name === 'Application', 'app is must be an instance of koa');

    const opts = Object.assign({}, defaultOptions, options);
    const callbackFn = opts.callbackFn;

    app.context.jsonp = function (data) {
        var callback = this.query[callbackFn];

        if (!callback) {
            return;
        }

        this.type = 'application/json';
        this.body = `${callback}(${JSON.stringify(data)})`;
    }
}