# safari


## SecurityError

> `SecurityError` (DOM Exception 18): The operation is insecure.

以上错误在`file:`协议下，引用`localStorage`时提示的Error。这种情况下，`Chrome`不会报错，可以正常使用localStorage。

另外Safari的隐私设置里面，如果针对某些站点设置了阻止的话，也会报以上错误。在stackoverflow上面有相关topic，建议的解决办法是针对localStorage部分的操作包含到`try-catch`中。
<https://stackoverflow.com/questions/23673148/security-err-dom-exception-18-only-in-safari-when-using-canvas-todataurlimage>




## google字体被墙问题

某些站点使用了google的字体，会请求`http://fonts.gstatic.com`下的字体文件，但是该请求又不会立即失效返回，浏览器会长时间等待，导致页面中使用了google字体部分的文本不显示。这种情况仅在safari下有，chrome下不明显。比较暴力的方式，就是让浏览器立即知道该请求无法返回数据，转而使用其他fallback的字体：

    sudo vim /etc/hosts
    127.0.0.1 fonts.gstatic.com


## pdf页内链接

打印成pdf输出时，safari的`页内链接能正常跳转`，而chrome则不行。如需pdf页内跳转，最好使用safari。
 
