# koa-response-jsonp

koa jsonp middleware

## Install

```shell
npm install koa-response-jsonp --save
```

## Usage

```javascript
const koa = require('koa');
const app = koa();
const jsonp = require('koa-response-jsonp');

jsonp(app);

app.use(function *() {
	this.jsonp({
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