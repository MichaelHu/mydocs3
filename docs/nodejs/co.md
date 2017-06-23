# co

> The ultimate `generator` based `flow-control` goodness for nodejs (supports thunks, promises, etc)

> changelog: 1706, 1603

## Resources

* github: <https://github.com/tj/co>
* latest: `v4.0.0`


## Installation

    $ npm install co


## APIs
> 2个API

    co( fn * ).then( val => ... )
    var fn = co.wrap( fn * )



## Examples

### 例子1

    co(function* () {
      var result = yield Promise.resolve(true);
      return result;
    }).then(function (value) {
      console.log(value);
    }, function (err) {
      console.error(err.stack);
    });


### 例子2 - 函数转换

    var fn = co.wrap(function* (val) {
      return yield Promise.resolve(val);
    });

    fn(true).then(function (val) {

    });


### 例子3

    var co = require('co');

    co(function *(){
      // yield any promise
      var result = yield Promise.resolve(true);
    }).catch(onerror);

    co(function *(){
      // resolve multiple promises in parallel
      var a = Promise.resolve(1);
      var b = Promise.resolve(2);
      var c = Promise.resolve(3);
      var res = yield [a, b, c];
      console.log(res);
      // => [1, 2, 3]
    }).catch(onerror);

    // errors can be try/catched
    co(function *(){
      try {
        yield Promise.reject(new Error('boom'));
      } catch (err) {
        console.error(err.message); // "boom"
     }
    }).catch(onerror);

    function onerror(err) {
      // log any uncaught errors
      // co will not throw any errors you do not handle!!!
      // HANDLE ALL YOUR ERRORS!!!
      console.error(err.stack);
    }



