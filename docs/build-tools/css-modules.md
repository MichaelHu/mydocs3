# css-modules

> A `CSS Module` is `a CSS file` in which all class names and animation names are `scoped locally by default`. 

## Resources

* github: <https://github.com/css-modules/css-modules> <iframe src="http://258i.com/gbtn.html?user=css-modules&repo=css-modules&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
* webpack implementation: <https://github.com/webpack/css-loader#css-modules>


## Features

* 每个CSS文件被定义为一个`CSS module`
* 所有`类名、动画名`默认为`本地作用域`


## Tips

* 若CSS文件中所有类都包含在`:global{ ... }`区块中，也就是说该文件`没有本地作用域的类`，那么以下语句( 使用了对应的webpack loader )：

        .with-up-arrow {
            composes: icon_sharp-arrow-up from '../../styles/_iconfont.scss';
            ...
        }

    会报异常，因为`编译以后`的以下语句：

        ...
        "with-up-arrow": "style-with-up-arrow-2pFz9 " + __webpack_require__(610).locals["icon_sharp-arrow-up"] + "",
        ...

    其中`__webpack_require__(610).locals`为`undefined`

* `空规则`不会生成对应的local id，但规则内`只包含注释`，不会被认为空规则



## :global 与 :local

### 声明开关、作用域

    :global
    :global( xxx )
    :local
    :local( xxx )

### 定义区块

    :global { ... }


### 复杂示例

    .localA :global .global-b .global-c :local(.localD.localE) .global-d { ... }
    :global {
        .global-class-name {
            color: #333;
        }
    }



## composes

> 类组合

* `单独类`才可以作为`composes`的参数
* 形成`classA classB`的效果，两者的rule进行合并，同名rule执行后者覆盖前者的规则

举例如下：

	.classA {
		background: red;
	}

	.classB {
		composes: classA;
		background: yellow;
		font-size: 18px;
	}

编译后的css输出：

	._32A4T3s {
	  background: red; }

	._8ZgKehi {
	  background: yellow;
	  font-size: 18px; }

通过`import styles from ...`得到的对象：

	{
		classA: '_32A4T3s'
		, classB: '_8ZgKehi _32A4T3s'
	}
	
也就是使用`styles.classB`来表示组合类名，表示的含义为`classB classA`。


