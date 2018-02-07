# es7


`dnd`提到了`es7`的写法。<http://gaearon.github.io/react-dnd/>

只有两个新特性：

## includes

> `Array.prototype.includes()`

    console.log([1, 2, 3].includes(2)) // === true)
    console.log([1, 2, 3].includes(4)) // === false)
    console.log([1, 2, NaN].includes(NaN)) // === true)
    console.log([1, 2, -0].includes(+0)) // === true)
    console.log([1, 2, +0].includes(-0)) // === true)
    console.log(['a', 'b', 'c'].includes('a')) // === true)
    console.log(['a', 'b', 'c'].includes('a', 1)) // === false)

* 增强了可读性语义化，最终没有使用`contains`命名，因为MooTools
* 返回布尔值，而不是匹配的位置
* `includes()`也可以在`NaN`(非数字)使用。最后 ，includes第二可选参数`fromIndex`，这对于优化是有好处的，因为它允许从特定位置开始寻找匹配。


## 指数操作符 

> Exponentiation Operator ( 求幂运算 )

    let a = 7 ** 12;
    let b **= a;



