# flink

> Apache Flink

* 相关技术概念：MapReduce、Spark、Storm
* Flink核心是一个流式的**数据流执行引擎**，它对数据流的分布式计算提供了**数据分布、数据通信以及容错机制**等功能
* 基于**流执行引擎**，Flink提供了**诸多更高抽象层的API**以便用户编写分布式任务：
    1. **DataSet API**，对静态数据进行批处理操作，将静态数据抽象成分布式的数据集，用户可以方便地使用Flink提供的各种操作符对分布式数据集进行处理，支持Java、Scala和Python
    2. **DataStream API**，对数据流进行流处理操作，将流式的数据抽象成分布式的数据流，支持Java和Scala
    3. **Table API**，对结构化数据进行查询操作，将结构化数据抽象成关系表，并通过类SQL的DSL对关系表进行各种查询操作，支持Java和Scale
* 此外，Flink还针对特定的应用领域提供了领域库，例如：
    * **Flink ML**，Flink的机器学习库
    * **Gelly**，Flink的图计算库
