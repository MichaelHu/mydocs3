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


## 配置

1. package.json
2. `--config path/to/json`


## APIs

> The convention is to name your test so that your code `reads like a sentence` - that's why the name of the core testing function is `it`.

    it('did not rain', () => {
        expect(inchesOfRain()).toBe(0);
    });








