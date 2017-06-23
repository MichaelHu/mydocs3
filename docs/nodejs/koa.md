# koa

> next generation web framework for node.js

> changelog: 1706, 1603


## Resources 

* `site and docs`: <http://koajs.com>
* github: <https://github.com/koajs/koa>
* `available middlewares`: <https://github.com/koajs/koa/wiki>



## Versions

### v3.x.x
* koa `deprecated` Support for `generators` will be removed in v3.

### v2.x.x
> from `2015-10-23`

* `latest`: v2.3.0
* 使用了`ES6`的语法，使用上也有一些区别，比如app必须`new`的方式获得，以为Application使用`class`关键字定义的

### v1.x.x
> from `2015-08-23`


### v0.x.x
> from `2013-11-08`

        


## Installation

> 要求node `>= 7.6.0`，或者`支持ES2015`以及async功能的模式

    nvm install 7
    npm install koa
    node my-koa-app.js



## Koa application

* `koa app`是一个对象，它包含了一系列的中间件函数，这些中间件在响应请求时，按一种`类似堆栈`的方式来组织和执行
* hello world app:

        const Koa = require( 'koa' );
        const app = new Koa();

        app.use( ctx => {
            ctx.body = 'Hello, World!';
        } );

        app.listen( 3000 );



## Middleware Cascading
> 中间件级联

`Connect（另一种使用中间件的框架）`简单地将控制权交给一系列函数来处理，直到函数返回。 `Koa`与之的不同之处在于，当执行到`yield next`语句时，Koa 暂停了该中间件，继续执行下一个符合请求的中间件(`downstream`)，直到向下路径上不再有中间件为止，然后控制权再逐级返回给上层中间件(`upstream`)。

    var koa = require('koa');
    var app = koa();

    // x-response-time
    app.use( function *( next ) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
        this.set( 'X-Response-Time', ms + 'ms' );
    } );

    // logger
    app.use( function *( next ) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
        console.log( '%s %s - %s', this.method, this.url, ms );
    } );

    // response
    app.use( function *() {
        this.body = 'Hello World';
    } );

    app.listen( 3000 );
    console.log( 'Listening on port 3000' );


`Generator`函数运行在app上下文中，可以通过`this.xxx`为上下文添加属性。


## APIs

> 非常`简洁明了`的文档方案，值得借鉴。

    app
        .use()
        .callback()
        .listen()

    Error Handling
        app.on( 'error', ( err, ctx ) => { ... } );

    Context
        .req
        .res
        .request
        .response
        .state
        .app
        .cookies.get()
        .cookies.set()
        .throw()
        .respond

        Request aliases - context中直接引用Request对象的属性，是别名，并非自身属性
            .header
            .headers
            ...
            .ip
            .ips
            .acceptsEncodings()
            .acceptsCharsets()
            .acceptsLanguages()
            .get()

        Response aliases - context中直接引用Response对象的属性，是别名，并非自身属性
            .body
            .status
            .set()
            .append()
            ...
            .remove()
            .lastModified
            .etag

    Request
        ...

    Response
        ...
        



## Middlewares

常用中间件列表，`27个`大类，以下列出部分，具体参考：<https://github.com/koajs/koa/wiki>

    Frameworks
        koa.io

    Middlewares
        kcors                   https://github.com/koajs/cors

    Security
        koa-ip-filter           https://github.com/tunnckoCore/koa-ip-filter

    Body Parsing
        + koa-body              https://github.com/dlau/koa-body
        + koa-better-body       https://github.com/tunnckoCore/koa-better-body

            'use strict'

            var app = require('koa')()
            var body = require('koa-better-body')
            var router = require('koa-router')()

            router.post('/upload', body(), function * (next) {
                console.log(this.request.files)
                console.log(this.request.fields)

                // there's no `.body` when `multipart`,
                // `urlencoded` or `json` request
                console.log(this.request.body)

                // print it to the API requester
                this.body = JSON.stringify({
                    fields: this.request.fields,
                    files: this.request.files,
                    body: this.request.body || null
                }, null, 2)

                yield next
            })

            app.use(router.routes())
            app.listen(4292)

    Parameter Validation
        koa-better-router
        koa-rest-router

    Vhost
        koa-vhost

    Routing and Mounting
        koa-better-router
        koa-simple-router

    Documentation
        koa-docs

    File Serving
        koa-serve
        koa-send
        koa-file-server
        koa-static-server
        koa-static

    SPDY
        koa-file-server

    HTTP2
        koa-server-push

    JSON and JSONP Responses
        koa-jsonp
        koa-response-jsonp

    Compression
        koa-compress
        koa-gzip
        koa-minify
        koa-uglify2

    Caching
        koa-cache-lite
        koa-fresh
        koa-etag
        koa-conditional-get

    Authentication
        koa-basic-auth
        koa-passport
        koa-jwt ( JSON Web Tokens )

    Sessions
        koa-session
        koa-csrf
        koa-session2

    Templating
        koa-nunjucks-next
        koa-jade
        koa-ejs
        koa-views

    Services
        koa-mongo
        koa-redis-pool
        koa-mongoose

    CSS Preprocessor
        koa.sass
        koa-stylus
        koa-less
        koa-postcss

    Livereload
        koa-livereload

    Error reporting
        koa-error
        koa-json-error

    Logging
        koa-logger
        concurrency-logger
        + koa-mongolog                  https://github.com/coderaiser/koa-mongolog 

    Metrics
        koa-response-time

    Analytics
        koa-analytics

    i18n or L10n
        koa-local
        koa-i18n

    Response Transformation
        koa-response-censor
        koa-res

    Utilities
        koa-compose
        koa-convert
        koa-ignore
        koa-useragent




## error解析

> TypeError: You may only yield a function, promise, generator, array, or object, but the following object was passed: "[object Object]"

    router.get( '/hello', function *( next ) {
        yield * next;
        this.body = yield this.mongo.db( 'myproject' )
            .collection( 'documents' )
            // .find().limit( 10 );
            .find().limit( 10 ).toArray();
    });

`yield`后面只`允许`跟的`类型`为： `function`, `promise`, `generator`, `array` 或者 `object`。
所以以上例子中，`limit(10)`后面需要使用游标函数`toArray()`，否则会出现以上错误。



