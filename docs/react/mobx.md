# mobx

> changelog: 170426 todo

## Resources

* en: <https://mobx.js.org> cn: <http://cn.mobx.js.org>
* github: <https://github.com/mobxjs/mobx> <iframe src="http://258i.com/gbtn.html?user=mobxjs&repo=mobx&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>


## 设计哲学

> Anything that can be derived from the application state, should be derived. Automatically.

任何可从应用状态获取的东西都应该自动获得。




## 三条原则 ( Gist )

* 定义状态并使之可被观察( observable )

        import { observable } from 'mobx';

        var appState = observable( {
                timer: 0
            } );

* 创建一个响应状态变化的视图 

        import React from 'react';
        import ReactDOM from 'react-dom';
        import { observer } from 'mobx-react';

        @observer class TimerView extends React.Component {
            render() {
                return (
                    <button onClick={this.onReset.bind( this )}>
                    Seconds passed: {this.props.appState.timer}
                    </button>
                );
            }

            onReset() {
                this.props.appState.resetTimer();
            }
        };
        ReactDOM.render( <TimerView appState={appState} />, document.body );

* 修改状态，进入状态流转

        appState.resetTimer = action(function reset() {
            appState.timer = 0;
        });

        setInterval(action(function tick() {
            appState.timer += 1;
        }), 1000);


 <img src="./img/mobx-flow.png" style="max-height:500px"> 


