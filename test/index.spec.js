'use strict'

const Koa = require('koa')
const fetch = require('node-fetch')
const getPort = require('get-port')
const jsonp = require('../lib/jsonp')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.should()
chai.use(chaiAsPromised)

describe('koa-json测试', function () {
  afterEach(function () {
    this.server && this.server.close()
  })

  it('不传入app', function () {
    ;(function () {
      jsonp()
    }.should.throw('app is must be an instance of koa'))
  })

  it('传入错误参数', function () {
    function Test () {}

    ;(function () {
      jsonp(new Test())
    }.should.throw('app is must be an instance of koa'))
  })

  it('测试返回数据', async function () {
    const port = await getPort()
    const app = new Koa()

    jsonp(app)

    app.use(async ctx => {
      return ctx.jsonp({
        success: true
      })
    })

    this.server = app.listen(port)

    return fetch(`http://localhost:${port}?callback=fn`)
      .then(response => response.text())
      .should.eventually.equal('fn({"success":true})')
  })

  it('测试返回类型', async function () {
    const port = await getPort()
    const app = new Koa()

    jsonp(app)

    app.use(async ctx => {
      return ctx.jsonp({
        success: true
      })
    })

    this.server = app.listen(port)

    const response = await fetch(`http://localhost:${port}?callback=fn`)

    return response.headers.get('content-type').should.be.include('application/json')
  })

  it('callback测试:不指定callback', async function () {
    const port = await getPort()
    const app = new Koa()

    jsonp(app)

    app.use(async ctx => {
      return ctx.jsonp({
        success: true
      })
    })

    this.server = app.listen(port)

    return fetch(`http://localhost:${port}`)
      .then(response => response.text())
      .should.eventually.equal('Not Found')
  })

  it('callback测试:callback类型错误', function () {
    ;(function () {
      const app = new Koa()

      jsonp(app, {
        callbackFn: true
      })
    }.should.throw('callbackFn must be string'))
  })

  it('callback测试:自定义callback', async function () {
    const port = await getPort()
    const app = new Koa()

    jsonp(app, {
      callbackFn: 'cb'
    })

    app.use(async ctx => {
      return ctx.jsonp({
        success: true
      })
    })

    this.server = app.listen(port)

    return fetch(`http://localhost:${port}?cb=fn`)
      .then(response => response.text())
      .should.eventually.equal('fn({"success":true})')
  })

  it('测试请求类型非get', async function () {
    const port = await getPort()
    const app = new Koa()

    jsonp(app)

    app.use(async ctx => {
      return ctx.jsonp({
        success: true
      })
    })

    this.server = app.listen(port)

    return fetch(`http://localhost:${port}?cb=fn`, { method: 'POST' })
      .then(response => response.text())
      .should.eventually.equal('Not Found')
  })
})
