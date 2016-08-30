sigma.prototype.alignCenter = function(options){
    var opt = options || {} 
        , me = this
        , rect = sigma.utils.getNodesRect(me.graph.nodes(), opt) 
        , cameras = me.cameras
        , camera
        , renderer
        , readPrefix = opt.readPrefix || ''
        , writePrefix = opt.writePrefix || ''
        , ratio
        , height
        , width
        , i
        ;

    for(i in cameras){
        camera = cameras[i];
        renderer = me.renderersPerCamera[camera.id][0];
        ratio = camera.ratio;
        height = renderer.height;
        width = renderer.width;

        if(opt.wholeViewWhenNeed && !opt.wholeView){
            if(rect.w > width || rect.h > height){
                opt.wholeView = 1;
            }
        }

        // wholeview mode by setting an appropriate camera ratio
        if(opt.wholeView){
            ratio = Math.max(rect.w / width, rect.h / height) * 1.3;
        }
        // another wholeview mode by rescaling coordinates 
        else if(opt.rescaleToViewport){
            sigma.middlewares.rescale.call(
                me
                , readPrefix
                , writePrefix
                , {
                    width: width
                    , height: height
                    , autoRescale: ['nodePosition']
                    , scalingMode: 'inside'
                    , rescaleIgnoreSize: 1
                    , sideMargin: Math.min(rect.h, rect.w) * 0.2 
                }
            );
            ratio = 1;
        }

        camera.goTo({
            x: rect.x + rect.w / 2
            , y: rect.y + rect.h / 2
            // prevents `ratio = 0`
            , ratio: ratio || 1
        });
    }

    return me;
} 
