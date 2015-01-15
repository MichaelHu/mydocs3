# Rocket预定义动画及动画扩展

## 预定义动画

预定义动画使用了<a href="http://tympanus.net/Development/PageTransitions/">Page Transitions</a>提供的`35个动画`：

### 1. 横向动画（LR后缀）

以下`14个横向动画`：

    fadeslideLR                         
    flipLR                              
    movefaderotateunfoldLR              
    rotatecarouselLR                    
    rotatecubeLR                        
    rotatefoldmovefadeLR                
    rotatepushslideLR                   
    rotateroomLR                        
    rotateslideLR                       
    scaledownslideLR                    
    slideeasingLR                       
    slidefadeLR                         
    slideLR                             
    slidescaleupLR                      


### 2. 纵向动画（TB后缀）

以下`14个纵向动画`：

    fadeslideTB                         
    flipTB                              
    movefaderotateunfoldTB              
    rotatecarouselTB                    
    rotatecubeTB                        
    rotatefoldmovefadeTB                
    rotatepushslideTB                   
    rotateroomTB                        
    rotateslideTB                       
    scaledownslideTB                    
    slideeasingTB                       
    slidefadeTB                         
    slideTB
    slidescaleupTB                      


### 3. 无方向动画

以下`7个纵向动画`：

    rotatefallscaleup                   
    rotatenewspaper                     
    rotateslide                         
    rotateslidedelay                    
    scaledowncenterscaleupcenter        
    scaledownscaleupdown                
    scaledownupscaleup                  


> 有些稍微复杂的动画，比如`rotatecarouselLR`，在奇葩iOS8的Safari竟然没有效果。不管是iPhone4S还是iPhone5S
> 都不行。


## 动画扩展

以下文件完成了新动画`newanimate`创建和注册：

    (function(){

    function newanimate(currentEle, nextEle, dir, callback) {
        var $currentEle = currentEle && $(currentEle),
            $nextEle = nextEle && $(nextEle);

        if(0 == dir){
            if(currentEle != nextEle){
                currentEle && $currentEle.hide();
                setTimeout(function(){
                    nextEle && $nextEle.show();
                }, 0);
            }

            callback && callback();
            return;
        }

        var outClass = 'pt-page-...',
            inClass = 'pt-page-...'
            ;

        Animation.pageTransition(nextEle, currentEle, inClass, outClass);

    };

    Animation.register('newanimate', newanimate);

    })();

以上代码创建的动画为无方向动画，以下代码创建了有方向动画：

    (function(){

    function slideLR(currentEle, nextEle, dir, callback) {
        var $currentEle = currentEle && $(currentEle),
            $nextEle = nextEle && $(nextEle);

        if(0 == dir){
            if(currentEle != nextEle){
                currentEle && $currentEle.hide();
                setTimeout(function(){
                    nextEle && $nextEle.show();
                }, 0);
            }

            callback && callback();
            return;
        }

        var outClass = 'pt-page-moveToLeft',
            inClass = 'pt-page-moveFromRight'
            ;

        if(2 == dir){
            outClass = 'pt-page-moveToRight';
            inClass = 'pt-page-moveFromLeft';
        }

        Animation.pageTransition(nextEle, currentEle, inClass, outClass);

    };

    Animation.register('slideLR', slideLR);

    })();
