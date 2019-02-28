# spritejs

## Resources

* github: <https://github.com/spritejs/spritejs> <iframe src="http://258i.com/gbtn.html?user=spritejs&repo=spritejs&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe> 
* `SpriteJS` - Canvas动画从未如此简单 <https://www.h5jun.com/post/spritejs.html> 奇舞团团长月影亲自操刀，360开源又一力作。
* Demo - <http://spritejs.org/demo/>


## Features

* `轻量级`2D渲染引擎
* 基于canvas绘制的文档对象模型
* `4种`基本精灵类型：Sprite、Path、Label、Group
* 支持基础和高级的精灵属性，精灵盒模型、属性与CSS3具有高度一致性。
* 简便而强大的Transition、Animation API
* 支持雪碧图和资源预加载
* 可扩展的事件机制
* 高性能的缓存策略
* 对`D3`、`Matter-js`、`Proton`和其他第三方库友好
* 跨平台，支持node-canvas、微信小程序


## Installation

    $ npm install spritejs --save


## Examples

    const scene = new spritejs.Scene("#container"),
        layer = scene.layer();

    const s = new spritejs.Sprite({
        anchor: 0.5,
        bgcolor: "red",
        pos: [300, 300],
        size: [200, 200],
        borderRadius: 50
    });

    layer.append(s);
