# fontcustom

> Generate custom icon webfonts from the comfort of command line.


## Features

* 命令行方式，有助于自动化 ( automation )
* 从`SVG`文件生成`跨浏览器`(cross-browser)的icon fonts


## Resources

* github: <https://github.com/FontCustom/fontcustom>


## Installation

`Tips`: brew可参考<ref://./homebrew.md.html>

    # on Mac
    $ brew tap bramstein/webfonttools
    $ brew update
    $ brew install woff2

    $ ruby -v
    # 若ruby版本小于1.9.3
    $ brew install ruby@2.x         # 选择大于1.9.3的2.x版本安装

    $ brew install fontforge --with-python --debug
    $ brew install eot-utils
    # 若安装遇到问题，可以尝试安装特定版本，添加选项`-v 1.3.8`
    $ gem install fontcustom

    # on Linux
    git clone https://github.com/bramstein/sfnt2woff-zopfli.git sfnt2woff-zopfli \
        && cd sfnt2woff-zopfli && make && mv sfnt2woff-zopfli /usr/local/bin/sfnt2woff
    git clone --recursive https://github.com/google/woff2.git \
        && cd woff2 && make clean all && sudo mv woff2_compress /usr/local/bin/ \
        && sudo mv woff2_decompress /usr/local/bin/
    gem install fontcustom


## Usage

    $ fontcustom compile my/vectors   # Compiles icons into `fontcustom/`
    $ fontcustom watch my/vectors     # Compiles when vectors are changed/added/removed
    $ fontcustom compile              # Uses options form `./fontcustom.yml` or `config/fontcustom.yml`
    $ fontcustom config               # Generate a blank config file
    $ fontcustom help                 # See all options



## SVG相关

* All colors will be rendered identically. Watch out for white fills!
* Use only solid colors. SVGs with transparency will be skipped.
* For greater precision in curved icons, use fills instead strokes and try these solutions.
* Activating autowidth trims horizontal white space from each glyph. This can be much easier than centering dozens of SVGs by hand.


## fontcustom.yml

    # config/fontcustom.yml
    
    font_name: icons
    css_selector: .icon-{{glyph}}
    preprocessor_path: ""
    autowidth: false
    no_hash: true
    force: false
    debug: false
    quiet: false
    
    input:
      vectors: app/assets/icons
    
    output:
      fonts: app/assets/fonts
      css: app/assets/stylesheets
    
    templates:
     - scss

