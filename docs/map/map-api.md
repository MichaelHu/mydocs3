# map-api


20161216



## map-api

### 需求和思路

* 提供压缩的代码，绝不提供源码。需要物理上隔离，可参考`sophon-web-build`项目的方式
* 需要有单元测试
* 提供使用文档和Demo
* 提供`数据接口`的样板格式
* 提供满足需求的最小接口集合，额外的不提供
* 按jssdk的思路来做，但前期不是做成jssdk，而是一个提供基本功能和工具箱的地图底层库



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.test-map-container {
    height: 300px;
}
</style>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## 百度地图API

* <http://lbsyun.baidu.com/index.php?title=jspopular>
* <http://lbsyun.baidu.com/jsdemo.htm#a1_2>




### 印象

* `BMap.`命名空间，而不是`baidu.maps.`
* 需要AppKey


### 示例

<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=dn6g3tQto1cko7rg8PfxegII"></script>

#### 引入百度地图API

	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=dn6g3tQto1cko7rg8PfxegII"></script>


#### 基础地图

<div id="test_baidu_basic" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var contID = '#test_baidu_basic';
        var s = fly.createShow( contID );
        var $mapContainer = $( contID + ' .test-map-container' );

        var map = new BMap.Map( $mapContainer[ 0 ] );   // 创建Map实例
        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom( new BMap.Point(116.404, 39.915), 11 );  
        map.addControl( new BMap.MapTypeControl() );    //添加地图类型控件
        map.setCurrentCity( "北京" );                   // 设置地图显示的城市 此项是必须设置的
        // map.enableScrollWheelZoom( true );           // 开启鼠标滚轮缩放

    })();

</div>
<div class="test-map-container"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




#### 标注

<div id="test_baidu_marker" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var contID = '#test_baidu_marker';
        var s = fly.createShow( contID );
        var $mapContainer = $( contID + ' .test-map-container' );

        var map = new BMap.Map( $mapContainer[ 0 ] );    // 创建Map实例
		var point = new BMap.Point( 116.404, 39.915 );
		map.centerAndZoom( point, 15 );
		
		// 创建小狐狸
		var pt = new BMap.Point( 116.417, 39.909 );
		var myIcon = new BMap.Icon(
				"./img/fox.gif"
				, new BMap.Size( 300, 157 )
			);
		var marker2 = new BMap.Marker( pt, { icon: myIcon } );  // 创建标注
		map.addOverlay( marker2 );  

    })();

</div>
<div class="test-map-container"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




#### 信息窗口


<div id="test_baidu_infowin" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var contID = '#test_baidu_infowin';
        var s = fly.createShow( contID );
        var $mapContainer = $( contID + ' .test-map-container' );

		var sContent =
            "<div>"
			+ "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>"
			+ "<img style='float:right;margin:4px' class='img-demo' src='./img/tian-an-men.jpg' width='160' height='100' title='天安门'/>"
			+ "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门，坐落在中华人民共和国首都北京市的中心、故宫的南端，与天安门广场以及人民英雄纪念碑、毛主席纪念堂、人民大会堂、中国国家博物馆隔长安街相望，占地面积4800平方米，以杰出的建筑艺术和特殊的政治地位为世人所瞩目。</p>"
			+ "</div>"
			;

		var map = new BMap.Map( $mapContainer[ 0 ] );
		var point = new BMap.Point( 116.404, 39.915 );
		var marker = new BMap.Marker( point );
		var infoWindow = new BMap.InfoWindow( sContent );  // 创建信息窗口对象
		map.centerAndZoom( point, 15 );
		map.addOverlay( marker );
		marker.addEventListener( "click", function(){          
            this.openInfoWindow(infoWindow);
            // 图片加载完毕重绘infowindow
            $mapContainer.find( '.img-demo' )[ 0 ].onload = function (){
                // 防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
			   infoWindow.redraw();   
		    }
		} );

    })();

</div>
<div class="test-map-container"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





## 腾讯地图API

* 首页：<http://lbs.qq.com/javascript_v2/index.html>
* 参考手册：<http://lbs.qq.com/javascript_v2/doc/index.html>
* 示例：<http://lbs.qq.com/javascript_v2/demo.html>

JavaScript API V2可用于在网站中加入交互性强的街景、地图，能很好地支持PC及手机设备，身材小巧，动画效果顺滑流畅，动感十足，提供地图操作、标注、地点搜索、出行规划、地址解析、街景等接口，功能丰富，并免费开放各种附加工具库。JavaScript API V2是免费服务，任何提供免费访问的网站都可以调用


### 印象

* `qq.maps.*`命名空间
* 不需要AppKey
* addListener, addDomListner


### Features

* MVC架构
* 内存占用量小
* 接口开放程度高
* 兼容各种浏览器
* 丰富的动画效果
* 街景开放API



### 示例

<script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>

#### 引入腾讯地图API

    <script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>


#### 基础地图

<div id="test_qq_basic" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var contID = '#test_qq_basic';
        var s = fly.createShow( contID );
        var $mapContainer = $( contID + ' .test-map-container' );

        var map = new qq.maps.Map( 
                $mapContainer[ 0 ]
                , {
                    center: new qq.maps.LatLng( 39.916527, 116.397128 )     // 地图的中心地理坐标
                    , zoom: 11                                              // 地图缩放级别 
                    , scrollwheel: false                                    // 鼠标滚轮缩放
                }
            );

    })();

</div>
<div class="test-map-container"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



#### 标注

常用marker APIs：

    marker.getMap()
    marker.setMap()
    marker.getVisible()
    marker.setVisible()
    marker.getDraggable()
    marker.setDraggable()
    marker.getClickable()
    marker.setClickable()


以下为示例：

<div id="test_qq_marker" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var contID = '#test_qq_marker';
        var s = fly.createShow( contID );
        var $mapContainer = $( contID + ' .test-map-container' );

		var center = new qq.maps.LatLng( 39.916527,116.397128 );
        var map = new qq.maps.Map( 
                $mapContainer[ 0 ]
                , {
                    center: new qq.maps.LatLng( 39.916527, 116.397128 )     // 地图的中心地理坐标
                    , zoom: 13                                              // 地图缩放级别 
                    , scrollwheel: false                                    // 鼠标滚轮缩放
                }
            );
		var marker = new qq.maps.Marker( {
                position: center,
                map: map
            } );

		qq.maps.event.addListener( 
            marker
            , "click"
            , function() {
                s.append_show( 'you clicked me!' );
            }
        );

    })();

</div>
<div class="test-map-container"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




## 谷歌地图API

### 印象

* `google.maps.*`命名空间


### 示例

#### 基本地图

	<div id="map"></div>
    <script>
		function initMap() {
			// Create a map object and specify the DOM element for display.
			var map = new google.maps.Map(
					document.getElementById('map')
					, {
						center: {lat: -34.397, lng: 150.644},
						scrollwheel: false,
						zoom: 8
					}
				);
		}
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
	async defer></script>



#### 导航

	<div id="map"></div>
	<script>
		function initMap() {
		var chicago = {lat: 41.85, lng: -87.65};
		var indianapolis = {lat: 39.79, lng: -86.14};

		var map = new google.maps.Map(document.getElementById('map'), {
			center: chicago,
			scrollwheel: false,
			zoom: 7
		});

		var directionsDisplay = new google.maps.DirectionsRenderer({
			map: map
		});

		// Set destination, origin and travel mode.
		var request = {
			destination: indianapolis,
			origin: chicago,
			travelMode: 'DRIVING'
		};

		// Pass the directions request to the directions service.
		var directionsService = new google.maps.DirectionsService();
		directionsService.route(request, function(response, status) {
			if (status == 'OK') {
			// Display the route on the map.
			directionsDisplay.setDirections(response);
			}
		});
		}

	</script>
	<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
		async defer></script>



#### 标注

	<div id="map"></div>
	<script>
		function initMap() {
		var myLatLng = {lat: -25.363, lng: 131.044};

		// Create a map object and specify the DOM element for display.
		var map = new google.maps.Map(document.getElementById('map'), {
			center: myLatLng,
			scrollwheel: false,
			zoom: 4
		});

		// Create a marker and set its position.
		var marker = new google.maps.Marker({
			map: map,
			position: myLatLng,
			title: 'Hello World!'
		});
		}

	</script>
	<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
		async defer></script>


