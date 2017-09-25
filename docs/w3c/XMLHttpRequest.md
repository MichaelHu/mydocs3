# XMLHttpRequest

## Resources
* Living: <https://xhr.spec.whatwg.org>
* Retired: <https://www.w3.org/TR/XMLHttpRequest/>

## XMLHttpRequest

### constructor

    clcient = new XMLHttpRequest();

### Event handlers

实现`XMLHttpRequestEventTarget`接口必须支持：

    onloadstart     loadstart
    onprogress      progress
    onabort         abort
    onload          load
    ontimeout       timeout
    onloadend       loadend

实现`XMLHttpRequest`接口必须支持：

    onreadystatechange      readystatechange

### States

    client.readyState
        
        UNSENT
        OPENED
        HEADERS_RECEIVED
        LOADING
        DONE

### Request

    client.open( method, url [, async = true [, username = null [, password = null ]]] )
    client.setRequest( name, value )
    client.timeout  // in milliseconds
    client.withCredentials
    client.upload
    client.send( [ body = null ] )
    client.abort()

### Response


## FormData

## ProgressEvent

