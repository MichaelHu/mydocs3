# jest

> `Jest` is a JavaScript testing framework, used by Facebook to test all JavaScript code including React applications.

* 官网： <http://facebook.github.io/jest/>
* github:  <https://github.com/facebook/jest>
* API Dosc:  <http://facebook.github.io/jest/docs/api.html>
* Configurations: <http://facebook.github.io/jest/docs/configuration.html>


## 快速启动

### install

    npm install --save-dev jest

若有`babel`支持

    npm install --save-dev babel-jest

添加babel配置文件`.babelrc`

    {
        "presets": ["es2015", "react"]
    }


### 固定目录

__tests__目录


### package.json

    "scripts": {
        "test": "jest"
    }


## Jest Configuration

1. package.json，`jest`关键字必须在顶层
2. `--config path/to/json`，必须不用`jest`关键字



{
automock: BOOL
, browser: BOOL
, bail: BOOL
, cacheDirectory: '...'     // default: '/tmp/<path>'
, collectCoverage: BOOL
, collectCoverageFrom: [ '**/*.{js,jsx}', '!**/node_modules/**', '!**/vendor/**' ]
, coverageDirectory: '...'
, coveragePathIgnorePatterns: Array
, coverageReporters: Array
, coverageThreshold: Object
, globals: {
    '__DEV__': true
}
, mocksPattern: '(?:[\\/]|^)__mocks__[\\/]'
, moduleFileExtensions: [ 'js', 'json', 'jsx', 'node' ]
}




## APIs

> The convention is to name your test so that your code `reads like a sentence` - that's why the name of the core testing function is `it`.

    it('did not rain', () => {
        expect(inchesOfRain()).toBe(0);
    });


### Basic Testing

    it()
    it.only()
    it.test()
    it.skip()
    test()
    expect()
    not
    toBe()
    toBeCloseTo()
    toBeDefined()
    toBeFalsy(): false, 0, '', null, undefined, NaN
    toBeGreaterThan()
    toBeGreaterThanOrEqual()
    toBeLessThan()
    toBeLessThanOrEqual()
    toBeInstanceOf()
    toBeNull()
    toBeTruthy()
    toBeUndefined()
    toContain()
    toContainEqual()
    toEqual()
    toHaveLength()
    toMatch( reg )
    toMatchObject()
    toMatchSnapshot()
    toThrow()
    toThrowError()
    toThrowErrorMatchingSnapshot()
    toHaveBeenCalled()
    toHaveBeenCalledTimes()
    toHaveBeenCalledWith(arg1, arg2, ...)
    toHaveBeenLastCalledWith(arg1, arg2, ...)


### Mock Functions

> 对mock函数的系列封装，对调用过程进行更精细的把握。`var mockFn = jest.fn();`

> ？猜测jest会对所有函数扩展以下特性

    mockFn.mock.calls
    mockFn.mock.instances
    mockFn.mockClear()
    mockFn.mockReset()

    mockFn.mockImplementation()
    jest.fn( implementation )

    mockFn.mockImplementationOnce()
    mockFn.mockReturnThis()
    mockFn.mockReturnValueOnce()

一个例子：

    // SomeClass.js
    module.exports = class SomeClass {
        m( a, b ) {}
    }

    // OtherModule.test.js
    const SomeClass = require( 'SomeClass' );
    const mMock = jest.fn();
    // notes here!
    SomeClass.mockImplementation( () => {
        return {
            m: mMock
        };
    } );

    const some = new SomeClass();
    some.m( 'a', 'b' );
    console.log( 'Calls to m: ' , mMock.mock.calls );





### jest object

> mock系统，运行队列管理等

    jest.fn()
    jest.disableAutoMock()
    jest.enableAutoMock()
    jest.resetAllMocks()
    jest.clearAllTimers()
    jest.isMockFunction()
    jest.genMockFromModule()
    jest.mock( moduleName, ?factory, ?options )
    jest.resetModules()
    jest.runAllTicks()     process.nextTick()
    jest.runAllTimers()    setTimeout(), setInterval(), setImmediate()
    jest.runAllImmediates()
    jest.runTimersToTime()
    jest.runOnlyPendingTimers()
    jest.setMock( moduleName, moduleExports )
    jest.unmock( moduleName )
    jest.useFakeTimers()
    jest.useRealTimers()












## Jest CLI

test文件名`Component-snapshot-test.js`，则以下命令将只运行该文件的测试用例：

    jest Component-snapshot






