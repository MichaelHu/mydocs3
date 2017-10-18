# three.js

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>

<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/three.js/build/three.min.js"></script>

## Resources

* site: <https://threejs.org>
* github: <https://github.com/mrdoob/three.js/>
* docs: <http://threejs.org/docs/index.html>
* local examples: <a href="file:///Users/hudamin/projects/git/three.js/examples/index.html" target="_blank">Examples</a>
* 现学现卖Three.js: <https://aotu.io/notes/2017/08/28/getting-started-with-threejs/>
* `「Learning Three.js」`samples: <https://github.com/josdirksen/learning-threejs>


## Keywords

    Object      Desc
    ----------------------------------
    scene       场景
    plane       平面
    cube        立方体
    sphere      球体
    camera      相机
    axes        x、y和z轴
    mesh        网，好比一个包装工，它将“可视化的材质”粘合在一个数学世界里的几何体上，
                形成一个可添加到场景的对象


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


## PerspectiveCamera

    PerspectiveCamera( fov, aspect, near, far )

* `fov` — Camera frustum(锥) vertical field of view, from bottom to top of view, `in degrees`.
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





