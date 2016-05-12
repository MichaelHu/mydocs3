# layout grid

> 布局网格

<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.test-graph {
    height: 400px;
}
.test-graph svg {
    width: 100%;
    height: 100%;
}
</style>




`Grid工具类`：


    @[data-script="javascript editable"](function(){

        function Grid(xSize, ySize){
            var me = this;

            me.xSize = xSize || 10;
            me.ySize = ySize || 10;
            me.grid = [];
            me.blockList = {};

            me.init();
        }

        var prototype = {

            init: function(){
                var me = this
                    , grid = me.grid
                    ; 

                for(var i=0; i<me.ySize; i++){
                    grid.push([]);
                    for(var j=0; j<me.xSize; j++){
                        grid[i].push(0);
                    }
                }
            }

            , getBlockRect: function(id){
                return this.blockList[id];
            }

            , getMinSquare: function(){
                var me = this
                    , square = null
                    , grid = me.grid
                    , i, j
                    , xMax = 0
                    , yMax = 0
                    , max
                    ;
                
                for(i=0; i<me.xSize; i++){
                    for(j=0; j<me.ySize; j++){
                        if(grid[i][j]){
                            xMax = Math.max(i + 1, xMax);
                            yMax = Math.max(j + 1, xMax);
                        }
                    }
                } 

                if(xMax > 0 && yMax > 0){
                    max = Math.max(xMax, yMax);
                    square = {
                        x: 0, y: 0
                        , w: max
                        , h: max
                    }
                }

                s.append_show('square', square);
                return square;
            }

            , getMaxSpareRect: function(minSquare){
                var me = this
                    , grid = me.grid
                    , square = minSquare || me.getMinSquare()
                    , rect
                    , iStart, jStart
                    , i, j
                    ; 
               
                if(!square){
                    rect = {
                        x: 0 
                        , y: 0
                        , w: me.xSize
                        , h: me.ySize
                    };
                } 
                else {
                    jStart = square.x + square.w - 1;
                    iStart = square.y + square.h - 1;

                    if(grid[iStart][jStart]){
                        if(iStart < me.ySize - 1 && jStart < me.xSize - 1){
                            iStart++;
                            jStart++;
                        }
                        else {
                            rect = null;
                        }
                    }

                    var w
                        , h
                        , wMax = Infinity
                        , areas = [];
                   
                    h = 0;

                    for(i=iStart; i >= 0; i--){
                        h++;
                        w = 0;
                        for(j=jStart; j>=0; j--){
                            w++; 
                            if(grid[i][j]){
                                wMax = Math.min(w - 1, wMax);
                                areas.push({
                                    x: jStart - wMax + 1 
                                    , y: i 
                                    , w: wMax
                                    , h: h
                                    , area: wMax * h  
                                });
                                break;
                            }
                        }
                        if(j < 0){
                            wMax = Math.min(w, wMax);
                            areas.push({
                                x: 0
                                , y: i 
                                , w: wMax
                                , h: h
                                , area: wMax * h  
                            });
                        }
                    }

                    areas.sort(function(a, b){
                        return b.area - a.area;
                    });
                    rect = areas[0];
                }
                
                s.append_show('rect', rect);
                return rect;
            }

            , placeBlock: function(id, block, debug){
                var me = this
                    , minSquare = me.getMinSquare()
                    , maxSpareRect
                    , pos = {x: 0, y: 0}
                    ;

                if(!minSquare){
                    pos.x = 0;
                    pos.y = 0;
                }
                else {
                    maxSpareRect = me.getMaxSpareRect(minSquare);
                    if(!maxSpareRect) {
                        pos.x = minSquare.x + minSquare.w;
                        pos.y = 0;
                    }
                    else {
                        pos.x = maxSpareRect.x;
                        pos.y = maxSpareRect.y;
                    }
                }
                
                me.addBlock(id, pos, block, debug); 
            } 

            , addBlock: function(id, pos, block, debug){
                var me = this
                    , grid = me.grid
                    ;

                for(var i=pos.y; i<pos.y + block.h && i<me.ySize; i++){
                    for(var j=pos.x; j<pos.x + block.w && j<me.xSize; j++){
                        if(!grid[i][j]){
                            grid[i][j] = debug ? id : 1;
                        }
                        else {
                            throw new Error('grid[' + i + '][' + j + '] is occupied!');
                        }
                    }
                }     
                block.gridPos = pos;
                me.blockList[id] = block; 
            }

        };

        function extend(dest, src){
            for(var i in src){
                dest[i] = src[i];
            }
        }

        extend(Grid.prototype, prototype);

        window.Grid = Grid;
    
    })();




## 方法验证 

以下验证`Grid类`及其相关方法：

<div id="test_10" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_10');
        window.s = s;
        var grid = new Grid(10, 10);
        var debug = 1;
        var blocks = [
            {id: 1, data: {w: 4, h: 3}}
            , {id: 2, data: {w: 2, h: 3}}
            , {id: 3, data: {w: 2, h: 2}}
            , {id: 4, data: {w: 2, h: 1}}
            , {id: 5, data: {w: 2, h: 2}}
            , {id: 6, data: {w: 1, h: 3}}
            , {id: 7, data: {w: 1, h: 3}}
            , {id: 8, data: {w: 1, h: 3}}
            , {id: 9, data: {w: 1, h: 3}}
            , {id: 'A', data: {w: 2, h: 3}}
            , {id: 'B', data: {w: 4, h: 3}}
            , {id: 'C', data: {w: 3, h: 2}}
            , {id: 'D', data: {w: 3, h: 2}}
            , {id: 'E', data: {w: 3, h: 2}}
        ];
        s.show('start place block:');
        blocks.forEach(function(block){
            grid.placeBlock(block.id, block.data, debug);
        });
        s.append_show('grid:');
        s.append_show(
            grid.grid.map(function(row){
                return row.join('  ');
            })
            .join('\n')
        );

    })();

</div>
<div class="test-panel">
</div>
</div>

