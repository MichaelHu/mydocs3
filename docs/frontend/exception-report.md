# exception report

> 前端异常监控

## 参考文章分析

* `+` 170504 前端一站式异常解决方案 <http://jixianqianduan.com>

    `github`: <https://github.com/ouvens/tryjs>
        1. tryjs，通过封装函数进行try-catch方式的捕获
        2. 针对React的异常捕获实现了一个方案，不足之处是不能全部捕获
    
* 160908 构建可靠的前端异常监控服务-采集篇 <http://jdc.jd.com/archives/2175>
        对window.onerror的兼容性有详细解读        
* atatus React错误和性能监控 <https://www.atatus.com/getting-started/react>
        提供收费服务，针对React，收集性能与异常，看看即可
* 150820 前端代码异常日志手机与监控：<http://www.cnblogs.com/hustskyking/p/fe-monitor.html>
        比较全面阐述了onerror和try-catch的方法及其原理
        onerror不会由于多次注册（使用addEventListener）而被调用多次
* `+` 141106 前端代码异常监控 <http://rapheal.sinaapp.com/2014/11/06/javascript-error-monitor/>

        使用uglifyjs的词法分析，对文件块和function块进行了try-catch封装，提供块号，助于后续分析
        详细分析了window.onerror和try-catch的区别，给出了onerror监控的方案，适合非低版本IE浏览器

    `onerror`方案，比较全面，包含尝试使用`arguments.callee`向上追溯，获取调用栈：

        window.onerror = function( msg, url, line, col, error ) {
            // 没有URL不上报！上报也不知道错误
            if ( msg != "Script error." && !url ) {
                return true;
            }
            // 采用异步的方式
            // 我遇到过在window.onunload进行ajax的堵塞上报
            // 由于客户端强制关闭webview导致这次堵塞上报有Network Error
            // 我猜测这里window.onerror的执行流在关闭前是必然执行的
            // 而离开文章之后的上报对于业务来说是可丢失的
            // 所以我把这里的执行流放到异步事件去执行
            // 脚本的异常数降低了10倍
            setTimeout( function() {
                var data = {};
                // 不一定所有浏览器都支持col参数
                col = col || (window.event && window.event.errorCharacter) || 0;
         
                data.url = url;
                data.line = line;
                data.col = col;
                if ( !!error && !!error.stack ){
                    // 如果浏览器有堆栈信息
                    // 直接使用
                    data.msg = error.stack.toString();
                } else if ( !!arguments.callee ) {
                    // 尝试通过callee拿堆栈信息
                    var ext = [];
                    var f = arguments.callee.caller, c = 3;
                    // 这里只拿三层堆栈信息
                    while ( f && ( --c > 0 ) ) {
                       ext.push( f.toString() );
                       if ( f === f.caller ) {
                            break; // 如果有环
                       }
                       f = f.caller;
                    }
                    ext = ext.join( "," );
                    data.msg = ext;
                }
                // 把data上报到后台！
            }, 0 );
         
            return true;
        };

* 140304 前端相关数据监控 <http://www.alloyteam.com/2014/03/front-end-data-monitoring/>
        简单介绍前端错误捕获（window.onerror)
        performance API检测页面性能
        js／css加载时间监测方法
        其发送数据的方法为GET IMAGE方法
* `+` 140112 JS stacktraces. The good, the bad, and the ugly. <https://blog.bugsnag.com/js-stacktraces/>
        1. 提出一种自动化封装try-catch的方案，通过对addEventListener
            和removeEventListener进行更改达到自动化方法，但对独占方式绑定的方式无效
        2. 使用arguments.callee.caller获取调用栈的方法 
* 131018 javascript-error-logging <https://github.com/sap1ens/javascript-error-logging>
        提供使用window.onerror的方式进行前端异常监控的开源实现
* `+` 121127 构建web前端异常监控系统–FdSafe <http://t.cn/zlrr0RP>
        提出使用自动化try-catch封装对象方法的思路
* network-error-logging: <https://www.w3.org/TR/network-error-logging/>

    w3c对网络错误日志的规范草案，提出NEL头部，以及传输协议，示例如下：

        {
          "nel-report": [
              {
                "uri": "https://www.example.com/resource",
                "referrer": "https://referrer.com/",
                "server-ip": "123.122.121.120",
                "elapsed-time": 321,
                "age": 0,
                "type": "tcp.aborted"
              }
            ]
        }

    对本文帮助不大。

* 161020 浏览器端 JavaScript 异常监控 For Dummies <http://2016.qconshanghai.com/presentation/3068>
        提出使用Babel AST，转换js用try-catch封装，主动捕获异常
        使用sourcemap，对获取到的异常信息找到对应源码，方便查看


## 异常分类

* 网络错误 try-catch主动捕获
* 静态脚本错误 onerror全局捕获
* 运行时错误 try-catch + onerror
    * `同步`脚本运行时错误
    * `异步`脚本运行时错误


## 方案分析
> 主要为`onerror`和`try-catch`两种方案

### window.onerror

* 能捕获静态代码报错，以及运行时错误，以及其他未被捕获的`全局错误`
* `eval`表达式`内部执行错误`可以被捕获，但是获取不到具体错误信息，此时url为空
* 埋点位置，尽量在最前面
* 违反安全策略不报详细错误
* 缓存脚本不报详细错误
* 适当设计和编码，能获取到出错的信息、堆栈、出错文件、行号、列号

### try-catch

* 不能捕获静态代码报错，能捕获其所包围部分的运行时错误
* 能获取到出错的信息、堆栈、出错文件、行号、列号
* 适合于主动捕获异常的方案
* 全部署，需要大面积修改代码增加try-catch，对已有try-catch代码，需要在catch部分增加错误报告逻辑



## 可能的方案

* 使用优化的`window.onerror`方案，尽可能少的入侵现有代码
* 使用`ast转化技术`针对eval表达式，封装成try-catch
* 配合`sourcemap`，解析针对压缩代码的错误信息



## 需要考虑的方面

* script标签的 `crossorigin` attribute
* `Access-Control-Allow-Origin: *`
* 错误`日志格式`，能帮助工程师快速定位源码位置
* 错误日志采集，采样率
* 错误报警


