# 模板引擎


## artTemplate

<https://github.com/aui/artTemplate>

两种语法使用`不同`的脚本文件。


### 简洁语法

    {{if admin}}
        {{include 'admin_content'}}

        {{each list}}
            <div>{{$index}}. {{$value.user}}</div>
        {{/each}}
    {{/if}}


### 原生语法

    <%if (admin){%>
        <%include('admin_content')%>

        <%for (var i=0;i<list.length;i++) {%>
            <div><%=i%>. <%=list[i].user%></div>
        <%}%>
    <%}%>





## underscore

## baiduTemplate

## Jade

## ETpl

