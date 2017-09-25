# threejs-insights

> JavaScript 3D library.

* github: <https://github.com/mrdoob/three.js/> <iframe src="https://ghbtns.com/github-btn.html?user=mrdoob&repo=three.js&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>  

## Versions

快速迭代方式，与`vim`比较像，当前最新稳定Tag为`r87`，insights以该版本为参考<https://github.com/mrdoob/three.js/tree/r87>。

    r87 - insights
    r86
    r85
    ...
    r1


## Keywords

    quaternion      四元数
    morph           渐变
    flare           火光，照明灯


## top levels

### Three

对外接口；共`156`行export

    import './polyfills.js';
    export 
        WebGLRenderTargetCube
        WebGLRenderTarget
        WebGLRenderer
        ShaderLib
        UniformsLib
        UniformsUtils
        ShaderChunk
        FogExp2
        Fog
        Scene
        LensFlare
        Sprite
        LOD
        SkinnedMesh
        Skeleton
        Bone
        Mesh
        LineSegments
        LineLoop
        Line
        Points
        Group
        VideoTexture
        DataTexture
        CompressedTexture
        CubeTexture
        CanvasTexture
        DepthTexture
        Texture
        * from './geometries/Geometries.js'
        * from './materials/Materials.js'
        CompressedTextureLoader
        DataTextureLoader
        CubeTextureLoader
        TextureLoader
        ObjectLoader
        MaterialLoader
        BufferGeometryLoader
        DefaultLoadingManager, LoadingManager
        JSONLoader
        ImageLoader
        FontLoader
        FileLoader
        Loader
        Cache
        AudioLoader
        SpotLightShadow
        SpotLight
        PointLight
        RectAreaLight
        HemisphereLight
        DirectionalLightShadow
        DirectionalLight
        AmbientLight
        LightShadow
        Light
        StereoCamera
        PerspectiveCamera
        OrthographicCamera
        CubeCamera
        ArrayCamera
        Camera
        AudioListener
        PositionalAudio
        AudioContext
        AudioAnalyser
        Audio
        VectorKeyframeTrack
        StringKeyframeTrack
        QuaternionKeyframeTrack
        NumberKeyframeTrack
        ColorKeyframeTrack
        BooleanKeyframeTrack
        PropertyMixer
        PropertyBinding
        KeyframeTrack
        AnamationUtils
        AnimationObjectGroup
        AnimationMixer
        AnimationClip
        Uniform
        InstancedBufferGeometry
        BufferGeometry
        GeometryIdCount, Geometry
        InterleavedBufferAttribute
        InstancedInterleavedAttribute
        InterleavedBuffer
        InstancedBufferAttribute
        * from './core/BufferAttribute.js'
        Face3
        Object3D
        Raycaster
        Layers
        EventDispatcher
        Clock
        QuaternionLinearInterpolant
        LinearInterpolant
        DiscreteInterpolant
        CubicInterpolant
        Interpolant
        Triangle
        _Math
        Spherical
        Cylindrical
        Plane
        Frustum
        Sphere
        Ray
        Matrix4
        Matrix3
        Box3
        Box2
        Line3
        Euler
        Vector4
        Vector3
        Vector2
        Quaternion
        Color
        ImmediateRenderObject
        VertexNormalsHelper
        SpotLightHelper
        SkeletonHelper
        PointerLightHelper
        RectAreaLightHelper
        HemisphereLightHelper
        GridHelper
        PolarGridHelper
        FaceNormalsHelper
        DirectionalLightHelper
        CameraHelper
        BoxHelper
        Box3Helper
        PlaneHelper
        ArrowHelper
        AxisHelper
        CatmullRomCurve3
        CubicBezierCurve3
        QuadraticBezierCurve
        LineCurve3
        ArcCurve
        EllipseCurve
        SplineCurve
        CubicBezierCurve
        QuadraticBezierCurve
        LineCurve
        Shape
        Path
        ShapePath
        Font
        CurvePath
        Curve
        ShapeUtils
        SceneUtils
        WebGLUtils
        * from './constants.js'
        * from './Three.Legacy.js'


### Three.Legacy

接口兼容性提示，针对`deprecated`, `removed`, `renamed`等的接口做提示。使用`console.warn( ... )`

    export
        BoxGeometry as CubeGeometry
        var LineStrip = 0
        var LinePieces = 1

        // deprecated, removed or renamed methods
        Face4( a, b, c, d, normal, color, materialIndex )
        MeshFaceMaterial( materials )
        ...


### constants

常量，`手动`编号。

    export var
        REVISION = '87'
        MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 }
        CullFaceNone = 0
        CullFaceBack = 1
        CullFaceFront = 2
        CullFaceFrontBack = 3
        FrontFaceDirectionCW = 0
        FrontFaceDirectionCCW = 1
        BasicShadowMap = 0
        PCFShadowMap = 1
        PCFSoftShadowMap = 2
        FrontSide = 0
        BackSide = 1
        DoubleSide = 2
        FlatShading = 1
        SmoothShading = 2
        NoColors = 0
        FaceColors = 1
        VertexColors = 2
        NoBlending = 0
        NormalBlending = 1
        AdditiveBlending = 2
        SubtractiveBlending = 3
        MultiplyBlending = 4
        CustomBlending = 5
        AddEquation = 100
        SubtractEquation = 101
        ReverseSubtractEquation = 102
        MinEquation = 103
        MaxEquation = 104
        ZeroFactor = 200
        OneFactor = 201
        SrcColorFactor = 202
        OneMinusSrcColorFactor = 203
        SrcAlphaFactor = 204
        OneMinusSrcAlphaFactor = 205
        DstColorFactor = 206
        OneMinusDstAlphaFactor = 207
        DstColorFactor = 208
        OneMinusDstColorFactor = 209
        SrcAlphaSaturateFactor = 210 
        NeverDepth = 0
        AlwaysDepth = 1
        LessDepth = 2
        LessEqualDepth = 3
        EqualDepth = 4
        GreaterEqualDepth = 5
        GreaterDepth = 6
        NotEqualDepth = 7
        MultiplyOperation = 0
        MixOperation = 1
        AddOperation = 2
        NoToneMapping = 0
        LinearToneMapping = 1
        ReinhardToneMapping = 2
        Uncharted2ToneMapping = 3
        CineonToneMapping = 4
        UVMapping = 300
        CubeReflectionMapping = 301
        CubeRefractionMapping = 302
        EquirectangularReflectionMapping = 303
        EquirectangularRefractionMapping = 304
        SphericalReflectionMapping = 305
        CubeUVReflectionMapping = 306
        CubeUVRefractionMapping = 307
        RepeatWrapping = 1000
        ClampToEdgeWrapping = 1001
        MirroredRepeatWrapping = 1002
        NearestFilter = 1003
        NearestMipMapNearestFilter = 1004
        NearestMipMapLinearFilter = 1005
        LinearFilter = 1006
        LinearMipMapNearestFilter = 1007
        LinearMipMapLinearFilter = 1008
        UnsignedByteType = 1009
        ByteType = 1010
        ShortType = 1011
        UnsignedShortType = 1012
        IntType = 1013
        UnsignedIntType = 1014
        FloatType = 1015
        HalfFloatType = 1016
        UnsignedShort4444Type = 1017
        UnsignedShort5551Type = 1018
        UnsignedShort565Type = 1019
        UnsignedInt248Type = 1020
        AlphaFormat = 1021
        RGBFormat = 1022
        RGBAFormat = 1023
        LuminanceFormat = 1024
        LuminanceAlphaFormat = 1025
        RGBEFormat = RGBAFormat
        DepthFormat = 1026
        DepthStencilFormat = 1027
        RGB_S3TC_DXT1_Format = 2001
        RGBA_S3TC_DXT1_Format = 2002
        RGBA_S3TC_DXT3_Format = 2003
        RGBA_S3TC_DXT5_Format = 2004
        RGB_PVRTC_4BPPV1_Format = 2100
        RGB_PVRTC_2BPPV1_Format = 2101
        RGBA_PVRTC_4BPPV1_Format = 2102
        RGBA_PVRTC_2BPPV1_Format = 2103
        RGB_ETC1_Format = 2151
        LoopOnce = 2200
        LoopRepeat = 2201
        LoopPingPong = 2202
        InterpolateDiscrete = 2300
        InterpolateLinear = 2301
        InterpolateSmooth = 2302
        ZeroCurvatureEnding = 2400
        ZeroSlopeEnding = 2401
        WrapAroundEnding = 2402
        TrianglesDrawMode = 0
        TriangleStripDrawMode = 1
        TriangleFanDrawMode = 2
        LinearEncoding = 3000
        sRGBEncoding = 3001
        GammaEncoding = 3007
        RGBEEncoding = 3002
        LogLuvEncoding = 3003
        RGBM7Encoding = 3004
        RGBM16Encoding = 3005
        RGBDEncoding = 3006
        BasicDepthPacking = 3200
        RGBADepthPacking = 3201



### polyfills


    Number.EPSILON = Math.pow( 2, -52 )
    Number.isInteger = function( value ) { ... }
    Math.sign = function( x ) { return ( x < 0 ) ? -1 : ( x > 0 ) ? 1 : +x;
    Function.prototype.name = ...
    Object.assign = ...


### utils

    arrayMin( array )
    arrayMax( array )


## core/

### Object3D

3D对象，空间变换，遍历等。

    Object3D()
        uuid
        name
        type = 'Object3D'
        parent
        children
        up

        matrix
        matrixWorld
        matrixAutoUpdate
        matrixWorldNeedsUpdate

        layers
        visible

        castShadow
        receiveShadow
        frustumCulled
        renderOrder

        userData

    property
        id
        position
        rotation
        quaternion
        scale
        modelViewMatrix
        normalMatrix

    static
        DefaultUp = new Vector3( 0, 1, 0 )
        DefaultMatrixAutoUpdate = true

    prototype
        mixin: EventDispatcher.prototype
        isObject3d = true
        onBeforeRender()
        onAfterRender()
        applyMatrix( matrix )
        applyQuaternion( q )
        setRotationFromAxisAngle( axis, angle )
        setRotationFromEuler( euler )
        setRotationFromMatrix( m )
        setRotationFromQuaternion( q )
        rotateOnAxis( axis, angle )
        rotateX( angle )
        rotateY( angle )
        rotateZ( angle )
        translateOnAxis( axis, distance )
        translateX( distance )
        translateY( distance ) 
        translateZ( distance )
        localToWorld( vector )
        worldToLocal( vector )
        lookAt( vector )
        add( object )
        remove( object )
        getObjectById( id )
        getObjectByName( name )
        getObjectByProperty( name, value )
        getWorldPosition( optionalTarget )
        getWorldQuaternion( optionalTarget )
        getWorldRotation( optionalTarget )
        getWorldScale( optionalTarget )
        getWorldDirection( optionalTarget )
        raycast()
        traverse( callback )
        traverseVisible( callback )
        traverseAncestors( callback )
        updateMatrix()
        updateMatrixWorld( force )
        toJSON( meta )
        clone( recursive )
        copy( source, recursive )






### Geometry

几何结构

    property
        id
        uuid
        name
        type = 'Geometry'
        vertices
        colors
        faces
        faceVertexUvs
        morphTargets
        morphNormals
        skinIndices
        lineDistances
        boundingBox
        boundingSphere

        elementsNeedUpdate
        verticesNeedUpdate
        uvsNeedUpdate
        normalsNeedUpdate
        colorsNeedUpdate
        lineDistancesNeedUpdate
        groupsNeedUpdate

    prototype
        isGeometry
        applyMatrix( matrix )
        rotateX( angle )
        rotateY( angle )
        rotateZ( angle )
        translate( x, y, z )
        scale( x, y, z )
        lookAt( vector )
        fromBufferGeometry( geometry )
        center()
        normalize()
        computeFaceNormals()
        computeVertexNormals( areaWeighted )
        computeFlatVertexNormals()
        computeMorphNormals()
        computeLineDistances()
        computeBoundingSphere()
        merge( geometry, matrix, materialIndexOffset )
        mergeMesh( mesh )
        mergeVertices()
        sortFacesByMaterialIndex()
        toJSON()
        clone()
        copy( source )
        dispose()


### Face3

    Face3( a, b, c, normal, color, materialIndex )
        a
        b
        c
        normal
        vertexNormals
        color
        vertexColors
        materialIndex

    prototype
        clone()
        copy( source )


### Layers

一个`mask`属性，针对mask属性进行位操作。

    Layers()
        mask

    prototype
        set( channel )
        enable( channel )
        toggle( channel )
        disable( channel )
        test( layers )


## scenes


## renderers

### WebGLRenderer

* js类`私有属性`实现方式，关键在于`实例方法`（`不同于`原型链方法）
* 主要绘制方法：`context.bindBuffer(...)`, `context.drawArrays( ... )`


以下为接口纲要：

    WebGLRenderer( parameters )

        // 一些私有变量，供实例方法使用
        _canvas
        _context
        _alpha
        _depth
        _stencil
        _antialias
        _premultipliedAlpha
        _preserveDrawingBuffer
        lightsArray
        shadowArray
        currentRenderList
        spritesArray
        flaresArray
        _this

        // 属性
        domElement = _canvas
        context = _g1

        autoClear = true
        autoClearColor = true
        autoClearDepth = true
        autoClearStencil = true

        sortObjects

        clippingPlanes
        localClippingEnabled

        gammaFactor = 2.0
        gammaInput = false
        gammaOutput = false

        physicallyCorrectLights

        toneMapping
        toneMappingExposure
        toneMappingWhitePoint

        maxMorphTargets = 8
        maxMorphNormals = 4

        info = { render: _infoRender, memory: _infoMemory, programs: null }

        vr
        shadowMap
        
        // 执行初始化
        initGLContext();


        // 定义一些实例方法，操作构造函数中的私有属性
        getContext()
        getContextAttributes()
        forceContextLoss()
        forceContextRestore()
        getPixelRatio()
        setPixelRatio()
        getSize()
        setSize( width, height, updateStyle )
        getDrawingBufferSize()
        setDrawingBufferSize( width, height, pixelRatio )
        setViewport( x, y, width, height )
        setScissor( x, y, width, height )
        setScissorTest( boolean )
        getClearColor()
        setClearColor()
        getClearAlpha()
        setClearAlpha()
        clear( color, depth, stencil )
        clearColor()
        clearDepth()
        clearStencil()
        clearTarget()
        dispose()

        // 一些私有事件处理函数
        onContextLost( event )
        onContextRestore( event )
        onMaterialDispose( event )

        // 其他私有函数
        deallocateMaterial( material )
        releaseMaterialProgramReference( material )
        renderObjectImmediate( object, program, material )
        setupVertexAttributes( material, program, geometry, startIndex )
        start()
        loop( time )
        projectObject( object, camera, sortObjects )
        renderObjects( renderList, scene, camera, overrideMaterial )
        renderObject( object, scene, camera, geometry, material, group )
        initMaterial( material, fog, object )
        setProgram( camera, fog, material, object )
        refreshUniformsCommon( uniforms, material )
        refreshUniformsLine( uniforms, material )
        refreshUniformsDash( uniforms, material )
        refreshUniformsPoints( uniforms, material )
        refreshUniformsFog( uniforms, material )
        refreshUniformsLambert( uniforms, material )
        refreshUniformsPhong( uniforms, material )
        refreshUniformsToon( uniforms, material )
        refreshUniformsStandard( uniforms, material )
        refreshUniformsPhysical( uniforms, material )
        refreshUniformsDepth( uniforms, material )
        refreshUniformsDistance( uniforms, material )
        refreshUniformsNormal( uniforms, material )
        makeUniformsLightsNeedsUpdate( uniforms, value )
        allocTextureUnit()



        // 其他实例方法
        renderBufferImmediate( object, program, material )
        renderBufferDirect( camera, fog, geometry, material, object, group )
        compile( scene, camera )
        animate( callback )
        render( scene, camera, renderTarget, forceClear )
        setFaceCulling( cullFace, frontFaceDirection )
        allocTextureUnit()
        setTexture2D( texture, slot )
        setTexture( texture, slot )
        setTextureCube( texture, slot )
        getRenderTarget()
        setRenderTarget( renderTarget )
        readRenderTargetPixels( renderTarget, x, y, width, height, buffer )





        
         





### WebGLRenderTarget

### WebGLRenderTargetCube

### WebGL2Renderer

### webgl/

#### WebGLAttributes
#### WebGLBackground
#### WebGLBufferRenderer

    WebGLBufferRenderer( gl, extensions, infoRender )
        // 私有属性
        mode

        // 实例方法
        setMode( value )
        render( start, count ) // 调用gl.drawArrays()
        renderInstances( geometry, start, count )


#### WebGLCapabilities
#### WebGLClipping
#### WebGLExtensions
#### WebGLFlareRenderer
#### WebGLGeometries
#### WebGLIndexedBufferRenderer
#### WebGLLights
#### WebGLMorphtargets
#### WebGLObjects

封装了geometries和infoRender，再对外提供`update( object )`以及`clear()`两个方法。

    WebGLObjects( geometries, infoRender )
        return {
            update: update
            , clear: clear
        }


#### WebGLProgram
#### WebGLPrograms
#### WebGLProperties
#### WebGLRenderLists
#### WebGLShader
#### WebGLShadowMap
#### WebGLSpriteRenderer
#### WebGLState
#### WebGLTextures
#### WebGLUniforms
#### WebGLUtils

封装了gl和extensions，再对外提供`convert( p )`方法。

    WebGLUtils( gl, extensions )
        return {
            convert: convert
        }




### webvr/

### shaders/




