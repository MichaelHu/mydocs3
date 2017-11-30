# imagemagick

## Features

* 图片创建、编辑、组合以及转换工具，包括压缩，支持png, jpeg, jpeg-2000, gif, tiff, dpx, exr, webp, postscript, pdf, svg等
* 强大的`命令行`支持，同时也提供编程库
* 支持`批量`处理文件，读取文件和输出文件均可自动映射文件名，使用`%d`表示，从1开始。格式同C的format string
* 支持从一批图片快速生成`gif`图片，扩展阅读：视频生成gif - <ref://../other/common-softwares.md.html>
* 支持从gif图片中获取`指定帧`


## Resources

* site: <http://www.imagemagick.org/script/index.php>
* github: <https://github.com/ImageMagick/ImageMagick> `C语言`实现 <iframe src="http://258i.com/gbtn.html?user=imageMagick&repo=imageMagick&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
* command line: <http://www.imagemagick.org/script/command-line-processing.php>


## Versions

* 7.0-7-12


## Installation

* `homebrew`
        $ brew install imagemagick        # 注意区分大小写，不能是ImageMagick
* port
        $ sudo port install ImageMagick
* 二进制包，解压直接使用等
        $ curl -OL https://www.imagemagick.org/download/binaries/ImageMagick-x86_64-apple-darwin16.7.0.tar.gz
        $ tar xzvf ImageMagick-x86_64-apple-darwin16.7.0.tar.gz 
        $ export MAGICK_HOME="$HOME/ImageMagick-7.0.7"
        $ export PATH="$MAGICK_HOME/bin:$PATH"
        $ export DYLD_LIBRARY_PATH="$MAGICK_HOME/lib/"

        
## Usage

### Syntax

    magick [input-options] input-file [output-options] output-file
    magick -list ...

### -auto-orient option

> This operator reads and resets the `EXIF` image profile setting `'Orientation'` and then performs the appropriate `90 degree rotation` on the image to orient the image, for correct viewing.

    $ magick input.jpg -auto-orient output.png

* 自动调整图片方向
* 按需使用，不一定总是正确


### -list option

    $ magick -list orientation
    $ magick -list preview
    $ magick -list type
    
### Examples

    # 自动调整图片方向
    $ magick input.jpg -auto-orient output.png

    # 图片格式转换
    $ magick input.jpg output.png

    # 等比例缩放尺寸，宽不超过800，高不超过600, -resize geometry，或-scale geometry
    $ magick input.jpg -resize 800x600 output.jpg
    # 只提供一个值，则表示`宽度`限制
    $ magick input.jpg -resize 1000 output.jpg
    $ magick input.jpg -resize 25% output.jpg

    # 颜色反转
    $ magick input.jpg -negate output.jpg

    # 设置压缩级别，1-100
    $ magick input.jpg -quality level output.jpg

    # 沿垂直轴翻转
    $ magick input.jpg -flip output.jpg
    # 沿水平轴翻转
    $ magick input.jpg -flop output.jpg

    # 使用填充色进行颜色化，效果如同盖上一层颜色蒙层，-colorize <1-100>
    $ magick input.jpg -fill '#000' -colorize 50 output.jpg

    # 使用油画效果，-paint radius
    $ magick input.jpg -paint 5 output.jpg

    # 顺时针旋转，-rotate degree 
    $ magick input.jpg -rotate 30 output.jpg

    # 阴影，可制作雕刻效果，-shade degrees，暂不清楚参数含义
    $ magick input.jpg -shade 30,30 output.jpg
    $ magick input.jpg -shade 3,10 output.jpg

    # 选择帧
    $ magick 'input.gif[0]' output.png
    $ magick 'input.gif[0-3]' output.mng
    $ magick 'input.gif[3,2,4]' output.mng

    # 批量生成缩略图，自动映射文件名
    $ magick '*.JPG' -crop 120x120+850+1200 thumbnail%03d.png
    $ magick '*.JPG[120x120+850+1200]' thumbnail%03d.png

    # 从文件中获取输入文件列表，@前缀
    $ magick @image-list.txt mymovie.gif

    # 读取指定范围的图片，以下只读取image-1.jpg - image-5.jpg
    $ magick image-%d.jpg[1-5]

    $ magick label.gif +matte \
        \( +clone  -shade 110x90 -normalize -negate +clone  -compose Plus -composite \) \
        \( -clone 0 -shade 110x50 -normalize -channel BG -fx 0 +channel -matte \) \
        -delete 0 +swap  -compose Multiply -composite  button.gif");

    $ magick -size 320x90 canvas:none -stroke snow4 -size 1x90 -tile gradient:white-snow4 \
        -draw 'roundrectangle 16, 5, 304, 85 20,40' +tile -fill snow \
        -draw 'roundrectangle 264, 5, 304, 85  20,40' -tile gradient:chartreuse-green \
        -draw 'roundrectangle 16,  5, 180, 85  20,40' -tile gradient:chartreuse1-chartreuse3 \
        -draw 'roundrectangle 140, 5, 180, 85  20,40' +tile -fill none \
        -draw 'roundrectangle 264, 5, 304, 85 20,40' -strokewidth 2 \
        -draw 'roundrectangle 16, 5, 304, 85 20,40' \( +clone -background snow4 \
        -shadow 80x3+3+3 \) +swap -background none -layers merge \( +size -font Helvetica \
        -pointsize 90 -strokewidth 1 -fill red label:'50 %' -trim +repage \( +clone \
        -background firebrick3 -shadow 80x3+3+3 \) +swap -background none -layers merge \) \
        -insert 0 -gravity center -append -background white -gravity center -extent 320x200 \
        cylinder_shaded.png 
