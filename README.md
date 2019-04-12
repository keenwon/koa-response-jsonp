# koa-response-jsonp

[![NPM version][npm-image]][npm-url]
[![Node version][node-image]][node-url]
[![Build Status][travis-image]][travis-url]
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


[npm-image]: https://img.shields.io/npm/v/koa-response-jsonp.svg?style=flat-square&maxAge=3600
[npm-url]: https://www.npmjs.com/package/koa-response-jsonp
[node-image]: https://img.shields.io/node/v/koa-response-jsonp.svg?style=flat-square&maxAge=3600
[node-url]: https://nodejs.org
[travis-image]: https://img.shields.io/travis/keenwon/koa-response-jsonp.svg?style=flat-square&maxAge=3600
[travis-url]: https://travis-ci.org/keenwon/koa-response-jsonp
[coveralls-image]: https://img.shields.io/coveralls/keenwon/koa-response-jsonp.svg?style=flat-square&maxAge=3600
[coveralls-url]: https://coveralls.io/github/keenwon/koa-response-jsonp?branch=master
[download-image]: https://img.shields.io/npm/dm/koa-response-jsonp.svg?style=flat-square&maxAge=3600
[download-url]: https://npmjs.org/package/koa-response-jsonp
