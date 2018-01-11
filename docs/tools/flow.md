# flow

> Flow is a static `typechecker` for JavaScript.

## Features

* `facebook`出品的`js静态类型检查`工具
* 可`后台`运行，`增量检查`，并输出错误信息
* 可以作为其他语法检查工具的`下层依赖`
* 提供一套类型标记语法`Type Annotations` <https://flow.org/en/docs/types/>


## Resources

* site: <https://flow.org>
* github: <https://github.com/facebook/flow> <iframe src="http://258i.com/gbtn.html?user=facebook&repo=flow&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* getting started: <https://flow.org/en/docs/getting-started/>
* Type System - Why and how we build Flow for JavaScript <https://flow.org/en/docs/lang/>

## Installation

    # 安装babel，用于解析flow的类型标记，并在发布代码时移除
    $ npm install --save-dev babel-cli babel-preset-flow

    .babelrc
    {
        "presets": [ "flow" ]
    }

    $ npm install --save-dev flow-bin

    package.json
    {
        ...
        "script": {
            "flow": "flow"
        }
    }


## Usage

    # flow-enabled, will create `.flowconfig` file
    $ flow init 

    # 开启后台增量类型检测
    $ flow
    $ flow status

    # 关闭后台增量类型检测
    $ flow stop

## .flowconfig

    ...todo

## Tips

    // @flow
    /* @flow */


## Examples

    // @flow

    function foo(x: ?number): string {
      if (x) {
        return x;
      }
      return "default string";
    }

以上代码会提示错误，返回值不合法。


    
