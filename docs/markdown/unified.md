# unified

> `unified` is an interface for processing text `using syntax trees`. It’s what powers `remark, retext, and rehype`, but it also allows for processing between multiple syntaxes.

## Features

* github: <https://github.com/unifiedjs/unified>
* `通用`文本处理器，基于`语法树`，支持多种解析器

## Usage

    var unified = require('unified');
    var markdown = require('remark-parse');
    var remark2rehype = require('remark-rehype');
    var doc = require('rehype-document');
    var format = require('rehype-format');
    var html = require('rehype-stringify');
    var reporter = require('vfile-reporter');

    unified()
      .use(markdown)
      .use(remark2rehype)
      .use(doc)
      .use(format)
      .use(html)
      .process('# Hello world!', function (err, file) {
        console.error(reporter(err || file));
        console.log(String(file));
      });


