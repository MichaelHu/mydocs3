# WebGL

> Web Graphics Library  <img src="./img/WebGL-Logo.png" height="45">

## Resources

* wikipedia: <https://en.wikipedia.org/wiki/WebGL>
* specs latest: <https://www.khronos.org/registry/webgl/specs/latest/>
* specs 1.0: <https://www.khronos.org/registry/webgl/specs/latest/1.0/>
* WebIDL 1.0: <https://www.khronos.org/registry/webgl/specs/latest/1.0/webgl.idl>
* specs 2.0: <https://www.khronos.org/registry/webgl/specs/latest/2.0/>
* WebIDL 2.0: <https://www.khronos.org/registry/webgl/specs/latest/2.0/webgl2.idl>
* WebGL框架列表：<https://en.wikipedia.org/wiki/List_of_WebGL_frameworks>
* `OpenGL ES 2.0`: <ref://./doc/opengl_es_full_spec_2.0.pdf>
* `WebGL Fundamentals`: <https://webglfundamentals.org> github: <https://github.com/greggman/webgl-fundamentals>
* 并不是`w3c`出specs，也可以理解，毕竟WebGL来自`OpenGL`


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.canvas-cont {
    height: 300px;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>


## Keywords

    blending mode   图像混合模式
    VBO             Vertex Buffer Objects
    shaders         着色器
    texture         质地，结构
    depth buffer    深度缓冲
    stencil buffer  模板缓冲
    antialias       消除走样，图形保真
    cull            剔除；精选；挑选
    scissor         剪刀，在WebGL中用作剪辑区，同canvas2d的clip
    vertex          顶点
    clamp           夹紧，夹住；锁住；把（砖等）堆高 
                    zNear and zFar values are clamped to the range 0 to 1.




## WebGL Resources

* 都继承自`WebGLObject`
* 主要有以下几种`资源`：
        textures
        buffers( i.e., VBOs )
        framebuffers
        renderbuffers
        shaders
        programs
* 可由`WebGLRendereringContext`提供的方法创建

## 安全

### 资源限制

* 必须恰当的初始化
* 创建资源无初始值的情况通常用于为texture或VBO预留空间，然后通过`texSubImage()`或`bufferSubData()`修改；若非此种情况，WebGL的实现必须将它们的值初始化为0；depth renderbuffers必须被设置为默认的1.0 clear depth
* shaders调用`drawElements()`或`drawArrays()`获取资源时，必须确保shaders无法获取边界外的数据或未初始化的数据


### 同源限制

> 为避免信息泄漏，有如下同源限制：

* 与包含WebGLRenderingContext的文档不同源的`Image`或`Video`不能作为texture    
* Canvas元素的bitmap的`origin-clean`设置为`false`时，不能作为texture 
* ImageBitmap对象的bitmap的`origin-clean`设置为`false`时，不能作为texture

当`texImage2D()`或`texSubImage2D()`调用时，如果违反以上同源策略，则抛出`SECURITY_ERR`异常。

### 支持的GLSL

> SL，着色器语言

仅接受符合`OpenGL ES Shading Language V 1.00`规范的shaders，且不超出在Section 4和5中规定的最小功能集合。

* 桌面版OpenGL的规范中定义的状态变量，不能使用
* `for`循环必须符合附录A
* `while`和`do-while`不允许使用

### 防御DOS攻击

尚未标准化

### 数组越界存取

必须确保着色器无法获取越界内容




## DOM接口扩展

> 支持WebGL，对DOM的接口扩展

### Types - 类型

> 主要包括`以GL为前缀`的类型

    typedef unsigned long  GLenum;
    typedef boolean        GLboolean;
    typedef unsigned long  GLbitfield;
    typedef byte           GLbyte;         /* 'byte' should be a signed 8 bit type. */
    typedef short          GLshort;
    typedef long           GLint;
    typedef long           GLsizei;
    typedef long long      GLintptr;
    typedef long long      GLsizeiptr;
    // Ideally the typedef below would use 'unsigned byte', but that doesn't currently exist in Web IDL.
    typedef octet          GLubyte;        /* 'octet' should be an unsigned 8 bit type. */
    typedef unsigned short GLushort;
    typedef unsigned long  GLuint;
    typedef unrestricted float GLfloat;
    typedef unrestricted float GLclampf;

    // The power preference settings are documented in the WebGLContextAttributes
    // section of the specification.
    enum WebGLPowerPreference { "default", "low-power", "high-performance" };

### WebGLContextAttributes

    dictionary WebGLContextAttributes {
        // if has alpha channel
        GLboolean alpha = true;

        // if has a depth buffer of at least 16 bits
        GLboolean depth = true;

        // if has a stencil buffer of at least 8 bits
        GLboolean stencil = false;

        // if antialias
        GLboolean antialias = true;

        // ...
        GLboolean premultipliedAlpha = true;
        GLboolean preserveDrawingBuffer = false;
        WebGLPowerPreference powerPreference = "default";
        GLboolean failIfMajorPerformanceCaveat = false;
    };


### Other GL Objects

    WebGLObject                         基类
    WebGLBuffer
    WebGLFramebuffer    
    WebGLProgram
    WebGLRenderbuffer
    WebGLShader
    WebGLTexture
    WebGLUniformLocation
    WebGLActiveInfo

        interface WebGLActiveInfo {
            readonly attribute GLint size;
            readonly attribute GLenum type;
            readonly attribute DOMString name;
        };

    WebGLShaderPrecisionFormat

        interface WebGLShaderPrecisionFormat {
            readonly attribute GLint rangeMin;
            readonly attribute GLint rangeMax;
            readonly attribute GLint precision;
        };

    ArrayBuffer and Typed Arrays


### ArrayBuffer and Typed Arrays

* `ArrayBuffer`, `Typed Arrays` 以及 `DataViews`，在`ES规范`中定义 <ref://../es/es.md.html>
    * `ArrayBuffer`: <http://www.ecma-international.org/ecma-262/7.0/index.html#sec-arraybuffer-constructor>
    * `Typed Array`: <http://www.ecma-international.org/ecma-262/7.0/index.html#sec-typedarray-objects>
* 用于传递`Vertex`, `index`, `texture`以及其他数据。

#### 代码示例

    var numVertices = 100;
    var vertexSize = 3 * Float32Array.BYTES_PER_ELEMENT
            + 4 * Uint8Array.BYTES_PER_ELEMENT;
    var vertexSizeInFloats = vertexSize / Float32Array.BYTES_PER_ELEMENT;

    var buf = new ArrayBuffer( numVertices * vertexSize );

    var positionArray = new Float32Array( buf );

    var colorArray = new Uint8Array( buf )

    var positionIdx = 0;
    var colorIdx = 3 * Float32Array.BYTES_PER_ELEMENT;

    for ( var i = 0; i < numVertices; i++ ) {
        positionArray[ positionIdx ] = ...;
        positionArray[ positionIdx + 1 ] = ...;
        positionArray[ positionIdx + 2 ] = ...;
        colorArray[ colorIdx ] = ...;
        colorArray[ colorIdx + 1 ] = ...;
        colorArray[ colorIdx + 2 ] = ...;
        colorArray[ colorIdx + 3 ] = ...;
        positionIdx += vertexSizeInFloats;
        colorIdx += vertexSize;
    }


## WebGLRenderingContext

支持符合`OpenGL ES 2.0`风格的API

    var options = contextAttributes;
    var glContext = canvas.getContext( 'webgl', options );

    typedef ( ImageBitmap or
            ImageData or
            HTMLImageElement or
            HTMLCanvasElement or
            HTMLVideoElement ) TexImageSource;

    interface WebGLRenderingContextBase {
        // enumerables 
        const GLenum ...

        // attributes
        readonly canvas;
        readonly drawingBufferWidth;
        readonly drawingBufferHeight;

        // methods
        isContextLost();
        activeTexture( texture );
        ...
    }

### 3个只读属性

    canvas
    drawingBufferWidth
    drawingBufferHeight


### 获取context信息

    [WebGlHandlesContextLoss] WebGLContextAttributes? getContextAttributes()

### 设置、获取state

    // OpenGL ES 2.0 §3.7
    void activeTexture( GLenum texture )

    void blendColor( GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha )
    void blendEquation( GLenum mode )
    void blendEquationSeparate( GLenum modeRGB, GLenum modeAlpha )
    void blendFunc( GLenum sfactor, GLenum dfactor )
    void blendFuncSeparate( GLenum srcRGB, GLenum dstRGB, GLenum srcAlpha, GLenum dstAlpha )
    void clearColor( GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha )
    void clearDepth( GLclampf depth )
    void clearStencil( GLint s )
    void colorMask( GLboolean red, GLboolean green, GLboolean blue, GLboolean alpha )
    void cullFace( GLenum mode )
    void depthFunc( GLenum func )
    void depthMask( GLboolean flag )

    // zNear and zFar values are clamped to the range 0 to 1 and zNear must be less than or equal to zFar; see Viewport Depth Range.
    void depthRange( GLclampf zNear, GLclampf zFar )
    void disable( GLenum cap )
    void enable( GLenum cap )
    void frontFace( GLenum mode )
    any getParameter( GLenum pname )
        ACTIVE_TEXTURE
        ALIASED_LINE_WIDTH_RANGE
        ...
    [WebGLHandlesContextLoss] GLenum getError()
    void hint( GLenum target, GLenum mode )
    [WebGLHandlesContextLoss] GLboolean isEnabled( GLenum cap )
    void lineWidth( GLfloat width )
    void pixelStorei( GLenum pname, GLint param )
    void polygonOffset( GLfloat factor, GLfloat units )
    void sampleCoverage( GLclampf value, GLboolean invert )
    void stencilFunc( GLenum func, GLint ref, GLunit mask )
    void stencilFuncSeparate( GLenum face, GLenum func, GLint ref, GLuint mask )
    void stencilMask( GLuint mask )
    void stencilMaskSeparate( GLenum face, GLuint mask )
    void stencilOp( GLenum fail, GLenum zfail, GLenum zpass )
    void stencilOpSeparate( GLenum face, GLenum fail, GLenum zfail, GLenum zpass )


### Viewing and clipping

绘制命令只能在`当前bound framebuffer`中修改像素。除此之外，`scissor box`（剪辑区）也会影响绘制。

    void scissor( GLint x, GLint y, GLsizei width, GLsizei height )
    void viewport( GLint x, GLint y, GLsizei width, GLsizei height )


### Buffer objects

有时也称为`VBOS`，保存`GLSL` shaders的`vertex属性`数据。

    // buffer为null，则解绑buffer；buffer在其生命周期中只能绑定到一个target
    void bindBuffer( GLenum target, WebGLBuffer? buffer )
    void bufferData( GLenum target, GLsizeiptr size, GLenum usage )
    void bufferData( GLenum target, [AllowShared] BufferSource? data, GLenum usage )
    void bufferSubData( GLenum target, GLintptr offset, [AllowShared] BufferSource data )
    WebGLBuffer? createBuffer()
    void deleteBuffer( WebGLBuffer? buffer )
    any getBufferParameter( GLenum target, GLenum pname )
        BUFFER_SIZE
        BUFFER_USAGE
    [WebGLHandlesContextLoss] GLboolean isBuffer( WebGLBuffer? buffer )



### Framebuffer objects

为drawing buffer提供一个可供替代的rendering buffer。存储内容是color, alpha, depth以及stencil buffer的集合，常被用于渲染作为texture的图片。

    void bindFramebuffer( GLenum target, WebGLFramebuffer? framebuffer )
    ...


### Renderbuffer objects

为framebuffer对象中使用的单独buffer提供存储。

    void bindRenderbuffer( GLenum target, WebGLRenderbuffer? renderbuffer )
    ...


### Texture objects

为texturing操作提供存储和状态。

    void bindTexture( GLenum target, WebGLTexture? texture )
    ...


### Programs and Shaders

Rendering with OpenGL ES 2.0 requires the use of shaders, written in OpenGL ES's shading language, GLSL ES. Shaders must be loaded with a source string (shaderSource), compiled (compileShader) and attached to a program (attachShader) which must be linked (linkProgram) and then used (useProgram).

    void attachShader( WebGLProgram program, WebGLShader shader )
    ...


### Uniforms and attributes

> Values used by the shaders are passed in as uniforms or vertex attributes.
传递给shaders的标准化的值，或节点属性。

    void disableVertexAttribArray( GLuint index )
    ...


### Writing to the drawing buffer

    void clear( GLbitfield mask )
    void drawArrays( GLenum mode, GLint first, GLsizei count )

    ...



========== todo ===============






## WebGL Viewport

* canvas的3d context
* contextId为`webgl`

<div id="test_viewport" class="test">
<div class="canvas-cont"><canvas></canvas></div>
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_viewport');
        var $cont = $( '#test_viewport .canvas-cont' );
        var canvas = $cont.find( 'canvas' )[ 0 ]; 
        var gl = canvas.getContext( 'webgl' );

        canvas.width = $cont.width();
        canvas.height = $cont.height();
        gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );

        s.show( 'testing webgl viewport ...' );
        s.append_show( gl.drawingBufferWidth, gl.drawingBufferHeight );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



