# js basics



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## typeof

`typeof`输出是`字符串`类型，输出为以下`7个`值之一：

* number
* string
* boolean
* object
* function
* undefined
* symbol

<div id="test_10" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_10');
        var items = [
            1
            , 'Hello, World!'
            , true 
            , null
            , undefined
            , [ 1, 2, 3]
            , Array
            , { name: 'Michael' }
            , new Object()
            , function(){}
            , new Number(1) 
            , new String('Hello')
        ];
        s.show('typeofs: ');
        for(var i=0; i<items.length; i++){
            s.append_show(
                'typeof ' + (
                    typeof items[i] == 'function' 
                    ? items[i].toString() 
                        : JSON.stringify( items[i] ) 
                )
                , typeof items[i]
            );
        }

    })();

</div>
<div class="test-panel">
</div>
</div>


## 一般等式

    null == undefined
    0 == ''
    false == 0
    false == ''
    true == 1
    true != 100


<div id="test_20" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_20');
        var items = [
                [ 'null', 'undefined' ]
                , [ '0', '""' ]
                , [ 'false', '0' ]
                , [ 'false', '""' ]
                , [ '1', 'true' ]
                , [ '100', 'true' ]
            ]
            , expr
            ;
        s.show('common equaltions test: \n');
        for(var i=0; i<items.length; i++){
            expr = items[i][0] + ' == ' + items[i][1]; 
            s.append_show(
                expr
                , eval(expr)
            );
        }

    })();

</div>
<div class="test-panel">
</div>
</div>




## 绝对等式

    typeof null === 'object'
    void 0 === undefined

数字判断：

    num === +num

IE9以下，`hasEnumBug`

<div id="test_25" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_25');
        var items = [
                [ 'typeof null', '"object"' ]
                , [ 'void 0', 'undefined' ]
                , [ '5', '+5' ]
                , [ '1', 'true' ]
            ]
            , expr
            ;
        s.show('absolute equaltions test: \n');
        for(var i=0; i<items.length; i++){
            expr = items[i][0] + ' === ' + items[i][1]; 
            s.append_show(
                expr
                , eval(expr)
            );
        }

    })();

</div>
<div class="test-panel">
</div>
</div>




## TRUE表达式

    !null
    !void 0
    !undefined
    !0
    !''


## 位运算符

`~a`相当于

    var b = -a;
    b = b -1;

<div id="test_30" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_30');
        s.show('bit-wise operations: ');

        s.append_show(
            '~5'
            , ~5    
        );

        s.append_show(
            '~0'
            , ~0    
        );

        s.append_show(
            '~-1'
            , ~-1    
        );

        s.append_show(
            '( 3.1415 | 0 )'
            , 3.1415 | 0 
        );

    })();

</div>
<div class="test-panel">
</div>
</div>


## Object.prototype.toString.call(obj)

注意`不是Object.toString`，该toString来自`Function.prototype.toString`

    function(){}    [object Function]
    []              [object Array]
    10              [object Number]



## arguments是Array-like的

    (function(){
        console.log(arguments);
    })();

`output`:

    []


## 正则表达式之转义序列

1. `\xxx`: 八进制数xxx规定的字符
2. `\xdd`: 十六进制数dd规定的字符
3. `\uxxxx`:十六进制数xxxx规定的Unicode字符



## CSSOM部分相关扩展 


> <http://www.w3.org/TR/cssom-view-1/>


`window`扩展：

1. [非CSSOM扩展] window.getComputedStyle(element)
2. [viewport] window.innerWidth
3. [viewport] window.innerHeight
4. [viewport scrolling] window.scrollX 
5. [viewport scrolling] window.scrollY 
6. [viewport scrolling] window.pageXOffset 
7. [viewport scrolling] window.pageYOffset 
11. [client] window.screenX
12. [client] window.screenY
13. [client] window.outerWidth
14. [client] window.outerHeight
15. [client] window.devicePixelRatio
8. [viewport scrolling] window.scroll() 
9. [viewport scrolling] window.scrollTo() 
10. [viewport scrolling] window.scrollBy() 



`element`扩展：

1. element.getClientRects()
2. element.getBoundingClientRect()
3. element.scrollIntoView()
7. element.scrollTop
8. element.scrollLeft
9. [readonly] element.scrollWidth
10. [readonly] element.scrollHeight
11. [readonly] element.clientTop
12. [readonly] element.clientLeft
13. [readonly] element.clientWidth
14. [readonly] element.clientHeight
4. element.scroll()
5. element.scrollTo()
6. element.scrollBy()



<div id="test_60" class="test" style="position:relative; border: 1px solid red;">
<div class="test-console" style="border: 1px solid green;"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        setTimeout(function(){

            var s = fly.createShow('#test_60')
                , st = window.getComputedStyle($('#test_60 .test-console')[0])
                , list
                , element
                ;
            s.show('getComputedStyle(): ');
            list = [
                'width'
                , 'height'
                , 'padding-left'
                , 'margin-left'
                , 'position'
                , 'left'
                , 'color'
                , 'background'
                , 'font'
            ];
            list.forEach(function(item){
                s.append_show('st["' + item + '"]', st[item]); 
            });

            list = [
                'innerWidth'
                , 'innerHeight'
                , 'scrollX'
                , 'scrollY'
                , 'pageXOffset'
                , 'pageYOffset'
                , 'screenX'
                , 'screenY'
                , 'outerWidth'
                , 'outerHeight'
                , 'devicePixelRatio'
            ];

            s.append_show('\nwindow extensions: ');
            list.forEach(function(item){
                s.append_show('window.' + item, window[item]); 
            });

            list = [
                'scrollTop'
                , 'scrollLeft'
                , 'scrollWidth'
                , 'scrollHeight'
                , 'clientTop'
                , 'clientLeft'
                , 'clientWidth'
                , 'clientHeight'
            ];

            s.append_show('\nelement extensions: ');
            element = $('#test_60 .test-console')[0];
            list.forEach(function(item){
                s.append_show('element.' + item, element[item]); 
            });


            s.append_show('\ngetClientRects() & getBoundingClientRect(): ');
            s.append_show(
                objectParse($('#test_60 .test-console')[0].getClientRects())
            );
            s.append_show(
                objectParse($('#test_60 .test-console')[0].getBoundingClientRect())
            );

            function objectParse(obj){
                var ret = {};
                if(typeof obj == 'object'){
                    for(var i in obj){
                        ret[i] = objectParse(obj[i]);
                    }
                }
                else {
                    ret = obj;
                }
                return ret;
            }

        }, 1000);

    })();

</div>
<div class="test-panel">
</div>
</div>





## JSON.stringify

    JSON.stringigy(document.body.getBoundingClientRect())

`Safari`能输出`ClientRect`类型对象的内部内容，而`Chrome`只输出空对象`"{}"`。
这也是上方`objectParse()`方法存在的原因，能保证`Chrome`能输出其内容。




## hasOwnProperty() 与 in 操作符

> <http://www.ecma-international.org/ecma-262/6.0/#sec-own-property>


### hasOwnProperty()

* `own property`: property that is directly contained by its object
* `inherited property`: property of an object that is not an own property but is a property (either own or inherited) of the object’s prototype

### in operator 

The production RelationalExpression : RelationalExpression in ShiftExpression is evaluated as follows:
1. Let `lref` be the result of evaluating RelationalExpression.
2. Let `lval` be GetValue(lref).
3. Let `rref` be the result of evaluating ShiftExpression.
4. Let `rval` be GetValue(rref).
5. If Type(rval) is not Object, throw a TypeError exception.
6. Return the result of calling the `[[HasProperty]]` `internal` method of rval with argument ToString(lval).

`in`使用的是内部方法`hasProperty()`，包含继承而来的属性。

<div id="test_90" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_90')
            , obj1 = {name: 'hudamin'}
            ;

        s.show('hasOwnProperty(): ');
        s.append_show(obj1.hasOwnProperty('name'));

        function Person(name, age, sex){
            this.name = name;
            this.age = age;
            this.sex = sex;
        }

        Person.prototype.sayHello = function(){
            s.append_show(this.name, this.age, this.sex);
        }

        function Student(name, age, sex, score){
            Person.call(this, name, age, sex);
            this.score = score;
        }

        Student.prototype = new Person();
        Student.prototype.constructor = Student;
        Student.prototype.sayHello = function(){
            Person.prototype.sayHello.apply(this);
            s.append_show(this.score);
        }


        var obj2 = new Student('hudamin', 20, 'male', 100)
            , list = ['name', 'sayHello', 'sayYes']
            , wrapper = {Person: Person, Student: Student}
            ;

        s.append_show('\nsayHello:');
        obj2.sayHello();
        obj2.sayYes = function(){
            s.append_show('YES!');
        };

        s.append_show('\n');
        list.forEach(function(key){
            s.append_show(
                'obj2.hasOwnProperty("' + key + '")'
                , obj2.hasOwnProperty(key)
            );
        });

        s.append_show('\nin operator:');

        var props = []
            , ownProps = [];
        for(var i in obj2){
            props.push(i); 
            if(obj2.hasOwnProperty(i)){
                ownProps.push(i);
            }
        }
        s.append_show('property', props);
        s.append_show('own property', ownProps);

        s.append_show('\ninstanceof operator');
        list = ['Student', 'Person'];
        list.forEach(function(item){
            s.append_show(
                'obj2 instanceof ' + item
                , obj2 instanceof wrapper[item]
            );
        });

    })();

</div>
<div class="test-panel">
</div>
</div>


## Fundamental Objects

<http://www.ecma-international.org/ecma-262/6.0/#sec-fundamental-objects>

    Object.assign(target, ...sources)
    Object.create(O [, Properties ])
    Object.defineProperties(O, Properties)
    Object.defineProperty(), P, Attributes)
    Object.freeze(O)
    Object.getOwnPropertyDescriptor(O, P)
    Object.getOwnPropertyNames(O)
    Object.getOwnPropertySymbols(O)
    Object.getPrototypeOf(O)
    Object.is(value1, value2)
    ...






## blob

## Float32Array



