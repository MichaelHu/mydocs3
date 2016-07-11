# leaflet

<http://leafletjs.com>

创始人是Mapbox的`Vladimir Agafonkin`

* 移动端友好
* 轻量，gzip压缩以后30+k


<style type="text/css">
@import "http://258i.com/static/build/leaflet-1.0.0rc1/leaflet.css";
</style>
<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>

<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/leaflet-1.0.0rc1/leaflet.js"></script>
<script src="file:///Users/hudamin/Desktop/baidu_demo/js/all.js"></script>



## Features


### 浏览器支持

Desktop: Chrome, Firefox, Safari 5+, Opera 12+, `IE7+`

Mobile: Safari iOS 7+, Android 2.2+/3.1+/4+, Chrome, Firefox, IE10 Win8



### 支持的Layer

* Tile Layers, WMS
* Markers, Popups
* Vector layers: polylines, polygons, circles, rectangles
* Image overlays
* GeoJSON



### 支持的交互

* Drag panning with inertia
* Scroll wheel zoom
* Pinch-zoom on mobile
* Double click zoom
* Zoom to area (shift-drag)
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



## 使用百度地图

    @[data-script="javascript"](function(){

        var projection = window.projection;
        var proj = window.proj;
        var datum = window.datum;

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

        // Coordinate Reference System
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
                var desc = L.TileLayer.Baidu.desc;
                type = type || 'Normal.Map';
                var parts = type.split('.');
                var mapName = parts[0],
                        mapType = parts[1];
                var url = desc[mapName][mapType];
                options = options || {};
                options.subdomains = desc.subdomains;
                options.attribution = L.TileLayer.Baidu.attribution;
                L.TileLayer.prototype.initialize.call(this, url, options);
            },

            getTileUrl: function (coords) {
                var offset = Math.pow(2, coords.z - 1),
                        x = coords.x - offset,
                        y = offset - coords.y - 1,
                        baiduCoords = L.point(x, y);
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



<div id="test_50" class="test">
<div class="test-container">
<div id="test_50_map" style="height:300px; margin-bottom: 20px;"></div>

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_50');

        // -----DEFINE- wgs84--
        var point = [40.0455321506, 116.3452903556].reverse();
        var zoom = 13;
        var center = window.datum.bd09.fromWGS84(point).reverse();
        var myMap = L.map(
                'test_50_map'
                , {
                    maxZoom: 18
                    , minZoom: 5
                    , fullscreenControl: true
                    , crs: L.CRS.baidu
                }
            )
            .setView(center, zoom)
            ;

        L.tileLayer.baidu('Satellite.Map').addTo(myMap);
        L.tileLayer.baidu('Satellite.Road').addTo(myMap);
        // L.tileLayer.baidu('Normal.Map').addTo(myMap);

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>

可能的`临时`解决方案：

    $.each(
        $('.leaflet-tile')
        , function(key, item){
            $(item).css('transform', $(item).css('transform') + ' scale(1.002)'); 
        }
    )
