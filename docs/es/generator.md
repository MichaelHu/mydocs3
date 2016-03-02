# Generator Function memo


内部状态遍历器

yield

next(param)


调用Generator函数，并不会执行该函数，而是返回一个状态迭代器。

    function * helloWorldGenerator () {
        yield 'hello';
        yield 'world';
        return 'ending';
    }

    var hw = helloWorldGenerator();

    hw.next()
    // { value: 'hello', done: false }
    hw.next()
    // { value: 'world', done: false }
    hw.next()
    // { value: 'ending', done: true }




