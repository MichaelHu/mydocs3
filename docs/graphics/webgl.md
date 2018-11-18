# WebGL

> Web Graphics Library  <img src="./img/WebGL-Logo.png" height="45">

## Resources

* wikipedia: <https://en.wikipedia.org/wiki/WebGL>
* WebIDL 1.0: <https://www.khronos.org/registry/webgl/specs/latest/1.0/webgl.idl>
* WebIDL 2.0: <https://www.khronos.org/registry/webgl/specs/latest/2.0/webgl2.idl>
* ` WebGL框架列表`：<https://en.wikipedia.org/wiki/List_of_WebGL_frameworks>
* 并不是`w3c`出specs，也可以理解，毕竟WebGL来自`OpenGL`


### Specs

* specs latest: <https://www.khronos.org/registry/webgl/specs/latest/>
* specs 1.0: <https://www.khronos.org/registry/webgl/specs/latest/1.0/>
* specs 2.0: <https://www.khronos.org/registry/webgl/specs/latest/2.0/>
* `OpenGL ES 2.0`: <ref://./doc/opengl_es_full_spec_2.0.pdf> 中文翻译版：<http://www.docin.com/p-324551367.html>


### WebGL教程

* `WebGL Fundamentals`: <https://webglfundamentals.org> github: <https://github.com/greggman/webgl-fundamentals>
* `webgl-utils.js`: <https://webglfundamentals.org/webgl/resources/webgl-utils.js> local-version: <ref://./js/webgl-utils.js>
* `m3.js`: <https://webglfundamentals.org/webgl/resources/m3.js> local-version: <ref://./js/m3.js>
* 关于`二维矩阵`: <https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-2d-matrices.html>




<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.canvas-cont {
    height: 300px;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="./js/m3.js"></script>


## Keywords

    GLSL            Graphics Library Shader Language - 图形库着色器语言
    shaders         着色器
    blending mode   图像混合模式
    VBO             Vertex Buffer Objects
    texture         纹理
    depth buffer    深度缓冲
    stencil buffer  模板缓冲
    antialias       消除走样，图形保真
    cull            剔除；精选；挑选
    scissor         剪刀，在WebGL中用作剪辑区，同canvas2d的clip
    vertex          顶点
    clamp           夹紧，夹住；锁住；把（砖等）堆高 
                    zNear and zFar values are clamped to the range 0 to 1.


## Tips

* WebGL只是一个`光栅化引擎`，提供通过`GPU`来绘制`点、线、三角形`的基础API
* `光栅化引擎`，含义就是`像素绘制引擎`，只关注像素相关的信息：位置和颜色，并进行绘制
* 要让GPU运行代码，需要使用一种和C或C++类似的`强类型`语言`GLSL`
* 用`GLSL`创建着色器对，由`着色器对组成Program`，并编译、链接和执行
* 顶点着色器 - pointerShader和片段着色器 - fragmentShader，前者负责计算顶点位置，后者负责图元像素颜色值的计算
* 着色器四种方式获取数据：属性( attributes )和缓冲、全局变量( uniforms )、纹理( textures )、可变量( varyings )
* 画布和图片一样，有`两种尺寸`，一种是确定其包含多少像素的尺寸，一种是确定其显示大小的尺寸，后者一般用css来设置
* WebGL的`裁剪空间`范围总是`[ -1, 1 ]`，通过`gl.viewport()`方法将屏幕空间映射到裁剪空间
* 对于配置并传输数据给GPU绘制的WebGL来说，其操作的对象非常简单，只有`位置`和`颜色`，只做纯粹的`栅格化`操作。但通过编写复杂的着色器，可以获得非常复杂的三维效果
* WebGL会将同名的可变量( `varyings` )从顶点着色器输入到片段着色器中，片段着色器会自动进行`差值计算`


### Texture Tips

* 空间坐标范围总是`[ 0.0, 1.0 ]`
* 使用`varyings`，将纹理坐标从顶点着色器传到片段着色器，在片段着色器中通过`texture2D()`方法获取差值后的像素值颜色
* 使用图片资源方面，WebGL比Canvas2D具有更加严格的限制，必须同源，而且不能从本地读取，本地使用通常需要构建简易的web服务器来访问



### GLSL Tips

* 支持`矢量调制`
        调制格式    等价于
        ==============================================
        v.yyyy      vec4( v.y, v.y, v.y, v.y )
        v.bgra      vec4( v.b, v.g, v.r, v.a )
* 当构造一个矢量或矩阵时可以一次提供多个分量
        合并格式            等价于
        ==============================================
        vec4( v.rgb, 1 )    vec4( v.r, v.g, r.b, 1 )
        vec4( 1 )           vec4( 1, 1, 1, 1 )
* 是一种`强类型`语言
        // error
        float f = 1;

        // ok
        float f = 1.0;
        float f = float( 1 );

        // ok，因为vec4内部做了自动的float转换
        vec4 v = vec4( 1, 1, 1, 1 );
* 大多数运算同时支持多种数据类型，比如sin运算：`T sin( T angle )`
        float f1 = sin( f );
        vec2 v2_1 = sin( v2 );
        vec3 v3_1 = sin( v3 );
        vec4 v4_1 = sin( v4 );
* 有时一个参数是浮点型而剩下的都是 T ，意思是那个浮点数据会作为所有其他参数的一个新分量
        vec4 m = mix(v1, v2, f);

    等价于

        vec4 m = vec4(
            mix(v1.x, v2.x, f),
            mix(v1.y, v2.y, f),
            mix(v1.z, v2.z, f),
            mix(v1.w, v2.w, f)
        );


### m3.js

* `m3.rotate()`，进行的是`逆时针`旋转，其输出的旋转矩阵是：

        cos     -sin    0
        sin     cos     0
        0       0       1

* m3的矩阵作为`左乘矩阵`，按`行向量`来解析

        // js
        var matrix = m3.translation( 100, 200 );
        ...
        var matrixLocation = gl.getUniformLocation( program, 'u_matrix' );
        gl.uniformMatrix3fv( matrixLocation, false, matrix );

        // glsl
        gl_Position = vec4( ( u_matrix * vec3( a_position, 1 ) ).xy, 0, 1 );

* `m3.multiply( a, b )`，实际上是`b * a`



### 矩阵变换

* 矩阵变换，有两种理解的视角：`对象变换`视角和`坐标轴变换`视角。具体可查看关于`二维矩阵`的文章: <https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-2d-matrices.html>
* 我们从更易于理解的视角 - 对象变换视角来理解
* 为便于理解，需要区分`对象的( 0, 0 )点`，和`坐标轴的( 0, 0 )点`
* 对象的( 0, 0 )点，在未做`translate变换`之前，总是与`坐标轴`的( 0, 0 )点重合
* `scale`, `rotate`变换总是基于对象的`( 0, 0 )`点
* `变换顺序`很重要：不同的变换顺序，最终变换效果也不同
* 关于`物体变形`：先scale，再rotate不会产生物体变形；先rotate，再scale会产生物体变形




## 待整理的记事

    _canvas.addEventListener( 'webglcontextlost', onContextLost, false );
    _canvas.addEventListener( 'webglcontextrestored', onContextRestore, false );




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


#### 全局变量设置方法

    gl.uniform1f (floatUniformLoc, v);                 // float
    gl.uniform1fv(floatUniformLoc, [v]);               // float 或 float array
    gl.uniform2f (vec2UniformLoc,  v0, v1);            // vec2
    gl.uniform2fv(vec2UniformLoc,  [v0, v1]);          // vec2 或 vec2 array
    gl.uniform3f (vec3UniformLoc,  v0, v1, v2);        // vec3
    gl.uniform3fv(vec3UniformLoc,  [v0, v1, v2]);      // vec3 或 vec3 array
    gl.uniform4f (vec4UniformLoc,  v0, v1, v2, v4);    // vec4
    gl.uniform4fv(vec4UniformLoc,  [v0, v1, v2, v4]);  // vec4 或 vec4 array

    gl.uniformMatrix2fv(mat2UniformLoc, false, [  4x element array ])  // mat2 或 mat2 array
    gl.uniformMatrix3fv(mat3UniformLoc, false, [  9x element array ])  // mat3 或 mat3 array
    gl.uniformMatrix4fv(mat4UniformLoc, false, [ 16x element array ])  // mat4 或 mat4 array

    gl.uniform1i (intUniformLoc,   v);                 // int
    gl.uniform1iv(intUniformLoc, [v]);                 // int 或 int array
    gl.uniform2i (ivec2UniformLoc, v0, v1);            // ivec2
    gl.uniform2iv(ivec2UniformLoc, [v0, v1]);          // ivec2 或 ivec2 array
    gl.uniform3i (ivec3UniformLoc, v0, v1, v2);        // ivec3
    gl.uniform3iv(ivec3UniformLoc, [v0, v1, v2]);      // ivec3 or ivec3 array
    gl.uniform4i (ivec4UniformLoc, v0, v1, v2, v4);    // ivec4
    gl.uniform4iv(ivec4UniformLoc, [v0, v1, v2, v4]);  // ivec4 或 ivec4 array

    gl.uniform1i (sampler2DUniformLoc,   v);           // sampler2D (textures)
    gl.uniform1iv(sampler2DUniformLoc, [v]);           // sampler2D 或 sampler2D array

    gl.uniform1i (samplerCubeUniformLoc,   v);         // samplerCube (textures)
    gl.uniform1iv(samplerCubeUniformLoc, [v]);         // samplerCube 或 samplerCube array



### Writing to the drawing buffer

    void clear( GLbitfield mask )
    void drawArrays( GLenum mode, GLint first, GLsizei count )

    ...



========== todo ===============





## 基础例子

### 通用封装函数

包括创建着色器、着色程序等。

#### createShader( gl, type, source )

    @[data-script="javascript"]function createShader( gl, type, source ) {
        var shader = gl.createShader( type );
        gl.shaderSource( shader, source );
        gl.compileShader( shader );

        var success = gl.getShaderParameter( shader, gl.COMPILE_STATUS );
        if ( success ) {
            return shader;
        }

        console.log( gl.getShaderInfoLog( shader ) );
        gl.deleteShader( shader );
    }


#### createProgram( gl, vertexShader, fragmentShader )

    @[data-script="javascript"]function createProgram( gl, vertexShader, fragmentShader ) {
        var program = gl.createProgram();

        /**
         * 添加一对着色器，分别为顶点着色器和片段着色器
         */
        gl.attachShader( program, vertexShader );
        gl.attachShader( program, fragmentShader );

        // 链接着色程序
        gl.linkProgram( program );

        var success = gl.getProgramParameter( program, gl.LINK_STATUS );
        if ( success ) {
            return program;
        }

        console.log( gl.getProgramInfoLog( program ) );
        gl.deleteProgram( program );
    }



### 基础绘制 - 纯色三角形

#### 顶点着色器定义( GLSL代码 )

以下为`顶点着色器`( vertex-shader )的GLSL代码：

    @[id="basic_vertex_shader"]// 属性声明，该属性将从缓冲中获取数据
    attribute vec4 a_position;

    // 所有着色器都有一个main方法
    void main() {

        // 预定义变量gl_Position是顶点着色器主要设置的变量
        gl_Position = a_position;
    }


#### 片段着色器定义( GLSL代码 )

以下为`片段着色器`( fragment-shader )的GLSL代码：

    @[id="basic_fragment_shader" contenteditable="true"]// 片段着色器没有默认精度，需要设置一个精度
    // mediump是一个不错的默认值，代表 medium precision - 中等精度
    precision mediump float;

    void main() {

        // 预定义变量gl_FragColor是片段着色器主要设置的变量
        gl_FragColor = vec4( 1, 0, 0.5, 1 );
    }


#### WebGL API调用( JS代码 )

<div id="test_basic" class="test">
<div class="canvas-cont"><canvas></canvas></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_basic');
        var $cont = $( '#test_basic .canvas-cont' );
        var canvas = $cont.find( 'canvas' )[ 0 ]; 
        var gl = canvas.getContext( 'webgl' );

        s.show( 'testing webgl ...' );

        if ( ! gl ) {
            s.append_show( 'WebGLRenderingContext not support' );
        }

        var dpr = window.devicePixelRatio || 1;
        canvas.width = $cont.width() * dpr;
        canvas.height = $cont.height() * dpr;
        canvas.style.width = $cont.width() + 'px';
        canvas.style.height = $cont.height() + 'px';
        gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );

        s.show( 'testing webgl viewport ...' );
        s.append_show( gl.drawingBufferWidth, gl.drawingBufferHeight );

        var vertexShaderSource = document.querySelector( '#basic_vertex_shader code' ).innerText;
        var fragmentShaderSource = document.getElementById( 'basic_fragment_shader' ).innerText;

        // console.log( vertexShaderSource );
        // console.log( fragmentShaderSource );

        var vertexShader = createShader( gl, gl.VERTEX_SHADER, vertexShaderSource );
        var fragmentShader = createShader( gl, gl.FRAGMENT_SHADER, fragmentShaderSource );

        var program = createProgram( gl, vertexShader, fragmentShader );

        var positionAttributeLocation = gl.getAttribLocation( program, 'a_position' );
        var positionBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

        // 3个二维点坐标
        var positions = [
            0, 0
            , 0, 0.5
            , 0.5, 0
        ];
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( positions ), gl.STATIC_DRAW );

        // 清空画布
        gl.clearColor( 0, 0, 0, 0 );
        gl.clear( gl.COLOR_BUFFER_BIT );

        // 配置所使用的着色程序
        gl.useProgram( program );

        // 开启对应属性
        gl.enableVertexAttribArray( positionAttributeLocation );

        // gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

        /**
         * 配置属性如何从positionBuffer中读取数据( ARRAY_BUFFER )
         */
        var size = 2;               // 每次迭代运行提取两个单位数据
        var type = gl.FLOAT;        // 每个单位的数据类型是32位浮点数
        var normalize = false;      // 不需要归一化数据
        var stride = 0;             // 步幅：0 = 移动单位数量 * 每个单位占用内存( sizeof( type ) )
                                    // ，每次迭代运行移动多少内存到下一个数据开始点
        var offset = 0;             // 读取缓冲数据的起始位置

        gl.vertexAttribPointer( 
            positionAttributeLocation
            , size
            , type
            , normalize
            , stride
            , offset
        );

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        gl.drawArrays( primitiveType, offset, count );


    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 基础绘制 - 使用屏幕坐标

#### 顶点着色器定义( GLSL代码 )

    @[id="basic_screen_coords_vertex_shader"]attribute vec2 a_position;
    uniform vec2 u_resolution;

    void main() {
        // 从像素坐标转换到[ 0.0, 1.0 ]
        vec2 zeroToOne = a_position / u_resolution;

        // 再转换成[ 0.0, 2.0 ]
        vec2 zeroToTwo = zeroToOne * 2.0;

        // 最后转换成裁剪空间范围[ -1.0, 1.0 ]
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4( clipSpace * vec2( 1, -1 ), 0, 1 );
    }


#### 片段着色器定义( GLSL代码 )

以下为`片段着色器`( fragment-shader )的GLSL代码：

    @[id="basic_screen_coords_fragment_shader" contenteditable="true"]// 片段着色器没有默认精度，需要设置一个精度
    // mediump是一个不错的默认值，代表 medium precision - 中等精度
    precision mediump float;

    void main() {

        // 预定义变量gl_FragColor是片段着色器主要设置的变量
        gl_FragColor = vec4( 1, 0, 0.5, 1 );
    }


#### WebGL API调用( JS代码 )

<div id="test_basic_screen_coords" class="test">
<div class="canvas-cont"><canvas></canvas></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_basic_screen_coords');
        var $cont = $( '#test_basic_screen_coords .canvas-cont' );
        var canvas = $cont.find( 'canvas' )[ 0 ]; 
        var gl = canvas.getContext( 'webgl' );

        s.show( 'testing webgl ...' );

        if ( ! gl ) {
            s.append_show( 'WebGLRenderingContext not support' );
        }

        var dpr = window.devicePixelRatio || 1;
        canvas.width = $cont.width() * dpr;
        canvas.height = $cont.height() * dpr;
        canvas.style.width = $cont.width() + 'px';
        canvas.style.height = $cont.height() + 'px';
        gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );

        s.show( 'testing webgl viewport ...' );
        s.append_show( gl.drawingBufferWidth, gl.drawingBufferHeight );

        var vertexShaderSource = document.querySelector( '#basic_screen_coords_vertex_shader code' ).innerText;
        var fragmentShaderSource = document.getElementById( 'basic_screen_coords_fragment_shader' ).innerText;

        // console.log( vertexShaderSource );
        // console.log( fragmentShaderSource );

        var vertexShader = createShader( gl, gl.VERTEX_SHADER, vertexShaderSource );
        var fragmentShader = createShader( gl, gl.FRAGMENT_SHADER, fragmentShaderSource );

        var program = createProgram( gl, vertexShader, fragmentShader );

        var positionAttributeLocation = gl.getAttribLocation( program, 'a_position' );
        var positionBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

        var resolutionUniformLocation = gl.getUniformLocation( program, 'u_resolution' );

        // 3个二维点坐标
        var positions = [
            0, 0
            , 0, 50
            , 50, 0
        ];
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( positions ), gl.STATIC_DRAW );

        // 清空画布
        gl.clearColor( 0, 0, 0, 0 );
        gl.clear( gl.COLOR_BUFFER_BIT );

        // 配置所使用的着色程序
        gl.useProgram( program );

        // 设置代表分辨率的全局变量
        gl.uniform2f( resolutionUniformLocation, gl.canvas.width, gl.canvas.height );

        // 开启对应属性
        gl.enableVertexAttribArray( positionAttributeLocation );

        // gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

        /**
         * 配置属性如何从positionBuffer中读取数据( ARRAY_BUFFER )
         */
        var size = 2;               // 每次迭代运行提取两个单位数据
        var type = gl.FLOAT;        // 每个单位的数据类型是32位浮点数
        var normalize = false;      // 不需要归一化数据
        var stride = 0;             // 步幅：0 = 移动单位数量 * 每个单位占用内存( sizeof( type ) )
                                    // ，每次迭代运行移动多少内存到下一个数据开始点
        var offset = 0;             // 读取缓冲数据的起始位置

        gl.vertexAttribPointer( 
            positionAttributeLocation
            , size
            , type
            , normalize
            , stride
            , offset
        );

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        gl.drawArrays( primitiveType, offset, count );


    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>






### 基础绘制 - 动态颜色的三角形

#### 顶点着色器定义( GLSL代码 )

    @[id="basic_dynamic_color_vertex_shader" contenteditable="true"]attribute vec2 a_position;
    uniform mat3 u_matrix;
    varying vec4 v_color;

    void main() {
        // multiply the position by the matrix
        gl_Position = vec4( ( u_matrix * vec3( a_position, 1 ) ).xy, 0, 1 );

        /**
         * convert from clipspace to colorspace
         * 1. clipspace: [ -1.0, 1.0 ]
         * 2. colorspace: [ 0.0, 1.0 ]
         */
        v_color = gl_Position * 0.5 + 0.5;
    }


#### 片段着色器定义( GLSL代码 )

    @[id="basic_dynamic_color_fragment_shader" contenteditable="true"]precision mediump float;
    varying vec4 v_color;

    void main() {
        gl_FragColor = v_color;
    }


#### WebGL API调用( JS代码 )

<div id="test_basic_dynamic_color" class="test">
<div class="canvas-cont"><canvas></canvas></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_basic_dynamic_color');
        var $cont = $( '#test_basic_dynamic_color .canvas-cont' );
        var canvas = $cont.find( 'canvas' )[ 0 ]; 
        var gl = canvas.getContext( 'webgl' );

        s.show( 'testing webgl ...' );

        if ( ! gl ) {
            s.append_show( 'WebGLRenderingContext not support' );
        }

        var dpr = window.devicePixelRatio || 1;
        canvas.width = $cont.width() * dpr;
        canvas.height = $cont.height() * dpr;
        canvas.style.width = $cont.width() + 'px';
        canvas.style.height = $cont.height() + 'px';
        gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );

        s.show( 'testing webgl viewport ...' );
        s.append_show( gl.drawingBufferWidth, gl.drawingBufferHeight );

        var vertexShaderSource = document.querySelector( '#basic_dynamic_color_vertex_shader code' ).innerText;
        var fragmentShaderSource = document.getElementById( 'basic_dynamic_color_fragment_shader' ).innerText;

        // console.log( vertexShaderSource );
        // console.log( fragmentShaderSource );

        var vertexShader = createShader( gl, gl.VERTEX_SHADER, vertexShaderSource );
        var fragmentShader = createShader( gl, gl.FRAGMENT_SHADER, fragmentShaderSource );

        var program = createProgram( gl, vertexShader, fragmentShader );

        var positionAttributeLocation = gl.getAttribLocation( program, 'a_position' );
        var matrixLocation = gl.getUniformLocation( program, 'u_matrix' );

        var positionBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

        // 3个二维点坐标
        var positions = [
            0, 0
            , 0, 100
            , 100, 0
        ];
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( positions ), gl.STATIC_DRAW );

        // 清空画布
        gl.clearColor( 0, 0, 0, 0 );
        gl.clear( gl.COLOR_BUFFER_BIT );

        // 配置所使用的着色程序
        gl.useProgram( program );

        // 开启对应属性
        gl.enableVertexAttribArray( positionAttributeLocation );

        // gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

        /**
         * 配置属性如何从positionBuffer中读取数据( ARRAY_BUFFER )
         */
        var size = 2;               // 每次迭代运行提取两个单位数据
        var type = gl.FLOAT;        // 每个单位的数据类型是32位浮点数
        var normalize = false;      // 不需要归一化数据
        var stride = 0;             // 步幅：0 = 移动单位数量 * 每个单位占用内存( sizeof( type ) )
                                    // ，每次迭代运行移动多少内存到下一个数据开始点
        var offset = 0;             // 读取缓冲数据的起始位置

        gl.vertexAttribPointer( 
            positionAttributeLocation
            , size
            , type
            , normalize
            , stride
            , offset
        );

        var translation = [ 100, 100 ];
        var angleInRadians = 2 * Math.PI / 1 ;
        var scale = [ 1, 1 ];

        /**
         * 矩阵变换顺序
         * 1. 顺序非常重要，决定不同的变换结果
         * 2. 下方的变换顺序与代码调用刚好相反
         * 3. 实际的变换顺序：scale - rotate - translate - projection
         * 4. 如果：rotate - scale，物体会变形
         */
        var matrix = m3.projection( gl.canvas.clientWidth, gl.canvas.clientHeight );

        matrix = m3.translate( matrix, translation[ 0 ], translation[ 1 ] );
        matrix = m3.scale( matrix, scale[ 0 ], scale[ 1 ] );
        matrix = m3.rotate( matrix, angleInRadians );

        s.append_show( matrix );

        gl.uniformMatrix3fv( matrixLocation, false, matrix );

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        gl.drawArrays( primitiveType, offset, count );


    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## 图像例子

### Resources

* webgl-texture: <https://codepen.io/pen/?&editors=101>


### Tips

* 图像展示使用纹理Texture
* `严格的同域限制` - 读取图像并渲染，需要图像与页面`同域`，且必须使用Web服务器。此限制比`canvas-2d`更加严格


### 显示图像 

#### 顶点着色器定义( GLSL代码 )

    @[id="image_show_vertex_shader" contenteditable="true"]attribute vec2 a_position;
    attribute vec2 a_texCoord;
    uniform mat3 u_matrix;
    varying vec2 v_texCoord;

    void main() {
        // multiply the position by the matrix
        gl_Position = vec4( ( u_matrix * vec3( a_position, 1 ) ).xy, 0, 1 );

        v_texCoord = a_texCoord;
    }


#### 片段着色器定义( GLSL代码 )

    @[id="image_show_fragment_shader" contenteditable="true"]precision mediump float;
    // texture
    uniform samper2D u_image;

    // the texCoords passed in from the vertex shader
    varying vec4 v_texCoord;

    void main() {
        gl_FragColor = texture2d( u_image, v_texCoord );
    }


#### WebGL API调用( JS代码 )

<div id="test_image_show" class="test">
<div class="canvas-cont"><canvas></canvas></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_image_show');
        var $cont = $( '#test_image_show .canvas-cont' );
        var canvas = $cont.find( 'canvas' )[ 0 ]; 
        var gl = canvas.getContext( 'webgl' );

        s.show( 'testing webgl ...' );

        if ( ! gl ) {
            s.append_show( 'WebGLRenderingContext not support' );
        }

        var dpr = window.devicePixelRatio || 1;
        canvas.width = $cont.width() * dpr;
        canvas.height = $cont.height() * dpr;
        canvas.style.width = $cont.width() + 'px';
        canvas.style.height = $cont.height() + 'px';
        gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );

        s.show( 'testing webgl viewport ...' );
        s.append_show( gl.drawingBufferWidth, gl.drawingBufferHeight );

        var vertexShaderSource = document.querySelector( '#image_show_vertex_shader code' ).innerText;
        var fragmentShaderSource = document.getElementById( 'image_show_fragment_shader' ).innerText;

        // console.log( vertexShaderSource );
        // console.log( fragmentShaderSource );

        var vertexShader = createShader( gl, gl.VERTEX_SHADER, vertexShaderSource );
        var fragmentShader = createShader( gl, gl.FRAGMENT_SHADER, fragmentShaderSource );

        var program = createProgram( gl, vertexShader, fragmentShader );

        var positionAttributeLocation = gl.getAttribLocation( program, 'a_position' );
        var matrixLocation = gl.getUniformLocation( program, 'u_matrix' );

        var positionBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

        // 3个二维点坐标
        var positions = [
            0, 0
            , 0, 100
            , 100, 0
        ];
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( positions ), gl.STATIC_DRAW );

        // 清空画布
        gl.clearColor( 0, 0, 0, 0 );
        gl.clear( gl.COLOR_BUFFER_BIT );

        // 配置所使用的着色程序
        gl.useProgram( program );

        // 开启对应属性
        gl.enableVertexAttribArray( positionAttributeLocation );

        // gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

        /**
         * 配置属性如何从positionBuffer中读取数据( ARRAY_BUFFER )
         */
        var size = 2;               // 每次迭代运行提取两个单位数据
        var type = gl.FLOAT;        // 每个单位的数据类型是32位浮点数
        var normalize = false;      // 不需要归一化数据
        var stride = 0;             // 步幅：0 = 移动单位数量 * 每个单位占用内存( sizeof( type ) )
                                    // ，每次迭代运行移动多少内存到下一个数据开始点
        var offset = 0;             // 读取缓冲数据的起始位置

        gl.vertexAttribPointer( 
            positionAttributeLocation
            , size
            , type
            , normalize
            , stride
            , offset
        );

        var translation = [ 100, 100 ];
        var angleInRadians = 2 * Math.PI / 1 ;
        var scale = [ 1, 1 ];

        /**
         * 矩阵变换顺序
         * 1. 顺序非常重要，决定不同的变换结果
         * 2. 下方的变换顺序与代码调用刚好相反
         * 3. 实际的变换顺序：scale - rotate - translate - projection
         * 4. 如果：rotate - scale，物体会变形
         */
        var matrix = m3.projection( gl.canvas.clientWidth, gl.canvas.clientHeight );

        matrix = m3.translate( matrix, translation[ 0 ], translation[ 1 ] );
        matrix = m3.scale( matrix, scale[ 0 ], scale[ 1 ] );
        matrix = m3.rotate( matrix, angleInRadians );

        s.append_show( matrix );

        gl.uniformMatrix3fv( matrixLocation, false, matrix );

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        gl.drawArrays( primitiveType, offset, count );


    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





### WebGL Viewport

* canvas的3d context
* contextId为`webgl`

