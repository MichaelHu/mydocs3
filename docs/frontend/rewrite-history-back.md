# Rewrite history.back

> 注意重写history对象是不行的，只能重写history.back




## 一、注意点

`history.length`表示浏览过的历史数目。

`不能`判断还能不能后退，或者当前在历史中的索引。

需要使用一些hack方法，比如使用`延时`和注册`onbeforeunload和onhashchange事件`，如第二种方法。





## 二、方案

1. 一棍子打死，直接重写：

        (function(){

            if(window.oldHistoryBack) return;

            var oldBack = window.oldHistoryBack = history.back;
            history.back = function(){
                location.href= 'bdapi://hybrid?info={"action": "history_back", "args": {}}'; 
                console.log('trigger events');
            }

        })(); 
        history.back();


2. 稍作判断，在后退到第一个历史的时候触发：

        (function(){

            if(window.oldHistoryBack) return;

            var oldBack = window.oldHistoryBack = history.back;
            history.back = function(){
                var timer = setTimeout(function(){
                    location.href= 'bdapi://hybrid?info={"action": "history_back", "args": {}}'; 
                    console.log('trigger events');
                }, 100);

                window.onbeforeunload = function(e){
                    clearTimeout(timer);
                };

                window.onhashchange = function(e){
                    clearTimeout(timer);
                };

                oldBack.apply(history, arguments);
            }

        })(); 
        history.back();


