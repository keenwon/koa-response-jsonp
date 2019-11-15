# koa-response-jsonp

[![NPM version][npm-image]][npm-url]
[![Node version][node-image]][node-url]
[![Build Status][github-actions-image]][github-actions-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![npm download][download-image]][download-url]

koa jsonp middleware

## Install

```shell
npm install koa-response-jsonp --save
```

## Usage

```javascript
const Koa = require('koa');
const app = new Koa();
const jsonp = require('koa-response-jsonp');

jsonp(app);

app.use(async ctx => {
	ctx.jsonp({
		success: true
	});
});

app.listen(3000);
```

then you request `http://localhost:3000?callback=fn` will response:

```javascript
fn({"success":true})
```

custom callback functoin name:

```javascript
jsonp(app, {
	callbackFn: 'cb'
});
```


[npm-image]: https://img.shields.io/npm/v/koa-response-jsonp.svg
[npm-url]: https://www.npmjs.com/package/koa-response-jsonp
[node-image]: https://img.shields.io/node/v/koa-response-jsonp.svg
[node-url]: https://nodejs.org
[github-actions-image]: https://github.com/keenwon/koa-response-jsonp/workflows/unittest/badge.svg
[github-actions-url]: https://github.com/keenwon/koa-response-jsonp/actions
[coveralls-image]: https://img.shields.io/codecov/c/github/keenwon/koa-response-jsonp
[coveralls-url]: https://codecov.io/gh/keenwon/koa-response-jsonp
[download-image]: https://img.shields.io/npm/dm/koa-response-jsonp.svg
[download-url]: https://npmjs.org/package/koa-response-jsonp
