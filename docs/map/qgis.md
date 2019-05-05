# qgis

> Quantum GIS - 开源、跨平台的GIS软件

## Features

* 桌面地理信息系统，功能非常全面
* 可运行在Linux、Unix、Mac OS X以及Windows等平台之上

## Resources

* downloads: <http://download.qgis.org>
* docs: <https://docs.qgis.org/2.14/en/docs/index.html>
* editing: <https://docs.qgis.org/3.4/en/docs/user_manual/working_with_vector/editing_geometry_attributes.html>


## Tips

* 支持`.shp`、`.geojson`等格式的文件
* 支持多种地理坐标系，可进行`面积、周长、距离`等运算
* Feature的过滤选择（按值、按表达式等），如下文案例
* 支持增加`OpenStreetMap`瓦片层，手绘地图时，打开该层，可用于`辅助纠偏`
* 支持将图片作为瓦片层添加，但尚未搞懂如何定义其坐标范围
* `手绘地图`，可以将地图边界数据制作成svg，并通过`SVG Annotation`将该SVG添加到地图，就可以进行`描边绘制`了。描边绘制不受层级影响，即使描边层在图片下方，也可以进行描边
* 层的编辑模式，只有进入到`编辑模式`，才能对层进行修改。默认为只读模式
* Feature的**添加**，通过`右键`点击完成图形的添加，实际上**右键**操作在QGIS里是一个重要的操作，初学者在不知道的情况下会很困惑
* 通过Feature的各类操作，支持`修改、删除、合并、分割`等操作
* Feature操作时，**滚轮**可以进行`放大/缩小`，*按住空格键进行鼠标拖动*，可快速切换到`画布拖动模式`
* 升级到3.2.2版本后，默认地图区没有占满工作区，可以通过添加panel，并拖动panel和地图的边界，触发地图区自适应布局，地图区就可以占满工作区了
* 可以在地图上显示label，自行选择显示的字段
* `QGIS3`，要求系统安装`Python 3`，而且必须是从`python.org`官方下载的安装包
* `Layers Panel`右键点击`Open Attribute Table`，打开Edit开关，可以通过Expression方式为Feature计算AREA字段：
        AREA = $area
* `Browser Panel`中的`XYZ Tiles`可以快速添加瓦片图层，默认提供OpenStreetMap的图层



## Install

### QGIS 3.2.2安装

#### 安装提示

    QGIS 3 / Mac OS X

    3.2.2-1	2018-8-25

    This is QGIS built for Yosemite, El Capitan, Sierra and High Sierra.

    Requirements - Very important!

    This distribution requires my GDAL Complete 2.2 framework package (included
    on the QGIS disk image) and Python 3.6 (only python.org Python 3 is
    supported, another python 3 installation can't be substituted).
    Python must be installed before GDAL.  Some Python modules are
    required and installed using pip from files in the installer.
    Modules will be installed but not upgraded if already installed, in
    case you are holding onto an old version for some reason.  Installed
    modules include (plus any dependencies):

    owslib, PyYaml, psycopg2, jinja2, pygments, numpy, plotly

#### Tips

* **3.2.x**版本有很多不稳定的地方，建议升级到`3.4.x`版本，该版本是长期维护版本
* 必须`Python 3.6.5+`，而且只能是安装从<http://python.org>下载安装的版本，必须在`GDAL`和`QGIS`前安装好
* 依赖`GDAL Complete 2.2`，在安装QGIS前安装好，在同一个安装包里






## Expression Examples

### 按字段过滤 - regexp_match

    /* 注释 17 */
    regexp_match(  "QH_CODE", '110112001' )
    /* 注释 7 */
    OR regexp_match(  "QH_CODE", '110112002' )
    /* 注释 18 */
    OR regexp_match(  "QH_CODE", '110112003' )
    /* 注释 17 */
    OR regexp_match(  "QH_CODE", '110112004' )
    /* 注释 43 */
    OR regexp_match(  "QH_CODE", '110112005' )
    /* 注释 48 */
    OR regexp_match(  "QH_CODE", '110112006' )
    /* 注释 13 */
    OR regexp_match(  "QH_CODE" , '1101121042(1[0-9]|20|21|19|01)' )
    /* 注释 24 */
    OR regexp_match( "QH_CODE",  '1101121052(0[1-9]|1[0-9]|2[0-39])' )
    /* 注释 22 */
    OR regexp_match(  "QH_CODE", '110112119(00[1-4]|20[16-9]|21[0-9]|22[015])' )
        /* 古城村委会 - 单独处理 */
        OR "QH_CODE" = '110112119205' AND "PARCODE" = '110112119000'
    /* 注释 2 */
    OR regexp_match(  "QH_CODE" , '11011211420[24]' )

1. 对字段`QH_CODE`进行过滤
2. 过滤方式调用函数`regexp_match()`，使用用`正则表达式`进行过滤

### 按字段过滤 - IN

    "QH_NAME" IN (
        '小稿村委会'
        , '大稿村委会'
        , '万盛北里社区'
        , '欣达园社区居委会'
    )




