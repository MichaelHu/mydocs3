# 常用模板收集


> 参考右侧导航，快速定位至所需模板





## webapp

### 1. simple index.html


    <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=320.1,minimum-scale=1.0,maximum-scale=1.0"/>
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="baidu-tc-cerfication" content="4779cf472a2e0bc569c3e9daca180bbc" />

        <title>APP名称</title>
        <link rel="shortcut icon"
              href="http://m.baidu.com/static/news/webapp/webappandroid/img/webapp-news-logo.png"/>
        <link rel="apple-touch-icon-precomposed"
              href="http://m.baidu.com/static/news/webapp/webappandroid/img/webapp-news-logo.png"/>
        <!-- iPhone 4 (Retina) -->
        <link href="./img/startup_640_920.png"
              media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)"
              rel="apple-touch-startup-image">
        <!-- iPhone 5 -->
        <link href="./img/startup_640_1096.png"
              media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
              rel="apple-touch-startup-image">
        <!-- iPhone  -->
        <link href="./img/startup_320_460.png"
              media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)"
              rel="apple-touch-startup-image">

    </head>
    <body>
        <div id="wrapper"></div>
    </body>
    </html>




### 2. with includejs


注意，使用了fis构建方式，路径按照fis的解析来进行。


    <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=320.1,minimum-scale=1.0,maximum-scale=1.0"/>
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="baidu-tc-cerfication" content="4779cf472a2e0bc569c3e9daca180bbc" />

        <title>APP名称</title>

        <link rel="shortcut icon"
              href="http://m.baidu.com/static/news/webapp/webappandroid/img/webapp-news-logo.png"/>
        <link rel="apple-touch-icon-precomposed"
              href="http://m.baidu.com/static/news/webapp/webappandroid/img/webapp-news-logo.png"/>
        <!-- iPhone 4 (Retina) -->
        <link href="./img/startup_640_920.png"
              media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)"
              rel="apple-touch-startup-image">
        <!-- iPhone 5 -->
        <link href="./img/startup_640_1096.png"
              media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
              rel="apple-touch-startup-image">
        <!-- iPhone  -->
        <link href="./img/startup_320_460.png"
              media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)"
              rel="apple-touch-startup-image">

        <link href="css/common.css?__inline" type="text/css" rel="stylesheet" />

        <!-- all modules must be listed here -->
        <link rel="mod-include" data-cache="1" data-mod="lib" data-deps="" href="/modules/lib.js" />
        <link rel="mod-include" data-cache="1" data-mod="gmu" data-deps="lib" href="/modules/gmu.js" />
        <link rel="mod-include" data-cache="1" data-mod="main" data-deps="lib,gmu" href="/modules/main.js" />
        <link rel="mod-include" data-cache="1" data-mod="index" data-deps="main" href="/modules/index.js" />
        <link rel="mod-include" data-cache="1" data-mod="page" data-deps="main" href="/modules/page.js" />

        <script src="../includejs/include.js?__inline"></script>
        <script>include.setCacheKeyPrefix('bdnews_phone');</script>

    </head>
    <body>
        <div id="wrapper" class="news"></div>
        <script>
            include('main', function(){
                rocket.init();
            });
        </script>
    </body>
    </html>





### 3. with requirejs


    <!DOCTYPE html>
    <html>
    <head>
        <title>上百度新闻头条，派送贺卡</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=320.1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
        <meta name="format-detection" content="telephone=no" />
        <link rel="stylesheet" type="text/css" href="css/myslides-aio.css" />

        <link rel="md5-info" data-name="zepto" href="vendor/zepto-amd.js" /> 
        <link rel="md5-info" data-name="underscore" href="vendor/underscore.js" /> 
        <link rel="md5-info" data-name="rocket" href="vendor/rocket-p.js" /> 
        <link rel="md5-info" data-name="jquery" href="vendor/jquery.js" /> 
        <link rel="md5-info" data-name="spectrum" href="vendor/spectrum.js" /> 
        <link rel="md5-info" data-name="iscroll" href="vendor/iscroll.js" /> 
        <link rel="md5-info" data-name="canvas" href="vendor/Canvas.js" /> 
        <link rel="md5-info" data-name="cover-loading" href="cover-loading.js" /> 
        <link rel="md5-info" data-name="rocket-ppt" href="js/rocket-ppt.js" /> 
        <link rel="md5-info" data-name="main" href="main.js" /> 
    </head>
    <body>
        <div id="cover-loading">
            <div class="box">
                <canvas></canvas>
                <img>
                <div class="info">
                    <span class="percent">2</span>
                    <span class="text">%</span>
                </div>
            </div>
        </div>
        <div id="wrapper"></div>
    </body>
    </html>
    <script type="text/javascript" src="/static/news/myslides/vendor/require.js"></script>
    <script>

    (function(){

    // config
    global_greetingcard_server = 'http://baijia.baidu.com/ajax/greetingcard';

    var host = location.host,
        path;

    if(/(m|wap)\.baidu\.com/.test(host)){
        path = 'static/news'; 
    }
    else if(/test\.baidu\.com/.test(host)){
        path = 'template'; 
    }

    global_land_page = 'http://'
        + host + '/' + path + '/myslides/land.html';




    var links = document.getElementsByTagName('link'),
        mods = {}, link; 

    for(var i=0; i<links.length; i++){
        if( ( link = links[i] ).getAttribute('rel') == 'md5-info' ){
            mods[link.getAttribute('data-name')]
                = link.getAttribute('href').replace(/\.js$/, '') ;
        }
    }

    require.config({
        // baseUrl: '/static/news/myslides/vendor'
        waitSeconds: 0 // disable timeout check
        , paths: {
            'zepto': mods['zepto']
            , 'underscore': mods['underscore']
            , 'rocket': mods['rocket']
            , 'jquery': mods['jquery']
            , 'spectrum': mods['spectrum']
            , 'iscroll': mods['iscroll']
            , 'canvas': mods['canvas']
            , 'cover-loading': mods['cover-loading']
            , 'rocket-ppt': mods['rocket-ppt']
            , 'main': mods['main']
        }
    });

    require(['main'], function(){});

    })();
    </script>





## bootstrap

### 1. simple


    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Title</title>

        <link href="css/bootstrap.min.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

    </head>
    <body>
        <h1>你好，世界！</h1>

        <script src="libs/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </body>
    </html>





## qunit

### 1. simple

    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

        <title>Lib-Name - QUnit Test Suite</title>

        <link rel="stylesheet" href="./vendor/qunit.css" type="text/css" media="screen">

        <script type="text/javascript" src="./vendor/qunit.js"></script>
        <script type="text/javascript" src="./vendor/jquery.js"></script>

        <!-- Your project file goes here -->
        <script type="text/javascript" src="../dist/rocket-p.js"></script>
        <!-- Your tests file goes here -->
        <script type="text/javascript" src="./utils.js"></script>
        <script type="text/javascript" src="./class-extend.js"></script>
        <script type="text/javascript" src="./events.js"></script>
        <script type="text/javascript" src="./model.js"></script>
        <script type="text/javascript" src="./view.js"></script>
        <script type="text/javascript" src="./router.js"></script>
    </head>
    <body>
        <div id="qunit"></div>

        <div id="qunit-fixture">
            <div id='testElement'>
                <h1>Test</h1>
            </div>
        </div>
    </body>
    </html> 






## grunt



### 1. simple Gruntfile.js


    module.exports = function(grunt) {

        // Project configuration.
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },  
                build: {
                    src: 'src/<%= pkg.name %>.js',
                    dest: 'build/<%= pkg.name %>.min.js'
                }   
            }   
        }); 

        // Load the plugin that provides the "uglify" task.
        grunt.loadNpmTasks('grunt-contrib-uglify');

        // Default task(s).
        grunt.registerTask('default', ['uglify']);

    }; 



### 2. rocket-p Gruntfile.js

    module.exports = function(grunt) {

        // Project configuration.
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json')
            , uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                build: {
                    src: 'dist/<%= pkg.name %>.js'
                    , dest: 'dist/<%= pkg.name %>.min.js'
                }
            }
            , concat: {
                options: {
                    separator: grunt.util.linefeed + ';'
                },
                dist: {
                    src: [
                        'src/amd-header.js'
                        , 'src/utils.js'
                        , 'src/class-extend.js'
                        , 'src/events.js'
                        , 'src/history.js'
                        , 'src/model.js'
                        , 'src/router.js'
                        , 'src/view.js'

                        , 'src/baseview.js'
                        , 'src/pageview.js'
                        , 'src/subview.js'
                        , 'src/globalview.js'
                        , 'src/subpageview.js'
                        , 'src/subpagemanager.js'

                        , 'src/animation.js'
                        , 'src/animation/simple.js'


                        , 'src/animation/slideLR.js'
                        , 'src/animation/slideTB.js'

                        , 'src/animation/slidefadeLR.js'
                        , 'src/animation/slidefadeTB.js'

                        , 'src/animation/fadeslideLR.js'
                        , 'src/animation/fadeslideTB.js'

                        , 'src/animation/slideeasingLR.js'
                        , 'src/animation/slideeasingTB.js'

                        , 'src/animation/slidescaleupLR.js'
                        , 'src/animation/slidescaleupTB.js'

                        , 'src/animation/scaledownslideLR.js'
                        , 'src/animation/scaledownslideTB.js'

                        , 'src/animation/flipLR.js'
                        , 'src/animation/flipTB.js'

                        , 'src/animation/scaledownscaleupdown.js'

                        , 'src/animation/scaledownupscaleup.js'

                        , 'src/animation/rotatefallscaleup.js'

                        , 'src/animation/rotatenewspaper.js'

                        , 'src/animation/rotateslide.js'

                        , 'src/animation/rotateslidedelay.js'

                        , 'src/animation/scaledowncenterscaleupcenter.js'

                        // @note: 3D may not work
                        , 'src/animation/rotateslideLR.js'
                        , 'src/animation/rotateslideTB.js'

                        , 'src/animation/rotatepushslideLR.js'
                        , 'src/animation/rotatepushslideTB.js'

                        , 'src/animation/rotateroomLR.js'
                        , 'src/animation/rotateroomTB.js'

                        , 'src/animation/rotatecubeLR.js'
                        , 'src/animation/rotatecubeTB.js'

                        , 'src/animation/rotatecarouselLR.js'
                        , 'src/animation/rotatecarouselTB.js'

                        , 'src/animation/rotatefoldmovefadeLR.js'
                        , 'src/animation/rotatefoldmovefadeTB.js'

                        , 'src/animation/movefaderotateunfoldLR.js'
                        , 'src/animation/movefaderotateunfoldTB.js'


                        , 'src/amd-footer.js'
                    ]
                    , dest: 'dist/<%= pkg.name %>.js'
                },
            },
        });

        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-concat');


        grunt.registerTask('default', ['concat', 'uglify']);

    };


