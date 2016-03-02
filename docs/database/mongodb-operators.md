# MongoDB Operators 

> 包含查询操作符与映射操作符


## 1 Query

Query operators provide ways to locate data within the database and projection operators modify how data is presented.


### 1.1 比较类型（Comparation）：

    Name    Description
    $eq     Matches values that are equal to a specified value.
    $gt     Matches values that are greater than a specified value.
    $gte    Matches values that are greater than or equal to a specified value.
    $lt     Matches values that are less than a specified value.
    $lte    Matches values that are less than or equal to a specified value.
    $ne     Matches all values that are not equal to a specified value.
    $in     Matches any of the values specified in an array.
    $nin    Matches none of the values specified in an array.


### 1.2 逻辑操作类型（Logical）：

    $or Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
    $and    Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
    $not    Inverts the effect of a query expression and returns documents that do not match the query expression.
    $nor    Joins query clauses with a logical NOR returns all documents that fail to match both clauses.


### 1.3 元素相关（Element）：


    $exists Matches documents that have the specified field.
    $type   Selects documents if a field is of the specified type.



### 1.4 计算类型（Evaluation）：

    $mod    Performs a modulo operation on the value of a field and selects documents with a specified result.
    $regex  Selects documents where values match a specified regular expression.
    $text   Performs text search.
    $where  Matches documents that satisfy a JavaScript expression.


还有数组类型，注释类型等。




## 2 Projection 





## 3 Aggregation Pipeline Operators

    db.collection.aggregate( [ { <stage> }, ... ] )

多个管道操作，通过数组结构组合。

### 3.1 $group

    { $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }

1. `_id`是必须提供的字段，包含唯一字段列表，也可以是`null`，比如用于计算总数时
2. 其他字段使用累加操作符来计算
    
累加操作符：

    $sum
    $avg
    $first
    $last
    $max
    $min
    $push
    $addToSet


例子1，按日期组合，获取每日相关计算字段：

    db.sales.aggregate(
       [
          {
            $group : {
               _id : { 
                    month: { $month: "$date" }
                    , day: { $dayOfMonth: "$date" }
                    , year: { $year: "$date" } 
               }
               , totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } }
               , averageQuantity: { $avg: "$quantity" }
               count: { $sum: 1 }
            }
          }
       ]
    )


返回：

    { "_id" : { "month" : 3, "day" : 15, "year" : 2014 }, "totalPrice" : 50, "averageQuantity" : 10, "count" : 1 }
    { "_id" : { "month" : 4, "day" : 4, "year" : 2014 }, "totalPrice" : 200, "averageQuantity" : 15, "count" : 2 }
    { "_id" : { "month" : 3, "day" : 1, "year" : 2014 }, "totalPrice" : 40, "averageQuantity" : 1.5, "count" : 2 }


例子2，_id设置为null（不需要），计算累加字段：

    db.sales.aggregate(
       [
          {
            $group : {
               _id : null 
               , totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } }
               , averageQuantity: { $avg: "$quantity" }
               count: { $sum: 1 }
            }
          }
       ]
    )

返回：

    { "_id" : null, "totalPrice" : 290, "averageQuantity" : 8.6, "count" : 5 } 
    

例子3，使用_id字段，获取唯一性字段：

    db.sales.aggregate( [ { $group : { _id : "$item" } } ] )

返回：

    { "_id" : "xyz" }
    { "_id" : "jkl" }
    { "_id" : "abc" }



例子4，按作者来组合书名：

    db.books.aggregate(
       [
         { $group : { _id : "$author", books: { $push: "$title" } } }
       ]
    )

返回：

    { "_id" : "Homer", "books" : [ "The Odyssey", "Iliad" ] }
    { "_id" : "Dante", "books" : [ "The Banquet", "Divine Comedy", "Eclogues" ] }    


例子5，按作者来组合文档，使用系统变量`$$ROOT`

    db.books.aggregate(
       [
         { $group : { _id : "$author", books: { $push: "$$ROOT" } } }
       ]
    )


返回：

    {
      "_id" : "Homer",
      "books" :
         [
           { "_id" : 7000, "title" : "The Odyssey", "author" : "Homer", "copies" : 10 },
           { "_id" : 7020, "title" : "Iliad", "author" : "Homer", "copies" : 10 }
         ]
    }

    {
      "_id" : "Dante",
      "books" :
         [
           { "_id" : 8751, "title" : "The Banquet", "author" : "Dante", "copies" : 2 },
           { "_id" : 8752, "title" : "Divine Comedy", "author" : "Dante", "copies" : 1 },
           { "_id" : 8645, "title" : "Eclogues", "author" : "Dante", "copies" : 2 }
         ]
    }    

















