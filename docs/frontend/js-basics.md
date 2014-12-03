# js basics


## 绝对等式

    typeof null === 'object'
    void 0 === undefined

数字判断：

    num === +num

IE9以下，hasEnumBug


## 一般等式

    null == undefined
    0 == ''
    false == 0
    false == ''


## TRUE表达式

    !null
    !void 0
    !undefined
    !0
    !''


## Object.prototype.toString.call(obj)

注意`不是Object.toString`，该toString来自`Function.prototype.toString`

    function(){}    [object Function]
    []              [object Array]
    10              [object Number]




