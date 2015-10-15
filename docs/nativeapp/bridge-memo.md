# Bridge Memo

> 为ObjC、Jave等客户端语言与JavaScript语言提供相互通信的方案。

## iOS实现

    ;(function() {
        if (window.WebViewJavascriptBridge) { return }
        var messagingIframe
        var sendMessageQueue = []
        var receiveMessageQueue = []
        var messageHandlers = {}
        
        var CUSTOM_PROTOCOL_SCHEME = 'wvjbscheme'
        var QUEUE_HAS_MESSAGE = '__WVJB_QUEUE_MESSAGE__'
        
        var responseCallbacks = {}
        var uniqueId = 1
        
        function _createQueueReadyIframe(doc) {
            messagingIframe = doc.createElement('iframe')
            messagingIframe.style.display = 'none'
            messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE
            doc.documentElement.appendChild(messagingIframe)
        }

        function init(messageHandler) {
            if (WebViewJavascriptBridge._messageHandler) { throw new Error('WebViewJavascriptBridge.init called twice') }
            WebViewJavascriptBridge._messageHandler = messageHandler
            var receivedMessages = receiveMessageQueue
            receiveMessageQueue = null
            for (var i=0; i<receivedMessages.length; i++) {
                _dispatchMessageFromObjC(receivedMessages[i])
            }
        }

        function send(data, responseCallback) {
            _doSend({ data:data }, responseCallback)
        }
        
        function registerHandler(handlerName, handler) {
            messageHandlers[handlerName] = handler
        }
        
        function callHandler(handlerName, data, responseCallback) {
            _doSend({ handlerName:handlerName, data:data }, responseCallback)
        }
        
        function _doSend(message, responseCallback) {
            if (responseCallback) {
                var callbackId = 'cb_'+(uniqueId++)+'_'+new Date().getTime()
                responseCallbacks[callbackId] = responseCallback
                message['callbackId'] = callbackId
            }
            sendMessageQueue.push(message)
            messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE
        }

        function _fetchQueue() {
            var messageQueueString = JSON.stringify(sendMessageQueue)
            sendMessageQueue = []
            return messageQueueString
        }

        function _dispatchMessageFromObjC(messageJSON) {
            setTimeout(function _timeoutDispatchMessageFromObjC() {
                var message = JSON.parse(messageJSON)
                var messageHandler
                var responseCallback

                if (message.responseId) {
                    responseCallback = responseCallbacks[message.responseId]
                    if (!responseCallback) { return; }
                    responseCallback(message.responseData)
                    delete responseCallbacks[message.responseId]
                } else {
                    if (message.callbackId) {
                        var callbackResponseId = message.callbackId
                        responseCallback = function(responseData) {
                            _doSend({ responseId:callbackResponseId, responseData:responseData })
                        }
                    }
                    
                    var handler = WebViewJavascriptBridge._messageHandler
                    if (message.handlerName) {
                        handler = messageHandlers[message.handlerName]
                    }
                    
                    try {
                        handler(message.data, responseCallback)
                    } catch(exception) {
                        if (typeof console != 'undefined') {
                            console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.", message, exception)
                        }
                    }
                }
            })
        }
        
        function _handleMessageFromObjC(messageJSON) {
            if (receiveMessageQueue) {
                receiveMessageQueue.push(messageJSON)
            } else {
                _dispatchMessageFromObjC(messageJSON)
            }
        }

        window.WebViewJavascriptBridge = {
            init: init,
            send: send,
            registerHandler: registerHandler,
            callHandler: callHandler,
            _fetchQueue: _fetchQueue,
            _handleMessageFromObjC: _handleMessageFromObjC
        }

        var doc = document
        _createQueueReadyIframe(doc)
        var readyEvent = doc.createEvent('Events')
        readyEvent.initEvent('WebViewJavascriptBridgeReady')
        readyEvent.bridge = WebViewJavascriptBridge
        doc.dispatchEvent(readyEvent)
    })();




## Android实现

    /**
    * A module representing DidiJSBridge APIs. 
    * @exports DidiBridge 
    */

    /**
     * Bugfix for Android DidiJSBridge
     * @see http://wiki.intra.xiaojukeji.com/display/BEAT/DidiJSBridge
     */
    var bugfix = (function(){

        var cleanBridge;

        function _init(){
            if(cleanBridge === undefined){
                window.DidiJSBridge = cleanBridge = create(); 
                trigger();
            }
            return window.DidiJSBridge = cleanBridge;
        }

        function create(){

            var bridgeContext = {
                    queue: []
                    , callback: function() {
                        var args = Array.prototype.slice.call(arguments, 0);
                        var c = args.shift();
                        var e = args.shift();
                        this.queue[c].apply(this, args);
                        if (!e) {
                            delete this.queue[c];
                        }
                    }
                };

            bridgeContext.callHandler = function() {

                var args = Array.prototype.slice.call(arguments, 0);
                var queue = bridgeContext.queue;

                args.unshift('callHandler');
                var types = [];
                for (var i = 1; i < args.length; i++) {
                    var item = args[i];
                    var type = typeof item;
                    types.push(type);
                    if (type == "function") {
                        var oldLen = queue.length;
                        queue.push(item);
                        args[i] = oldLen;
                    }
                }

                var jsonString = JSON.stringify({
                        method: args.shift()
                        , types: types
                        , args: args
                    });

                var result = prompt(jsonString);
                var g = JSON.parse(result);

                if (g.code != 200) {
                    throw "DidiJSBridge call error, code:" + g.code + ", message:" + g.result
                }
                return g.result;

            };

            return bridgeContext;
        }

        function trigger(){
            var ev = document.createEvent('HTMLEvents');
            ev.initEvent('DidiJSBridgeReady', false, false);
            document.dispatchEvent(ev);
        }

        return {
            init: _init
        };

    })();


