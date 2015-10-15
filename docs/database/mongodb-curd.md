# MongoDB CURDs


> `collection`的CRUD操作


## 1 find



### 1.1 查询条件设置

每一次查询对应一个`Collection`，`find`命令通过JSON格式提供查询标准或条件

    db.users.find( { age: { $gt: 18 } } ).sort( { age: 1 } );

<img src="./img/crud-query-stages.png">


查找所有匹配： 

    db.docs.find({})
    db.docs.find()
    db.docs.find().limit(5)

条件：等于

    db.inventory.find( { type: "snacks" } )


使用查询操作符：

    db.inventory.find( { type: { $in: [ 'food', 'snacks' ] } } )


条件与：

    db.inventory.find( { type: 'food', price: { $lt: 9.95 } } )


条件或：

    db.inventory.find(
        {
            $or: [ { qty: { $gt: 100 } }, { price: { $lt: 9.95 } } ]
        }
    )


条件与或：

    db.inventory.find(
        {
            type: 'food',
            $or: [ { qty: { $gt: 100 } }, { price: { $lt: 9.95 } } ]
        }
    )



内嵌字段： 

    db.inventory.find(
        {
            producer: {
                company: 'ABC123',
                address: '123 Street'
            }
        }
    )

或者：

    db.inventory.find( { 'producer.company': 'ABC123' } )


数组字段查询：

    // ratings数组字段的内容为[ 5, 8, 9 ]
    db.inventory.find( { ratings: [ 5, 8, 9 ] } )

    // ratings数组字段包含5
    db.inventory.find( { ratings: 5 } )

    // 数组第一个字段为5
    db.inventory.find( { 'ratings.0': 5 } )





### 1.2 指定返回的数据字段

`_id`字段不显式关闭的话，总会作为一个字段返回。

    // 返回_id, item, qty字段
    db.inventory.find( { type: 'food' }, { item: 1, qty: 1 } )

    // 返回item, qty字段 
    db.inventory.find( { type: 'food' }, { item: 1, qty: 1, _id:0 } )

    // 返回嵌套字段
    db.inventory.find(
       { type: 'food', _id: 3 },
       { "classification.category": 1, _id: 0 }
    )

    // 返回数组字段的前两个元素
    db.inventory.find( { _id: 5 }, { ratings: { $slice: 2 } } )


### 1.3 数据集索引（Cursor）

手动迭代：

    var myCursor = db.inventory.find( { type: 'food' } );

    while (myCursor.hasNext()) {
        print(tojson(myCursor.next()));
    }

或

    myCursor.forEach(printjson);


数组下标，使用myCursor.toArray()：

    var docs = myCursor.toArray();
    var myDoc = docs[2];

或者：
    
    var myDoc = myCursor[2];

    




    





## insert 

向`inventory`集合中插入一个文档。如果`inventory`不存在，则会自动创建。

    db.inventory.insert(
        {
            item: "ABC1",
            details: {
                model: "14Q3",
                manufacturer: "XYZ Company"
            },
            stock: [ { size: "S", qty: 25 }, { size: "M", qty: 50 } ],
            category: "clothing"
        }
    )

    返回值：

    WriteResult({ "nInserted" : 1 })




插入文档数组：

    var mydocuments =
        [
          {
            item: "ABC2",
            details: { model: "14Q3", manufacturer: "M1 Corporation" },
            stock: [ { size: "M", qty: 50 } ],
            category: "clothing"
          },
          {
            item: "MNO2",
            details: { model: "14Q3", manufacturer: "ABC Company" },
            stock: [ { size: "S", qty: 5 }, { size: "M", qty: 5 }, { size: "L", qty: 1 } ],
            category: "clothing"
          },
          {
            item: "IJK2",
            details: { model: "14Q2", manufacturer: "M5 Corporation" },
            stock: [ { size: "S", qty: 5 }, { size: "L", qty: 1 } ],
            category: "houseware"
          }
        ];    

    db.inventory.insert( mydocuments );

    返回值(BulkWriteResult)：

    BulkWriteResult({
       "writeErrors" : [ ],
       "writeConcernErrors" : [ ],
       "nInserted" : 3,
       "nUpserted" : 0,
       "nMatched" : 0,
       "nModified" : 0,
       "nRemoved" : 0,
       "upserted" : [ ]
    })



打包插入多个文档，使用`Bulk API`：

    var bulk = db.inventory.initializeUnorderedBulkOp();

    bulk.insert(
       {
         item: "BE10",
         details: { model: "14Q2", manufacturer: "XYZ Company" },
         stock: [ { size: "L", qty: 5 } ],
         category: "clothing"
       }
    );
    bulk.insert(
       {
         item: "ZYT1",
         details: { model: "14Q1", manufacturer: "ABC Company"  },
         stock: [ { size: "S", qty: 5 }, { size: "M", qty: 5 } ],
         category: "houseware"
       }
    );

    bulk.execute();

    返回值：

    BulkWriteResult({
       "writeErrors" : [ ],
       "writeConcernErrors" : [ ],
       "nInserted" : 2,
       "nUpserted" : 0,
       "nMatched" : 0,
       "nModified" : 0,
       "nRemoved" : 0,
       "upserted" : [ ]
    })






## update

更新第一个item字段为MNO2的匹配文档：

    db.inventory.update(
        { item: "MNO2" },
        {
          $set: {
            category: "apparel",
            details: { model: "14Q3", manufacturer: "XYZ Company" }
          },
          $currentDate: { lastModified: true }
        }
    )

内嵌字段，使用"`.`"分隔：

    db.inventory.update(
        { item: "ABC1" },
        { $set: { "details.model": "14Q2" } }
    )


更新多个匹配文档

    db.inventory.update(
        { category: "clothing" },
        {
            $set: { category: "apparel" },
            $currentDate: { lastModified: true }
        },
        { multi: true }
    )




## remove


删除所有：

    db.docs.remove({})
    WriteResult({ "nRemoved" : 12539 })

注意，不同于find方法，`db.docs.remove()`必须带参数。


删除指定条件的所有文档：

    db.inventory.remove( { type : "food" } )


删除指定条件的一个文档：

    db.inventory.remove( { type : "food" }, 1 )












