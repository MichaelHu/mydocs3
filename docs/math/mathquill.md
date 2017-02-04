# mathquill


* github: <https://github.com/mathquill/mathquill.git>
* `所见即所得`的输入框
* 输入框的`位置`非常`灵活`
* 支持`LaTex`标准语法
* 依赖jQuery

<style type="text/css">
@import url(http://258i.com/static/build/mathquill/mathquill.css); 
</style>
<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="http://258i.com/static/build/mathquill/mathquill.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## Installation

    git clone https://github.com/mathquill/mathquill.git 
    npm install
    make server


## vs MathJax

* `MathJax`支持更多的符号标准，比如Tex, MathMl, AsciiMath等
* `MathJax`支持公式和文本混排，公式可以配置`delimiter`
* `mathquill`更加`轻量化`，单纯提供对LaTex的支持
* `mathquill`针对文本、公式混合输入的支持需要添加`\text`转义，而`MathJax`则直接支持混合输入



## Getting Started


* `MathField`是可编辑展示框，`StaticMath`为不可编辑展示框
* `\text`与`\mbox`支持公式中的`纯文本`输出
* handlers事件钩子：`enter`, `edit`等
* `Short Math Guide for LaTex`: <ftp://ftp.ams.org/pub/tex/doc/amsmath/short-math-guide.pdf>
    ，或者：<a href="./pdf/short-math-guide.pdf">本地下载版</a>。该文档提供了各类数学公式编辑器
    遵循的`LaTex`语法标准。


<div id="test_getting_started" class="test">
<div class="test-panel">
<span class="editable"></span><br>
<span class="non-editable"></span>
</div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_getting_started');
        var $wrapper = $( '#test_getting_started' );
        var editableHtmlElement = $wrapper.find( '.test-panel .editable' );
        var nonEditableHtmlElement = $wrapper.find( '.test-panel .non-editable' );
        var config = {
            handlers: { edit: function(){ s.append_show( 'edit' ); } },
            restrictMismatchedBrackets: true
        };

        window.MQ = window.MQ 
            || MathQuill.getInterface( MathQuill.getInterface.MAX );

        var mathField = MQ.MathField( editableHtmlElement[ 0 ], config );
        var staticMath = MQ.StaticMath( nonEditableHtmlElement[ 0 ] );

        s.show( 'start ... ' );
        // mathField.latex( '2^{\\frac{3}{2}}' );
        mathField.latex( 
            '\\text{n维空间向量 }X\\text{ 的p-norm: }'
            + '{\\parallel X \\parallel}_p = '
            + '{(\\sum_{i=1}^n {\\mid {x_i} \\mid}^p)}^{1/p}' 
        );
        s.append_show( mathField.latex() );
        staticMath.latex(
            '\\text{When }a \\ne 0\\text{, there are two solutions to }'
            + 'ax^2 + bx + c = 0\\text{ and they are }'
            + 'x = \\frac {-b \\pm \\sqrt{b^2-4ac} } {2a}'
        );
        s.append_show( staticMath.latex() );

    })();

</div>
<div class="test-console"></div>
</div>




## APIs

<http://docs.mathquill.com/en/latest/Api_Methods>


