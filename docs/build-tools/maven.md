# maven

## maven pom

**POM**( Project Object Model，**项目对象模型** ) 是 Maven 工程的**基本工作单元**，是一个**XML文件**，包含了项目的基本信息，用于描述项目如何构建，声明项目依赖，等等。

执行任务或目标时，Maven 会在**当前目录**中查找 POM。它读取 POM，获取所需的配置信息，然后执行目标。

POM 中可以指定以下配置：

* 项目依赖
* 插件
* 执行目标
* 项目构建 profile
* 项目版本
* 项目开发者列表
* 相关邮件列表信息

例子：
    <project xmlns = "http://maven.apache.org/POM/4.0.0"
        xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
        http://maven.apache.org/xsd/maven-4.0.0.xsd">

        <!-- 模型版本 -->
        <modelVersion>4.0.0</modelVersion>
        <!-- 公司或者组织的唯一标志，并且配置时生成的路径也是由此生成， 
            如com.companyname.project-group，maven会将该项目打成的jar包
            放本地路径：/com/companyname/project-group -->
        <groupId>com.companyname.project-group</groupId>

        <!-- 项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 -->
        <artifactId>project</artifactId>

        <!-- 版本号 -->
        <version>1.0</version>
    </project>

所有 POM 文件都需要 project 元素和三个必需字段：groupId，artifactId，version。

| 节点 | 描述
| project \
    | 工程的根标签。\
    |
| modelVersion \
    | 模型版本需要设置为 4.0。\
    |
| groupId \
    | 这是工程组的标识。它在一个组织或者项目中通常是唯一的。\
        例如，一个银行组织 \
            &#12288;`com.companyname.project-group`\
        拥有所有的和银行相关的项目。\
    |
| artifactId \
    | 这是工程的标识。它通常是工程的名称。例如，消费者银行。\
        groupId 和 artifactId 一起定义了 artifact 在仓库中的位置。\
    |
| version\
    |   这是工程的版本号。在 artifact 的仓库中，它用来区分不同的版本。例如：\
            &#12288;com.company.bank:consumer-banking:1.0\
            &#12288;com.company.bank:consumer-banking:1.1\
    |
