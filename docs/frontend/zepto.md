# zepto

## Features

* `极简派( minimalist )`风格的JavaScript库
* 兼容`jQuery`的API接口风格
* 支持模块`自定义`构建
* 但不支持`*MD` target的配置，默认只支持`AMD`和`Global`方式输出

## Resources

* site: <http://zeptojs.com>
* github: <https://github.com/madrobby/zepto> <iframe src="http://258i.com/gbtn.html?user=madrobby&repo=zepto&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* `jQuery` - <ref://./jquery.md.html>

## Versions

* `1.2.0` Latest 2016-07-14
* ...
* `1.1` 2013-12-05
* `1.0 RC1` Pre-release
* ...
* `0.1.1` 2010-12-01


## Modules

    module	    description
    ================================================================================
    zepto	    √ Core module; contains most methods
    event	    √ Event handling via on() & off()
    ajax	    √ XMLHttpRequest and JSONP functionality
    form	    √ Serialize & submit web forms
    ie	        √ Support for Internet Explorer 10+ on the desktop and Windows Phone 8
    detect		Provides $.os and $.browser information
    fx		    The animate() method
    fx_methods	Animated show, hide, toggle, and fade*() methods.
    assets		Experimental support for cleaning up iOS memory after removing 
                image elements from the DOM.
    data		A full-blown data() method, capable of storing arbitrary objects in memory.
    deferred	Provides $.Deferred promises API. Depends on the "callbacks" module.
    callbacks	Provides $.Callbacks for use in "deferred" module.
    selector	Experimental jQuery CSS extensions support for functionality such 
                as $('div:first') and el.is(':visible').
    touch		Fires tap– and swipe–related events on touch devices. This works 
                with both `touch` (iOS, Android) and `pointer` events (Windows Phone).
    gesture		Fires pinch gesture events on touch devices
    stack		Provides andSelf & end() chaining methods
    ios3		String.prototype.trim and Array.prototype.reduce methods (if they are 
                missing) for compatibility with iOS 3.x.

* 共`17`个module
* `√`表示默认包含的module


## Custom Building

> 自定义构建，可选择需要包含哪些模块

    $ npm install
    $ npm run-script dist
    $ MODULES="zepto event data" npm run-script dist



