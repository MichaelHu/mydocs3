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





