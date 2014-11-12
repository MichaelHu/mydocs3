# DOM Events

hudamin

## DOM Event Level

`Level 0`，浏览器直接将事件派发给target，如果该target有handler，则执行之，仅此而已，别再无它。

`Level 2`，事件传播有三个阶段：

* `capturing phase`，从document向下往target走，比如`[document - html - body - section.slide - h2]`
* `target phase`，target本身
* `bubbling phase`，从target向上往document走，比如`[h2 - section.slide - body - html - document]`

所以父节点`可能有1到2次机会`响应事件，不过一般情况不需要在capturing phase响应。

这体现在使用addEventListener时，第三个参数`useCapture`为false


## Hierarchy

* Event
    * UIEvent
        * MouseEvent
        * TouchEvent

## Event

`定义的接口方法：`

* initEvent
* preventDefault
* stopImmediatePropagation
* stopPropagation




## UIEvent

`定义的接口方法：`

* initUIEvent





## MouseEvent - click

所属类：`MouseEvent`

### 1. 重要属性

* type
* srcElement
* target
* clientX
* clientY
* offsetX
* offsetY
* pageX
* pageY
* x
* y
* screenX
* screenY
* fromElement
* toElement
* altKey
* ctrlKey
* shiftKey
* metaKey
* detail
* timeStamp

### 2. 其他属性

* bubbles： 标识`是否冒泡类型`事件，click事件为true
* button
* cancelBubble
* cancelable
* charCode
* clipboardData
* currentTarget
* dataTransfer
* defaultPrevented
* eventPhase
* keyCode
* layerX
* layerY
* movementX
* movementY
* path
* relatedTarget
* returnValue
* view
* webkitMovementX
* webkitMovementY
* which

### 3. 方法

* initMouseEvent


## TouchEvent - touchstart

所属类：`TouchEvent`

### 1. 重要属性

* type: `touchstart`
* changedTouches
* targetTouches
* touches
    
    是一个`TouchList`，举一个Chrome下Phone模式一个`touchstart`事件的touches内容，
    该事件的changedTouches, targetTouches, touches一致，其`touches[0]`如下：

        clientX
        clientY
        pageX
        pageY
        screenX
        screenY
        radiusX
        radiusY
        force
        identifier
        target
        webkitForce
        webkitRadiusX
        webkitRadiusY
        webkitRotationAngle

* srcElement
* target

    事件target，srcElement同target

* currentTarget

### 2. 其他属性

* pageX
* pageY

    对于touchstart事件来说，一级属性的pageX和pageY没意义。

* altKey
* shiftKey
* ctrlKey
* metaKey
* keyCode
* charCode
* which
* detail

* timeStamp
* returnValue
* eventPhase
* defaultPrevented
* cancelBubble
* cancelable

* bubbles： 标识`是否冒泡类型`事件，touchstart事件为true
* clipboardData
* data
* layerX
* layerY
* path

    冒泡路径，类型为`NodeList`：
    
        0: section.slide
        1: body
        2: html
        3: document
* view

### 3. 方法

* isDefaultPrevented
* isPropagationStopped
* isImmediatePropagationStopped
* stopPropagation
* preventDefault
* stopImmediatePropagation


## Zepto - swipeUp

所属类：`Event`

### 1. 重要属性

* type
* srcElement
* target

    事件target，srcElement同target

* _args




### 2. 其他属性 

* bubbles： 标识`是否冒泡类型`事件，swipeUp事件为true
* cancelBubble
* cancelable
* returnValue
* timeStamp
* clipboardData
* currentTarget
* data
* defaultPrevented
* eventPhase
* path

    同touchstart
        

### 3. 方法

同touchstart事件





