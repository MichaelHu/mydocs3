# ie bugs

## ie6,7之jsonp问题

如果`document`是`GBK`页面，使用`jsonp`请求一个`utf-8`的数据接口，`需要设置script标签的charset属性`，否则
可能导致脚本解析出错。

    <script src="..." charset="utf-8" type="text/javascript"></script>

原因大概是低版本的IE浏览器script标签请求，对`Respond Headers`的`charset`并不关注。

