# task-scheduler

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/build/babel/babel.min.js"></script> 
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/sinon-3.2.1.js"></script>


## Features

* `复用`QA的测试用例，与QA测试用例的`更新`同步，QA必须可`参与`Task定义
* 每个`任务`为一个文件，任务id为`文件名`



## Tips

* input获取渠道，目前支持3种：`即时配置`、`依赖其他task`、`计算型配置`
* input到请求参数的转换
* input依赖通过分析配置参数，进行自动构建
* 先`创建`好task，再`按input`定义建立`依赖`关系
* 任务定义

        id              标识，全局唯一，改动有副作用
        desc            描述
        state           状态：WAITING, READY, EXECUTING, DONE
        dependencies    依赖项
        input           输入配置
        request         请求配置
        inputInfo       输入信息
        requestInfo     请求信息
        outputInfo      输出信息
        exec()          执行体，执行后进入EXECUTING状态
        init()          构建后进行初始化，主要包括依赖建立
        isInputReady()  输入是否ready
        addDeps()       添加依赖项



                   



## utils

from <ref://../graphics/canvas-network.md.html>

    @[data-script="babel-loose"]var utils = ( function() {

        function extend( target, ...sources ) {
            for ( let i = 0; i < sources.length; i++ ) {
                let source = sources[ i ];
                for ( let key in source ) {
                    if ( source.hasOwnProperty( key ) ) {
                        target[ key ] = source[ key ];
                    }
                }
            }
            return target;
        }

        function extendOnly( target, ...others ) {
            let len = others.length 
                , sources = [].slice.call( others, 0, len - 1 )
                , keys = others[ len - 1 ] 
                ;
            for ( let i = 0; i < sources.length; i++ ) {
                let source = sources[ i ];
                for ( let key in source ) {
                    if ( source.hasOwnProperty( key ) && keys.indexOf( key ) >= 0 ) {
                        target[ key ] = source[ key ];
                    }
                }
            }
            return target;
        }

        function defaults( target, ...sources ) {
            for ( let i = 0; i < sources.length; i++ ) {
                let source = sources[ i ];
                for ( let key in source ) {
                    if ( source.hasOwnProperty( key ) && target[ key ] == undefined ) {
                        target[ key ] = source[ key ];
                    }
                }
            }
            return target;
        }

        return {
            extend
            , extendOnly
            , defaults
        };

    } )();


## Dep

格式如下：

    {
        __type: 'DEP'
        , id: 'task-id'
        , ondone: function( taskOutput ) { ... }
    }

* `依赖配置对象`，是一个具有特定字段（`__type: 'DEP'`）的对象。满足该格式的对象，都认为是依赖配置对象。
* 依赖配置对象没有实现成一个`Dep class`，原因是：
    * 避免向用户暴露Dep类
    * 避免用户需要手动创建( new )新的Dep对象
    * 一些运行时的配置不方便在用户添加配置的时候传递到Dep的构造中，比如`prefix`字段
    * 只给用户暴露`纯对象`的配置，构建则在运行时进行，方便将运行上下文的信息带入


## EventTarget

    @[data-script="babel"]class _EventTarget {

        constructor() {
            this.observers = {};
        }

        addObserver( type, observer ) {
            let me = this, observers;

            observers = me.observers[ type ] 
                = me.observers[ type ] || []; 
            if ( typeof observer == 'function' ) {
                observers.push( observer );
            }
        }

        dispatch( type, params ) {
            let me = this, observers;

            observers = me.observers[ type ] 
                = me.observers[ type ] || []; 
            for ( let i = 0; i < observers.length; i++ ) {
                observers[ i ]( params, me );
            }
        }

    }
    var EventTarget = _EventTarget;


## Task

> 封装任务信息及相关操作的Task类

* 任务有`4个`状态: `WAITING`, `READY`, `EXECUTING`, `DONE`
* `操作`任务有`3个`独立的`步骤`：创建（`new`）、依赖构建（`addDeps`）、开始执行（`start`），`必须`所有任务都完成同一步骤后，才能进入下一个步骤。
* `start()`方法需要在所有task都`构建完毕`后再行调用
* 一般情况下，`无依赖`的task需要主动调用`start()`方法，有依赖的task可以不调用`start()`方法。为了避免用户在`未作依赖判断`的情况下，对所有task都调用start()方法，程序做了兼容


### 状态迁移

> 判断状态是否流转是，需要确保当前状态是否为合理状态，也即 `WAITING -> READY -> EXECUTING -> DONE` 4个状态必须按这个`先后顺序流转`，可能存在跳过某个状态，如READY，但是确保一定`不能逆序`。

    new                             进入WAITING状态
        WAITING     
    start
        -> isInputReady()           进入EXECUTING状态
        -> isDepInputReady()        进入READY状态
    ondone
        -> compute ondone fields
        -> isDepInputReady()        进入READY状态
    READY
        -> compute onready fields
        -> isInputReady()           进入EXECUTING状态
    EXECUTING
        -> compute request fields
        -> exec()               
    onsuccess or onerror            进入DONE状态
        DONE
            -> compute outputInfo
            -> dispatch `done` event

* 正常情况下，外部无法检测到`READY`状态的task，因为当WAITING态结束，进入READY后，在当前task进入EXECUTING状态前，`控制权`一直在当前task
* 如果能检测到`READY`状态的task，则表明该task的配置存在错误
* 外部`可以检测`到处于`WAITING`, `EXECUTING`以及`DONE`三个状态的task
                   
                   
### input配置

    {
        field1: 10                             // 基本数据字段，设置时确定

        /**
         * 函数字段，也称为onready字段
         * 当前task进入READY状态时，通过执行该函数，返回值作为对应字段的值
         * 该字段不能依赖其他函数字段
         * 函数中的this指向当前task
         */
        , field2: function( fields ) { ... }   

        /**
         * 依赖字段，也称为ondone字段
         * 依赖的task进入DONE状态时，通过执行ondone函数，返回值作为对应字段的值
         * 函数中的this指向当前task
         */
        , field3: {                            
            id: '...'
            , ondone: function( taskoutput ) { ... } 
            , __type: 'DEP' // __type字段标识该字段为依赖字段
        }
    }


### request配置

> 进入`EXECUTING`状态时确定

    {
        type: 'GET' | 'POST'
        , url: 'string' | function( inputInfo )
        , data: object  | function( inputInfo )
    }

其中字段为`function`类型时，其`返回值`作为对应字段的最终值，函数执行时`this`指向当前task。


### callback配置

> 请求成功／失败时的回调配置

    success     function( resp )
    error       function( resp ) 


### 代码实现

代码实现需要注意的点：

* 状态变化时，需要派发状态变化事件( `statechange` )，外部响应该事件时，确保外部获取到一致的任务状态
* 代码实现中`onready()`与`ready()`分开, `onexec()`与`exec()`分开实现，确保调用ready()后能将状态设置为`READY`，调用exec()后能将状态设置为`EXECUTING`
* 总的来说，能保证以下代码逻辑的正确性，也即控制台输出`true`：

        t1.addObserver( 'statechange', ( params, target ) => {
            console.log( target.state === params.state );
        } );
        t1.dispatch( 'statechange', { state: 'READY' } );

* 如果input的两个`不同字段`同时都依赖`同一个task`，需要`避免`该task`两次执行`onready

以下为代码实现：

    @[data-script="babel"]var Task = ( function() {

        let _tasks = {}
            ;

        const getById = id => {
            return _tasks[ id ];
        };

        const clear = () => {
            for( let key in _tasks ) {
                delete _tasks[ key ];
            }
        };
        const isTypeofDep = ( obj ) => {
            return obj && obj.__type == 'DEP';
        };


        class _Task extends EventTarget {

            /**
             * Create a Task
             * @param {string} id                           - task id
             * @param {Object} [options]                    - task options
             * @param {Object} options.request              - task request config 
             * @param {string|number} [options.prefix='']   - task id prefix，一般由TaskManager统一设置
             * @param {Object} [options.input]              - task input config
             * @param {Object} [options.callback]           - task request callback
             */
            constructor( id, options ) {
                super();
                let opt = utils.extend( {}, options )
                    , me = this
                    , input = utils.extend( {}, opt.input )
                    , request = utils.extend( {}, opt.request )
                    , callback = utils.extend( 
                        {
                            success: resp => resp
                            , error: ( xhr, textStatus, error ) => { throw error } 
                        }
                        , opt.callback 
                    )
                    , prefix = opt.prefix || ''
                    ;

                if ( typeof id != 'string' && typeof id != 'number' ) {
                    throw new Error( '_Task(): id must be of "string" or "number".' );
                }

                id = prefix + id;
                if ( _tasks[ id ] ) {
                    throw new Error( '_Task(): dumplicated id.' );
                }
                _tasks[ id ] = me;

                me.isTesting = opt.isTesting || false;
                me.prefix = prefix;
                me.id = id;
                me.input = input;
                me.request = request;
                me.inputInfo = {};
                me.requestInfo = {};
                me.callback = callback;
                me.outputInfo = {};
                me.dependencies = [];

                // init
                me.initInputInfo();
                me.state = 'WAITING';
            }

            initInputInfo() {
                let me = this
                    , input = me.input
                    , inputInfo = me.inputInfo
                    ;

                for ( let key in input ) {
                    // non-onready fields or non-ondone fields
                    if ( typeof input[ key ] != 'function'
                        && ! isTypeofDep( input[ key ] ) ) {
                        inputInfo[ key ] = input[ key ];
                    }
                }
            }

            addDeps() {
                let me = this
                    , input = me.input
                    , dependencies = me.dependencies
                    ;

                for ( let key in input ) {
                    if ( isTypeofDep( input[ key ] ) ) {
                        let dep = input[ key ];
                        let task = getById( me.prefix + dep.id );
                        if ( dependencies.indexOf( task ) < 0 ) {
                            dependencies.push( task );
                        }

                        ( ( k ) => {
                            task.addObserver( 'done', ( params ) => {
                                me.inputInfo[ k ] = dep.ondone.bind( me )( params );
                                if ( me.isDepInputReady() ) {
                                    me.onready();
                                }
                            } ); 
                        } )( key );
                    }
                }
            }

            start() {
                let me = this;

                if ( me.state != 'WAITING' ) {
                    return;
                }

                if ( me.isInputReady() ) {
                    me.onexec();
                }
                else if ( me.isDepInputReady() ) {
                    me.onready();
                }
            }

            onready() {
                let me = this;
                me.ready();
                me.state = 'READY';
                me.dispatch( 'statechange' );

                if ( me.isInputReady() ) {
                    me.exec();
                    me.state = 'EXECUTING';
                    me.dispatch( 'statechange' );
                }
            }

            ready() {
                let me = this
                    , input = me.input
                    , inputInfo = me.inputInfo
                    ;

                if ( me.state == 'EXECUTING' || me.state == 'DONE' ) {
                    return;
                }

                // compute onready fields
                for ( let key in input ) {
                    if ( typeof input[ key ] == 'function' ) {
                        inputInfo[ key ] = input[ key ].bind( me )( inputInfo );
                    }
                }
            }

            onexec() {
                let me = this;

                me.exec();
                me.state = 'EXECUTING';
                me.dispatch( 'statechange' );

                if ( me.isTesting ) {
                    let resp = { p: 123, room: 708 };
                    me.outputInfo = me.callback.success.bind( me )( resp );
                    me.state = 'DONE';
                    me.dispatch( 'statechange' );
                    me.dispatch( 'done', me.outputInfo );
                }
            }

            exec() {
                let me = this
                    , inputInfo = me.inputInfo
                    , request = me.request
                    , requestInfo = me.requestInfo
                    , callback = me.callback
                    ;

                for ( let key in request ) {
                    let item = request[ key ];
                    if ( typeof item == 'function' ) {
                        requestInfo[ key ] = item.bind( me )( inputInfo );
                    } 
                    else {
                        requestInfo[ key ] = item;
                    }
                }

                let settings = utils.extend( {}, requestInfo, callback ); 
                let oldSuccess = settings.success;
                let oldError = settings.error;
                settings.success = ( resp, textStatus, request ) => {
                    me.outputInfo = oldSuccess( resp, textStatus, request );
                    me.state = 'DONE';
                    me.dispatch( 'statechange' );
                    me.dispatch( 'done', me.outputInfo );
                };
                settings.error = ( xhr, textStatus, errorThrown ) => {
                    oldError( xhr, textStatus, errorThrown );
                    throw errorThrown;
                };
                $.ajax( settings.url, settings );

            }

            isInputReady() {
                let me = this
                    , input = me.input
                    , inputInfo = me.inputInfo
                    ;

                for ( let key in input ) {
                    if ( typeof inputInfo[ key ] == 'undefined' ) {
                        return false;
                    }
                } 
                return true;
            }

            isDepInputReady() {
                let me = this
                    , input = me.input
                    , inputInfo = me.inputInfo
                    ;

                for ( let key in input ) {
                    if ( isTypeofDep( input[ key ] ) 
                        && typeof inputInfo[ key ] == 'undefined' ) {
                        return false;
                    }
                } 
                return true;
            }

        }

        utils.extend( _Task, {
            getById
            , clear
            , isTypeofDep
        } );

        return _Task;

    } )();


### Task单测

<div id="test_task_ut" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="babel editable"](function(){

        var s = fly.createShow('#test_task_ut');
        let prefix = 'p' + Date.now() + '-';
        s.show( 'class Task testing...' );

        // 创建任务1
        let t1 = new Task( 'task-1', { isTesting: 1, prefix } ); 
        s.append_show( '\n t1 testing ...' );
        s.append_show( Task.getById( prefix + 'task-1' ) == t1, 'correct getById()' );
        s.append_show( t1.id == prefix + 'task-1', 'correct task.id ' + t1.id );
        s.append_show( t1.state == 'WAITING', 'correct task.state' );

        // 创建任务2
        let t2 = new Task( 'task-2', { isTesting: 1, prefix } ); 
        s.append_show( '\n t2 testing ...' );
        s.append_show( Task.getById( prefix + 'task-2' ) == t2, 'correct getById()' );
        s.append_show( t2.id == prefix + 'task-2', 'correct task.id ' + t2.id );
        s.append_show( t2.state == 'WAITING', 'correct task.state' );

        // 创建任务3
        let t3 = new Task( 'task-3', {
                input: {
                    name: 'hudamin'
                    , desc: ( fields ) =>  { 
                        return 'hello ' + fields.name 
                            + ', your password: ' + fields.password
                            + ', room: ' + fields.room
                            ; 
                    }
                    , password: { id: 'task-1', ondone: taskOutput => taskOutput.p + 123, __type: 'DEP' }
                    , room: { id: 'task-2', ondone: taskOutput => 'R-' + taskOutput.room, __type: 'DEP'  }
                }
                , request: {
                    type: 'POST'
                    , url: ( inputInfo ) => 'http://258i.com/phpapp/form-enctype.php?' + inputInfo.name
                    , data: ( inputInfo ) => { return { info: inputInfo.desc }; }
                }
                , callback: {}
                , isTesting: 1
                , prefix
            } );

        // 任务全部创建完毕，可以调用addDeps()方法构建依赖关系
        t1.addDeps();
        t2.addDeps();
        t3.addDeps();

        s.append_show( '\n t3 testing ...' );
        s.append_show( t3.id == prefix + 'task-3', 'correct task.id ' + t3.id );
        s.append_show( t3.isInputReady() === false, 't3.isInputReady() === false' );
        s.append_show( t3.isDepInputReady() === false, 't3.isDepInputReady() === false' );
        s.append_show( t3.inputInfo.name == 'hudamin', 't3.inputInfo.name == "hudamin"' );
        s.append_show( t3.inputInfo.desc == undefined, 't3.inputInfo.desc is undefined' );
        s.append_show( t3.inputInfo.password == undefined, 't3.inputInfo.password is undefined' );
        s.append_show( t3.inputInfo.room == undefined, 'correct inputInfo.room' );
        s.append_show( t1.observers[ 'done' ].length == 1, 'correct t1.observers length' );
        s.append_show( t2.observers[ 'done' ].length == 1, 'correct t2.observers length' );
        s.append_show( typeof t1.observers[ 'done' ][ 0 ] == 'function', 'correct observers' );
        s.append_show( typeof t2.observers[ 'done' ][ 0 ] == 'function', 'correct observers' );

        // 任务依赖关系全部构建完毕，可以调用start()方法启动任务
        t1.start();
        s.append_show( t1.state == 'DONE', 'correct t1.state after start' );
        s.append_show( t2.state == 'WAITING', 'correct t2.state after t1.start' );
        s.append_show( t3.state == 'WAITING', 'correct t3.state after t1.start' );

        s.append_show( 
            t3.isDepInputReady() === false
            , 't3.isDepInputReady() === false after t1 is done'
        );
        s.append_show( t3.inputInfo.password == 246, 't3.inputInfo.password == 246 when t1 is done' );
        s.append_show( 
            t3.inputInfo.room === undefined
            , 't3.inputInfo.room is undefined when t1 is done' 
        );
        s.append_show( 
            t3.inputInfo.desc === undefined
            , 't3.inputInfo.desc is undefined  when t1 is done' 
        );
        s.append_show(
            t3.requestInfo.url == undefined
            , 't3.requestInfo.url == undefined before exec()' 
        );
        s.append_show(
            t3.requestInfo.data == undefined
            , 't3.requestInfo.data == undefined before exec()'
        );

        t2.start();
        s.append_show( t1.state == 'DONE', 'correct t1.state after t2.start' );
        s.append_show( t2.state == 'DONE', 'correct t2.state after t2.start' );
        s.append_show( t3.state == 'EXECUTING', 'correct t3.state after t2.start' );

        s.append_show( 
            t3.isDepInputReady() === true
            , 't3.isDepInputReady() === true after t2 is done'
        );
        s.append_show( 
            t3.isInputReady() === true
            , 't3.isInputReady() === true after t2 is done'
        );
        s.append_show( t3.inputInfo.room === 'R-708', 't3.inputInfo.room == "R-708"  when t2 is done' );
        s.append_show(
            t3.inputInfo.desc == 'hello hudamin, your password: 246, room: R-708' 
            , 'correct t3.inputInfo.desc when ready'
        );
        s.append_show(
            t3.requestInfo.url == 'http://258i.com/phpapp/form-enctype.php?hudamin'
            , 't3.requestInfo.url == "http://258i.com/phpapp/form-enctype.php?hudamin"'
        );
        s.append_show(
            t3.requestInfo.data.info == 'hello hudamin, your password: 246, room: R-708'
            , 't3.requestInfo.data.info has correct value'
        );

        // 可有可无，程序能确保其调用位置无关
        t3.start();

    })();

</div>
<div class="test-panel">
</div>
</div>


### Task验证

<div id="test_tasks_1" class="test">
<div class="test-container">

    @[data-script="babel"](function(){

        var s = fly.createShow('#test_tasks_1');
        s.show( 'testing ...' );

        Task.clear();

        // 任务构建
        let t1 = new Task( 'task-10', {
                request: {
                    type: 'GET'
                    , url: 'http://258i.com/phpapp/cors-new.php' 
                }
                , callback: {
                    success: ( resp ) => {
                        s.append_show( 't1 request success', resp );
                        return resp;
                    }
                }
            } ); 

        let t2 = new Task( 'task-11', {
                input: {
                    name: {
                        id: 'task-10'
                        , ondone: ( outputInfo ) => { 
                            s.append_show( 
                                't2 inputInfo.name becomes valid after t1 is done'
                                , outputInfo.name 
                            );
                            return outputInfo.name;
                        }
                        , __type: 'DEP'
                    } 
                }
                , request: {
                    type: 'POST'
                    , url: 'http://258i.com/phpapp/form-enctype.php'
                    , data: inputInfo => inputInfo
                }
            } );

        // 依赖建立
        t1.addDeps();
        t2.addDeps();

        // 启动任务
        t1.start();

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




## TaskManager

### Features

* 统一`管理`从属于当前任务管理器的所有task实例，包括创建、依赖添加、启动
* 支持从构造函数的参数中获取配置，`批量`创建任务
* 可添加新创建任务（状态为`WAITING`）
* 识别任务`依赖网络`，计算相关网络信息 
* 依赖网络必须是`森林`，不能存在回路，实现过程中需要`避免`出现回路
* 通过`prefix`字段，为任务id添加前缀，以便支持`同一任务多次创建并执行`
    * `任务配置`字段中，`不必关心`prefix的影响，也即prefix对任务配置是`透明的`
            { id: 'task-1', options: ... }
    * `创建`任务时，只需`传入`prefix选项，传入的id参数`不必关心`prefix的设置
            new Task( 'task-1', { prefix: 'p1-' } )
    * 但`Task.getById( id )`需要考虑prefix的设置
            Task.getById( 'p1-task-1' )
* prefix字段`通常`由TaskManager设置，由`内部传递`给Task，而Task的配置中一般不包含prefix设置


### 代码实现

    @[data-script="babel"]class _TaskManager {

        /**
         * Create a TaskManager
         * @param {Object} options
         * @param {string|number} [options.prefix='']           - task id prefix
         * @param {function|null} [options.onstatechange=null]  - task id prefix
         * @param {Object[]} [options.taskConfigs]              - array of task config
         * @param {string} options.taskConfigs[].id             - task id
         * @param {Object} options.taskConfigs[].options        - task options
         */
        constructor( options ) {
            let opt = utils.extend( {}, options )
                , me = this
                , taskConfigs = opt.taskConfigs
                , prefix = opt.prefix || ''
                ;

            me.prefix = prefix;
            me.tasks = [];
            me.createTasks( taskConfigs, opt.onstatechange );
        }

        tasks( ids ) {}

        addTask( task ) {
            task && this.tasks.push( task );
        }

        createTasks( taskConfigs, onstatechange ) {
            let me = this
                , configs = taskConfigs || []
                ;

            configs.forEach( config => {
                let task = new Task( config.id, utils.extend( config.options, { prefix: me.prefix } ) );
                me.addTask( task );
                if ( typeof onstatechange == 'function' ) { 
                    task.addObserver( 'statechange', onstatechange );
                }
            } );

            return me;
        }

        addDeps() {
            let me = this;
            me.tasks.forEach( task => {
                task.addDeps();
            } );
            return me;
        }

        start() {
            let me = this;
            me.tasks.forEach( task => {
                task.start();
            } );
            return me;
        }

        onstatechange( params, target ) {
        }

        /**
         * get dependencies network, which is refered to as a graph 
         * @param {Object} [options]
         * @returns {Object} 
         *      {
         *          nodes: []
         *          , edges: []
         *      }
         */
        toGraph( options ) {
            let me = this
                , tasks = me.tasks
                , nodes = []
                , edges = []
                , edgeCount = 0
                ;
            tasks.forEach( ( task ) => {
                let node = utils.extendOnly( 
                        { x: null, y: null, size: 5 }
                        , task
                        , [ 'id', 'inputInfo', 'requestInfo' ]
                    );
                nodes.push( node );

                task.dependencies.forEach( ( dep ) => {
                    let edge = {
                            id: me.prefix + 'e' + edgeCount++
                            , source: dep.id
                            , target: task.id
                        };
                    edges.push( edge );
                } );
            } );

            return { nodes, edges };
       }

    }
    var TaskManager = _TaskManager;


### TaskManager单测

* `prefix`是否正确
* `tasks`有正确的长度
* `task`有正确的状态
* 被依赖task ( t1 )及task ( t2 )的事件按`串行顺序`派发：
        t1.EXECUTING - t1.DONE - t2.READY - t2.EXECUTING - t2.DONE
* 用于测试的3个任务具有如下`依赖`关系：
         (1)task-1   -------------->  (3)task-3
                |                         ^
                |                         |
                |-----> (2)task-2 ---------

<div id="test_task_manager_ut" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="babel editable"](function(){

        var s = fly.createShow('#test_task_manager_ut');
        s.show( 'start testing ...' );

        let taskConfigs = [
                {
                    id: 'task-1'
                    , options: {
                        request: {
                            type: 'GET'
                            , url: 'http://258i.com/phpapp/cors-new.php'
                        }
                        , callback: {
                            success: ( resp ) => {
                                s.append_show( 'task-1 request success', resp );
                                return resp;
                            }
                        }
                    }
                }

                , {
                    id: 'task-2'
                    , options: {
                        input: {
                            name: {
                                id: 'task-1'
                                , ondone: ( outputInfo ) => {
                                    s.append_show(
                                        'task-2 inputInfo.name becomes valid after task-1 is done'
                                        , outputInfo.name
                                    );
                                    return outputInfo.name;
                                }
                                , __type: 'DEP'
                            }
                            // 两个不同字段依赖同一个task
                            , name_2nd: {
                                id: 'task-1'
                                , ondone: ( outputInfo ) => {
                                    s.append_show(
                                        'task-2 inputInfo.name_2nd becomes valid after task-1 is done'
                                        , outputInfo.name
                                    );
                                    return outputInfo.name;
                                }
                                , __type: 'DEP'
                            }
                            , msg: ( fields ) => { return 'Hello, ' + fields.name; }
                        } 
                        , request: {
                            type: 'GET'
                            , url: 'http://258i.com/phpapp/cors-new.php'
                        }
                        , callback: {
                            success: ( resp ) => {
                                s.append_show( 'task-2 request success', resp );
                                return resp;
                            }
                        }
                    }
                }

                , {
                    id: 'task-3'
                    , options: {
                        input: {
                            name: {
                                id: 'task-1'
                                , ondone: ( outputInfo ) => {
                                    s.append_show(
                                        'task-3 inputInfo.name becomes valid after task-1 is done'
                                        , outputInfo.name
                                    );
                                    return outputInfo.name;
                                }
                                , __type: 'DEP'
                            }
                            , name_2nd: {
                                id: 'task-2'
                                , ondone: ( outputInfo ) => {
                                    s.append_show(
                                        'task-3 inputInfo.name becomes valid after task-2 is done'
                                        , outputInfo.name
                                    );
                                    return 'task-2-output';
                                }
                                , __type: 'DEP'
                            }
                        }
                        , request: {
                            type: 'POST'
                            , url: 'http://258i.com/phpapp/form-enctype.php'
                            , data: inputInfo => inputInfo
                        }
                    }
                }

            ];

        window.gTaskConfigs = taskConfigs;

        let prefix = 'p' + Date.now() + '-';
        let onstatechange = ( params, target ) => {
            s.append_show( '∆ statechange', target.id, target.state );
        };
        let tm = new TaskManager( { prefix, taskConfigs, onstatechange } );

        s.append_show( '\n after createTasks ...' );
        s.append_show( tm.prefix == prefix, 'tm.prefix is ' + prefix );
        s.append_show( tm.tasks.length == 3, 'tm.tasks.length is 2' );
        s.append_show( tm.tasks[ 0 ].state == 'WAITING', 'tm.tasks[ 0 ].state is "WAITING"' );
        s.append_show( tm.tasks[ 1 ].state == 'WAITING', 'tm.tasks[ 1 ].state is "WAITING"' );
        s.append_show( tm.tasks[ 2 ].state == 'WAITING', 'tm.tasks[ 2 ].state is "WAITING"' );

        tm = tm.addDeps();
        s.append_show( '\n after addDeps ...' );
        s.append_show( tm.tasks[ 0 ].state == 'WAITING', 'tm.tasks[ 0 ].state is "WAITING"' );
        s.append_show( tm.tasks[ 1 ].state == 'WAITING', 'tm.tasks[ 1 ].state is "WAITING"' );
        s.append_show( tm.tasks[ 2 ].state == 'WAITING', 'tm.tasks[ 2 ].state is "WAITING"' );
        s.append_show( tm.tasks[ 0 ].observers[ 'done' ].length == 3, 'tm.tasks[ 0 ].observers[ "done" ].length is 3' );

        s.append_show( '\n after start ...' );
        tm = tm.start();

    })();

</div>
<div class="test-panel">
</div>
</div>


### 依赖图谱验证

图谱信息跟随任务状态变化而变化。

<div id="test_task_manager_tograph" class="test">
<div class="test-container">

    @[data-script="babel editable"](function(){

        var s = fly.createShow('#test_task_manager_tograph');
        s.show( 'start testing ...' );

        let taskConfigs = window.gTaskConfigs;
        let prefix = 'p' + Date.now() + '-';
        let onstatechange = ( params, target ) => {
                s.append_show( '\n statechange', target.id, target.state );
                s.append_show( tm.toGraph() );
            };

        let tm = new TaskManager( { prefix, taskConfigs, onstatechange } ); 
        tm.addDeps().start();

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




