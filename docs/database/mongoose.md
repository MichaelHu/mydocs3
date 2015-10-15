# Mongoose Memo

> An elegant mongodb object modeling for node.js


Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.


    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');

    var Cat = mongoose.model('Cat', { name: String });

    var kitty = new Cat({ name: 'Zildjian' });
    kitty.save(function (err) {
        if (err) // ...
        console.log('meow');
    });


提供直接了当、基于schema的方案模型化你的应用数据。包含内建的类型映射、校验、查询构建、应用逻辑钩子等功能。


