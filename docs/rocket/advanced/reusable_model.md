# 模型(model)共享 

% 模型(model)共享 
| hdm258i@gmail.com
| 2013-03-25
| 进阶, webapp框架


## 前言

* 通常存在这样的情况，一个页面中多个功能模块使用同一个数据源，甚至多个页面也共享一个数据源
* 前者譬如为了节省网络请求个数，一次性把页面的全部数据返回，这些数据被页面的多个功能模块共用，比如新闻首页、视频首页
* 后者譬如正文页需要横划切换至下一篇文章，就需要与列表页数据共享，又譬如推广数据，推广位分布在不同页面，但是推广数据源只有一个，那么就需要在不同页面共享统一个推广数据


本篇介绍如何`合理的创建model和view`，实现model的共享，也即`共享model`。




## 页面内共享model 

通常会遇到这种情况，一个model（对应一个数据请求）包含多种数据，这些数据被同一个页面内的多个功能模块（subview）共用，每个模块使用其中的一部分。

比如，一次请求返回轮播图数据和4个视频类型数据（电影、电视剧、综艺和动漫），这些数据被用于轮播图模块和视频列表模块。这种情况，就需要使用页面内共享model。

以视频首页为例，我们对页面进行了如下MVC层次分拆：

    pageview.videoindex
        subview.videoindex_toolbar
        subview.videoindex_content
            subview.videoindex_content_tuiguang
            subview.videoindex_content_imageslider
            subview.videoindex_content_listwrapper
                subview.videoindex_content_list

其中，tuiguang使用全局model提供的数据（本篇后面会提及）；imageslider和list使用同一个model提供的数据，该model由content创建，model的变化通过`页面事件中心`派发给imageslider和list。

@todo: 页面共享model时，pageloading的设置方式

具体代码细节摘录如下：



### 页面内共享model的创建及派发

共享model由父视图content创建，具体代码（from page/videoindex/js/view/rocket.subview.videoindex_content.js）：

    rocket.subview.videoindex_content = rocket.subview.extend({

        ...

        ,init: function(options){
            var me = this;

            // 包含多数据的模型，整个页面共享
            me.model = new rocket.model.videoindex_data(null, options);

        }

        ...

        ,onpagebeforechange: function(params){

            ...

            if(to == me.ec) {
                ...
                if(me.isFirstLoad){
                    me.model.fetch({
                        success: function(model, resp){
                            me.isFirstLoad = false;
                            me.ec.trigger('dataready', model.toJSON());
                            me.hideLoading();
                        }
                    });
                }
            }

        }

    });


### 页面内共享model的使用

以上共享model在imageslider和list中被使用，由于它们都存在于`同一个页面`，可以使用页面事件中心进行交互：

imageslider`不再创建`同级别model，而是通过页面事件中心ec响应dataready事件。

    rocket.subview.videoindex_content_imageslider = rocket.subview.extend({
        ...

        ,render: function(data){
            var me = this,
                arr = data['index_flash'];

            // GMU组件
            $.ui.slider(me.$el, {
                content: $.map(arr, function(item, index){
                    var t = {};
                    t.href = item.url;
                    t.pic = item.img_url;
                    t.title = item.title;
                    return t;
                })
                ,loop: true
                ,imgInit: 1
                ,viewNum: 1
            });

            return me;
        }

        ,registerEvents: function(){
            var me = this, ec = me.ec;
            ...
            ec.on("dataready", me.render, me);
        }

        ...

    });

同样，list代码如下：

    rocket.subview.videoindex_content_list = rocket.subview.extend({

        ...

        ,render: function(data){
            var me = this;

            me.$el.append(
                me.template({
                    type: me.videotype,
                    typename: rocket.helper.getVideoClassById(me.videotype).title,
                    list: data[me.videotype + '_hot'] 
                })
            );

            return me;
        }

        ,registerEvents: function(){
            var me = this, ec = me.ec;
            ...
            ec.on("dataready", me.render, me);
        }

        ...

    });






## 跨页面共享model

一般情况下，页面之间是不进行交互的，因为跨页面交互破坏了页面间的独立性，不利于页面功能解耦，对并行开发造成一定的困难。

但是，由于业务功能的需要，无法避免在页面间进行数据交互和共享，这种情况下，需要建立跨页面共享model，通过使用`固定接口`，降低跨页面交互的复杂度。

跨页面共享model主要通过接口方法`getInstance(param)`来实现。




### 列表页和正文页共享的例子

以下代码（来自page/listzaker/js/model/rocket.model.listzaker_nids.js）:

    rocket.model.listzaker_nids = rocket.model.extend({

        initialize: function(models, options){
            var me = this;

            // 初始化时进行类实例的维护
            rocket.model.listzaker_nids._instances
                || (rocket.model.listzaker_nids._instances = {});

            me.type = ( options || {} ).type || 'civilnews';

            rocket.model.listzaker_nids._instances[me.type] = me;

            ...
        }

        , ...

    });

    /**
     * 类方法getInstance
     * @param type {string} 区分类实例的特征值
     * @return instance or undefined
     */
    rocket.model.listzaker_nids.getInstance = function(type){
        var instances = rocket.model.listzaker_nids._instances;
        return instances && instances[type];
    }; 


rocket.model.listzaker_nids由listzaker页面创建，但是其数据需要被页面detailmulticolumn共享，以支持连续右滑查看下一条新闻。detailmulticolumn不负责创建该model，也不完全依赖该model，当该model存在就使用，不存在就不使用。

以下代码说明如何使用共享model（来自page/detailmulticolumn/js/view/rocket.subview.detailmulticolumn_content.js）：


    rocket.subview.detailmulticolumn_content = rocket.subview.extend({

        ...

        ,goNext: function(){
            var me = this,
                news,
                info = me.currentNewsInfo,
                list = rocket.model.listzaker_nids.getInstance(info.type),
                route;

            list && (news = list.getNextNews(info.nid));
            
            ...
        }

    });


使用类静态接口方法getInstance获取对应instance，然后调用接口方法getNextNews。





### 推广位model共享

webapp存在一些推广数据，来自同一数据源，但这些推广数据对应的推广位通常分布在不同页面。需要在不同页面之间共享推广位数据model。

与正文页例子区别在于，推广位model是一个全局数据，所有页面都可能使用。可以将其放在`全局模型`中（js/model/rocket.model.tuiguang.js），在`app初始化`时进行创建。

#### 全局model的定义

具体代码片段如下：

    rocket.model.vstuiguang = rocket.model.extend({

        initialize: function(attributes, options){
            var me = this;

            rocket.model.vstuiguang._instances
                || (rocket.model.vstuiguang._instances = {});

            rocket.model.vstuiguang._instances['unique'] = me;

            me.dataCache = null;
        }

        /**
         * 按位置获取推广内容
         * @param pos {string} 位置参数，多个位置以空格分隔
         */
        ,getByPos: function(pos){
            var me = this,
                tmp = pos.split(/\s+/),
                cache = me.dataCache,
                result = {};
            
            $.each(tmp, function(index, item){
                $.each(cache, function(index1, item1){
                    if(item1.pos == item){
                        result[item] = item1;
                    }
                });   
            });

            return result;
        }

        ...

    });

    // 通用model interface: getInstance
    rocket.model.vstuiguang.getInstance = function(){
        var instances = rocket.model.vstuiguang._instances;
        return instances && instances['unique'];
    }; 

以上是全局模型vstuiguang的定义，实现了静态类接口方法getInstance，使用`dataCache`作为数据缓存。

#### 全局model的初始化

具体代码（from /app/js/rocket.init.js）：

    $.extend(app, {
        init: function() {

            ...

            // 全局model
            var modelvstuiguang = new rocket.model.vstuiguang();

            new rocket.router.vs();
            Backbone.history.start();

            ...

            setTimeout(function(){
                modelvstuiguang.fetch({
                    callback: 'vstuiguangCalllback'
                }); 
            }, 300);
        }

    });




#### 全局模型的使用

以下代码展示如何在首页推广位中使用全局模型（from /app/page/index/js/view/rocket.subview.index_content_vstuiguang.js）。

    rocket.subview.index_content_tuiguang = rocket.subview.extend({

        ...

        ,init: function(options){

            ...

            // 通用model
            me.model = rocket.model.vstuiguang.getInstance();

            if(me.model.dataCache){
                me.render();
            }

        }

        ,render: function(){

            ...

            me.$el.append(me.template({
                tuiguang: me.model.getByPos('407')['407']
            }));
        }

        ,registerEvents: function(){
            ...
            me.model.on('change', me.render, me);
        }

        ...

    });


以下代码展示如何在帮助首页推广位中使用全局模型（from /app/page/index/js/view/rocket.subview.howtoindex_header.js）。

    rocket.subview.howtoindex_header = rocket.subview.extend({

        ...

        ,init: function(options){

            ...

            // 通用model
            me.model = rocket.model.vstuiguang.getInstance();

            if(me.model.dataCache){
                me.render();
            }
        }

        ,registerEvents: function(){

            ...

            me.model.on('change', me.render, me);
        }

        ,render: function(){

            ...

            me.$el.append(me.template({
                tuiguang: me.model.getByPos('501')['501']
            }));
        }

        ...

    });

