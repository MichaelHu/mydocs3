# npm备忘

> @[style="color:green;font-size:18px"]Node Packaged Modules. 
> <a href="http://www.npmjs.org"> [ npmjs ] </a>

## 常用命令

### npm install, npm i

    npm install <name>
    npm install -g <name>
    npm install --save <name>
    npm install --verbose -g <name>



### npm init

    npm init [-f|--force|-y|--yes]


### npm rm

    npm rm <name>
    npm r <name>
    npm uninstall <name>
    npm un <name>


### npm update

    npm update <name>

### npm ls
    npm ls
    npm ls -g

### npm root

    npm root
    npm root -g

### npm help

    npm help

### npm config

    npm config list
    npm config set <key> <value> [-g]
    npm config get <key>
    npm config delete <key>
    npm get <key>
    npm set <key> <value> [--global]

### npm link






## package.json

必须是一个`纯JSON`，而不能是JS的object literal。

* name
* version
* description
* keywords
* homepage
* bugs
        { "url" : "http://github.com/owner/project/issues"
        , "email" : "project@hostname.com"
        }
* license
* author, contributors (数组) 
* files，受.npmignore影响
* main
* bin
        { "bin" : { "npm" : "./cli.js" } }
* man
* directories
* directories.lib
* directories.bin
* directories.man
* directories.doc
* directories.example
* repository

        "repository" :
          { "type" : "git"
          , "url" : "http://github.com/npm/npm.git"
          }

        "repository" :
          { "type" : "svn"
          , "url" : "http://v8.googlecode.com/svn/trunk/"
          }

* scripts: 定义包生命周期中各个阶段调用执行的脚本命令
* config
* dependencies

        { "dependencies" :
          { "foo" : "1.0.0 - 2.9999.9999"
          , "bar" : ">=1.0.2 <2.1.2"
          , "baz" : ">1.0.2 <=2.3.4"
          , "boo" : "2.0.1"
          , "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
          , "asd" : "http://asdf.com/asdf.tar.gz"
          , "til" : "~1.2"
          , "elf" : "~1.2.3"
          , "two" : "2.x"
          , "thr" : "3.3.x"
          , "lat" : "latest"
          , "dyl" : "~/projects/dyl"
          }
        }

* devDependencies

        { "name": "ethopia-waza",
          "description": "a delightfully fruity coffee varietal",
          "version": "1.2.3",
          "devDependencies": {
            "coffee-script": "~1.6.3"
          },
          "scripts": {
            "prepublish": "coffee -o lib/ -c src/waza.coffee"
          },
          "main": "lib/waza.js"
        }

* peerDependencies

        {
          "name": "tea-latte",
          "version": "1.3.5"
          "peerDependencies": {
            "tea": "2.x"
          }
        }

* bundledDependencies
* bundleDependencies
* optionalDependencies
* engines

        { "engines" : { "node" : ">=0.10.3 <0.12" } }

* engineStrict 
* os
        
        "os" : [ "darwin", "linux" ]

    or

        "os" : [ "darwin", "!win32" ]

* cpu

        "cpu": [ "x64", "ia32" ] 

    or

        "cpu": [ "!arm", "!mips" ] 

* preferGlobal，如果希望安装成global的，那么当被安装成local的时候，给出warning 
* private
* publishConfig

