# web-storage

## Resources

* w3c: <https://www.w3.org/TR/webstorage>
* IndexedDB: <ref://./indexed-db.md.html>
* [ 150502 ] 详说 `Cookie`, `LocalStorage` 与 `SessionStorage` <https://segmentfault.com/a/1190000002723469>


## sessionStorage

> 注意其与`session cookie`的区别

* keywords: 
    * `top-level browsering context` - 顶级浏览上下文
    * `document`
    * `document origin`
    * `session storage area` - 会话存储空间
* 每个顶级浏览上下文为每个origin分配唯一一个session storage空间 
* 通过`链接点击`、`脚本创建`等方式新创建了一个顶级浏览上下文，那么旧上下文的sessionStorage必须复制一份给新上下文，但此后的操作都是相互独立，互不影响。

## localStorage

todo
