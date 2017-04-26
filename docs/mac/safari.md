# safari

## google字体被墙问题

某些站点使用了google的字体，会请求`http://fonts.gstatic.com`下的字体文件，但是该请求又不会立即失效返回，浏览器会长时间等待，导致页面中使用了google字体部分的文本不显示。这种情况仅在safari下有，chrome下不明显。比较暴力的方式，就是让浏览器立即知道该请求无法返回数据，转而使用其他fallback的字体：

    sudo vim /etc/hosts
    127.0.0.1 fonts.gstatic.com


 
