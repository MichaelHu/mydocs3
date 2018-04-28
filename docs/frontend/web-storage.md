# web-storage

> todo

## Resources

* Cookie: <ref://./cookie.md.html>
* WebStorage: <https://www.w3.org/TR/webstorage/>
* IndexedDB: <https://w3c.github.io/IndexedDB/>
* MDN: <https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API>


## IndexedDB

### Specs

* Indexed Database API <https://www.w3.org/TR/IndexedDB/>
* Indexed Database API 2.0 <https://www.w3.org/TR/IndexedDB-2/>

### Features

* 大数据量存储
* 支持存储`file/blob`类型数据
* 使用索引技术，支持高性能数据查找
* 在`WebWorker`中支持使用IndexedDB

### Examples

In the following example, the API is used to access a "library" database that holds books stored by their "isbn" attribute.

    var request = indexedDB.open("library");

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
      db = request.result;
    };

The following example populates the database using a transaction.

    var tx = db.transaction("books", "readwrite");
    var store = tx.objectStore("books");

    store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
    store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
    store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});

    tx.oncomplete = function() {
      // All requests have succeeded and the transaction has committed.
    };




## localForage

`9k+` stars，<https://github.com/localForage/localForage>

