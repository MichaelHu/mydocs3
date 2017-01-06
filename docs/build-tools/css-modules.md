# css-modules

* github: <https://github.com/css-modules/css-modules>
* webpack implementation: <https://github.com/webpack/css-loader#css-modules>



## 理解composes

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


