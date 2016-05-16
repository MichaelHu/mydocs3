# tick

> 脉搏


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## TickEaseIn

    @[data-script="javascript"]function TickEaseIn(begin, end, steps, type){
        var me = this;

        me.begin = begin;
        me.end = end;
        me.steps = steps;

        // type: 'quadratic|cubic'
        me.type = type || 'quadratic';
        me._currentStep = 1;
        me._currentValue = me.begin;
        me.initial = false;
    }

    TickEaseIn.prototype.step = function(){
        var me = this
            , delta
            , ret
            , begin = me.begin
            , end = me.end
            , _curStep = me._currentStep
            , steps = me.steps
            ; 

        if(!me.initial){
            me.initial = true;
            return me.begin;
        }

        if(me.isFinished()) {
            ret = null;
        }
        else {
            if('cubic' == me.type){
                delta = ( end - begin )
                    * ( 3 * Math.pow(_curStep, 2) - 3 * _curStep + 1 )
                    / Math.pow(steps, 3)
                    ;
            }
            else {
                delta = ( end - begin ) 
                    * ( 2 * _curStep - 1 ) 
                    / Math.pow(steps, 2);
            }
            if(me._currentStep == me.steps){
                me._currentValue = me.end;
            }
            else {
                me._currentValue += delta;
            }
            ret = me._currentValue;
        }
        me._currentStep++;
        return ret;
    };

    TickEaseIn.prototype.isFinished = function(){
        var me = this;
        if(me._currentStep > me.steps) {
            return true;
        }
        return false;
    };




<div id="test_10" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_10');
        s.show('tick ease in:');

        var xTick = new TickEaseIn(-100, 100, 20)
            , x
            ;
        
        while((x=xTick.step()) !== null){
            s.append_show(x);
        }

    })();

</div>
<div class="test-panel">
</div>
</div>



