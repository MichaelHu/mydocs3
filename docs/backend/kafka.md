# kafka
> Apache Kafka

* Kafka是由**Apache软件基金会**开发的一个开源**流处理平台**，是一种**高吞吐量**的**分布式发布订阅消息系统**，具有如下特性：
    * 通过O(1)的**磁盘数据结构**提供消息的持久化，这种结构对于即使数TB的消息存储也能够保持长时间的稳定性能
    * **高吞吐量**：即使非常普通的硬件，Kafka也可以支持**每秒数百万**的消息
    * 支持通过Kafka服务器和**消费机集群**来分区消息
    * 支持Hadoop的**并行数据加载**
* Kafka的目的是通过**Hadoop**的**并行加载机制**来统一线上和离线的消息处理，也是为了通过**集群**来提供实时的消息
* 图解 kafka 的高可用机制 <https://www.jianshu.com/p/ff296d51385a>

## 术语介绍

* **Broker**：**Kafka集群**包含一个或多个服务器，这种服务器被称为broker
* **Topic**：每条发布到Kafka集群的消息都有一个类别，这个类别被称为Topic。（物理上不同Topic的消息分开存储，逻辑上一个Topic的消息虽然保存于一个或多个broker上但用户只需指定消息的Topic即可生产或消费数据而不必关心数据存于何处）
* **Partition**：Partition是物理上的概念，每个Topic包含一个或多个Partition
* **Producer**：负责发布消息到Kafka broker
* **Consumer**：消息消费者，向Kafka broker读取消息的客户端
* **Consumer Group**：每个Consumer属于一个特定的Consumer Group（可为每个Consumer指定group name，若不指定group name则属于默认的group）
