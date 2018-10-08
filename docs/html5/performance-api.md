# performance api

## Resources

* Performance API - MDN <https://developer.mozilla.org/zh-CN/docs/Web/API/Performance>


## Features

* 是`High Resolution Time API`的一部分
* 包含：
    * User Timing
    * Navigation Timing
    * Resource Timing
    * High Resolution Time API
    * 其他待列

* `entryType`:
        navigation
        resource
        paint
        mark
        measure


## API List

    // Properties
    performance.navigation
    performance.timing
    performance.memory ( chrome特殊扩展 )
    performance.timeOrigin

    // Methods
    performance.now()

    performance.mark()
    performance.clearMarks()
    performance.measure()
    performance.clearMeasures()

    performance.getEntries()
    performance.getEntries( { name: ..., type: ... } )
    performance.getEntriesByName()
    performance.getEntriesByType()


## User Timing

REC: <https://www.w3.org/TR/user-timing/>

APIs:

    partial interface Performance {
        void mark(DOMString markName);
        void clearMarks(optional  DOMString markName);

        void measure(DOMString measureName, optional DOMString startMark, optional DOMString endMark);
        void clearMeasures(optional DOMString measureName);
    };



## Resource Timing

CR: <https://www.w3.org/TR/resource-timing/>

APIs:

    [Exposed=(Window)]
    interface PerformanceResourceTiming : PerformanceEntry {
        readonly attribute DOMString           initiatorType;
        readonly attribute DOMHighResTimeStamp redirectStart;
        readonly attribute DOMHighResTimeStamp redirectEnd;
        readonly attribute DOMHighResTimeStamp fetchStart;
        readonly attribute DOMHighResTimeStamp domainLookupStart;
        readonly attribute DOMHighResTimeStamp domainLookupEnd;
        readonly attribute DOMHighResTimeStamp connectStart;
        readonly attribute DOMHighResTimeStamp connectEnd;
        readonly attribute DOMHighResTimeStamp secureConnectionStart;
        readonly attribute DOMHighResTimeStamp requestStart;
        readonly attribute DOMHighResTimeStamp responseStart;
        readonly attribute DOMHighResTimeStamp responseEnd;
        serializer = {inherit, attribute};
    };

    partial interface Performance {
        void clearResourceTimings();
        void setResourceTimingBufferSize(unsigned long maxSize);
        attribute EventHandler onresourcetimingbufferfull;
    };



## Navigation Timing

REC: <https://www.w3.org/TR/navigation-timing/>

APIs:

    interface PerformanceTiming {
        readonly attribute unsigned long long navigationStart;
        readonly attribute unsigned long long unloadEventStart;
        readonly attribute unsigned long long unloadEventEnd;
        readonly attribute unsigned long long redirectStart;
        readonly attribute unsigned long long redirectEnd;
        readonly attribute unsigned long long fetchStart;
        readonly attribute unsigned long long domainLookupStart;
        readonly attribute unsigned long long domainLookupEnd;
        readonly attribute unsigned long long connectStart;
        readonly attribute unsigned long long connectEnd;
        readonly attribute unsigned long long secureConnectionStart;
        readonly attribute unsigned long long requestStart;
        readonly attribute unsigned long long responseStart;
        readonly attribute unsigned long long responseEnd;
        readonly attribute unsigned long long domLoading;
        readonly attribute unsigned long long domInteractive;
        readonly attribute unsigned long long domContentLoadedEventStart;
        readonly attribute unsigned long long domContentLoadedEventEnd;
        readonly attribute unsigned long long domComplete;
        readonly attribute unsigned long long loadEventStart;
        readonly attribute unsigned long long loadEventEnd;
    };

    interface PerformanceNavigation {
        const unsigned short TYPE_NAVIGATE = 0;
        const unsigned short TYPE_RELOAD = 1;
        const unsigned short TYPE_BACK_FORWARD = 2;
        const unsigned short TYPE_RESERVED = 255;
        readonly attribute unsigned short type;
        readonly attribute unsigned short redirectCount;
    };

    interface Performance {
        readonly attribute PerformanceTiming timing;
        readonly attribute PerformanceNavigation navigation;
    };

    partial interface Window {
        [Replaceable] readonly attribute Performance performance;
    };

            


## High Resolution Time API

> performance.now()

REC: <https://www.w3.org/TR/hr-time/>

APIs:

    [Exposed=(Window,Worker)]
    interface Performance : EventTarget {
        DOMHighResTimeStamp now();
        readonly attribute DOMHighResTimeStamp timeOrigin;
        [Default] object              toJSON();
    };

Tips:
* `WebWorker`也支持


    
