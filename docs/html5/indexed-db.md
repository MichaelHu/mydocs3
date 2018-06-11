# indexed-db 


## Resources

* IndexedDB: <https://w3c.github.io/IndexedDB/>
* MDN: <https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API>
* Cookie: <ref://./cookie.md.html>
* WebStorage: <ref://./web-storage.md.html>， specs: <https://www.w3.org/TR/webstorage/>
* 使用IndexedDB - IndexedDB开发指南<http://www.tfan.org/using-indexeddb/>


## Features

* `大数据量`存储
* 支持存储`file/blob`类型数据
* 使用`索引`技术，支持高性能数据查找


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## IndexedDB

### Specs

* Indexed Database API <https://www.w3.org/TR/IndexedDB/>
* Indexed Database API 2.0 <https://www.w3.org/TR/IndexedDB-2/>

### Tips


#### 使用范围

* 在`Window`或`WebWorker`中都支持使用IndexedDB


#### database

* 每个`origin`关联一组databases，每个database包含零或多个`对象存储`( `object store` )，由对象存储来保存数据
* database有两个基本属性，`name`和`version`。`name`属性用于标识特定origin下的database，`version`属性用于标识`数据版本`，刚创建database时，其version为0
* 同一时刻，database只有一个version；一个database在同一时刻不能同时存在多个版本；要更改database version的唯一方法是通过`upgrade transaction`
* version属性的类型为`unsigned long long`，切记不要使用浮点数来表示
* version代表的是数据库`schema`的版本，不同的ObjectStore以及索引形成不同的version，但`数据的改变`不会导致version的改变


#### connection

* 脚本并不是直接操作数据库，而是通过`connection`对象连接并操作数据库，必须通过connection对象才能获取`transaction`对象；打开数据库就会创建一个connection，同一时刻可以存在多个connection
* connection也有一个version，它在connection创建的时候建立，并在生命周期中保持不变，除非upgrade过程abort，abort时，connection会回退到上一version
* connection状态：`opened`, `closed`
* connection创建的时候，将关联一组对象存储( `object store` )，这组对象存储在connection的生命周期中保持不变，除非发起了一个`upgrade transaction`
* 更新或删除数据时，`versionchange`事件将会在打开的connection上触发，给connection以时机去关闭连接，以允许更新或删除操作的执行


#### Object Store

> OS - 对象存储， OSH - 对象存储句柄

* 对象存储有`name`属性，它在其所属的database中具有`唯一性`
* 对象存储还有可选的`key path`属性，有该属性的称为`in-line keys`，否则称为`out-of-line keys`
* 对象存储是存储数据的主要存储机制，数据库新创建时，对象存储集合中不包含任何对象存储
* 对象存储只能在`upgradeneeded`事件中使用`upgrade transaction`来进行更新
* 对象存储拥有一个`记录列表`( list of records )，每个记录由key-value对组成，列表中的record以key的升序存储
* 脚本并不是直接操作对象存储，而是在transaction中，通过`对象存储句柄`( Object Store Handle )进行间接操作
* `OSH`( 对象存储句柄 )与对象存储以及transaction关联，一个transaction中，只能有一个OSH与特定`OS`( 对象存储 )关联
* `OSH`拥有一个索引集( index set )
* `OSH`拥有`name`属性，在OSH创建时被初始化为其关联的OS的name值
* record的`value`，可支持`任何可序列化对象`，比如String、Date、Object、Array、File、Blob、ImageData等
*  record的value是`按值存取`，而非按引用存取；后面的针对数据的变化不影响以前保存的数据
* record的`key`，有一个关联的`type`属性，type是以下类型之一：number, date, string, binary, array，其中binary key是在2.0中引入，在Chrome 58， Firefox 51， Safari 10.1中已经支持；key还有一个关联的`value`属性，如果type为number或date，则value为一个`unrestricted double`；如果type为string，则value为一个DOMString；如果type为binary，则value为a list of octets；如果type为array，则value为其他keys的列表


#### Transaction

* database只能有`最多一个`upgrade transaction




#### 其他

* 同一页面的多个Tab可能对应多个使用IndexedDB的client
* `onupgradeneeded`是我们唯一可以修改`数据库结构`的地方。在这里面，我们可以创建和删除对象存储空间以及构建和删除`索引`
* 我们在`transaction`中进行数据的添加和删除操作
* `unbounded key range` - An unbounded key range is a key range that has both lower bound and upper bound `equal to null`. All keys are in an unbounded key range.

        index.getAll( null )
        index.getAll( )

    `Key Range`: <https://www.w3.org/TR/IndexedDB-2/#range-construct>


### Examples

#### Example 1

In the following example, the API is used to access a "library" database that holds books stored by their "isbn" attribute.

    var request = indexedDB.open("library");

    // for a non-exist database, a `upgradeneeded` event will be fired
    request.onupgradeneeded = function() {
      // The database did not previously exist, so create object stores and indexes.
      var db = request.result;
      var store = db.createObjectStore("books", {keyPath: "isbn"});
      var titleIndex = store.createIndex("by_title", "title", {unique: true});
      var authorIndex = store.createIndex("by_author", "author");

      // Populate with initial data.
      store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
      store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
      store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
    };

    request.onsuccess = function() {
      // get the connection
      db = request.result;
    };

`Tips`:

* 打开一个`不存在`的database，request会直接接收到`upgradeneeded`事件，可在该事件中创建store 
* 如果打开一个`已经存在`的database，则`upgradeneeded`事件不再触发



The following example populates the database using a `transaction`.

    var tx = db.transaction("books", "readwrite");
    var store = tx.objectStore("books");

    store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
    store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
    store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});

    tx.oncomplete = function() {
      // All requests have succeeded and the transaction has committed.
    };


The following example looks up a single book in the database by title using an index.

    var tx = db.transaction("books", "readonly");
    var store = tx.objectStore("books");
    var index = store.index("by_title");

    var request = index.get("Bedrock Nights");
    request.onsuccess = function() {
      var matching = request.result;
      if (matching !== undefined) {
        // A match was found.
        report(matching.isbn, matching.title, matching.author);
      } else {
        // No match was found.
        report(null);
      }
    };


The following example looks up all books in the database by author using an index and a cursor.

    var tx = db.transaction("books", "readonly");
    var store = tx.objectStore("books");
    var index = store.index("by_author");

    var request = index.openCursor(IDBKeyRange.only("Fred"));
    request.onsuccess = function() {
      var cursor = request.result;
      if (cursor) {
        // Called for each matching record.
        report(cursor.value.isbn, cursor.value.title, cursor.value.author);
        cursor.continue();
      } else {
        // No more matching records.
        report(null);
      }
    };


The following example shows how errors could be handled when a request fails.

    var tx = db.transaction("books", "readwrite");
    var store = tx.objectStore("books");
    var request = store.put({title: "Water Buffaloes", author: "Slate", isbn: 987654});
    request.onerror = function(event) {
      // The uniqueness constraint of the "by_title" index failed.
      report(request.error);
      // Could call event.preventDefault() to prevent the transaction from aborting.
    };
    tx.onabort = function() {
      // Otherwise the transaction will automatically abort due the failed request.
      report(tx.error);
    };


The `database connection` can be closed when it is no longer needed.

    db.close();


In the future, the database might have grown to contain other object stores and indexes. The following example shows one way to handle migrating from an older version of the database.

    var request = indexedDB.open("library", 3); // Request version 3.

    request.onupgradeneeded = function(event) {
      // get the database connection
      var db = request.result;
      if (event.oldVersion < 1) {
        // Version 1 is the first version of the database.
        var store = db.createObjectStore("books", {keyPath: "isbn"});
        var titleIndex = store.createIndex("by_title", "title", {unique: true});
        var authorIndex = store.createIndex("by_author", "author");
      }
      if (event.oldVersion < 2) {
        // Version 2 introduces a new index of books by year.
        var bookStore = request.transaction.objectStore("books");
        var yearIndex = bookStore.createIndex("by_year", "year");
      }
      if (event.oldVersion < 3) {
        // Version 3 introduces a new object store for magazines with two indexes.
        var magazines = db.createObjectStore("magazines");
        var publisherIndex = magazines.createIndex("by_publisher", "publisher");
        var frequencyIndex = magazines.createIndex("by_frequency", "frequency");
      }
    };

    request.onsuccess = function() {
      db = request.result; // db.version will be 3.
    };


`tips`:

* 当前client打开了version为3的IndexedDB
* 其他client可能打开了其他version，并发起了upgrade请求



#### Example 2 

A single database can be used by multiple clients (pages and workers) simultaneously — transactions ensure they don’t clash while reading and writing. If a new client `wants to upgrade` the database (via the "`upgradeneeded`" event), it cannot do so until all other clients close their connection to the current version of the database.

To avoid blocking a new client from upgrading, clients can `listen for the version change event`. This fires when another client is wanting to upgrade the database. To allow this to continue, react to the "`versionchange`" event by doing something that ultimately closes this client’s connection to the database.

One way of doing this is to `reload the page`:

    db.onversionchange = function() {
      // First, save any unsaved data:
      saveUnsavedData().then(function() {
        // If the document isn’t being actively used, it could be appropriate to reload
        // the page without the user’s interaction.
        if (!document.hasFocus()) {
          location.reload();
          // Reloading will close the database, and also reload with the new JavaScript
          // and database definitions.
        } else {
          // If the document has focus, it can be too disruptive to reload the page.
          // Maybe ask the user to do it manually:
          displayMessage("Please reload this page for the latest version.");
        }
      });
    };

    function saveUnsavedData() {
      // How you do this depends on your app.
    }

    function displayMessage() {
      // Show a non-modal message to the user.
    }






### APIs

#### Methods

    request = indexedDB.open( dbName, version )

    db = request.result
    store = db.createObjectStore( storeName )
    store.put()
    store.get()

    index = store.createIndex()
    index = store.index()
    index.get()
    request = index.openCursor()

    transaction = db.transaction( osName, flag /* readonly, readwrite, versionchange */ )
    store = transaction.objectStore()
    transaction.abort()
    db.close()


#### Events

    request.onupgradeneeded
    request.onsuccess
    request.onerror
    request.onblocked

    db.onversionchange
    transaction.oncomplete
    transaction.onerror


#### IDLs

    [Exposed=(Window,Worker)]
    interface IDBRequest : EventTarget {
        readonly attribute any result;
        readonly attribute DOMException? error;
        readonly attribute (IDBObjectStore or IDBIndex or IDBCursor)? source;
        readonly attribute IDBTransaction? transaction;
        readonly attribute IDBRequestReadyState readyState;

        // Event handlers:
        attribute EventHandler onsuccess;
        attribute EventHandler onerror;
    };

    enum IDBRequestReadyState {
        "pending",
        "done"
    };

    [Exposed=(Window,Worker)]
    interface IDBOpenDBRequest : IDBRequest {
        // Event handlers:
        attribute EventHandler onblocked;
        attribute EventHandler onupgradeneeded;
    };

    [Exposed=(Window,Worker),
     Constructor(DOMString type, optional IDBVersionChangeEventInit eventInitDict)]
    interface IDBVersionChangeEvent : Event {
        readonly attribute unsigned long long oldVersion;
        readonly attribute unsigned long long? newVersion;
    };

    dictionary IDBVersionChangeEventInit : EventInit {
        unsigned long long oldVersion = 0;
        unsigned long long? newVersion = null;
    };


##### IDBFactory

    partial interface WindowOrWorkerGlobalScope {
        [SameObject] readonly attribute IDBFactory indexedDB;
    };

    [Exposed=(Window,Worker)]
    interface IDBFactory {
        [NewObject] IDBOpenDBRequest open(DOMString name,
                                        optional [EnforceRange] unsigned long long version);
        [NewObject] IDBOpenDBRequest deleteDatabase(DOMString name);

        short cmp(any first, any second);
    };
    

##### IDBObjectStore

The IDBObjectStore interface represents an object store handle.

    [Exposed=(Window,Worker)]
    interface IDBObjectStore {
      attribute DOMString name;
      readonly attribute any keyPath;
      readonly attribute DOMStringList indexNames;
      [SameObject] readonly attribute IDBTransaction transaction;
      readonly attribute boolean autoIncrement;

      [NewObject] IDBRequest put(any value, optional any key);
      [NewObject] IDBRequest add(any value, optional any key);
      [NewObject] IDBRequest delete(any query);
      [NewObject] IDBRequest clear();
      [NewObject] IDBRequest get(any query);
      [NewObject] IDBRequest getKey(any query);
      [NewObject] IDBRequest getAll(optional any query,
                                    optional [EnforceRange] unsigned long count);
      [NewObject] IDBRequest getAllKeys(optional any query,
                                        optional [EnforceRange] unsigned long count);
      [NewObject] IDBRequest count(optional any query);

      [NewObject] IDBRequest openCursor(optional any query,
                                        optional IDBCursorDirection direction = "next");
      [NewObject] IDBRequest openKeyCursor(optional any query,
                                           optional IDBCursorDirection direction = "next");

      IDBIndex index(DOMString name);

      [NewObject] IDBIndex createIndex(DOMString name,
                                       (DOMString or sequence<DOMString>) keyPath,
                                       optional IDBIndexParameters options);
      void deleteIndex(DOMString name);
    };

    dictionary IDBIndexParameters {
      boolean unique = false;
      boolean multiEntry = false;
    };



##### IDBIndex

    [Exposed=(Window,Worker)]
    interface IDBIndex {
      attribute DOMString name;
      [SameObject] readonly attribute IDBObjectStore objectStore;
      readonly attribute any keyPath;
      readonly attribute boolean multiEntry;
      readonly attribute boolean unique;

      [NewObject] IDBRequest get(any query);
      [NewObject] IDBRequest getKey(any query);
      [NewObject] IDBRequest getAll(optional any query,
                                    optional [EnforceRange] unsigned long count);
      [NewObject] IDBRequest getAllKeys(optional any query,
                                        optional [EnforceRange] unsigned long count);
      [NewObject] IDBRequest count(optional any query);

      [NewObject] IDBRequest openCursor(optional any query,
                                        optional IDBCursorDirection direction = "next");
      [NewObject] IDBRequest openKeyCursor(optional any query,
                                           optional IDBCursorDirection direction = "next");
    };


##### IDBKeyRange 

    [Exposed=(Window,Worker)]
    interface IDBKeyRange {
      readonly attribute any lower;
      readonly attribute any upper;
      readonly attribute boolean lowerOpen;
      readonly attribute boolean upperOpen;

      // Static construction methods:
      [NewObject] static IDBKeyRange only(any value);
      [NewObject] static IDBKeyRange lowerBound(any lower, optional boolean open = false);
      [NewObject] static IDBKeyRange upperBound(any upper, optional boolean open = false);
      [NewObject] static IDBKeyRange bound(any lower,
                                           any upper,
                                           optional boolean lowerOpen = false,
                                           optional boolean upperOpen = false);

      boolean _includes(any key);
    };



## localForage

github: <https://github.com/localForage/localForage> <iframe src="http://258i.com/gbtn.html?user=localForage&repo=localForage&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>



## Demos

### 简单存取

* 通过`window.indexedDB`判断是否支持indexedDB
* 如果 todo

<div id="test_simple_access" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_simple_access');
        s.show( 'test simple indexedDB access' );

        if ( ! window.indexedDB ) {
            s.append_show( 'indexedDB is not supported!' ); 
            return;
        }

        var dbName = 'test2';
        var request = indexedDB.open( dbName );

        request.onupgradeneeded = function() {
            s.append_show( 'onupgradeneeded' );

            // The database did not previously exist, so create object stores and indexes.
            var db = request.result;
            var store = db.createObjectStore("books", {keyPath: "isbn"});
            var titleIndex = store.createIndex("by_title", "title", {unique: true});
            var authorIndex = store.createIndex("by_author", "author");

            // Populate with initial data.
            store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
            store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
            store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
        };


        request.onsuccess = function() {
            s.append_show( 'onsuccess' );
            var db = request.result;
            s.append_show( db.name, db.version );

            db.onversionchange = function() {
                // close the database
                console.log( 'close the database' );
                db.close();
            };

            var tx = db.transaction( 'books', 'readwrite' );
            var store = tx.objectStore( 'books' );

            var now = Date.now();
            store.put({title: "Title - " + now, author: "Author - " + now, isbn: 'isbn - ' + now});

            var index = store.index( 'by_author' );

            var req = index.getAll();
            req.onsuccess = function( e ) {
                var records = e.target.result;
                s.append_show( 'by index: ' + records.length + ' records. The latest 5 records list below:' );
                var count = 5, i = 0;
                var record;
                while ( i < count && i < records.length ) {
                    record = records[ i ];
                    s.append_show(  
                        record.isbn
                        , record.title
                        , record.author
                    );
                    i++;
                }
                // indexedDB.deleteDatabase( dbName );
            };

            var req_cursor = index.openCursor( IDBKeyRange.only( 'Fred' ) );
            req_cursor.onsuccess = function( e ) {
                var cursor = e.target.result;
                if ( cursor ) {
                    s.append_show( 
                        'by cursor'
                        , cursor.value.isbn
                        , cursor.value.title
                        , cursor.value.author 
                    );
                    cursor.continue();
                }
            };
        };


    })();

</div>
<div class="test-panel">
</div>
</div>
