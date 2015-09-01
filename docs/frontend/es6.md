# ES6 Memo


箭头操作符

类支持

增强的对象字面量

字符串模板

    var num = Math.random();
    console.log(`your num is ${num}`);

解构

    var [x,y]=getVal(), // 函数返回值的解构
        [name,,age]=['wayou','male','secrect']; // 数组解构

    function getVal() {
        return [ 1, 2 ];
    }

    console.log('x:' + x + ', y:' + y); // 输出：x:1, y:2 
    console.log('name:' + name + ', age:' + age); // 输出： name:wayou, age:secrect 


参数默认值，不定参数，拓展参数

    function sayHello2(name='dude'){
        console.log(`Hello ${name}`);
    }


    function add(...x){
        return x.reduce((m,n)=>m+n);
    }


let与const 关键字

    for (let i=0;i<2;i++)console.log(i); // 输出: 0,1


for of 值遍历

iterator, generator

模块

Proxies


Symbols


Math，Number，String，Object 的新API

Promises


http://www.cnblogs.com/Wayou/p/es6_new_features.html
