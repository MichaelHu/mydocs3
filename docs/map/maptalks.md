# maptalks

> A light JavaScript library to create integrated 2D/3D maps. 


## Features

* 整合`2d/3d`功能，通过右键或双指拖动可以切换2d/3d模式


## Resources

* site: <https://maptalks.org>
* github: <https://github.com/maptalks/maptalks.js> <iframe src="http://258i.com/gbtn.html?user=maptalks&repo=maptalks.js&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe> 
* examples: <https://maptalks.org/examples/en/map/load/#map_load>

## 通用插件

* Mapbox gl Layer
* Heatmap Layer <https://github.com/maptalks/maptalks.heatmap>
* Marker Cluster Layer
* THREE.js Layer <https://github.com/maptalks/maptalks.three>
* Echarts Layer <https://github.com/maptalks/maptalks.e3>


## Usage

    var map = new maptalks.Map("map",{
         center:     [180,0],
         zoom:  4,
         baseLayer : new maptalks.TileLayer("base",{
             urlTemplate:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
             subdomains:['a','b','c']
         }),
         layers : [
             new maptalks.VectorLayer('v', [new maptalks.Marker([180, 0])])
         ]
    });


## Examples

### 迁徙图 


