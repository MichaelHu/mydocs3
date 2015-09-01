# jsDoc注释语法


http://usejsdoc.org

https://github.com/jsdoc3/jsdoc

AMD Modules: http://usejsdoc.org/howto-amd-modules.html


## 1 支持标签


`62个`块标签，`2个`内联标签


### 1.1 块标签

@abstract (synonyms: @virtual)
This member must be implemented (or overridden) by the inheritor.

@access
Specify the access level of this member (private, public, or protected).

@alias
Treat a member as if it had a different name.

@augments (synonyms: @extends)
Indicate that a symbol inherits from, ands adds to, a parent symbol.

@author
Identify the author of an item.

@borrows
This object uses something from another object.

@callback
Document a callback function.


@class (synonyms: @constructor)
This function is intended to be called with the "new" keyword.

@classdesc
Use the following text to describe the entire class.

@constant (synonyms: @const)
Document an object as a constant.

@constructs
This function member will be the constructor for the previous class.

@copyright
Document some copyright information.

@default (synonyms: @defaultvalue)
Document the default value.

@deprecated
Document that this is no longer the preferred way.

@description (synonyms: @desc)
Describe a symbol.

@enum
Document a collection of related properties.

@event
Document an event.

@example
Provide an example of how to use a documented item.

@exports
Identify the member that is exported by a JavaScript module.

@external (synonyms: @host)
Identifies an external class, namespace, or module.

@file (synonyms: @fileoverview, @overview)
Describe a file.

@fires (synonyms: @emits)
Describe the events this method may fire.

@function (synonyms: @func, @method)
Describe a function or method.

@global
Document a global object.

@ignore
Omit a symbol from the documentation.

@implements
This symbol implements an interface.

@inheritdoc
Indicate that a symbol should inherit its parent's documentation.

@inner
Document an inner object.

@instance
Document an instance member.

@interface
This symbol is an interface that others can implement.

@kind
What kind of symbol is this?

@lends
Document properties on an object literal as if they belonged to a symbol with a given name.

@license
Identify the license that applies to this code.

@listens
List the events that a symbol listens for.

@member (synonyms: @var)
Document a member.

@memberof
This symbol belongs to a parent symbol.

@mixes
This object mixes in all the members from another object.

@mixin
Document a mixin object.

@module
Document a JavaScript module.

@name
Document the name of an object.

@namespace
Document a namespace object.

@override
Indicate that a symbol overrides its parent.

@param (synonyms: @arg, @argument)
Document the parameter to a function.

@private
This symbol is meant to be private.

@property (synonyms: @prop)
Document a property of an object.

@protected
This symbol is meant to be protected.

@public
This symbol is meant to be public.

@readonly
This symbol is meant to be read-only.

@requires
This file requires a JavaScript module.

@returns (synonyms: @return)
Document the return value of a function.

@see
Refer to some other documentation for more information.

@since
When was this feature added?

@static
Document a static member.

@summary
A shorter version of the full description.

@this
What does the 'this' keyword refer to here?

@throws (synonyms: @exception)
Describe what errors could be thrown.

@todo
Document tasks to be completed.

@tutorial
Insert a link to an included tutorial file.

@type
Document the type of an object.

@typedef
Document a custom type.

@variation
Distinguish different objects with the same name.

@version
Documents the version number of an item.




### 1.2 内联标签

{@link} (synonyms: {@linkcode}, {@linkplain})
Link to another item in the documentation.

{@tutorial}
Link to a tutorial.






## 2 例子


### 2.1 @description 或 @desc

第一行写说明，可以省略@desc，其他地方，需要带上。

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



### 2.2 @param 或 @arg 或 @argument


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





## 3 @returns 或 @return

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






## 4 AMD Modules


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
