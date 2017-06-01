# form

`ref`: <https://www.w3.org/TR/html/sec-forms.html>


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
#test_types_form input {
    vertical-align: middle;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## intro

    <form method="post" action="/post-message.cgi"
        enctype="multipart/form-data">
        <p><label>Message: <input type=text name=m></label></p>
        <p><input type=submit value="Submit message"></p>
    </form>

## input types

### 22种type

    1.  hidden text checkbox radio file 
    6.  button search tel url email
    11. password date month week time
    16. datetime-local number range color submit
    21. image reset

### 示例

* `url`, `email`会强制进行格式验证，`tel`只做单行文本验证（认为tel可能是各种自由格式），正常情况下在`submit前而不是blur时`进行验证
* `url`, `email`增加`pattern`属性，含义为首先要满足url、email本身的格式要求，其次还要满足pattern指定的格式
* 浏览器尚不支持的type，则退化为text类型
* `enctype`有三个值，分别为：`application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`。未设置或设置非法值，默认取`application/x-www-form-urlencoded`。如果form中的`submit类型`按钮的`formenctype`被设置，则该值会覆盖最终enctype
* `submit类型`按钮的属性包括：`formenctype`, `formtarget`, `formnovalidate`, `formmethod`, `formaction`，它们可以分别覆盖form表单的`enctype`, `target`, `novalidate`, `method`, `action`属性值。
* 文件上传须使用`multipart/form-data`，文件和其他字段一起提交也需要使用`multipart/form-data`
* `checkbox`与`radio`未选中情况下，将不作为字段传送
* 使用`application/x-www-form-urlencoded`、`text/plain`进行POST传送时，php后端可以通过`php://input`获取到原始POST数据，而`multipart/form-data`不可以；使用`application/x-www-form-urlencoded`、`multipart/form-data`进行POST传送，php后端可以通过`$_POST`获取到解析后的数据，而`text/plain`不可以；只有`multipart/form-data`进行POST传送时，php后端的`$_FILES`才有值。
* form表单中一个submit按钮提交，`不会包含`其他submit按钮的内容
* 上传和接收`同名字段`，关键在于设置name属性，比如：`name="participants[]"`或`name="activity['a'][]"`



<div id="test_types" class="test">
<div class="test-container">

    @[data-script="html"]<form id="test_types_form" method="post" 
            action="http://258i.com/phpapp/form-enctype.php" target="test_types_iframe">
        1. hidden: <input type="hidden" name="hidden"><br>
        2. text: <input type="text" name="text" 
                pattern="[0-9][A-Z]{3}" title="123"><br>
        3. checkbox: <input type="checkbox" name="checkbox" checked><br>
        4. radio: <input type="radio" name="radio" checked><br>
        5. file: <input type="file" name="file"><br>
        6. button: <input type="button" value="OK" name="button"><br>
        7. search: <input type="search" name="search"><br>
        8. tel: <input type="tel" name="tel" title="telephone"><br>
        9. url: <input type="url" name="url"><br>
        10. email: <input type="email" name="email['abc'][]" value="a@bcd.com">
                <input type="email" name="email['abc'][]" value="b@134.com"><br>
        11. password: <input type="password" name="password"><br>
        12. date: <input type="date" name="date"><br>
        13. month: <input type="month" name="month"><br>
        14. week: <input type="week" name="week"><br>
        15. time: <input type="time" name="time"><br>
        16. datetime-local: <input type="datetime-local" name="datetime-local"><br>
        17. number: <input type="number" value="0.9" name="number" 
                min="0.5" max="2.5" step="0.1" value="0.9"><br>
        18. range: <input type="range" name="range" 
                min="-100" max="100" step="10"><br>
        19. color: <input type="color" name="color" value="#e57d59"><br>
        20. submit: <input type="submit" name="submit" formenctype="application/x-www-form-urlencoded"
                value="application/x-www-form-urlencoded 提交">
            <input type="submit" name="submit" formenctype="multipart/form-data"
                value="multipart/form-data 提交">
            <input type="submit" name="submit" formenctype="text/plain"
                value="text/plain 提交"><br>
        21. image: <input type="image" src="./img/btn-maps.jpg" alt="图片按钮--" 
                name="image" width="200"><br>
        22. reset: <input type="reset" name="reset"><br>
        <iframe id="test_types_iframe" name="test_types_iframe" height="300" 
                width="100%" frameborder="0"></iframe>
    </form>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## input common attributes

### autocomplete

两种模式，自动填充期望模式和自动填充锚点模式（type="hidden"）。

支持的值：

    autocomplete=[section-*] [shipping|billing] <option-A|option-B> 

    option-A=<name|honorific-prefix|given-name
        |addtinal-name|family-name|nickname|username
        |new-password|current-password|organization-title|organization
        |street-address|address-line1|address-line2|address-line3
        |address-level4|address-level3|address-level2|address-level1
        |country|country-name|postal-code
        |cc-name|cc-given-name|cc-additional-name|cc-family-name
        |cc-number|cc-exp|cc-exp-month|cc-exp-year
        |cc-csc|cc-type|transaction-currency|transaction-amount
        |language|bday|bday-day|bday-month|bday-year
        |sex|url|photo>

    option-B=[home|work|mobile|fax|pager] <tel|tel-country-code|tel-national
        |tel-area-code|tel-local|tel-local-prefix|tel-local-suffix
        |tel-extension|email|impp>





### inputmode
> `12`种模式，提供最适合的输入键盘
* url
* email
* tel
* numeric
* katakana
* kana-name
* kana
* full-width-latin
* latin-prose
* latin-name
* latin
* verbatim


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



## select

<div id="test_select" class="test">
<div class="test-container">

    @[data-script="html"]<form id="test_select_form" method="post" 
            action="http://258i.com/phpapp/form-enctype.php" target="test_select_iframe">
        <select name="participants[]" multiple>
            <option selected>Michael</option> 
            <option selected>John</option> 
            <option>Alice</option> 
        </select>
        <input type="submit" name="submit">
        <iframe id="test_select_iframe" name="test_select_iframe" height="160" 
                width="100%" frameborder="0"></iframe>
    </form>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




## fieldset

<div id="test_fieldset" class="test">
<div class="test-container">

    @[data-script="html"]<form id="test_fieldset_form" method="post" 
            action="http://258i.com/phpapp/form-enctype.php" target="test_fieldset_iframe">
        <fieldset>
            <input type="text" name="names[]" value="Michael">
            <input type="text" name="names[]" value="Karen">
            <input type="text" name="names[]" value="Even">
            <input type="submit" name="submit">
        </fieldset>
        <iframe id="test_fieldset_iframe" name="test_fieldset_iframe" height="160" 
                width="100%" frameborder="0"></iframe>
    </form>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




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





