# File Upload

> 使用`<input type="file">`

## RFC参考：rfc1867

<ref://./rfc/rfc.md>


## 兼容性

1. `iOS6`才开始支持，但只支持视频和图片上传
2. Android支持得比较早


## 注意点

1. Android下出现点击不弹出文件选择框，可能是事件没有直接注册在input上，而是注册在label上
2. iOS6开始，还支持`multiple`属性，支持上传文件多选。Android到`Version 37仍然不支持`
3. 设置只上传类型：

        <input type="file" accept="video/*"> 
        <input type="file" accept="image/*">
        <input type="file" name="pic" id="pic" accept="image/gif, image/jpeg" />


## DOM API

> 涉及`FileUpload对象`

### 属性列表

1. accept: MIME类型，多个可用逗号分隔
2. accesskey
3. alt：不支持`<input type="file">`时显示的替代文字
4. defaultValue
5. disabled
6. form
7. id
8. name
9. tabIndex
10. type
11. value: 用户输入后的文件名

### form之enctype

上传文件时，需要显式设置form的`enctype`属性值，如下：

    <form action="POST" target="__upload_iframe__"
        enctype="multipart/form-data">
        <input type="file" name="pic">
    </form>

综合来说：

1. 按`文本`传输，默认为`application/x-www-form-urlencoded`，还有`text/plain`。
    两者区别为，前者将编码所有字符，后者仅将空格转换成`+`，而不编码特殊字符。
2. 按文件传输，即input的type为`file`的时候，必须使用`multipart/form-data`

form的DOM对象需要获取或设置enctype，可以使用

    form.enctype

或者

    form.encoding



