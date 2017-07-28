# jsdoc

## Resources
* site: <http://usejsdoc.org>
* github: <https://github.com/jsdoc3/jsdoc>
* `AMD Modules`: <http://usejsdoc.org/howto-amd-modules.html>
* ES6 Classes: <http://usejsdoc.org/howto-es2015-classes.html>
* ES6 Modules: <http://usejsdoc.org/howto-es2015-modules.html>
* CommonJS Modules: <http://usejsdoc.org/howto-commonjs-modules.html> 
* esdoc: <ref://./esdoc.md.html>



## 支持标签

> `62个`块标签，`2个`内联标签


### 块标签 ( 62 )

1. `@abstract (synonyms: @virtual)`
    This member must be implemented (or overridden) by the inheritor.

2. `@access`
    Specify the access level of this member (private, public, or protected).

3. `@alias`
    Treat a member as if it had a different name.

3. `@augments (synonyms: @extends)`
    Indicate that a symbol inherits from, ands adds to, a parent symbol.

3. `@author`
    Identify the author of an item.

3. `@borrows`
    This object uses something from another object.

3. `@callback`
    Document a callback function.


3. `@class (synonyms: @constructor)`
    This function is intended to be called with the "new" keyword.

3. `@classdesc`
    Use the following text to describe the entire class.

3. `@constant (synonyms: @const)`
    Document an object as a constant.

3. `@constructs`
    This function member will be the constructor for the previous class.

3. `@copyright`
    Document some copyright information.

3. `@default (synonyms: @defaultvalue)`
    Document the default value.

3. `@deprecated`
    Document that this is no longer the preferred way.

3. `@description (synonyms: @desc)`
    Describe a symbol.

3. `@enum`
    Document a collection of related properties.

3. `@event`
    Document an event.

3. `@example`
    Provide an example of how to use a documented item.

3. `@exports`
    Identify the member that is exported by a JavaScript module.

3. `@external (synonyms: @host)`
    Identifies an external class, namespace, or module.

3. `@file (synonyms: @fileoverview, @overview)`
    Describe a file.

3. `@fires (synonyms: @emits)`
    Describe the events this method may fire.

3. `@function (synonyms: @func, @method)`
    Describe a function or method.

3. `@global`
    Document a global object.

3. `@ignore`
    Omit a symbol from the documentation.

3. `@implements`
    This symbol implements an interface.

3. `@inheritdoc`
    Indicate that a symbol should inherit its parent's documentation.

3. `@inner`
    Document an inner object.

3. `@instance`
    Document an instance member.

3. `@interface`
    This symbol is an interface that others can implement.

3. `@kind`
    What kind of symbol is this?

3. `@lends`
    Document properties on an object literal as if they belonged to a symbol with a given name.

3. `@license`
    Identify the license that applies to this code.

3. `@listens`
    List the events that a symbol listens for.

3. `@member (synonyms: @var)`
    Document a member.

3. `@memberof`
    This symbol belongs to a parent symbol.

3. `@mixes`
    This object mixes in all the members from another object.

3. `@mixin`
    Document a mixin object.

3. `@module`
    Document a JavaScript module.

3. `@name`
    Document the name of an object.

3. `@namespace`
    Document a namespace object.

3. `@override`
    Indicate that a symbol overrides its parent.

3. `@param (synonyms: @arg, @argument)`
    Document the parameter to a function.

3. `@private`
    This symbol is meant to be private.

3. `@property (synonyms: @prop)`
    Document a property of an object.

3. `@protected`
    This symbol is meant to be protected.

3. `@public`
    This symbol is meant to be public.

3. `@readonly`
    This symbol is meant to be read-only.

3. `@requires`
    This file requires a JavaScript module.

3. `@returns (synonyms: @return)`
    Document the return value of a function.

3. `@see`
    Refer to some other documentation for more information.

3. `@since`
    When was this feature added?

3. `@static`
    Document a static member.

3. `@summary`
    A shorter version of the full description.

3. `@this`
    What does the 'this' keyword refer to here?

3. `@throws (synonyms: @exception)`
    Describe what errors could be thrown.

3. `@todo`
    Document tasks to be completed.

3. `@tutorial`
    Insert a link to an included tutorial file.

3. `@type`
    Document the type of an object.

3. `@typedef`
    Document a custom type.

3. `@variation`
    Distinguish different objects with the same name.

3. `@version`
    Documents the version number of an item.




### 内联标签( 2 )

1. `{@link} (synonyms: {@linkcode}, {@linkplain})`
    Link to another item in the documentation.

2. `{@tutorial}`
    Link to a tutorial.






## 例子


### @description 或 @desc

第一行写说明，可以省略`@desc`，其他地方，需要带上。

    /**
     * Add two numbers.
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    function add(a, b) {
        return a + b;
    }

非第一行写说明，不可省略：

    /**
     * @param {number} a
     * @param {number} b
     * @returns {number}
     * @description Add two numbers.
     */
    function add(a, b) {
        return a + b;
    }



### @param 或 @arg 或 @argument


Name only

    /**
     * @param somebody
     */
    function sayHello(somebody) {
        alert('Hello ' + somebody);
    }

Name and type

    /**
     * @param {string} somebody
     */
    function sayHello(somebody) {
        alert('Hello ' + somebody);
    }


Name, type, and description

    /**
     * @param {string} somebody Somebody's name.
     */
    function sayHello(somebody) {
        alert('Hello ' + somebody);
    }

You can add a hyphen before the description to make it more readable. Be sure to include a space before and after the hyphen.

Name, type, and description, with a hyphen before the description

    /**
     * @param {string} somebody - Somebody's name.
     */
    function sayHello(somebody) {
        alert('Hello ' + somebody);
    }


Documenting a parameter's properties

    /**
     * Assign the project to an employee.
     * @param {Object} employee - The employee who is responsible for the project.
     * @param {string} employee.name - The name of the employee.
     * @param {string} employee.department - The employee's department.
     */
    Project.prototype.assign = function(employee) {
        // ...
    };





Documenting properties of values in an array

    /**
     * Assign the project to a list of employees.
     * @param {Object[]} employees - The employees who are responsible for the project.
     * @param {string} employees[].name - The name of an employee.
     * @param {string} employees[].department - The employee's department.
     */
    Project.prototype.assign = function(employees) {
        // ...
    };


An optional parameter (using JSDoc syntax)

    /**
     * @param {string} [somebody] - Somebody's name.
     */
    function sayHello(somebody) {
        if (!somebody) {
            somebody = 'John Doe';
        }
        alert('Hello ' + somebody);
    }

An optional parameter (using Google Closure Compiler syntax)

    /**
     * @param {string=} somebody - Somebody's name.
     */
    function sayHello(somebody) {
        if (!somebody) {
            somebody = 'John Doe';
        }
        alert('Hello ' + somebody);
    }

An optional parameter and default value

    /**
     * @param {string} [somebody=John Doe] - Somebody's name.
     */
    function sayHello(somebody) {
        if (!somebody) {
            somebody = 'John Doe';
        }
        alert('Hello ' + somebody);
    }


Allows one type OR another type (type union)

    /**
     * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
     */
    function sayHello(somebody) {
        if (!somebody) {
            somebody = 'John Doe';
        } else if (Array.isArray(somebody)) {
            somebody = somebody.join(', ');
        }
        alert('Hello ' + somebody);
    }


Allows any type

    /**
     * @param {*} somebody - Whatever you want.
     */
    function sayHello(somebody) {
        console.log('Hello ' + JSON.stringify(somebody));
    }


Allows a parameter to be repeated

    /**
     * Returns the sum of all numbers passed to the function.
     * @param {...number} num - A positive or negative number.
     */
    function sum(num) {
        var i = 0, n = arguments.length, t = 0;
        for (; i < n; i++) {
            t += arguments[i];
        }
        return t;
    }





Parameters that accept a callback

    /**
     * This callback type is called `requestCallback` and is displayed as a global symbol.
     *
     * @callback requestCallback
     * @param {number} responseCode
     * @param {string} responseMessage
     */

    /**
     * Does something asynchronously and executes the callback on completion.
     * @param {requestCallback} cb - The callback that handles the response.
     */
    function doSomethingAsynchronously(cb) {
        // code
    };





## @returns 或 @return

Type of the return value

    /**
     * Returns the sum of a and b
     * @param {Number} a
     * @param {Number} b
     * @returns {Number}
     */
    function sum(a, b) {
        return a + b;
    }

Type and description of the return value

    /**
     * Returns the sum of a and b
     * @param {Number} a
     * @param {Number} b
     * @returns {Number} Sum of a and b
     */
    function sum(a, b) {
        return a + b;
    }

The return value can have different types

    /**
     * Returns the sum of a and b
     * @param {Number} a
     * @param {Number} b
     * @param {Boolean} retArr If set to true, the function will return an array
     * @returns {Number|Array} Sum of a and b or an array that contains a, b and the sum of a and b.
     */
    function sum(a, b, retArr) {
        if (retArr) {
            return [a, b, a + b];
        }
        return a + b;
    }



## 属性相关

### @property

    /**
     * @namespace
     * @property {object}  defaults               - The default values for parties.
     * @property {number}  defaults.players       - The default number of players.
     * @property {string}  defaults.level         - The default level for the party.
     * @property {object}  defaults.treasure      - The default treasure.
     * @property {number}  defaults.treasure.gold - How much gold the party starts with.
     */
    var config = {
        defaults: {
            players: 1,
            level:   'beginner',
            treasure: {
                gold: 0
            }
        }
    };




### @enum

    /**
     * Enum for tri-state values.
     * @readonly
     * @enum {number}
     */
    var triState = {
        /** The true value */
        TRUE: 1,
        FALSE: -1,
        /** @type {boolean} */
        MAYBE: true
    };


### @member

    /** @class */
    function Data() {
        /** @member {Object} */
        this.point = {};
    }

    /**
     * A variable in the global namespace called 'foo'.
     * @var {number} foo
     */





## AMD Modules


Function that returns an object literal

    define('my/shirt', function() {
       /**
        * A module representing a shirt.
        * @exports my/shirt
        */
        var shirt = {
            /** The module's `color` property. */
            color: 'black',

            /** @constructor */
            Turtleneck: function(size) {
                /** The class' `size` property. */
                this.size = size;
            }
        };

        return shirt;
    });



Function that returns a constructor

    /**
     * A module representing a jacket.
     * @module my/jacket
     */
    define('my/jacket', function() {
        /**
         * @constructor
         * @alias module:my/jacket
         */
        var Jacket = function() {
            // ...
        };

        /** Zip up the jacket. */
        Jacket.prototype.zip = function() {
            // ...
        };

        return Jacket;
    });





Function that returns a constructor

    /**
     * A module representing a jacket.
     * @module my/jacket
     */
    define('my/jacket', function() {
        /**
         * @constructor
         * @alias module:my/jacket
         */
        var Jacket = function() {
            // ...
        };

        /** Zip up the jacket. */
        Jacket.prototype.zip = function() {
            // ...
        };

        return Jacket;
    });




Module declared in a return statement

    /**
     * Module representing a shirt.
     * @module my/shirt
     */

    define('my/shirt', function() {
        // Do setup work here.

        return /** @alias module:my/shirt */ {
            /** Color. */
            color: 'black',
            /** Size. */
            size: 'unisize'
        };
    });






Module object passed to a function

    define('my/jacket', function(
        /**
         * Utility functions for jackets.
         * @exports my/jacket
         */
        module) {

        /**
         * Zip up a jacket.
         * @param {Jacket} jacket - The jacket to zip up.
         */
        module.zip = function(jacket) {
            // ...
        };
    });




Multiple AMD modules defined in one file

    // one module
    define('html/utils', function() {
        /**
         * Utility functions to ease working with DOM elements.
         * @exports html/utils
         */
        var utils = {
            /** Get the value of a property on an element. */
            getStyleProperty: function(element, propertyName) { }
        };

        /** Determine if an element is in the document head. */
        utils.isInHead = function(element) { }

        return utils;
        }
    );

    // another module
    define('tag', function() {
        /** @exports tag */
        var tag = {
            /** @class */
            Tag: function(tagName) {
                // ...
            }
        };

        return tag;
    });


## ES2015


### Classes

<http://usejsdoc.org/howto-es2015-classes.html>


#### Definition

    /** Class representing a point. */
    class Point {
        /**
         * Create a point.
         * @param {number} x - The x value.
         * @param {number} y - The y value.
         */
        constructor(x, y) {
            // ...
        }

        /**
         * Get the x value.
         * @return {number} The x value.
         */
        getX() {
            // ...
        }

        /**
         * Get the y value.
         * @return {number} The y value.
         */
        getY() {
            // ...
        }

        /**
         * Convert a string containing two comma-separated numbers into a point.
         * @param {string} str - The string containing two comma-separated numbers.
         * @return {Point} A Point object.
         */
        static fromString(str) {
            // ...
        }
    }


#### Extends

    /**
     * Class representing a dot.
     * @extends Point
     */
    class Dot extends Point {
        /**
         * Create a dot.
         * @param {number} x - The x value.
         * @param {number} y - The y value.
         * @param {number} width - The width of the dot, in pixels.
         */
        constructor(x, y, width) {
            // ...
        }

        /**
         * Get the dot's width.
         * @return {number} The dot's width, in pixels.
         */
        getWidth() {
            // ...
        }
    }



### Modules

<http://usejsdoc.org/howto-es2015-modules.html>




## CLI

> An API documentation generator for JavaScript.  Need nodejs `0.10+`

### 相关命令行

    npm install jsdoc
    # lastest development version
    npm install git+https://github.com/jsdoc3/jsdoc.git
    # install globally
    sudo npm install -g jsdoc
    
    ./node_modules/.bin/jsdoc yourJavaScriptFile.js


### jsdoc.json

> jsdoc配置文件

* `conf.json`: <http://usejsdoc.org/about-configuring-jsdoc.html>
* jsdoc默认使用的配置文件：`path/to/jsdoc/conf.json`

默认情况：

    {
        "tags": {
            "allowUnknownTags": true,
            "dictionaries": ["jsdoc","closure"]
        },
        "source": {
            "includePattern": ".+\\.js(doc|x)?$",
            "excludePattern": "(^|\\/|\\\\)_"
        },
        "plugins": [],
        "templates": {
            "cleverLinks": false,
            "monospaceLinks": false
        }
    }

jsdoc安装包`自带`的`插件`，不需额外安装，但`需要配置`在plugins数组中(jsdoc3)：

        commentConvert.js
        commentsOnly.js
        escapeHtml.js
        eventDumper.js
        markdown.js
        overloadHelper.js
        partial.js
        railsTemplate.js
        shout.js
        sourcetag.js
        summarize.js
        underscore.js

`zrender`的例子，命名为`jsdoc.json`：

    {
        "source": {
            "include": ["src", "README.md"],
            "includePattern": ".+\\.js(doc)?$"
        },
        "opts": {
            "template": "./doc/jsdoc-tmpl",
            "encoding": "utf8",
            "destination": "./doc/api/",
            "recurse": true
        },
        "plugins": ["plugins/markdown"],
        "templates": {
            "applicationName": "ZRender",
            "disqus": "",
            "googleAnalytics": "",
            "openGraph": {
                "title": "",
                "type": "website",
                "image": "",
                "site_name": "",
                "url": ""
            },
            "meta": {
                "title": "",
                "description": "",
                "keyword": ""
            }
        },
        "readme": "./README.md"
    }

使用：

    npm install jsdoc
    ./node_modules/.bin/jsdoc -c jsdoc.json


### 模板

* `jaguarjs-jsdoc`

    github: <https://github.com/davidshimjs/jaguarjs-jsdoc>
    example: <http://jaguarjs.com/doc/>

        npm install
        grunt demo
        grunt demo --debug

        # 已存在jsdoc的，可将`jaguarjs-jsdoc`作为模板目录
        jsdoc -t `project folder` -c `configuration file` `source files` `README.md file`

* `DocStrap`: DocStrap is Bootstrap based template for JSDoc3.

    website: <http://docstrap.github.io/docstrap/>

        npm install ink-docstrap

        # cli usage
        jsdoc -c path/to/conf.json -t ./node_modules/ink-docstrap/template -R README.md -r .


* jsdoc3Template
* minami
* `docdash`

    site: <http://clenemt.github.io/docdash/>

        npm install docdash
           
        # cli usage
        jsdoc -c path/to/conf.json -t ./node_modules/docdash -R README.md -r .



### 构建工具

* JSDoc Ant task
* JSDoc Grunt plugin
* JSDoc Gulp plugin

