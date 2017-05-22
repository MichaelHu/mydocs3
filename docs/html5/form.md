# form

`ref`: <https://www.w3.org/TR/html/sec-forms.html>

    <form method="post" action="/post-message.cgi"
        enctype="multipart/form-data">
        <p><label>Message: <input type=text name=m></label></p>
        <p><input type=submit value="Submit message"></p>
    </form>

## input types

> `22种`type

* hidden
* text
* checkbox
* radio
* file
* button
* search
* tel
* url
* email
* password
* date
* month
* week
* time
* datetime-local
* number
* range
* color
* submit
* image
* reset


## input common attributes

### multiple

> The `multiple` attribute is a `boolean attribute` that indicates whether the user is to be allowed to specify `more than one` value.

`支持多个值`

    <label>Cc: <input type=email multiple name=cc></label>

`提供选项数据`

    <label>Cc: <input type=email multiple name=cc list=contacts></label>
    ...
    <datalist id="contacts">
      <option value="hedral@damowmow.com">
      <option value="pillar@example.com">
      <option value="astrophy@cute.example">
      <option value="astronomy@science.example.org">
    </datalist>

`支持多文件上传`

    <label>Attachments: <input type=file multiple name=att></label>


## form enctype

提交的编码类型，可取以下`3种`类型：

* `application/x-www-form-urlencoded`，默认取值
* `multipart/form-data`
* `text/plain`

有一种类型曾经提出来过，但是相关标准已经不再维护，所以慎用。那就是`application/json`

    <form enctype='application/json'>
      <input name='name' value='Bender'>
      <select name='hind'>
        <option selected>Bitable</option>
        <option>Kickable</option>
      </select>
      <input type='checkbox' name='shiny' checked>
    </form>

    // produces
    {
      "name":   "Bender"
    , "hind":   "Bitable"
    , "shiny":  true
    }

相关标准文档在：<https://www.w3.org/TR/2015/NOTE-html-json-forms-20150929/>





