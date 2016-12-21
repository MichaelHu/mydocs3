# progreesive webapps

* <http://www.tuicool.com/articles/jQr2meJ>

Google主推，Google I/O大会

4年前百度新闻的尝试，更多是在Mobile Safari上，但最终由于各类底层机制支持不成熟的问题，比如manafest的不稳定更新等问题，只能作罢。

## Features

* <https://addyosmani.com/blog/getting-started-with-progressive-web-apps/>

* Progressive
* Responsive
* Connectivity independent： 不依赖网络的连通性，背后需要有`Service Worker`的支持
* App-like
* Fresh：总是保持最新
* Safe
* Discoverable：允许SE找到它们
* Re-engageable：比如支持push
* Installable：可以安装到主屏
* Linable：可以通过链接分享，而不需要复杂的安装过程



## 一些进行中的工作

1. Application Shell <https://github.com/addyosmani/app-shell>
2. Polymer Starter Kit <https://github.com/polymerelements/polymer-starter-kit>
3. Web Starter Kit <https://github.com/google/web-starter-kit>



## Service Worker

> A service worker is a script that runs in the background, separate from your web page. It responds to events, including network requests made from pages it serves. A service worker has an intentionally short lifetime.

> 可以针对离线缓存进行操作，对于Progressive WebApp来说至关重要

<https://www.w3.org/TR/2016/WD-service-workers-1-20161011/>

* 是一种特定类型的`web worker`
* 概念上来看，在网络与文档渲染之间，service workder可以为文档提供内容，即便离线情况也无妨
* 关联state：parsed, installing, installed, activating, activated, redundant。初始值为parsed
* 关联script url
* 关联type: `classic`或`module`
* 关联containing service worker registration
* 关联id
* 接收一组生命周期事件
* 关联script resource
* 关联script resource map
* 关联skip waiting flag
* 关联imported scripts updated flag
* 关联一组处理事件类型


大量的例子： <https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker>


### examples

	// scope defaults to the path the script sits in
	// "/" in this example
	navigator.serviceWorker.register("/serviceworker.js").then(
	  function(registration) {
		console.log("success!");
		if (registration.installing) {
		  registration.installing.postMessage("Howdy from your installing page.");
		}
	  },
	  function(why) {
		console.error("Installing the worker failed!:", why);
	  });

1. 挂在`navigator`下
2. `register`接口返回一个`Promise`对象




### definitions

	[SecureContext, Exposed=(Window,Worker)]
	interface ServiceWorker : EventTarget {
	  readonly attribute USVString scriptURL;
	  readonly attribute ServiceWorkerState state;
	  void postMessage(any message, optional sequence<object> transfer);

	  // event
	  attribute EventHandler onstatechange;
	};
	ServiceWorker implements AbstractWorker;

	enum ServiceWorkerState {
	  "installing",
	  "installed",
	  "activating",
	  "activated",
	  "redundant"
	};





