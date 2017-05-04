# trackable

> 用于理解react生命周期、redux数据流，帮助进行性能优化以及代码调试

部署
* 继承Trackable
* 构造函数以及其他生命周期函数，必须在起始处调用父类对应函数
* 构造函数传递`_replay_name`, `_replay_ref`参数，`_replay_ref`参数如果指定的是`dom`可以不传

规则
* 避免不必要的render，`默认`配置只可视化`显示render事件`

