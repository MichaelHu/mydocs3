# compress-perf

> `前端（js）`压缩算法性能比较

## 目标
* 获得各算法的运行速度比较
* 获得各算法的压缩比率比较
* 提供算法选型标准

## 维度拆解

* `比较算法`：lz-string, pako, lzma
* `文件大小`：10B, 20B, 50B, 100B, 200B, 500B, 1KB, 2KB, 5KB, 10KB, 20KB, 50KB, 100KB, 200KB, 500KB, 1MB, 2MB, 5MB
* `文件内容`：article, json, base64, json+base64
* `文件字符集`：ascii, unicode

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/pako/dist/pako.min.js"></script>
<script src="http://258i.com/static/build/lz-string/libs/lz-string.min.js"></script>
<script src="http://258i.com/static/build/lzma/lzma-min.js"></script>
<script src="http://258i.com/static/build/lzma/lzma_worker.js"></script>
<script src="./compress-perf/base64.js"></script>
<script src="./compress-perf/en-raw.js"></script>
<script src="./compress-perf/json-base64.js"></script>
<script src="./compress-perf/json.js"></script>
<script src="./compress-perf/mix-raw.js"></script>


## 数据准备

<div id="test_prepare" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_prepare');

        var td_config = window.td_config = {
                type: [ 'en', 'base64', 'json', 'json_base64', 'mixed' ]
                , size: [ 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000
                        , 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000
                    ]
            };
        var name, type, size, c = 1;

        s.show( 'preparing data ...' );

        for ( var i = 0, types = td_config.type; i < types.length; i++ ) {
            type = types[ i ];
            for ( var j = 0, sizes = td_config.size; j < sizes.length; j++ ) {
                size = sizes[ j ];
                name = type + '_' + size;
                window[ name ] = prepare( type, size );
                s.append_show( c++, name, window[ name ].length );        
            }
        }

        function prepare( type, size ) {
            var raw = window[ type + 'Raw' ];

            if ( raw.length < size ) {
                var count = Math.ceil( size / raw.length ), arr = [];
                while( count-- > 0 ) {
                    arr.push( raw );
                }
                raw = arr.join( '' );
            }

            return raw.substr( 0, size );
        }


    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


## 性能比较

### 结论

从压缩`速度`来看：

* `pako`速度快，且性能比较稳定，`5MB`的数据`平均600ms左右`的压缩时间 
* `lzstring`速度较`pako`慢，`2MB`的数据基本能保持在`1s左右`，`5MB`数据`平均2s`
* `lzma`性能很差，`100KB以上`的数据基本都在`1s以上`的压缩时间，`5MB`数据`高达80s`，无法在前端使用

从`压缩率`来看：

* `lzma`最优，`pako`次之，`lzstring`最差
* `200B以内`的数据，`不建议压缩`，反而越压越大；建议`大于1K`的数据才开启压缩传输，这时能达到`30%-80%`的压缩比

> 技术选型，可选择`pako`作为前端压缩的解决方案，实际上pako方案的后端支持也很成熟。


### 运行性能收集

<div id="test_running" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_running');

		if ( !window.runPerf ) {
			window.runPerf = 1;
            s.show( '点击以下按钮运行性能测试' );
			return;
		}
        s.show( 'start running ...' );

        var algorithms = {
                lzstring: {
                    compress: LZString.compressToUint8Array
                    , decompress: LZString.decompressFromUint8Array
                }
                , lzma: {
                    compress: function( data ) {
                        return LZMA.compress( data, 1 );
                    }
                    , decompress: LZMA.decompress
                }
                , pako: {
                    compress: pako.gzip
                    , decompress: pako.ungzip
                }
            };

        var td_config = window.td_config
            , types, sizes, name, type, size, info
            , taskQueue = []
            , chart = {
                xAxis: [ '10','20','50','100','200','500','1K','2K','5k','10k','20k','50k'
                    , '100K', '200K', '500K', '1M', '2M', '5M'
                ]
                , usedTimeSeries: []
                , ratioSeries: []
            }
            , cnt = 10
            ;

        for ( var i = 0, types = td_config.type; i < types.length; i++ ) {
            type = types[ i ];
            chart.usedTimeSeries.push( { name: type } );
            chart.ratioSeries.push( { name: type } );
            for ( var j = 0, sizes = td_config.size; j < sizes.length; j++ ) {
                size = sizes[ j ];
                name = type + '_' + size;
                for ( var k in algorithms ) {
                    taskQueue.push( { type: type, data_name: name, algorithm: k } );
                }
            }
        }
        doTask();

        function doTask() {
            var taskInfo, taskResult;
            if ( taskQueue.length > 0 && cnt-- > 0 ) {
                taskInfo = taskQueue.shift();
                taskResult = run( taskInfo.data_name, taskInfo.algorithm );
                s.append_show( taskInfo.data_name, taskInfo.algorithm
                    , taskResult.usedTime + 'ms' 
                    , Math.floor( taskResult.ratio * 10000 ) / 100 + '%'
                );
                for ( var m = 0; m < chart.usedTimeSeries.length; m++ ) {
                    if ( chart.usedTimeSeries[ m ].name == taskInfo.type ) {

                        chart.usedTimeSeries[ m ].data = chart.usedTimeSeries[ m ].data || {}; 
                        chart.usedTimeSeries[ m ].data[ taskInfo.algorithm ]
                            = chart.usedTimeSeries[ m ].data[ taskInfo.algorithm ] || [];
                        chart.usedTimeSeries[ m ].data[ taskInfo.algorithm ].push( 
                            taskResult.usedTime 
                        );

                        chart.ratioSeries[ m ].data = chart.ratioSeries[ m ].data || {}; 
                        chart.ratioSeries[ m ].data[ taskInfo.algorithm ]
                            = chart.ratioSeries[ m ].data[ taskInfo.algorithm ] || [];
                        chart.ratioSeries[ m ].data[ taskInfo.algorithm ].push( 
                            Math.floor( taskResult.ratio * 10000 ) / 100 
                        );

                    }
                }
                setTimeout( doTask, 500 );
            }
            else {
                if ( taskQueue.length ) {
                    s.append_show( 'tips', '调整cnt的值为1000，以便执行全部性能测试' );
                }
                s.append_show( chart );
            }
        }

        function run( data_name, algorithm ) {
            var content = window[ data_name ]
                , compressed
                , runner = algorithms[ algorithm ]
                , startTime = Date.now()
                , endTime
                , usedTime
                ;
            
            compressed = runner.compress( content );
            endTime = Date.now();
            usedTime = endTime - startTime;
            return {
                usedTime: usedTime
                , ratio: compressed.length / content.replace( /[^\u0000-\u00ff]/g, 'aa' ).length
            };
        }

    })();

</div>
<div class="test-panel">
</div>
</div>


## Echart data

### 运行时间性能数据

	option = {
		title: {
			text: ''
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:['en-lzstring', 'base64-lzstring', 'json-lzstring', 'json_base64-lzstring', 'mixed-lzstring'
				,'en-lzma', 'base64-lzma', 'json-lzma', 'json_base64-lzma', 'mixed-lzma'
				,'en-pako', 'base64-pako', 'json-pako', 'json_base64-pako', 'mixed-pako'
			]
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: [        
			"10", "20", "50", "100", "200", "500", "1K", "2K", "5k", "10k", "20k", "50k", "100K", "200K", "500K", "1M", "2M", "5M"
			]
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name:'en-lzstring',
				type:'bar',

				data:[  0, 1, 1, 0, 4, 1, 2, 3, 6, 9, 15, 30, 56, 108, 358, 577, 1254, 3392 ]
			},
			{
				name:'base64-lzstring',
				type:'bar',

				data:[ 0, 3, 0, 1, 1, 1, 2, 3, 7, 12, 18, 55, 81, 185, 493, 736, 1541, 3964]
			},
			{
				name:'json-lzstring',
				type:'bar',

				data:[ 0, 0, 0, 0, 0, 1, 2, 4, 6, 9, 15, 31, 51, 103, 239, 501, 1106, 3438]
			},
			{
				name:'json_base64-lzstring',
				type:'bar',

				data:[ 0, 0, 0, 3, 1, 1, 1, 3, 3, 12, 13, 45, 57, 88, 355, 855, 907, 2607]
			},
			{
				name:'mixed-lzstring',
				type:'bar',

				data:[ 0, 0, 1, 0, 1, 1, 1, 2, 4, 7, 14, 34, 78, 134, 326, 714, 1413, 4053]
			},
			{
				name:'en-lzma',
				type:'bar',

				data:[  3, 3, 4, 5, 7, 13, 17, 27, 57, 125, 188, 466, 1062, 2064, 5417, 10569, 20592, 51457 ]
			},
			{
				name:'base64-lzma',
				type:'bar',

				data:[1, 1, 3, 2, 4, 7, 10, 19, 48, 86, 151, 438, 843, 1591, 3739, 7223, 14378, 35872]
			},
			{
				name:'json-lzma',
				type:'bar',

				data:[ 1, 2, 2, 3, 4, 6, 9, 19, 44, 90, 187, 521, 917, 2011, 4990, 10220, 19823, 53851]
			},
			{
				name:'json_base64-lzma',
				type:'bar',

				data:[ 2, 2, 4, 14, 5, 6, 10, 12, 30, 46, 94, 306, 743, 1915, 6954, 8113, 15810, 39437]
			},
			{
				name:'mixed-lzma',
				type:'bar',

				data:[ 1, 2, 1, 2, 3, 7, 11, 16, 34, 78, 187, 643, 1520, 3139, 8047, 15811, 31490, 82600]
			},
			{
				name:'en-pako',
				type:'bar',

				data:[ 1, 2, 1, 2, 2, 2, 3, 5, 4, 7, 7, 24, 25, 37, 77, 139, 261, 641]
			},
			{
				name:'base64-pako',
				type:'bar',

				data:[ 0, 1, 1, 0, 0, 0, 4, 2, 4, 5, 6, 14, 12, 18, 25, 42, 60, 136]
			},
			{
				name:'json-pako',
				type:'bar',

				data:[ 1, 2, 0, 1, 0, 3, 1, 1, 3, 4, 5, 6, 8, 15, 31, 60, 131, 285]
			},
			{
				name:'json_base64-pako',
				type:'bar',

				data:[ 0, 0, 4, 1, 2, 3, 1, 1, 4, 5, 7, 12, 26, 30, 49, 46, 83, 218]
			},
			{
				name:'mixed-pako',
				type:'bar',

				data:[ 1, 3, 0, 0, 0, 1, 0, 1, 3, 4, 7, 14, 25, 51, 129, 226, 457, 1203]
			}
		]
	};



### 压缩比率数据 

	option = {
		title: {
			text: ''
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:['en-lzstring', 'base64-lzstring', 'json-lzstring', 'json_base64-lzstring', 'mixed-lzstring'
				,'en-lzma', 'base64-lzma', 'json-lzma', 'json_base64-lzma', 'mixed-lzma'
				,'en-pako', 'base64-pako', 'json-pako', 'json_base64-pako', 'mixed-pako'
			]
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: [        
			"10", "20", "50", "100", "200", "500", "1K", "2K", "5k", "10k", "20k", "50k", "100K", "200K", "500K", "1M", "2M", "5M"
			]
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name:'en-lzstring',
				type:'line',

				data:[ 150,127.27,130.76,108.57,87.37,70.35,60.63,57.89,51.72,49.31,43.49,42.13,39.97,38.63,34.52,31.51,28.47,24.56 ]
			},
			{
				name:'base64-lzstring',
				type:'line',

				data:[ 140,140,136,118,113.99,96.4,85,96.1,98.96,96.4,93.01,87.24,80.13,70.28,54.88,43.78,33.89,23.41 ]
			},
			{
				name:'json-lzstring',
				type:'line',

				data:[ 160,110,104,106,99.51,92.18,77.14,65.91,52.09,44.77,38.92,32.65,28.14,24.03,19.01,15.36,12.47,9.6 ]
			},
			{
				name:'json_base64-lzstring',
				type:'line',

				data:[ 160,120,128,116,113.99,100,89.4,98.9,100.16,96.48,92.6,89.38,62.79,43.29,35.27,30.41,25.59,19.57 ]
			},
			{
				name:'mixed-lzstring',
				type:'line',

				data:[ 150,140.74,132.3,129.32,115.44,96.55,84,80.07,71.8,68.67,69.98,60.96,59.45,51.47,42.07,34.87,28.16,20.49 ]
			},
			{
				name:'en-lzma',
				type:'line',

				data:[ 316.66,209.09,146.15,118.09,84.95,63.24,48.7,44.79,37.81,34.43,28.19,27.73,25.87,24.68,24.16,23.91,23.75,23.68 ]
			},
			{
				name:'base64-lzma',
				type:'line',

				data:[ 340,220,144,117,104,82.2,64.8,70.55,74.8,75.92,76.21,49.13,24.58,12.3,4.92,2.47,1.24,0.5 ]
			},
			{
				name:'json-lzma',
				type:'line',

				data:[ 340,200,132,111,96.58,81.64,59.57,39.87,25.39,18.76,15.72,13.17,9.41,8.87,8.52,8.1,8,7.92 ]
			},
			{
				name:'json_base64-lzma',
				type:'line',

				data:[ 340,215,140,113.99,103,85.2,67.6,71.7,75.38,75.97,76.12,73.38,40.9,21.85,18.5,18.4,18.4,17.67 ]
			},
			{
				name:'mixed-lzma',
				type:'line',

				data:[ 316.66,218.51,160,132.33,112.5,93.81,75.97,66.94,57.61,55.39,58.66,52.86,52.61,52.24,52.13,51.92,51.95,51.88 ]
			},
			{
				name:'en-pako',
				type:'line',

				data:[ 283.33,190.9,138.46,118.09,83.98,60.47,47.61,44.14,37.95,35.16,29.43,29.52,28.42,27.76,27.48,27.35,27.27,27.25 ]
			},
			{
				name:'base64-pako',
				type:'line',

				data:[ 300,200,134,112.99,96.5,79,65.5,69.45,73.26,74.43,75.13,49.04,25.06,13,5.71,3.25,1.99,1.23 ]
			},
			{
				name:'json-pako',
				type:'line',

				data:[ 300,180,124,108,99.02,83.59,61.81,42.56,28.06,21.57,18.43,15.99,11.58,11.32,11.25,10.83,10.79,10.77 ]
			},
			{
				name:'json_base64-pako',
				type:'line',

				data:[ 300,190,130,108,97.5,81.79,68.99,71.1,74.02,74.79,75.27,73.38,43.05,27.28,23.72,23.59,23.46,22.82 ]
			},
			{
				name:'mixed-pako',
				type:'line',

				data:[ 283.33,211.11,158.46,135.33,118.38,93.81,76.76,68.66,61.06,60,64.96,60.98,61.1,60.91,60.96,60.84,60.9,60.87 ]
			}
		]
	};







