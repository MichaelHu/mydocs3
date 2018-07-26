# heatmap

> 热力图绘制

## Resources

* `maptalks.heatmap` <https://github.com/maptalks/maptalks.heatmap>


## 绘制算法

1. 在一个独立的画布上绘制`黑色`带阴影和模糊效果的圆，记为circle
2. 针对每一个`热力数据`( x, y, v )
    * 根据v计算出对应的透明度opacity，设置globalAlpha为opacity
    * 在热力图画布上，以`( x, y )`为圆心，通过drawImage绘制circle
3. 针对热力图画布的`pixel array`的每一个pixel
    * 根据其alpha通道的值获取特定渐变色
    * 设置该pixel的颜色值


