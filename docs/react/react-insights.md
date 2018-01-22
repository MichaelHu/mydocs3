# react-insights

## Resources

* Github: <https://github.com/facebook/react> <iframe src="http://258i.com/gbtn.html?user=facebook&repo=react&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* `react` - <ref://./react.md.html>

## Features

* 使用`packages`方式组织代码，包括`react, react-dom`等
* node版本要求`≥ 8.0`
* 使用`rollup`构建，同时生成适用于`四类`应用场景的版本，使用`umd`模块格式
* 使用`prettier`做代码风格检测及美化

## Build

    $ sudo yarn
    $ yarn run build

### Build Results

生成适用于四类应用场景的版本，包括：

1. `dist` - web使用
2. `facebook-www` - facebook使用
3. `node_modules` - node环境使用
4. `react-native` - react native版本

输出文件如下：

    ├── dist
    │   ├── react-art.development.js
    │   ├── react-art.production.min.js
    │   ├── react-dom-server.browser.development.js
    │   ├── react-dom-server.browser.production.min.js
    │   ├── react-dom-test-utils.development.js
    │   ├── react-dom-test-utils.production.min.js
    │   ├── react-dom-unstable-native-dependencies.development.js
    │   ├── react-dom-unstable-native-dependencies.production.min.js
    │   ├── react-dom.development.js
    │   ├── react-dom.production.min.js
    │   ├── react.development.js
    │   └── react.production.min.js
    ├── facebook-www
    │   ├── React-dev.js
    │   ├── React-prod.js
    │   ├── ReactART-dev.js
    │   ├── ReactART-prod.js
    │   ├── ReactDOM-dev.js
    │   ├── ReactDOM-prod.js
    │   ├── ReactDOMServer-dev.js
    │   ├── ReactDOMServer-prod.js
    │   ├── ReactDOMUnstableNativeDependencies-dev.js
    │   ├── ReactDOMUnstableNativeDependencies-prod.js
    │   ├── ReactShallowRenderer-dev.js
    │   ├── ReactTestRenderer-dev.js
    │   ├── ReactTestUtils-dev.js
    │   └── shims
    │       ├── EventPluginHub.js
    │       ├── ReactBrowserEventEmitter.js
    │       ├── ReactDOMComponentTree.js
    │       ├── ReactInstanceMap.js
    │       ├── TapEventPlugin.js
    │       ├── findDOMNode.js
    │       └── renderSubtreeIntoContainer.js
    ├── node_modules
    │   ├── react
    │   │   ├── LICENSE
    │   │   ├── README.md
    │   │   ├── cjs
    │   │   │   ├── react.development.js
    │   │   │   └── react.production.min.js
    │   │   ├── index.js
    │   │   ├── package.json
    │   │   └── umd
    │   │       ├── react.development.js
    │   │       └── react.production.min.js
    │   ├── react-art
    │   │   ├── Circle.js
    │   │   ├── LICENSE
    │   │   ├── README.md
    │   │   ├── Rectangle.js
    │   │   ├── Wedge.js
    │   │   ├── cjs
    │   │   │   ├── react-art.development.js
    │   │   │   └── react-art.production.min.js
    │   │   ├── index.js
    │   │   ├── package.json
    │   │   └── umd
    │   │       ├── react-art.development.js
    │   │       └── react-art.production.min.js
    │   ├── react-call-return
    │   │   ├── LICENSE
    │   │   ├── README.md
    │   │   ├── cjs
    │   │   │   ├── react-call-return.development.js
    │   │   │   └── react-call-return.production.min.js
    │   │   ├── index.js
    │   │   └── package.json
    │   ├── react-dom
    │   │   ├── LICENSE
    │   │   ├── README.md
    │   │   ├── cjs
    │   │   │   ├── react-dom-server.browser.development.js
    │   │   │   ├── react-dom-server.browser.production.min.js
    │   │   │   ├── react-dom-server.node.development.js
    │   │   │   ├── react-dom-server.node.production.min.js
    │   │   │   ├── react-dom-test-utils.development.js
    │   │   │   ├── react-dom-test-utils.production.min.js
    │   │   │   ├── react-dom-unstable-native-dependencies.development.js
    │   │   │   ├── react-dom-unstable-native-dependencies.production.min.js
    │   │   │   ├── react-dom.development.js
    │   │   │   └── react-dom.production.min.js
    │   │   ├── index.js
    │   │   ├── package.json
    │   │   ├── server.browser.js
    │   │   ├── server.js
    │   │   ├── server.node.js
    │   │   ├── test-utils.js
    │   │   ├── umd
    │   │   │   ├── react-dom-server.browser.development.js
    │   │   │   ├── react-dom-server.browser.production.min.js
    │   │   │   ├── react-dom-test-utils.development.js
    │   │   │   ├── react-dom-test-utils.production.min.js
    │   │   │   ├── react-dom-unstable-native-dependencies.development.js
    │   │   │   ├── react-dom-unstable-native-dependencies.production.min.js
    │   │   │   ├── react-dom.development.js
    │   │   │   └── react-dom.production.min.js
    │   │   └── unstable-native-dependencies.js
    │   ├── react-noop-renderer
    │   │   ├── LICENSE
    │   │   ├── README.md
    │   │   ├── cjs
    │   │   │   ├── react-noop-renderer.development.js
    │   │   │   └── react-noop-renderer.production.min.js
    │   │   ├── index.js
    │   │   └── package.json
    │   ├── react-reconciler
    │   │   ├── LICENSE
    │   │   ├── README.md
    │   │   ├── cjs
    │   │   │   ├── react-reconciler-reflection.development.js
    │   │   │   ├── react-reconciler-reflection.production.min.js
    │   │   │   ├── react-reconciler.development.js
    │   │   │   └── react-reconciler.production.min.js
    │   │   ├── index.js
    │   │   ├── package.json
    │   │   └── reflection.js
    │   └── react-test-renderer
    │       ├── LICENSE
    │       ├── README.md
    │       ├── cjs
    │       │   ├── react-test-renderer-shallow.development.js
    │       │   ├── react-test-renderer-shallow.production.min.js
    │       │   ├── react-test-renderer.development.js
    │       │   └── react-test-renderer.production.min.js
    │       ├── index.js
    │       ├── package.json
    │       └── shallow.js
    └── react-native
        ├── ReactNativeRenderer-dev.js
        ├── ReactNativeRenderer-prod.js
        └── shims
            ├── NativeMethodsMixin.js
            ├── ReactDebugTool.js
            ├── ReactFeatureFlags.js
            ├── ReactGlobalSharedState.js
            ├── ReactNative.js
            ├── ReactNativeBridgeEventPlugin.js
            ├── ReactNativeComponentTree.js
            ├── ReactNativePropRegistry.js
            ├── ReactNativeTypes.js
            ├── ReactPerf.js
            ├── ReactTypes.js
            ├── TouchHistoryMath.js
            ├── createReactNativeComponentClass.js
            └── takeSnapshot.js


