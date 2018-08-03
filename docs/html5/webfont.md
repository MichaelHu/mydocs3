# webfont



## 兼容性网页字体配置

    @font-face {
        font-family: "HKLJHW8";
        src: url("HKLJHW8.eot"); /* IE9 */
        src: url("HKLJHW8.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
            
        url("HKLJHW8.woff") format("woff"), /* chrome、firefox */
        url("HKLJHW8.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
            
        url("HKLJHW8.svg#HKLJHW8") format("svg"); /* iOS 4.1- */
        font-style: normal;
        font-weight: normal;
    }



## 工具

1. `百度图标库`：<http://fontstore.baidu.com>
2. `FontEditor:` <http://fontstore.baidu.com/static/editor/index.html>

    介绍文章：<http://efe.baidu.com/blog/use-fonteditor-to-build-webfont/>

3. `FontMin:` <http://ecomfe.github.io/fontmin/> github: <https://github.com/ecomfe/fontmin> <iframe src="http://258i.com/gbtn.html?user=ecomfe&repo=fontmin&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>

    支持从ttf等格式的TrueType字体中按需生成多种格式的字体文件，能兼容性好的
    运行在多平台浏览器上。
4. `fontforge`, `fontcustom`


## fontforge

* site: <http://fontforge.github.io/en-US/>
* github: <https://github.com/fontforge/fontforge>



## fontcustom

> Generate custom icon webfonts from the comfort of the command line.
通过命令行从svg文件生成适用于web的iconfont字体，包括字体文件和css文件

* <https://github.com/FontCustom/fontcustom>
* 只有Mac平台和Linux平台版本



### 注意事项
svg相关：
* All colors will be rendered identically. Watch out for white fills! （不用白色填充）
* Use only solid colors. SVGs with transparency will be skipped. (不用透明颜色）
* For greater precision in curved icons, use fills instead strokes and try these solutions. （高精度情况，可使用填充代替笔划）
* Activating `autowidth` trims horizontal white space from each glyph. This can be much easier than centering dozens of SVGs by hand. （巧用`autowidth`选项）



### Installations

    # On Mac
    brew install fontforge --with-python
    brew install eot-utils
    gem install fontcustom

    sudo apt-get install fontforge
    wget http://people.mozilla.com/~jkew/woff/woff-code-latest.zip 
    unzip woff-code-latest.zip -d sfnt2woff && cd sfnt2woff && make && sudo mv sfnt2woff /usr/local/bin/
    getm install fontcustom

### Quick Start

    fontcustom compile my/vectors
    fontcustom watch my/vectors
    fontcustom compile
    fontcustom config
    fontcustom help


