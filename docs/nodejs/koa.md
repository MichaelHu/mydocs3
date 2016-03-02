# Koa Memo


http://koa.bootcss.com

https://github.com/koajs/koa

https://github.com/koajs/koa/wiki

中间件级联：Connect 简单地将控制权交给一系列函数来处理，直到函数返回。 与之不同，当执行到 yield next 语句时，Koa 暂停了该中间件，继续执行下一个符合请求的中间件(`downstrem`)，然后控制权再逐级返回给上层中间件(`upstream`)。



    var koa = require('koa');
    var app = koa();

    // x-response-time

    app.use(function *(next){
      var start = new Date;
      yield next;
      var ms = new Date - start;
      this.set('X-Response-Time', ms + 'ms');
    });

    // logger

    app.use(function *(next){
      var start = new Date;
      yield next;
      var ms = new Date - start;
      console.log('%s %s - %s', this.method, this.url, ms);
    });

    // response

    app.use(function *(){
      this.body = 'Hello World';
    });

    app.listen(3000);

    console.log('Listening on port 3000');


Generator函数运行在app上下文中，可以通过`this.xxx`为上下文添加属性。


> TypeError: You may only yield a function, promise, generator, array, or object, but the following object was passed: "[object Object]"

    router.get('/hello', function *(next) {
        yield * next;
        this.body = yield this.mongo.db('myproject')
            .collection('documents')
            // .find().limit(10);
            .find().limit(10).toArray();
    });

yield后面只允许跟的类型为： function, promise, generator, array 或者 object。
所以以上例子中，`limit(10)`后面需要使用游标函数`toArray()`，否则会出现以上错误。



