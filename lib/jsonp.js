'use strict'

const debug = require('debug')('koa-jsonp')
const assert = require('assert')

const defaultcallbackFn = 'callback'

module.exports = jsonp

function jsonp (app, options = {}) {
  assert(app && app.constructor.name === 'Application', 'app is must be an instance of koa')

  let callbackFn
  if (options.callbackFn) {
    assert(isString(options.callbackFn), 'callbackFn must be string')
    callbackFn = options.callbackFn
  } else {
    callbackFn = defaultcallbackFn
  }

  debug(`callback function name: ${callbackFn}`)

  app.context.jsonp = function (data) {
    const callback = this.query[callbackFn]

    const contentType = 'application/json'

    if (this.method !== 'GET') {
      debug('the request mehtod is not "GET", return.')
      return
    }

    if (!callback) {
      debug(`${callbackFn} is undefined, return.`)
      return
    }

    const response = `${callback}(${JSON.stringify(data)})`

    this.type = contentType
    this.body = response

    debug(`response: ${response}`)
  }
}

function isString (str) {
  return Object.prototype.toString.call(str) === '[object String]'
}
