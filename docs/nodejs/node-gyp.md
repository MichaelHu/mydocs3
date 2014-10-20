# node-gyp

> Node.js `native addon` build tool

Generates Your Projects

nodejs编写的跨平台命令行工具。

nodejs的C++模块的编译工具，node的0.8版本之前，用的是node-waf编译，该版本之后，就进入使用node-gyp编译工具。

`GITHUB`: <a href="https://github.com/TooTallNate/node-gyp/">node-gyp</a>

其配置文件名为`binding.gyp`

## 安装方式

    $ npm install -g node-gyp


## 举例

### C++模块，binding.cc

    #include <node.h>
    #include <v8.h>

    using namespace v8;

    Handle<Value> Method(const Arguments& args) {
      HandleScope scope;
      return scope.Close(String::New("world"));
    }

    void init(Handle<Object> target) {
      NODE_SET_METHOD(target, "hello", Method);
    }

    NODE_MODULE(binding, init);

### binding.gyp文件

    {
      'targets': [
        {
          'target_name': 'binding',
          'sources': [ 'binding.cc' ]
        }
      ]
    }



### js调用代码

    var assert = require('assert');
    var binding = require('./build/Release/binding');
    assert.equal('world', binding.hello());
    console.log('binding.hello() =', binding.hello());
