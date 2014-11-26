# CommonJS Modules/1.1.1

> A way to build up the JavaScript ecosystem for web servers, desktop and command line 
> apps and in the browser.

`CommonJS wiki:` <a href="http://wiki.commonjs.org/wiki/CommonJS">CommonJS</a>

## require
* require是一个函数
    * 接收模块标识参数
    * 返回外部模块导出的API
    * 如果存在循环依赖，the foreign module may not have finished executing at the time it is 
        required by one of its transitive dependencies; in this case, the object returned by 
        "require" must contain at least the exports that the foreign module has prepared before 
        the call to require that led to the current module's execution.
    * 请求的模块如果不能返回，必须抛出错误
    * 函数可能有`main`属性
        * `main`属性如果可行的话，应该是只读的，不能删除
        * `main`属性要么`undefined`，要么等同于上下文中的一个已加载模块的`module`对象 
    * 函数可能有`paths`属性，是一个路径字符串组成的优先级数组，从高到低排列
        * 该属性必须不能存在与`sandbox`（一个安全模块系统） 
        * 该属性必须在所有模块中引用一致 
        * 将`paths`对象替换成另一对象无法生效
        * 如果`paths`属性存在，原地修改其对象内容必须影响其对应模块的搜索行为
        * If the "paths" attribute exists, it may not be an exhaustive list of search paths, 
            as the loader may internally look in other locations before or after the mentioned paths. 
        * If the "paths" attribute exists, it is the loader's prorogative to resolve, normalize, 
            or canonicalize the paths provided.

## module上下文
1. 有一个自由变量`require`
2. 有一个自由变量`exports`，在模块执行过程中，可能将其API添加到该对象中
    使用`exports`必须是模块导出API的唯一方法
3. 有一个自由变量`module`，该变量是一个对象，代表模块本身
    * module必须有一个`id`属性作为该对象的顶级属性，可用于类似调用
            
            require (module.id )

    * module可能有一个`uri`属性，该属性不能存在于sandbox中

## module标识

1. A module identifier is a String of `"terms"` delimited by forward slashes
2. A term must be a camelCase identifier, `"."`, or `".."`
3. Module identifiers may not have file-name extensions like `".js"`
4. Module identifiers may be `"relative"` or `"top-level"`. A module identifier is `"relative"`
    if the first term is `"."` or `".."`
5. Top-level identifiers are resolved off the conceptual module name space root
6. Relative identifiers are resolved relative to the identifier of the module in which 
    `"require"` is written and called


## 例子

1. math.js

        exports.add = function() {
            var sum = 0, i = 0, args = arguments, l = args.length;
            while (i < l) {
                sum += args[i++];
            }
            return sum;
        };

2. increment.js

        var add = require('math').add;
        exports.increment = function(val) {
            return add(val, 1);
        };

3. program.js

        var inc = require('increment').increment;
        var a = 1;
        inc(a); // 2
         
        module.id == "program";

