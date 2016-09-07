'use strict';

const koa = require('koa');
const fetch = require('node-fetch');
const jsonp = require('../lib/jsonp');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

describe('koa-json测试', function () {

    afterEach(function () {
        this.server && this.server.close();
    });

    it('不传入app', function () {
        (function () {
            jsonp();
        }).should.throw('app is must be an instance of koa');
    });

    it('传入错误参数', function () {
        function Test() {
        }

        (function () {
            jsonp(new Test());
        }).should.throw('app is must be an instance of koa');
    });

    it('测试返回数据', function () {
        const app = koa();

        jsonp(app);

        app.use(function *() {
            return this.jsonp({
                success: true
            });
        });

        this.server = app.listen(8888);

        return fetch('http://localhost:8888?callback=fn')
            .then(response => response.text())
            .should
            .eventually
            .equal('fn({"success":true})');
    });

    it('测试返回类型', function (done) {
        const app = koa();

        jsonp(app);

        app.use(function *() {
            return this.jsonp({
                success: true
            });
        });

        this.server = app.listen(8888);

        fetch('http://localhost:8888?callback=fn')
            .then(response => {
                response.headers.get('content-type')
                    .should
                    .be
                    .include('application/json');
                done();
            });
    });

    it('callback测试:不指定callback', function () {
        const app = koa();

        jsonp(app);

        app.use(function *() {
            return this.jsonp({
                success: true
            });
        });

        this.server = app.listen(8888);

        return fetch('http://localhost:8888')
            .then(response => response.text())
            .should
            .eventually
            .equal('Not Found');
    });

    it('callback测试:自定义callback', function () {
        const app = koa();

        jsonp(app, {
            callbackFn: 'cb'
        });

        app.use(function *() {
            return this.jsonp({
                success: true
            });
        });

        this.server = app.listen(8888);

        return fetch('http://localhost:8888?cb=fn')
            .then(response => response.text())
            .should
            .eventually
            .equal('fn({"success":true})');
    });

    it('测试请求类型非get', function () {
        const app = koa();

        jsonp(app);

        app.use(function *() {
            return this.jsonp({
                success: true
            });
        });

        this.server = app.listen(8888);

        return fetch('http://localhost:8888?cb=fn', { method: 'POST' })
            .then(response => response.text())
            .should
            .eventually
            .equal('Not Found');
    });

});