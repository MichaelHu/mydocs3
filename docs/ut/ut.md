# ut

> Unit Test，单元测试，自动化单元测试

<http://fex.baidu.com/blog/2015/07/front-end-test/>

## 自动化单测收益

    自动化的收益 = 迭代次数 * 全手动执行成本 - 首次自动化成本 - 维护次数 * 维护成本

对于自动化测试来说，相对于发现未知的问题，`更倾向于避免可能的问题`。


## sophon-gate的单测

* 主要测试逻辑，不测试UI
* 在node环境中测试逻辑，需要对global进行`fake`，包括`navigator`, `location`, `document`, `localStorage`等
* 单测代码行数比例：`src : test = 159 : 546`


