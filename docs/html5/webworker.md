# webworker

## Resources

* w3c - Web Workers: <https://www.w3.org/TR/workers/>
* w3c - Service Workers 1: <https://www.w3.org/TR/service-workers-1/> 
* 170908 石墨表格之`Web Worker`应用实战 <https://zhuanlan.zhihu.com/p/29165800> Painting、Rendering、Scripting，如果花费在`Scripting`上面的时间较多，就可以考虑Web Worker了
* 160229 High-performance Web Worker messages <https://nolanlawson.com/2016/02/29/high-performance-web-worker-messages/>

## Features

* 无法访问DOM元素以及window, document
* 无法访问`localStorage`，但可以支持`indexedDB`
* 不支持跨域
* 无法和主线程共享内存，worker之间也无法共享内存

## IDL

    [NoInterfaceObject, Exposed=(Window,Worker)]
    interface AbstractWorker {
        attribute EventHandler onerror;
    };

    [Constructor(DOMString scriptURL), Exposed=(Window,Worker)]
    interface Worker : EventTarget {
        void terminate();
        void postMessage(any message, optional sequence<Transferable> transfer);
        attribute EventHandler onmessage;
    };
    Worker implements AbstractWorker;

## 与Service Worker的联系和区别

todo
