# exception report

> 前端异常监控

## 参考

* 前端代码异常日志手机与监控：<http://www.cnblogs.com/hustskyking/p/fe-monitor.html>
* network-error-logging: <https://www.w3.org/TR/network-error-logging/>


## 异常分类

* 网络错误
* 脚本错误
* 逻辑错误


## 方案

### window.onerror

* 埋点位置，尽量在最前面
* 违反安全策略不报详细错误
* 缓存脚本不报详细错误

### try-catch

适合于主动捕获异常的方案




## 需要考虑的方面

* `crossorigin` attribute
* `Access-Control-Allow-Origin: *`
* 错误`日志格式`，能帮助工程师快速定位源码位置
* 错误日志采集，采样率
* 错误报警


