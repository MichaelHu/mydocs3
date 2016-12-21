# jest

> `Jest` is a JavaScript testing framework, used by Facebook to test all JavaScript code including React applications.

* 官网： <http://facebook.github.io/jest/>
* github:  <https://github.com/facebook/jest>
* API Docs:  <http://facebook.github.io/jest/docs/api.html>
* Configurations: <http://facebook.github.io/jest/docs/configuration.html>

相关：`sinon`, `enzyme`

## Features

### 三大特征

* Turbocharged，涡轮增压，纯粹的、设置简单的
* Fast and Sandboxed，快速、沙盒
* Snapshot Testing，快照测试


### 其他小特征

* 交互模式`--watch`
* 错误信息非常有用，并且颜色高亮
* 内建支持promise和async/await
* 支持任何可以编译成js的语言，与Babel无缝配合
* 支持覆盖率报告`--coverage`
* 首先运行上次失败的用例。可与`--bail`配合使用
* 在命令行中，使用虚拟的DOM实现运行用例
* 整合了手动mock库
* 自动发现与改动文件相关的用例，并执行。`-o`
* 沙箱测试文件，以及每次测试`自动`进行全局状态`重置`
* `并行`运行测试用例



## 快速启动

### install

    npm install --save-dev jest

若需要`babel`支持，

    npm install --save-dev babel-jest babel-polyfill

添加babel配置文件`.babelrc`，在项目`根目录`中。

    {
        "presets": ["es2015", "react"]
    }

这样就支持所有`ES2015`的新语法，以及react特定的语法了。



### 固定目录

__tests__目录


### package.json

    "scripts": {
        "test": "jest"
    }


## Jest Configuration

1. package.json，`jest`关键字必须在顶层
2. `--config path/to/json`，必须不用`jest`关键字


### 配置文件

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

### Assertions

    expect()
    lastCalledWith( arg1, arg2, ... )
    toHaveBeenLastCalledWith( arg1, arg2, ... )
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
    toHaveBeenCalledWith( arg1, arg2, ... )
    toHaveBeenLastCalledWith( arg1, arg2, ... )


### Mock Functions

> 对mock函数的系列封装，对调用过程进行更精细的把握。`var mockFn = jest.fn();`

> ？猜测jest会对所有函数扩展以下特性

有一个`mock属性`以及系列的`mockXXX方法`。

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





## 快照测试

若需要快照支持，

	npm install --save-dev react-test-renderer

一个普通用例如下：

	import renderer from 'react-test-renderer';
	test( 'Link renders correctly', () => {
		const tree = renderer.create(
				<Link page="http://www.facebook.com">Facebook</Link>
			).toJSON();
		
		expect( tree ).toMatchSnapshot();
	} );


以上测试用例会生成如下快照：

	exports[`Link renders correctly 1`] = `
	<a
	  className="normal"
	  href="http://www.facebook.com"
	  onMouseEnter={[Function]}
	  onMouseLeave={[Function]}>
	  Facebook
	</a>
	`;

后续的测试会将生成的JSON与该快照进行比较。如果出现diff，则会提示你修复错误或者更新过期的快照`-u`或者`--updateSnapshot`。









## Jest CLI

test文件名`Component-snapshot-test.js`，则以下命令将只运行该文件的测试用例：

    jest Component-snapshot






