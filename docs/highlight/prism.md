# prism

## Resources

* site: <http://prismjs.com>
* github: <https://github.com/PrismJS/prism> <iframe src="http://258i.com/gbtn.html?user=PrismJS&repo=prism&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>


## Features

* 超轻量，`2KB` ( minified + gzipped )
* 支持`132`种语言
* `20+`官方插件，也支持第三方插件。有些官方插件非常有创意，比如`预览插件`( Previewers ), `文件高亮`( File Highlight )等


## Usage

### Auto highlight

    <!DOCTYPE html>
    <html>
    <head>
        ...
        <link href="themes/prism.css" rel="stylesheet" />
    </head>
    <body>
        <pre><code class="language-css">p { color: red }</code></pre>
        <script src="prism.js"></script>
    </body>
    </html>


### Manual highlight

    <script src="prism.js" data-manual></script>


## Installation

    $ npm install prismjs


## API

    var Prism = require('prismjs');
    // The code snippet you want to highlight, as a string
    var code = "var data = 1;";
    // Returns a highlighted HTML string
    var html = Prism.highlight(code, Prism.languages.javascript);


