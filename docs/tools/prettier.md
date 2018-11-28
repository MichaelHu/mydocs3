# prettier

## Features

* 一个`"偏执"`的代码`格式化`工具
* 支持`多种语言`，包括`JS/CSS/GraphQL/Markdown`，同时支持`ES6/ES7/JSX`等新语法，提供各类编辑器插件
* 支持`命令行`，也支持在构建工具中使用
* 支持`API调用`


## Tips

* 默认使用`babylon`解析器 <ref://./babylon.md.html>
* 使用`--parser`选项，设置使用的解析器
        --parser <flow|babylon|typescript|css|less|scss|json|graphql|markdown>


## Resources

* `site`: <https://prettier.io/>
* `github`: <https://github.com/prettier/prettier> <iframe src="http://258i.com/gbtn.html?user=prettier&repo=prettier&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* `babylon`: <ref://../tools/babylon.md.html>
* options: <https://prettier.io/docs/en/options.html>
* configuration file: <https://prettier.io/docs/en/configuration.html>
* `API`: <https://prettier.io/docs/en/api.html>

## Versions

todo


## Install

> `yarn` or `npm`安装

    # install within project
    $ yarn add prettier --dev --exact
    # install globally
    $ yarn global add prittier

    # install with npm
    $ npm install --save-dev --save-exact prettier
    $ npm install --global prettier


## Usage

### CLI Usage

#### syntax

    prittier [opts] [filename ...]
    
#### Examples

    # get help info
    $ prettier

    # format files
    $ prettier --single-quote --trailing-comma es5 \
        --write "{app,__{tests,mocks}__}/**/*.js"



### Options

#### Output Options

    -l, --list-different     Print the names of files that are different from Prettier's formatting.
    --write                  Edit files in-place. (Beware!)

#### Format Options

    --arrow-parens <avoid|always>
                             Include parentheses around a sole arrow function parameter.
                             Defaults to avoid.
    --no-bracket-spacing     Do not print spaces between brackets.
    --jsx-bracket-same-line  Put > on the last line instead of at a new line.
                             Defaults to false.
    --parser <flow|babylon|typescript|css|less|scss|json|graphql|markdown>
                             Which parser to use.
                             Defaults to babylon.
    --print-width <int>      The line length where Prettier will try wrap.
                             Defaults to 80.
    --prose-wrap <always|never|preserve>
                             How to wrap prose. (markdown)
                             Defaults to preserve.
    --no-semi                Do not print semicolons, except at the beginning of lines which may need them.
    --single-quote           Use single quotes instead of double quotes.
                             Defaults to false.
    --tab-width <int>        Number of spaces per indentation level.
                             Defaults to 2.
    --trailing-comma <none|es5|all>
                             Print trailing commas wherever possible when multi-line.
                             Defaults to none.
    --use-tabs               Indent with tabs instead of spaces.
                             Defaults to false.


#### Config Options

    --config <path>          Path to a Prettier configuration file (.prettierrc, package.json, prettier.config.js).
    --no-config              Do not look for a configuration file.
    --config-precedence <cli-override|file-override|prefer-file>
                             Define in which order config files and CLI options should be evaluated.
                             Defaults to cli-override.
    --no-editorconfig        Don't take .editorconfig into account when parsing configuration.
    --find-config-path <path>
                             Find and print the path to a configuration file for the given input file.
    --ignore-path <path>     Path to a file with patterns describing files to ignore.
                             Defaults to .prettierignore.
    --with-node-modules      Process files inside 'node_modules' directory.



### Configuration File

> `3种形式`的配置文件

* `.prettierrc`文件，YAML或JSON格式
* `prettier.config.js`文件，该文件exports一个`object`
* `prettier`字段，在`package.json`文件的`一级`属性

> Examples

    // JSON: .prettierrc
    {
        "printWidth": 100,
        "parser": "flow"
    }

或

    // JS Module: prettierrc.config.js
    module.exports = {
        printWidth: 100,
        parser: "flow"
    };

或

    # YAML: .prettierrc
    printWidth: 100
    parser: flow


### Ignoring Code

> 配置忽略文件或代码

* 忽略`文件`，可以在`.prettierignore`文件中配置
* 忽略`代码`部分：

        type        comment 
        ================================================
        js          // prettier-ignore
        jsx         {/* prettier-ignore */}
        css         /* prettier-ignore */
        markdown    <!-- prettier-ignore -->
        range       <!-- prettier-ignore-start -->
                    <!-- prettier-ignore-end -->


