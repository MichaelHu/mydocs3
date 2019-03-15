# webvr

> Bringing Virtual Reality to the Web

* site: <https://webvr.info>
* draft on github: <https://w3c.github.io/webvr/>
* vr-ar-mr: <ref://./vr-ar-mr.md.html>

## tips

### 190315

`Mozilla`工程师在WebXR上做了一些有意思的试验，展示了WebXR的运行原理，从设备采集，服务中转到可视化渲染的过程。

* [ 190307 ] Real virtuality: connecting real things to virtual reality using web technologies <https://hacks.mozilla.org/2019/03/connecting-real-things-to-virtual-worlds-using-web/> Mozilla工程师在WebXR的一些试验性成果
    * 从IoT( 物联网 )到WoT( 物联Web )
    * 从WoT到WebXR
    * 针对WebVR的Web框架 - `A-Frame`
    * WebVR Demo - 设备识别颜色，反馈在Web界面上
    * WebAR Demo  
* [ 190315 ] A-Frame <https://aframe.io/> A `web framework` for building virtual reality experiences: Make WebVR with HTML and Entity-Component Works on Vive, Rift, Daydream, GearVR, desktop. `Docs`: <https://aframe.io/docs/0.9.0/introduction/>



### 180330

> WebVR/AR当前进展摘要

整体看在H5领域，VR/AR`显示技术`已经比较成熟，但VR/AR设备( 传感器、头盔等 )`接入技术`还不成熟；从产品实现场景来看，大部分情况下VR显示已经足够 

* 截止目前，使用的`2d/3d( WebGL )` canvas技术在浏览器中渲染2d/3d图形来展示商品，通过切换视角来多角度观察，这种类型的VR技术已经比较成熟，浏览器基本上都支持，这种技术近几年已经比较流行，多见于`汽车3d全景`、`3d打印模型`全景展示、电商商品展示等
* 截止2018年3月30日，使用浏览器提供的`WebVR API`来支持VR设备( 传感器、头盔等 )接入，目前浏览器支持方面还是`非常有限`，PC上微软Edge 15+, Firfox 55+支持，其他浏览器包括Chrome都不支持，移动设备上，只有`Android Chrome 64+`版本，以及Samsung 4+支持。目前看大面积应用还得有段时间要走，估计还得1-2年。
* 2017年阿里、腾讯等大公司也都开始搞VR相关的产品：天猫/淘宝在2017年已经在其捡金币( 营销 )、图书、家装、天眼等产品中尝试使用；腾讯在其游戏的VR直播中也有使用
* 相关参考资料：
    * WebGL的浏览器支持程度 <https://caniuse.com/#search=webgl>
    * WebVR API的浏览器支持程度 <https://caniuse.com/#search=webvr>
    * QCon上海2017-前沿技术创新-曾新海-原版 <http://pstatic.geekbang.org/pdf/59e5ac1f054ec.pdf?e=1522394477&token=eHNJKRTldoRsUX0uCP9M3icEhpbyh3VF9Nrk5UPM:H3zSqAb6Jc44QQY4opV_6cjfws0=>
    * 创新技术( AR、渲染、架构等 )在电商领域的探索 <http://pstatic.geekbang.org/pdf/59e5add77cf5a.pdf?e=1522395379&token=eHNJKRTldoRsUX0uCP9M3icEhpbyh3VF9Nrk5UPM:DjqR7L-fPRsJae7a7I5Hu0iQR0A=>



### 170204

* `实验性`js API，在`浏览器`中提供对`VR设备`的访问
* 目前还只是在某些浏览器的`特定构建版本`中才支持，chrome、firefox、samsung浏览器

