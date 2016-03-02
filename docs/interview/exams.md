# 面试题


> 面试要严谨，对结果的客观性负责


## 1 js编程

1. 实现trim函数

        function trim ( s ) {
            if ( !isString(s) ) return '';
            return s.replace(/^\s*|\s*$/g, '');
        }

2. 正则表达式：`/\b/`与`/[\b]/`的区别

        单词边界 & 退格符


2. 用js实现类的定义、继承、包含类属性、实例属性、类方法、实例方法、公共属性、私有属性

3. 用js定义一个Person类，包含属性name和age，方法sayHello，输出name和age；再定义一个子类Student，包含属性grade，方法sayHello，除了输出父类相关属性外，再输出grade。
    
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }

        Person.prototype.sayHello = function(){
            console.log(this.name, this.age);
        };

        function Student(name, age, grade) {
            // 体现复用思想
            Person.call(this, name, age);
            this.grade = grade;
        }

        Student.prototype = new Person();

        // 体现对constructor属性的理解 
        Student.prototype.constructor = Student;

        Student.prototype.sayHello = function(){
            // 体现复用思想
            Person.prototype.sayHello.apply(this, arguments);
            console.log(this.grade);
        };


4. 调用与父类同名方法的方式有多种，如果希望用`this._super()`方式调用，应该怎么实现

    参考：<a href="../frontend/class_extend.md.html">js类扩展方式</a>


5. 数组操作splice，a = [1, 2, 3]，通过调用splice方法，a = [1, 1.5, 2, 3] 

        a.splice(1, 0, 1.5);


6. 实现isString, isDate, isArray, isString, isFunction的通用方式
        
        function isXXX(s) { return Object.prototype.toString.call(s) === '[object XXX]'; }

7. `typeof x`有几种结果：number, string, boolean, function, object, undefined 
8. typeof null == 'object'
9. typeof undefined == 'object'

10. Promise, Generator函数 

11. `use strict`

12. ES6新特性

13. Koa/Express

14. new关键字的作用

        new func1(); // 创建对象，并设置原型链
        func1();     // 执行函数

15. 在浏览器的地址栏输入URL到网页展现完毕，这期间都发生了什么？
    
    * DNS解析
    * 浏览器缓存
    * HTML文档返回
    * 解析link、style、script，阻塞特性
    * 服务端发生什么


16. 橡皮擦效果，关键使用了哪个关键的Canvas属性？

        context.globalCompositeOperation = 'destination-out';

17. AMD与CMD的区别？

18. Function之apply与call的区别？







## 2 智力题

1. 一根不均匀的绳子，烧完1个小时，如何计算半小时
2. 以你现有的资源和能力，估算一下中国有多少私家车




## 3 综合知识

1. 编译原理：lex/yacc, flex/bison
2. 前端性能优化






## 4 shell编程

1. 删除当前目录下（包含子目录）所有以`.png`为后缀的文件

        find . -type f -iregex '.*\.png$' -exec rm -rf {} \;




## 5 css面试

1. 垂直居中 
2. 二列布局
3. flex-box



## 6 架构能力





