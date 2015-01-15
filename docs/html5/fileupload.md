# File Upload

> 使用`<input type="file">`

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



