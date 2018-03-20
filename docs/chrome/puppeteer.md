# puppeteer

> Headless Chrome Node API

## Resources

* github: <https://github.com/GoogleChrome/puppeteer> <iframe src="http://258i.com/gbtn.html?user=GoogleChrome&repo=puppeteer&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* API Docs: <https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md>
* Chrome DevTools Protocols: <https://chromedevtools.github.io/devtools-protocol/tot/Emulation>


## Features

* 是一个 Node Library，提供高级API用于控制`headless Chrome`或通过DevTools Protocol控制`Chromium`
* `能做什么`？总结一下就是很多你可以在浏览器中手工完成的操作，都可以在Puppeteer里自动完成，包括但不限于：
    * 生成`页面快照`或PDF
    * 爬取SPA并生成预渲染内容( i.e. SSR )
    * 自动化`表单提交`，`UI测试`以及`键盘输入`等
    * 创建最新的自动化测试环境
    * 获取页面`时间线`以分析页面性能


## Tips

* API文档比较全面，编写代码时可多多参考
* 所有puppeteer API都是node与Headless Chrome的交互，都是异步进行的
* Node最低支持版本v6.4.0，最好使用高于`v7.6.0`的版本，以支持更好的异步编程方式( async/await )



## Installation

    # npm
    npm i --save puppeteer

    # yarn
    yarn add puppeteer

* 安装过程中，会自动下载`Chromium`
* 若要跳过自动下载Chromium，可以设置环境变量`PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`以关闭自动下载，更多环境变量参考<https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables>


## APIs

### Page

    class: Page
    extends: EventEmitter
    event: 'console'
    event: 'dialog'
    event: 'domcontentloaded'
    event: 'error'
    event: 'frameattached'
    event: 'framedetached'
    event: 'framenavigated'
    event: 'load'
    event: 'metrics'
    event: 'pageerror'
    event: 'request'
    event: 'requestfailed'
    event: 'requestfinished'
    event: 'response'
    page.$(selector)
    page.$$(selector)
    page.$$eval(selector, pageFunction[, ...args])
    page.$eval(selector, pageFunction[, ...args])
    page.$x(expression)
    page.addScriptTag(options)
    page.addStyleTag(options)
    page.authenticate(credentials)
    page.bringToFront()
    page.click(selector[, options])
    page.close()
    page.content()
    page.cookies(...urls)
    page.coverage
    page.deleteCookie(...cookies)
    page.emulate(options)
    page.setUserAgent(userAgent)
    page.setViewport(viewport)
    page.emulateMedia(mediaType)
    page.evaluate(pageFunction, ...args)
    page.evaluateHandle(pageFunction, ...args)
    page.evaluateOnNewDocument(pageFunction, ...args)
    page.exposeFunction(name, puppeteerFunction)
    page.focus(selector)
    page.frames()
    page.goBack(options)
    page.goForward(options)
    page.goto(url, options)
    page.hover(selector)
    page.keyboard
    page.mainFrame()
    page.metrics()
    page.mouse
    page.pdf(options)
        page.pdf({width: 100}) - prints with width set to 100 pixels
        page.pdf({width: '100px'}) - prints with width set to 100 pixels
        page.pdf({width: '10cm'}) - prints with width set to 10 centimeters.
    page.queryObjects(prototypeHandle)
    page.reload(options)
    page.screenshot([options])
    page.select(selector, ...values)
        page.select('select#colors', 'blue'); // single selection
        page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
    page.setCacheEnabled(enabled)
    page.setContent(html)
    page.setCookie(...cookies)
    page.setDefaultNavigationTimeout(timeout)
    page.goto(url, options)
    page.goBack(options)
    page.goForward(options)
    page.reload(options)
    page.waitForNavigation(options)
    page.setExtraHTTPHeaders(headers)
    page.setJavaScriptEnabled(enabled)
    page.setOfflineMode(enabled)
    page.setRequestInterception(value)
    page.setUserAgent(userAgent)
    page.setViewport(viewport)
    page.tap(selector)
    page.target()
    page.title()
    page.touchscreen
    page.tracing
    page.type(selector, text[, options])
        page.type('#mytextarea', 'Hello'); // Types instantly
        page.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
    page.url()
    page.viewport()
    page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])
    page.waitForFunction(pageFunction[, options[, ...args]])
    page.waitForNavigation(options)
    page.waitForSelector(selector[, options])
    page.waitForXPath(xpath[, options])

