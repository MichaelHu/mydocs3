# browserify

> 支持用`CommonJS module` ( nodejs支持 )的方式编写`运行在浏览器`中的js代码 


## Features

* `命令行`模式
* 自动解析entry的`require()`依赖，形成依赖图谱，将图谱涉及的所有package都打入一个bundle中
* `shimming`功能，能直接require node环境下的某些指定package，工具将自动添加浏览器垫片，支持的package包括：
        assert buffer console constants crypto domain events http 
        https os path punycode querystring stream string_decoder 
        timers tty url util vm zlib

    以下变量也可直接使用：

        process Buffer
        global
        __filename
        __dirname

* 支持require`外部bundle`



## Resources

* `site`: <http://browserify.org/>
* `github`: <https://github.com/browserify/browserify> <iframe src="http://258i.com/gbtn.html?user=browserify&repo=browserify&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* `r.js`: <ref://./r.md.html>


## Installation

    $ npm install -g browserify
    $ npm install browserify

## Usage

    $ ./node_modules/.bin/browserify {entry files} [options]


## Examples

### 构建bundle 

#### main.js

    var unique = require('uniq');
    var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];
    console.log(unique(data)); 

#### 安装uniq模块

    $ npm install uniq

#### 打包main.js

    $ browserify main.js -o bundle.js

#### 浏览器中直接使用

    <script src="bundle.js"></script>



### 打包指定模块

    $ browserify -r through -r duplexer -r ./myfile.js:my-module > bundle.ls 

then in your page:

    <script src="bundle.js"></script>
    <script>
        var through = require( 'through' );
        var duplexer = require( 'duplexer' );
        var myModule = require( 'my-module' );
    </script>


### Standard Options

      --outfile, -o  Write the browserify bundle to this file.
                     If unspecified, browserify prints to stdout.

      --require, -r  A module name or file to bundle.require()
                     Optionally use a colon separator to set the target.

        --entry, -e  An entry point of your app

       --ignore, -i  Replace a file with an empty stub. Files can be globs.

      --exclude, -u  Omit a file from the output bundle. Files can be globs.

     --external, -x  Reference a file from another bundle. Files can be globs.

    --transform, -t  Use a transform module on top-level files.

      --command, -c  Use a transform command on top-level files.

    --standalone -s  Generate a UMD bundle for the supplied export name.
                     This bundle works with other module systems and sets the name
                     given as a window global if no module system is found.

         --debug -d  Enable source maps that allow you to debug your files
                     separately.

         --help, -h  Show this message


### Advanced Options

    --insert-globals, --ig, --fast    [default: false]

        Skip detection and always insert definitions for process, global,
        __filename, and __dirname.

        benefit: faster builds
        cost: extra bytes

      --insert-global-vars, --igv

        Comma-separated list of global variables to detect and define.
        Default: __filename,__dirname,process,Buffer,global

      --detect-globals, --dg            [default: true]

        Detect the presence of process, global, __filename, and __dirname and define
        these values when present.

        benefit: npm modules more likely to work
        cost: slower builds

      --ignore-missing, --im            [default: false]

        Ignore `require()` statements that don't resolve to anything.

      --noparse=FILE

        Don't parse FILE at all. This will make bundling much, much faster for giant
        libs like jquery or threejs.

      --no-builtins

        Turn off builtins. This is handy when you want to run a bundle in node which
        provides the core builtins.

      --no-commondir

        Turn off setting a commondir. This is useful if you want to preserve the
        original paths that a bundle was generated with.

      --no-bundle-external

        Turn off bundling of all external modules. This is useful if you only want
        to bundle your local files.

      --bare

        Alias for both --no-builtins, --no-commondir, and sets --insert-global-vars
        to just "__filename,__dirname". This is handy if you want to run bundles in
        node.

      --no-browser-field, --no-bf

        Turn off package.json browser field resolution. This is also handy if you
        need to run a bundle in node.

      --transform-key

        Instead of the default package.json#browserify#transform field to list
        all transforms to apply when running browserify, a custom field, like, e.g.
        package.json#browserify#production or package.json#browserify#staging
        can be used, by for example running:
        * `browserify index.js --transform-key=production > bundle.js`
        * `browserify index.js --transform-key=staging > bundle.js`

      --node

        Alias for --bare and --no-browser-field.

      --full-paths

        Turn off converting module ids into numerical indexes. This is useful for
        preserving the original paths that a bundle was generated with.

      --deps

        Instead of standard bundle output, print the dependency array generated by
        module-deps.

      --no-dedupe

        Turn off deduping.

      --list

        Print each file in the dependency graph. Useful for makefiles.

      --extension=EXTENSION

        Consider files with specified EXTENSION as modules, this option can used
        multiple times.

      --global-transform=MODULE, -g MODULE

        Use a transform module on all files after any ordinary transforms have run.

      --ignore-transform=MODULE, -it MODULE

        Do not run certain transformations, even if specified elsewhere.

      --plugin=MODULE, -p MODULE

        Register MODULE as a plugin.

    Passing arguments to transforms and plugins:

      For -t, -g, and -p, you may use subarg syntax to pass options to the
      transforms or plugin function as the second parameter. For example:

        -t [ foo -x 3 --beep ]

      will call the `foo` transform for each applicable file by calling:

        foo(file, { x: 3, beep: true })





