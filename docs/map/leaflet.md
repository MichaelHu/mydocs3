# leaflet

changelog:
1806
, 161219
, 16-09
, 16-07


<style type="text/css">
@import "http://258i.com/static/build/leaflet-1.0.0rc1/leaflet.css";
</style>
<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>

<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/leaflet-1.0.0rc1/leaflet.js"></script>
<script src="http://258i.com/static/build/projzh/projzh.js"></script>
<script src="./js/leaflet-image.js"></script>



## Resources

* <img src="./img/leaflet-logo.png" height="36">创始人是Mapbox的`Vladimir Agafonkin`
* 官网: <http://leafletjs.com>
* github: <https://github.com/Leaflet/Leaflet>
* 1.3.0 - 1.3.1 docs: <https://leafletjs.com/reference-1.3.0.html>
* 1.2.0 docs: <https://leafletjs.com/reference-1.2.0.html>
* 1.0 docs: <http://leafletjs.com/reference-1.0.0.html>


## Versions

* 2018-01-18, `1.3.1`, stable
* 2017-01-23, `1.0.3`, bugfix
* 2016-10-21, `1.0.2`, bugfix
* 2016-09-27, `1.0`


## Features

### 浏览器支持

* 移动端友好
    * Desktop: Chrome, Firefox, Safari 5+, Opera 12+, `IE7+`
    * Mobile: Safari iOS 7+, Android 2.2+/3.1+/4+, Chrome, Firefox, IE10 Win8
* `轻量`，gzip压缩以后`30+k`



### 支持的Layer

* `Tile` Layers, WMS
* Markers, Popups
* `Vector` layers: polylines, polygons, circles, rectangles
* Image overlays
* GeoJSON



### 支持的交互

* Drag panning with inertia (惯性拖动)
* Scroll wheel zoom
* Pinch-zoom on mobile
* Double click zoom
* Zoom to area ( shift-drag )
* Keyboard navigation
* Events: click, mouseover, etc.
* Marker dragging



### 支持的地图控件

* Zoom
* Scale
* Layer switcher
* Attribution



### 自定义

* popup和controls，都支持CSS3样式控制
* 基于`图片`和`HTML`的标注
* 自定义的地图投射(projection)
* 强大的`OOP`机制



## Tips

* 坐标系匹配以后，map的事件参数，比如click事件的latlng参数就能准确返回当前点击位置的`经纬度`。但是切记，如果地图的容器DOM元素设置了`transform: scale( sx, sy )`，此时得到的latlng参数是不准确的
* `CRS.scale( zoom )`返回当前zoom下平面坐标范围边长的`单位数`，比如`256 * Math.pow( 2, zoom )`




## 用例

### 简单底图和标注

    var map = L.map('map')
                .setView([51.505, -0.09], 13);

    L.tileLayer(
            'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            , {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }
        )
        .addTo(map)
        ;

    L.marker([51.5, -0.09])
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup()
        ;



## 使用百度地图


### projzh项目

* `projzh` <https://github.com/tschaub/projzh> <iframe src="http://258i.com/gbtn.html?user=tschaub&repo=projzh&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* 该项目衍生自`maptalks/proj4m`项目 <https://github.com/MapTalks/proj4m> <iframe src="http://258i.com/gbtn.html?user=MapTalks&repo=proj4m&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* 百度地图使用的`BD-09`经纬度坐标在`GCJ-02`经纬度坐标的基础上做了额外偏移，并且定义了自己的Mercator投影算法
* 若要转换`WGS-84`经纬度坐标到百度地图使用的CRS，首先需要将`WGS-84`转换成`BD-09`，再使用Baidu Mercator算法转换成百度的墨卡托坐标

        baiduMercator.forward( bd09.fromWGS84( point ) )

* 反过来，要将百度墨卡托坐标转换成WGS-84经纬度坐标，需要先用Baidu Mercator进行逆投影，再将bd09经纬度坐标转换成WGS-84经纬度坐标

        bd09.toWGS84( baiduMercator.inverse( point ) )
* `projzh`提供的API列表：

        // 地球墨卡托 -> 百度墨卡托
        proj.smerc2bmerc( input, opt_output, opt_dimension )
        // 百度墨卡托 -> 地球墨卡托
        proj.bmerc2smerc( input, opt_output, opt_dimension )
        // 百度墨卡托 -> wgs84
        proj.bmerc2ll( input, opt_output, opt_dimension )
        // wgs84 -> 百度墨卡托
        proj.ll2bmerc( input, opt_output, opt_dimension )
        // wgs84 -> 地球墨卡托
        proj.ll2smerc( input, opt_output, opt_dimension )
        // 地球墨卡托 -> wgs84
        proj.smerc2ll( input, opt_output, opt_dimension )

        // datum
        datum.bd09.toGCJ02()
        datum.bd09.fromGCJ02()
        datum.bd09.toWGS84()
        datum.bd09.fromWGS84()

        datum.gcj02.toWGS84()
        datum.gcj02.fromWGS84()

        // projection
        projection.baiduMercator.forward()
        projection.baiduMercator.inverse()
        projection.sphericalMercator.forward()
        projection.sphericalMercator.inverse()

* 坐标对应关系

        球面坐标        平面坐标
        ==============================================
        wgs84           spherical mercator
        bd09            baidu mercator

    总之，`wgs84`之于`spherical mercator`，正如`bd09`之于`baidu mercator`

* 除了projzh项目，也有直接自行调整的方案：leaflet加载百度地图(矫正篇) <https://blog.csdn.net/u012087400/article/details/53744756>



### 扩展开发

leaflet提供自定义地图投影算法的扩展，通过提供百度的墨卡托投影转换算法，leaflet可以对接上百度的`瓦片系统`。

    @[data-script="javascript"](function(){

        var projection = window.projection;
        var proj = window.proj;
        var datum = window.datum;

        // 百度墨卡托投影转换
        L.Projection.BaiduMercator = {
            project: function (latLng) {
                var a = projection.baiduMercator.forward([latLng.lng, latLng.lat]);
                var leafletPoint = new L.Point(a[0], a[1]);
                return leafletPoint;
            },

            unproject: function (bpoint) {
                var a = projection.baiduMercator.inverse([bpoint.x, bpoint.y]);
                var latLng = new L.LatLng(a[1], a[0]);
                return latLng;
            },

            bounds: (function () {
                // var MAX_X = 20037726.37;
                // var MIN_Y = -11708041.66;
                // var MAX_Y = 12474104.17;
                // var bounds = L.bounds(
                //     [-MAX_X, MIN_Y], //-180, -71.988531
                //     [MAX_X, MAX_Y]  //180, 74.000022
                // );
                var MAX = 33554432;
                var bounds = new L.Bounds(
                        [-MAX, -MAX],
                        [MAX, MAX]
                );
                return bounds;
            })()
        };

        // Coordinate Reference System - 坐标引用系统
        L.CRS.baidu = L.extend({}, L.CRS, {
            code: 'baidu',
            projection: L.Projection.BaiduMercator,
            transformation: (function () {
                var z = -18 - 8;
                var scale = Math.pow(2, z);
                return new L.Transformation(scale, 0.5, -scale, 0.5);
            }())
        });

        L.TileLayer.Baidu = L.TileLayer.extend({
            options: {
                minZoom: 3,
                maxZoom: 19
            },

            initialize: function (type, options) {
                type = type || 'Normal.Map';
                options = options || {};

                var desc = L.TileLayer.Baidu.desc
                    , parts = type.split('.')
                    , mapName = parts[0]
                    , mapType = parts[1]
                    , url = desc[mapName][mapType]
                    ;

                options.subdomains = desc.subdomains;
                options.attribution = L.TileLayer.Baidu.attribution;
                L.TileLayer.prototype.initialize.call(this, url, options);
            },

            getTileUrl: function (coords) {
                if(void 0 == coords.z){
                    coords.z = this._map.getZoom();
                }
                var offset = Math.pow(2, coords.z - 1)
                    , x = coords.x - offset
                    , y = offset - coords.y - 1
                    , baiduCoords = L.point(x, y)
                    ;
                baiduCoords.z = coords.z;
                return L.TileLayer.prototype.getTileUrl.call(this, baiduCoords);
            }
        });


        L.TileLayer.Baidu.desc = {
            Normal: {
                Map: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl'
            },
            Satellite: {
                Map: 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
                Road: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl'
            },
            subdomains: '0123456789'
        };

        // L.TileLayer.Baidu.desc = {
        //     Normal: {
        //         Map: 'http://192.168.1.102:6788/roadmap/?qt=tile&x={x}&y={y}&styles=pl&scaler=1&z={z}',
        //     },
        //     Satellite: {
        //         Map: 'http://192.168.1.102:6788/satellite/?qt=tile&x={x}&y={y}&styles=pl&scaler=1&z={z}',
        //         Road: 'http://192.168.1.102:6789/overlay/?qt=tile&x={x}&y={y}&styles=pl&scaler=1&z={z}'
        //     },
        //     subdomains: '0123456789'
        // };

        L.tileLayer.baidu = function (type, options) {
            return new L.TileLayer.Baidu(type, options);
        };

    })();



### 地图展示

技术点：

* 使用leaflet地图引擎，对接百度瓦片
* wgs84球面坐标，通过projzh库转换成bd09球面坐标
* 百度CRS需要`bd09`坐标在用于引擎接口前，先进行`逆序`转换

<div id="test_50" class="test">
<div class="test-container">
<div id="test_50_map" style="height:300px; margin-bottom: 20px;"></div>

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_50');

        // -----DEFINE- wgs84--
        var point = [ 116.3452903556, 40.0455321506 ];  // 西小口地铁站
        var point = [ 116.3497222222, 40.0455555555 ];  // 东升科技园B-6
        var point2 = [ 116.3044444444, 39.9975 ];       // 地铁四号线圆明园站附近 
        var point = [ 116.3044444444, 23.5 ];           // 北回归线上与圆明园同经度的地方
        var point = [ 120.17555, 30.17444 ];            // 杭州市滨江区江南大道附近
        var zoom = 13;

        // 中心点坐标，使用bd09坐标系
        var bd09Point = window.datum.bd09.fromWGS84( point );
        var bd09Point2 = window.datum.bd09.fromWGS84( point2 );

        // 地图使用前，需要逆序转换
        var center = bd09Point.reverse();
        var center2 = bd09Point2.reverse();

        var myMap = L.map(
                'test_50_map'
                , {
                    maxZoom: 18
                    , minZoom: 5
                    , fullscreenControl: true
                    , scrollWheelZoom: false
                    , crs: L.CRS.baidu
                }
            )
            .setView( center, zoom )
            ;

        L.tileLayer.baidu('Satellite.Map').addTo(myMap);
        L.tileLayer.baidu('Satellite.Road').addTo(myMap);
        // L.tileLayer.baidu('Normal.Map').addTo(myMap);
        setTimeout( function() {
            myMap.panTo( center2 );
        }, 5000 );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 添加多边形层

技术点：

* 在地图上增加`多边形层`
* 使用的多边形数据为bd09坐标，只需`逆序后`在引擎中`直接使用`

<div id="test_polygon" class="test">
<div class="test-container">
<div id="test_polygon_map" style="height:300px; margin-bottom: 20px;"></div>

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_polygon');

        // -----DEFINE- wgs84--
        var point = [ 116.3452903556, 40.0455321506 ];  // 西小口地铁站
        var bd09Point = window.datum.bd09.fromWGS84( point );

        var center = bd09Point.reverse();
        var zoom = 13;

        var myMap = L.map(
                'test_polygon_map'
                , {
                    maxZoom: 18
                    , minZoom: 5
                    , fullscreenControl: true
                    , scrollWheelZoom: false
                    , crs: L.CRS.baidu
                }
            )
            .setView( center, zoom )
            ;

        // L.tileLayer.baidu( 'Satellite.Map' ).addTo( myMap );
        // L.tileLayer.baidu( 'Satellite.Road' ).addTo( myMap );
        L.tileLayer.baidu( 'Normal.Map' ).addTo( myMap );

        // 北京奥森北园、南园
        var bdLatLngSeries = '116.3794313,40.0360071;116.3808686,40.0330239;116.3815873,40.0158959;116.4145731,40.0158959;116.4144293,40.026118;116.416729,40.039211;116.4073147,40.0393215;116.406093,40.0415311;116.4011344,40.0388244;116.3949541,40.0377196;116.3853961,40.0371671;116.3794313,40.0360071';

        var bdLatLngs = bdLatLngSeries.split( ';' );
        var len = bdLatLngs.length;

        for ( var i = 0; i < len - 1; i++ ) {
            bdLatLngs[ i ] = bdLatLngs[ i ].split( ',' );
            bdLatLngs[ i ][ 0 ] -= 0;
            bdLatLngs[ i ][ 1 ] -= 0;
            bdLatLngs[ i ].reverse();
        }
        bdLatLngs.splice( len - 1, 1 ); 

        var polygon = L.polygon( bdLatLngs, { color: 'red' } );
        polygon.addTo( myMap );

        myMap.on( 'click', function( e ) { 
            console.log( e.latlng );
        } );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### 坐标转换

* bd09坐标转换成wgs84坐标，先将`bd09`转成`gcj-02`，再将`gcj-02`转成`wgs84`
* 坐标对比如下：

        bd09                            wgs84
        ====================================================================
        116.2376428,40.2724429          116.22495953606015,40.26548248013595
        116.2317499,40.2659193          116.21903766616116,40.258997938543764


> 代码示例如下：

<div id="test_coords_transform" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_coords_transform');
        s.show( 'bd09 -> wgs84 转换：' );

        // 北京奥森北园、南园
        var bdLatLngSeries = '116.3794313,40.0360071;116.3808686,40.0330239;116.3815873,40.0158959;116.4145731,40.0158959;116.4144293,40.026118;116.416729,40.039211;116.4073147,40.0393215;116.406093,40.0415311;116.4011344,40.0388244;116.3949541,40.0377196;116.3853961,40.0371671;116.3794313,40.0360071';

        // 十三陵景区 
        var bdLatLngSeries = '116.2376428,40.2724429;116.235954,40.2716722;116.2317499,40.2659193;116.2271506,40.2570551;116.2268631,40.2545773;116.2288394,40.256532;116.2373913,40.2713419;116.2376428,40.2724429';
        var bdLatLngs = bdLatLngSeries.split( ';' );
        var len = bdLatLngs.length;

        for ( var i = 0; i < len; i++ ) {
            bdLatLngs[ i ] = bdLatLngs[ i ].split( ',' );
            bdLatLngs[ i ][ 0 ] -= 0;
            bdLatLngs[ i ][ 1 ] -= 0;
        }

        var wgs84LatLngs = [];
        bdLatLngs.forEach( function( item ) {
            var latLng = window.datum.bd09.toWGS84( item );
            wgs84LatLngs.push( latLng.join( ',' ) );
        } );

        s.append_show( '\nbd09', bdLatLngSeries );
        console.log( wgs84LatLngs );
        s.append_show( '\nwgs84', wgs84LatLngs.join( ';' ) );

    })();

</div>
<div class="test-panel">
</div>
</div>




### 百度瓦片

#### 简写说明

`x202_y73_z10.png`: <http://172.22.1.104:6789/satellite/?qt=tile&x=202&y=73&styles=pl&scaler=1&z=10>


#### 瓦片坐标对应

百度tile xyz的`y轴`是`自下而上`，而leaflet xyz是`自上而下`。

    百度tile xyz    leaflet xyz
    ------------------------------------
    x202_y73_z10    x714_y438_z10 
    x203_y73_z10    x715_y438_z10 
    x204_y73_z10    x716_y438_z10 
    x205_y73_z10    x717_y438_z10 
    x202_y72_z10    x714_y439_z10 
    x203_y72_z10    x715_y439_z10 
    x204_y72_z10    x716_y439_z10 
    x205_y72_z10    x717_y439_z10 


#### 瓦片网格

以下展示渤海区域的卫星图瓦片网格。

<style type="text/css">
.tls {
    margin-bottom: 10px;
}
.tlrow {
    width: 1100px;
    margin-top: 2px;
}
.tlrow:after {
    content: '';
    clear: both;
    display: block;
    height: 0;
    visibility: hidden;
}
.bdtl {
    position: relative;
    float: left;
    margin-left: 2px;
}
.bdtl span {
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-size: 12px;
    font-weight: normal;
    color: #fff;
}
</style>

    @[data-script="html"]<div class="tls tls-tile-grid">
        <div class="tlrow">
            <div class="bdtl"><img src="./img/tiles/x202_y73_z10.png"></div>
            <div class="bdtl"><img src="./img/tiles/x203_y73_z10.png"></div>
            <div class="bdtl"><img src="./img/tiles/x204_y73_z10.png"></div>
            <div class="bdtl"><img src="./img/tiles/x205_y73_z10.png"></div>
        </div>
        <div class="tlrow">
            <div class="bdtl"><img src="./img/tiles/x202_y72_z10.png"></div>
            <div class="bdtl"><img src="./img/tiles/x203_y72_z10.png"></div>
            <div class="bdtl"><img src="./img/tiles/x204_y72_z10.png"></div>
            <div class="bdtl"><img src="./img/tiles/x205_y72_z10.png"></div>
        </div>
    </div>

下方代码用于渲染瓦片网格对应关系：

    @[data-script="javascript"]( function() {
        $('.tls-tile-grid img').each( function( index, item ) {
            var container = item.parentNode
                , src = item.src
                , tag = document.createElement( 'span' )
                ;
            src = src
                .replace( /^.+\/([^\/]+)$/, '$1' )
                .replace( /\.png$/, '' )
                ;
            tag.innerHTML = src;
            container.appendChild( tag );
        } );
    } )();




## CRS

### Tips

* leaflet定义了最常用的CRS ( `CRS.js`: <https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.js> )
        
        latLngToPoint( latlng, zoom )
        pointToLatLng( point, zoom )
        project( latlng )
        unproject( point )
        scale( zoom )
        zoom( scale )
        getPorjectedBounds( zoom )
        wrapLatLng( latlng )
        wrapLatLngBounds( bounds )

* CRS定义了`地理坐标`和`平面坐标`的相互转换逻辑，以及`平面坐标`和`像素坐标`的转换
* 地理坐标和平面坐标转换，主要由`project( latlng )`和`unproject( point )`来定义
* 平面坐标和像素坐标转换，主要由`scale( zoom )`和`zoom( scale )`来定义
* 如果需要使用未定义的CRS，可以查看<https://github.com/kartena/Proj4Leaflet>


### Transformation

geometry/Transformation.js

    export function Transformation(a, b, c, d) {
        if (Util.isArray(a)) {
            // use array properties
            this._a = a[0];
            this._b = a[1];
            this._c = a[2];
            this._d = a[3];
            return;
        }
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
    }

    Transformation.prototype = {
        // @method transform(point: Point, scale?: Number): Point
        // Returns a transformed point, optionally multiplied by the given scale.
        // Only accepts actual `L.Point` instances, not arrays.
        transform: function (point, scale) { // (Point, Number) -> Point
            return this._transform(point.clone(), scale);
        },

        // destructive transform (faster)
        _transform: function (point, scale) {
            scale = scale || 1;
            point.x = scale * (this._a * point.x + this._b);
            point.y = scale * (this._c * point.y + this._d);
            return point;
        },

        // @method untransform(point: Point, scale?: Number): Point
        // Returns the reverse transformation of the given point, optionally divided
        // by the given scale. Only accepts actual `L.Point` instances, not arrays.
        untransform: function (point, scale) {
            scale = scale || 1;
            return new Point(
                    (point.x / scale - this._b) / this._a,
                    (point.y / scale - this._d) / this._c);
        }
    };



## Layers

包含两种类型的层：`base layers`, `overlays`

* `base layers`: 基础层，比如瓦片层。多个基础层之间`互斥`存在。
* `overlays`: 覆盖层。



## Image Snapshot

### leaflet-image插件

* github: <https://github.com/mapbox/leaflet-image>
* my fork: <https://github.com/MichaelHu/leaflet-image>


### 像素坐标的两个API

* `map.getPixelBounds()`，当前可视区域bounds的像素平面坐标，随map的移动而变，
    提供`左上`、`右下`两个坐标。
    Returns the bounds of the current map view in projected pixel coordinates (sometimes useful in layer and overlay implementations).
* `map.getPixelOrigin()`，当前map显示中心点时的左上角像素平面坐标，不随map的移动而变。
    Returns the projected pixel coordinates of the top left point of the map layer (useful in custom layer and overlay implementations).



### 修复的问题

1. Baidu地图瓦片层所提供的`getTileUrl()`，在生成图片时出现`z`未定义，以下是修复后的实现： 

        getTileUrl: function (coords) {
            if(void 0 == coords.z){
                coords.z = this._map.getZoom();
            }
            var offset = Math.pow(2, coords.z - 1)
                , x = coords.x - offset
                , y = offset - coords.y - 1
                , baiduCoords = L.point(x, y)
                ;
            baiduCoords.z = coords.z;
            return L.TileLayer.prototype.getTileUrl.call(this, baiduCoords);
        }

2. 获取瓦片层时，未进行缩放操作时可正常获取截图；但是进行`缩放`后，截图存在`偏移`。原因为：

        ...
        // `layer._getTilePos()` internally uses `layer._level.origin`,
        // but `map.getPixelOrigin()` is not always equal to 
        // `layer._level.origin` when map is being zoomed.
        // by <https://github.com/MichaelHu>
        var tilePos = originalTilePoint
                .scaleBy(new L.Point(tileSize, tileSize))
                .subtract(bounds.min)
                ;
        ...



### 使用例子

<div id="test_to_image" class="test">
<div class="test-container">
<div id="test_to_image_map" style="height:300px; margin-bottom: 20px;"></div>
<div class="test-panel">
<a class="btn-to-image" style="color:#31a354;">&ndash;&gt;&nbsp;Click to create image output</a>
</div>
<div class="test-console"></div>
<img class="snapshot" style="display:none; height:300px; margin-bottom: 20px;">

    @[data-script="javascript editable"](function(){

        var wrapperId = 'test_to_image';
        var $wrapper = $('#' + wrapperId);
        var instance = $wrapper.data('map');
        var s = fly.createShow('#' + wrapperId);
        var $img = $wrapper.find('img.snapshot');

        // -----DEFINE- wgs84--
        var point = [40.0455321506, 116.3452903556].reverse(); // 西小口地铁站
        var point = [40.0455555555, 116.3497222222].reverse(); // 东升科技园B-6
        var point = [39.9975,116.3044444444].reverse(); // 地铁四号线圆明园站附近 
        var point = [23.5,116.3044444444].reverse(); // 北回归线上与圆明园同经度的地方
        var zoom = 13;
        var center = window.datum.bd09.fromWGS84(point).reverse();
        if(instance){
            instance.remove();
            $img.hide();
            $wrapper.data('map', null);
        }
        var myMap = L.map(
                'test_to_image_map'
                , {
                    maxZoom: 18
                    , minZoom: 5
                    , fullscreenControl: true
                    , crs: L.CRS.baidu
                }
            )
            .setView(center, zoom)
            ;

        $wrapper.data('map', myMap);

        L.tileLayer.baidu('Satellite.Map').addTo(myMap);
        L.tileLayer.baidu('Satellite.Road').addTo(myMap);
        // L.tileLayer.baidu('Normal.Map').addTo(myMap);
        L.marker(center, {
            icon: new L.Icon.Default()
        }).addTo(myMap);

        myMap.on('moveend zoomend', function(e){
            showMapInfo();
        });

        function showMapInfo(){
            var bounds = myMap.getPixelBounds()
                , origin = myMap.getPixelOrigin()
                , zoom = myMap.getZoom()
                ;
            s.show('zoom', zoom);
            s.append_show('pixel bounds', bounds);
            s.append_show('pixel origin', origin);
        }

        $wrapper.find('a.btn-to-image').on('click', function(){
            s.show('to image ...');
            $img.hide();
            leafletImage(myMap, function(err, canvas){
                var dimensions = myMap.getSize();
                s.append_show(err);
                s.append_show(
                    dimensions
                );
                $img.attr('src', canvas.toDataURL())
                    .show()
                    ;
            });
        });

        showMapInfo();

    })();

</div>
</div>






## 瓦片白线问题

    scale = 1.002

可能的`临时`解决方案：

    $.each(
        $('.leaflet-tile')
        , function(key, item){
            $(item).css('transform', $(item).css('transform') + ' scale(1.002)'); 
        }
    )


## L.Icon与L.icon 


## L.LatLng与L.latLng

先纬度后经度


## L.Util与L.DomUtil


## 使用WMS和TMS

wms比较专业的GIS

tms针对web做了优化
0.7: `tms: true` 与 1.0: `-y`



## GeoJSON Layer



### options

Point默认绘制成marker，不同于Polyline和Polygon。
使用`pointToLayer`

`style`字段，可以是样式对象，也可以是函数

feature添加之前：`onEachFeature()`

过滤器：`filter`

    L.geoJson(myLines, {
        style: myStyle
        , pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
        , onEachFeature: onEachFeature
        , filter: myFilter
    }).addTo(map);



## 特征检测

L.Browser

    L.Browser.ie
    L.Browser.opera


## 自适应居中

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }


## 控件L.control


### 自定义控件

`onAdd`方法

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function(map){
        var div = L.DomUtil.create('div', 'info legend')
            , grades = [0, 10, 20, 50, 100, 200, 500, 1000]
            , labels = []
            ;

        for(var i=0; i<grades.length; i++){
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> '
                + grades[i] + (
                    grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'
                )
                ;
        }
        return div;
    };

    legend.addTo(map);

    

### 层切换控件

    var baseMaps = {
            Grayscale: grayscale
            , Streets: streets
        }
        , overlayMaps = {
            Cities: cities
        }
        ;

    L.control.layers(baseMaps, overlayMaps).addTo(map);



## Map Panes

将layers形成一个组，统一设置`z-index`属性，以下layer由低到高：

* TileLayers and GridLayers
* Paths, like lines, polylines, circles, or GeoJSON layers.
* Marker shadows
* Marker icons
* Popups

`1.0`引入了`自定义pane`，以下代码展示自定义pane的使用：

    var map = L.map('map');
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;
    map.getPane('labels').style.pointerEvents = 'none';

    var positron = L.tileLayer(
            'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
            , {
                attribution: '©OpenStreetMap, ©CartoDB'
            }
        ).addTo(map);
    var geojson = L.geoJson(GeoJsonData, geoJsonOptions).addTo(map);

    geojson.eachLayer(function(layer){
        layer.bindPopup(layer.feature.properties.name);
    });

    map.fitBounds(geojson.getBounds());


### Tips

* 是`DOM元素`( HTMLElement )，用于控制map layer的层级顺序
* `map.getPane()`, `map.getPanes()`, `map.createPane()`
* 默认Panes:

        Pane                Z-index     Description
        ==========================================================================
        mapPane             'auto'      Pane that contains all other map panes
        titePane            200         for GridLayers and TileLayers
        overlayPane         400         for vector overlays ( Paths ), like Polylines
        shadowPane          500         for overlay shadows ( Marker shadows )
        markerPane          600         for Icons of Markers
        tooltipPane         650         for tooltip
        popupPane           700         for Popups




## GeoJSON

### Tips

* 区分`GeoJSONLayer`和内部`vector layer`

        let layer = L.geoJSON( ... );

        layer.setStyle( feature => {
            return { ... };
        } );

        // 1. 外面的layer能调用setStyle()，不能直接获取feature属性
        // 2. 内部的layer能获取feature属性，但不能调用setStyle() 
        layer.eachLayer( layer => {
            console.log( layer.feature );
        } );

* 内部`vector layer`可以通过调用`GeoJSONLayer.eachLayer( layer => { ... } )`获取
* 内部layer可以获取feature属性，GeoJSONLayer本身则不可以
* 以下function在GeoJSONLayer上使用，涉及的Layer参数是内部layer <https://leafletjs.com/reference-1.0.0.html#geojson-adddata>

        addData( data )
        resetStyle( layer )
        setStyle( style )
        ...








