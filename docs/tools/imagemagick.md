# imagemagick

## Features

* 图片创建、编辑、组合以及转换工具，包括压缩，支持png, jpeg, jpeg-2000, gif, tiff, dpx, exr, webp, postscript, pdf, svg等
* 强大的`命令行`支持，同时也提供`编程库`
* 支持`批量`处理文件，读取文件和输出文件均可自动映射文件名，使用`%d`表示，从1开始。格式同C的format string
* 支持从一批图片快速生成`gif`图片，扩展阅读：视频生成gif - <ref://../other/common-softwares.md.html>
* 支持从gif图片中获取`指定帧`


## Resources

* site: <http://www.imagemagick.org/script/index.php>
* github: <https://github.com/ImageMagick/ImageMagick> `C语言`实现 <iframe src="http://258i.com/gbtn.html?user=imageMagick&repo=imageMagick&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
* command line: <http://www.imagemagick.org/script/command-line-processing.php>


## Versions

* 7.0.7-12


## Installation

* `homebrew`
        $ brew install imagemagick        # 注意区分大小写，不能是ImageMagick
* port
        $ sudo port install ImageMagick
* `二进制包`，解压直接使用等
        $ curl -OL https://www.imagemagick.org/download/binaries/ImageMagick-x86_64-apple-darwin16.7.0.tar.gz
        $ tar xzvf ImageMagick-x86_64-apple-darwin16.7.0.tar.gz 
        $ export MAGICK_HOME="$HOME/ImageMagick-7.0.7"
        $ export PATH="$MAGICK_HOME/bin:$PATH"
        $ export DYLD_LIBRARY_PATH="$MAGICK_HOME/lib/"

        
## Usage

### Syntax

    $ man magick

        NAME

           magick  -  convert  between  image  formats as well as resize an image, blur, crop,
           despeckle, dither, draw on, flip, join, re-sample, and much more.

        SYNOPSIS

            magick [input-options] input-file [output-options] output-file

    $ magick -usage

        magick [ {option} | {image} ... ] {output_image}
        magick [ {option} | {image} ... ] -script {filename} [ {script_args} ... ]
        magick -help | -version | -usage | -list {option}


### Tips

* `logo:`, `rose:`等，作为`<input-file>`提供，指的是magick提供的`内部图片`，比如：

        magick logo: -resize '200%' bigWiz.png




### Options

    Image Settings:

        -adjoin             join images into a single multi-image file
        -affine matrix
        -antialias          remove pixel-aliasing
        ...
        -background-color
        ...
        -bordercolor color
        -caption string     assign a caption to an image
        ...


    Image Operators:

        ...
        -border geometry
        ...
        -set property value

    Image Channel Operators:

    Image Sequence Operators:

        -affinity filename
        -append
        -clut
        -coalesce
        -combine
        -composite
        -crop geometry
        -deconstruct
        -evaluate-sequence operator
        -flatten
        -fx expression
        -hald-clut
        -mosaic
        ...
        -write filename

    Image Stack Operators:

        -clone indexes
        ...

    Miscellaneous Options:

        -debug events
        -help
        -log format
        -list type
        -version


### -auto-orient option

> This operator reads and resets the `EXIF` image profile setting `'Orientation'` and then performs the appropriate `90 degree rotation` on the image to orient the image, for correct viewing.

    $ magick input.jpg -auto-orient output.png

* 自动调整图片方向
* 按需使用，不一定总是正确


### -list option

    $ magick -list orientation
    $ magick -list preview
    $ magick -list type
    

## Examples

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

    # 添加边框
    $ magick input.jpg -border 10x10 -bordercolor '#f00' output.jpg

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
    ## 1. 裁切方式，自定义序列号的格式
    $ magick '*.JPG' -crop 120x120+850+1200 thumbnail%03d.png
    $ magick '*.JPG[120x120+850+1200]' thumbnail%03d.png
    ## 2. 等比缩放方式，自定义序列号的格式
    $ magick '*.JPG' -resize 120x120 -auto-orient thumbnail%03d.png # 10进制
    $ magick '*.JPG' -resize 120x120 -auto-orient thumbnail%03x.png # 16进制
    $ magick '*.JPG' -resize 120x120 -auto-orient thumbnail%03o.png # 8进制
    ## 3. 等比缩放方式，输出文件名与输入文件名相关联
    ## 3.1 从6.4.8-4开始，可以使用-set指令，预设格式串
    ## 3.2 预设格式串必须以`filename:`为前缀，并在输出文件名中用`%[filename:x]`引用
    ## 3.3 原有文件的引用通常为：`%d/%f`或`%d/%t.%e`或`%d/%t.%m`
    ## 3.4 以上%d, %f, %t, %m, %w, %h等只能在-set指令中使用，而不能直接使用在输出文件名中
    ## 3.5 可直接在输出文件名中使用的是%d, %o, %x等序列值
    $ magick IMG_15* -set filename:f 'thumb-%t' -resize 120x120 \
        -auto-orient -verbose %[filename:f].jpg

    # 格式转换
    $ magick convert rose.jpg -resize 50% rose.png

    # 从文件中获取输入文件列表，@前缀
    $ magick @image-list.txt mymovie.gif

    # 文本输出到图片
    $ magick -background lightblue  -fill blue  -font Arial -pointsize 20 \
        label:'ImageMagick\nRules - OK!' label_multiline.gif

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


## 实际案例

高分辨率的原始图像，压缩成较大尺寸图与缩略图：

    # 压缩图片，使用自定义文件名，自动方向，等比例缩放，压缩质量为80
    magick *.jpg -set filename:f 'big-%t-1200' -auto-orient -resize 1200 -quality 80 -verbose %[filename:f].jpg
    magick *.png -set filename:f 'big-%t-1200' -auto-orient -resize 1200 -quality 80 -verbose %[filename:f].png
    # 生成缩略图，使用自定义文件名，自动方向，等比例缩放，压缩质量为80
    magick *.jpg -set filename:f 'thumb-%t-120' -auto-orient -resize 120 -quality 80 -verbose %[filename:f].jpg
    magick *.png -set filename:f 'thumb-%t-120' -auto-orient -resize 120 -quality 80 -verbose %[filename:f].png

由于一次性`不间断压缩`的图片数目过多，容易造成`系统假死`，需要通过脚本添加`压缩间隔`，可如下实现：

    #!/bin/bash
    TASKS_PER_DISPATCH=5
    let a=0; \
    let b=1; \
    for i in `ls img_*.jpg`; do \
        echo ==== [ $b ] $i ====; \
        magick $i -set filename:f 'big-%t-1200' -resize 1200 -auto-orient -quality 80 -verbose %[filename:f].jpg; \
        magick $i -set filename:f 'thumb-%t-120' -resize 120 -auto-orient -quality 80 -verbose %[filename:f].jpg; \
        let a=(a+1)%$TASKS_PER_DISPATCH; \
        let b=b+1; \
        if (( a == 0 )); then sleep 1; fi; \
    done; \
    let a=0; \
    let b=1; \
    for i in `ls img_*.png`; do \
        echo ==== [ $b ] $i ====; \
        magick $i -set filename:f 'big-%t-1200' -resize 1200 -auto-orient -quality 80 -verbose %[filename:f].png; \
        magick $i -set filename:f 'thumb-%t-120' -resize 120 -auto-orient -quality 80 -verbose %[filename:f].png; \
        let a=(a+1)%$TASKS_PER_DISPATCH; \
        let b=b+1; \
        if (( a == 0 )); then sleep 1; fi; \
    done


todo: 

* 貌似支持通过`-write`指令同时产生多组输出





