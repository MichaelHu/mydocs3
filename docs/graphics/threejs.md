# three.js

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>

<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/three.js/build/three.min.js"></script>

## Resources

* site: <https://threejs.org>
* github: <https://github.com/mrdoob/three.js/> <iframe src="http://258i.com/gbtn.html?user=mrdoob&repo=three.js&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* docs: <http://threejs.org/docs/index.html>
* the Author `Mr.boob`'s site: <http://mrdoob.com>
* editor: <https://threejs.org/editor/>
* local examples: <a href="file:///Users/hudamin/projects/git/three.js/examples/index.html" target="_blank">Examples</a>
* 现学现卖Three.js: <https://aotu.io/notes/2017/08/28/getting-started-with-threejs/>
* `「Learning Three.js」`samples: <https://github.com/josdirksen/learning-threejs>
* Web Ninja Interview: Mr.Doob <http://ajaxian.com/archives/web-ninja-interview-mr-doob>


## Examples

* <https://alexanderperrin.com.au/paper/shorttrip/>
* <http://hands.wtf>: yes, god, cat, etc.
* <http://mrdoob.com/#/129/voxels>
* <http://mrdoob.com/projects/voxels/#A/aenahcacYbomibhehbiihaacaehajlafjaceXidhVhhffeahajjVhhfbemZWhhSeesfXafjahmabWaanaed>


## Keywords

    Object      Desc
    ------------------------------------------------------------------------------------
    scene       场景
                Scenes allow you to set up what and where is to be rendered by three.js.
                This is where your place objects, lights and cameras.
    fog
    plane       平面
    cube        立方体
    sphere      球体
    camera      相机
    axes        x、y和z轴
    mesh        网，好比一个包装工，它将“可视化的材质”粘合在一个数学世界里的几何体上，
                形成一个可添加到场景的对象
    geometry    Base class for all geometries ( but not for BufferGeometries ). 
                This can also be used directly for building custom geometries.
	shader


todo:

* 强大的example库学习
* 视角：perspective
* light怎么用
* 网络图的3d表示
* 纹理
* 调色板
* 镜子
* 多光源
* 多renderer
* 多view
* 加载器loader
* 机器人动作
* 分子结构图
* 虚拟现实，过山车
* 游戏，赛车视角


## 180406

shader: 着色器，着色程序

	Diffuse Shader Material has only two properties-a color and a texture.
	漫反射着色器材质只有两个属性-颜色和纹理。




## 180402

### 光

    DirectionalLight            方向光源，发射平行光
    PointLight                  点光源

### 几何体

    CircleGeometry              圆盘
    BoxGeometry                 立方体（三维方块）
    ConeGeometry                圆锥体
    CylinderGeometry            圆柱体
    DodecahedronGeometry        十二面体
    RingGeometry                圆环
    ShapeGeometry               自定义形状
    SphereGeometry              球体 
    TorusGeometry               圆环面 
    TorusKnotGeometry           圆环结
    TubeGeometry                管状体
    TetrahedronGeometry         四面体
    PolyhedronGeometry          自定义多面体

### 辅助类几何体

    EdgesGeometry               边几何体，用于展示其他几何体
    WireframeGeometry           线框体，用于展示其他几何体




## 180328

### 显示中文字体

* 先使用`facetype.js`从`ttf`字体文件生成对应`json`文件，可在Chrome浏览器下自动触发文件下载，Safari浏览器不触发下载，json文件太大不容易拷贝保存
* 再使用`THREE.TextGeometry()`生成Geometry
* 参考`facetype.js` - typeface.js generator <https://github.com/gero3/facetype.js> <iframe src="http://258i.com/gbtn.html?user=gero3&repo=facetype.js&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>




rotation

    right-hand rotation

    * 右手法则旋转



Math/Plane

    A two dimensional surface that extends infinitely in 3d space, represented in Hessian normal form ( <http://mathworld.wolfram.com/HessianNormalForm.html> ) by a unit length normal vector and a constant.

    * 是一个数学概念
    * 在3d空间中无限延展的二维平面

BufferGeometry

    This class is an efficient alternative to Geometry, because it stores all data, including vertex positions, face indices, normals, colors, UVs, and custom attributes within buffers; this reduces the cost of passing all this data to the GPU.
    This also makes BufferGeometry harder to work with than Geometry; rather than accessing position data as Vector3 objects, color data as Color objects, and so on, you have to access the raw data from the appropriate attribute buffer. This makes BufferGeometry best-suited for static objects where you don't need to manipulate the geometry much after instantiating it.

    * 是Geometry的高效( 高性能 )版本，它将所有数据存储在buffer中
    * buffer存储减少了传输所有数据给GPU的耗时
    * 性能提升的同时也增加了接口使用的复杂度
    * 非常适用于静态对象，在实例化之后不再需要频繁对其属性进行操作




## 180327

PointLight

    A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.

    PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )

    * 点光源，发自一点，向任何方向发射
    * 常用于模拟来自裸灯泡的光


## 180326

Phong光照模型：

    Phong光照模型是真是图形学中提出的第一个有影响的光照模型，该模型只考虑物体对直接光照的反射作用，认为环境光是常量，没有考虑物体之间相互的反射光。

DirectionalLight

    A light that gets emitted in a specific direction. This light will behave as though it is infinitely far away and the rays produced from it are all parallel. THe common use case for this is to simulate daylight; the sun is far enough away that its position can be considered to be infinite, and all light rays coming from it are parallel.

    * 方向光
    * 来自无穷远处的光，其光束为平行光束
    * 常用于模拟太阳光，太阳的距离可认为无穷远，其照射过来的光为平行光

opacity and transparent

    new THREE.MeshBasicMaterial( { color: 0x998800, opacity: 0.5, transparent: false } )



## 180323

Line <https://threejs.org/docs/#api/objects/Line>
    A continuous line.
    This is nearly the same as LineSegments; the only difference is that is is rendered using 
    gl.LINE_STRIP instead of gl.LINES

LineBasicMaterial
    LineColorMaterial已被LineBasicMaterial取代

Vector3
    Vertex




## PerspectiveCamera

    PerspectiveCamera( fov, aspect, near, far )

* `fov` — Camera frustum(锥) vertical `field of view`, from bottom to top of view, `in degrees`.
* `aspect` — Camera frustum `aspect ratio`(宽高比), window width divided by window height. 
* `near` — Camera frustum near plane(平面).
* `far` — Camera frustum far plane.

<http://threejs.org/docs/scenes/geometry-browser.html>

<div id="test_10" class="test">
<div class="test-container">
<div id="test_10_graph" style="width:100%; height: 400px; margin-bottom: 20px;"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_10');
        var camera, scene, renderer;
        var geometry, material, mesh, meshes = [], light;
        var lights = [];
        var $container = $('#test_10_graph')
            , w = $container.width()
            , h = $container.height()
            , oldCanvas = $container.find('canvas')[0]
            ;
        
        if(oldCanvas){
            oldCanvas.isDestroyed = 1;
            $(oldCanvas).remove();
        }

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera(
                60
                , w / h 
                , 1
                , 10000
            );
            camera.position.z = 1000;

            scene = new THREE.Scene();

            geometry = new THREE.BoxGeometry(200, 200, 200);
            material = new THREE.MeshBasicMaterial({
                color: 0x00ff00
                , wireframe: true
            });
            mesh = new THREE.Mesh(geometry, material);
            meshes.push(mesh);
            scene.add(mesh);

            geometry = new THREE.CircleGeometry( 200, 10 );
            material = new THREE.MeshBasicMaterial({
                color: 0x0000ff
            });
            mesh = new THREE.Mesh(geometry, material);
            meshes.push(mesh);
            scene.add(mesh);

            // light = new THREE.AmbientLight(0x000000);
            // scene.add(light);

            // lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
            // lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
            // lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

            // lights[ 0 ].position.set( 0, 200, 0 );
            // lights[ 1 ].position.set( 100, 200, 100 );
            // lights[ 2 ].position.set( - 100, - 200, - 100 );

            // scene.add( lights[ 0 ] );
            // scene.add( lights[ 1 ] );
            // scene.add( lights[ 2 ] );

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(w, h);

            $container.append(renderer.domElement);
        }

        function animate() {
            if(renderer.domElement.isDestroyed){
                return;
            }

            requestAnimationFrame(animate);

            meshes.forEach(function(mesh){
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.02;
            });

            renderer.render(scene, camera);
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



examples: 

1. <http://phoboslab.org/wipeout/>
    <img src="./img/wipeout.png" width="500">
2. <https://www.urbangalaxyonline.com>
    <img src="./img/urbangalaxyonline.png" width="500">
3. <http://data-arts.appspot.com/globe/>
    <img src="./img/webgl-globe.png" width="500">
    
    数据展示艺术，球体上的柱子，由其高度来展示热度。
4. <http://www.georgeandjonathan.com/>
    <img src="./img/music-note-3d.png" width="500">

    webgl三维展示歌曲的每个音符在3D空间的律动。有四个主要视角的选择，也可自行拖动到任意视角。





