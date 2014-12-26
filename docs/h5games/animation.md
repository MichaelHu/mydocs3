# 动画


## 相关概念 

* `频率(Hz)`，刷新率，60Hz，每秒刷新60次，每次间隔1/60 s
* `动画持续时间(s)`，完成动画所需要的时间，比如2s
* `每一次脉冲完成量占总量的百分比` 

        1 / ( 动画时长(s) * 频率 )

* `脉冲器`，根据当前动画百分比进行绘制行为

    脉冲器实现举例如下：

        function impulse(percent, duration, render, callback){

            var steps = duration / 1000 * freq;

            if(percent < 1){
                if(1 - percent <= 1 / steps){
                    render(1);
                    callback && callback();
                    return;
                }

                render(percent); 
                setTimeout(function(){
                    impulse(percent + 1 / steps, duration, render, callback)
                }, 1000 / freq);
            } 
        }


