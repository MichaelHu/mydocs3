# mdast

> Markdown Abstract Syntax Tree，定义`ast结构`

* github: <https://github.com/syntax-tree/mdast>
* 是`unist`的一个子集，由`remark`来实现
* unist - `Universal Syntax Tree`: <https://github.com/syntax-tree/unist>
* `remark` - 基于插件的Markdown处理器: <https://github.com/wooorm/remark>

## remark

### 命令行方式输出ast

    npm install remark-cli

    # 输出a.md文档的markdown ast
    ./node_modules/.bin/remark --tree-out a.md

`a.md`:

    # test

    > citation

        code goes here

    ## title 1

    <p>raw html</p>
    <script> console.log( 'raw script' );</script>

`output`:

    {
      "type": "root",
      "children": [
        {
          "type": "heading",
          "depth": 1,
          "children": [
            {
              "type": "text",
              "value": "test",
              "position": {
                "start": {
                  "line": 1,
                  "column": 3,
                  "offset": 2
                },
                "end": {
                  "line": 1,
                  "column": 7,
                  "offset": 6
                },
                "indent": []
              }
            }
          ],
          "position": {
            "start": {
              "line": 1,
              "column": 1,
              "offset": 0
            },
            "end": {
              "line": 1,
              "column": 7,
              "offset": 6
            },
            "indent": []
          }
        },
        {
          "type": "blockquote",
          "children": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "citation",
                  "position": {
                    "start": {
                      "line": 3,
                      "column": 3,
                      "offset": 10
                    },
                    "end": {
                      "line": 3,
                      "column": 11,
                      "offset": 18
                    },
                    "indent": []
                  }
                }
              ],
              "position": {
                "start": {
                  "line": 3,
                  "column": 3,
                  "offset": 10
                },
                "end": {
                  "line": 3,
                  "column": 11,
                  "offset": 18
                },
                "indent": []
              }
            }
          ],
          "position": {
            "start": {
              "line": 3,
              "column": 1,
              "offset": 8
            },
            "end": {
              "line": 3,
              "column": 11,
              "offset": 18
            },
            "indent": []
          }
        },
        {
          "type": "code",
          "lang": null,
          "value": "code goes here",
          "position": {
            "start": {
              "line": 5,
              "column": 1,
              "offset": 20
            },
            "end": {
              "line": 5,
              "column": 19,
              "offset": 38
            },
            "indent": []
          }
        },
        {
          "type": "heading",
          "depth": 2,
          "children": [
            {
              "type": "text",
              "value": "title 1",
              "position": {
                "start": {
                  "line": 7,
                  "column": 4,
                  "offset": 43
                },
                "end": {
                  "line": 7,
                  "column": 11,
                  "offset": 50
                },
                "indent": []
              }
            }
          ],
          "position": {
            "start": {
              "line": 7,
              "column": 1,
              "offset": 40
            },
            "end": {
              "line": 7,
              "column": 11,
              "offset": 50
            },
            "indent": []
          }
        },
        {
          "type": "html",
          "value": "<p>raw html</p>\n<script> console.log( 'raw script' );</script>",
          "position": {
            "start": {
              "line": 9,
              "column": 1,
              "offset": 52
            },
            "end": {
              "line": 10,
              "column": 47,
              "offset": 114
            },
            "indent": [
              1
            ]
          }
        }
      ],
      "position": {
        "start": {
          "line": 1,
          "column": 1,
          "offset": 0
        },
        "end": {
          "line": 12,
          "column": 1,
          "offset": 116
        }
      }
    }


### 编程方式输出ast

> 使用`remark-parse` <https://github.com/wooorm/remark/tree/master/packages/remark-parse>

`remark-parse`是`unified`的解析器之一。unified是一个使用语法数的文本解析器，支持remark， retext以及rehype解析器（parser）。

    npm install remark-parse

`code`:

    var unified = require('unified');
    var createStream = require('unified-stream');
    var markdown = require('remark-parse');
    var html = require('remark-html');

    var processor = unified()
      .use(markdown, {commonmark: true})
      .use(html)

    process.stdin
      .pipe(createStream(processor))
      .pipe(process.stdout);

    





