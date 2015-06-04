# webfont字体文件



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

1. `FontEditor:` http://font.baidu.com

    介绍文章：http://efe.baidu.com/blog/use-fonteditor-to-build-webfont/ 

2. `FontMin:` http://ecomfe.github.io/fontmin/

    支持从ttf等格式的TrueType字体中按需生成多种格式的字体文件，能兼容性好的
    运行在多平台浏览器上。

