# gradle

> 中文含义`摇篮`，icon为一只大象🐘

## Resources

* site: <https://gradle.org>
* releases: <https://gradle.org/releases/>


## Features

* 构建一切
* 自动化一切
* 提高交付速度



## Versions

* 2017-06-14 4.0


## Installations

> only requirements: `JDK / JRE 7+`

三种命令行安装方式：

    # SDKMAN!
    $ sdk install gradle 4.0

    # Homebrew
    $ brew update && brew install gradle
    Updating Homebrew...
    ==> Auto-updated Homebrew!
    Updated 1 tap (homebrew/core).
    ==> Updated Formulae
    aws-sdk-cpp                       freeipmi                          zstd
    awscli                            kube-aws
    ejabberd                          rbenv-bundler-ruby-version

    ==> Using the sandbox
    ==> Downloading https://services.gradle.org/distributions/gradle-4.0-all.zip
    ==> Downloading from https://downloads.gradle.org/distributions/gradle-4.0-all.zip
    ######################################################################## 100.0%
    🍺  /usr/local/Cellar/gradle/4.0: 169 files, 71.8MB, built in 17 minutes 46 seconds

    # Scoop ( for Windows )
    $ scoop install gradle

或手动安装：

    $ curl -O https://services.gradle.org/distributions/gradle-4.0-all.zip
    $ unzip ... 
    $ ls
    LICENSE  NOTICE  bin  getting-started.html  init.d  lib  media
    $ export PATH=$PATH:/path/to/gradle-4.0/bin  
    $ gradle -v

使用Gradle Wrapper更新：

    $ ./gradlew wrapper --gradle-version=4.0 --distribution-type=bin
    
    

## Gradle Wrapper

> `Gradle Wrapper`之于`Gradle`类似`nvm`之于`node + npm`

### Features

* 支持特定构建使用特定的Gradle版本
* 方便切换Gradle版本，比如切换回旧的版本，构建老版本的software

### Usage

在项目根目录执行： 

    $ ./gradlew <task>

每个Wrapper都绑定指定的Gradle版本，执行以上命令时，若指定版本的Gradle尚未安装，则会自动下载，然后再执行task

    $ gradle wrapper --gradle-version 2.0
    :wrapper

    BUILD SUCCESSFUL

    Total time: 1secs

> 注意`gradle wrapper` 与 `./gradlew wrapper`的区别，一个是`创建`wrapper，一个是`更新`wrapper

通过`wrapper` task，可以在当前目录下生成一个新的wrapper文件组织，该wrapper封装了`--gradle-version`设置的版本号对应的gradle，若未指定`--gradle-version`，则默认封装调用wrapper task的Gradle的版本。

指定gradle版本还可以通过配置文件`build.gradle`对wrapper进行配置：

    task wrapper( type: Wrapper ) {
        gradleVersion = '2.0'
    }

执行成功wrapper task后，将会在当前目录下获得如下`wrapper文件组织`：

    gradlew
    gradlew.bat
    gradle/wrapper/
        gradle-wrapper.jar
        gradle-wrapper.properties

以上这些文件都提交至代码仓库。若要更改wrapper的gradle版本，可以修改`gradle-wrapper.properties`文件即可。



## Building Java Libraries

> Build Init Plugin: <https://docs.gradle.org/current/userguide/build_init_plugin.html>

### 关键词 

* JVM Library，可以被其他JVM Library或app使用
* `Build Init plugin`，是一个`内建`（ built-in ）的插件，实现了`init` task，该task会调用另外一个内建`wrapper` task，来创建一个新的Gradle Wrapper
* init types: 
        pom
        java-application
        java-library
        scala-library
        groovy-library
        groovy-application
        basic
* `jcenter` dependency repositoty


### 过程描述

    $ mkdir building-java-libraries
    $ cd building-java-libraries
    $ gradle init --type java-library
    $ ./gradlew build
    # 执行过的task名称以冒号为前缀，可再单独调用，比如`./gradlew jar`
    :compileJava
    :processResources NO-SOURCE
    :classes
    :jar
    :assemble
    :compileTestJava
    :processTestResources NO-SOURCE
    :testClasses
    :test
    :check
    :build 
    $ jar tf build/libs/building-java-libraries.jar
    META-INF/
    META-INF/MANIFEST.MF
    Library.class





## .gradle构建语言

> 或称`DSL`

Gradle scripts == configuration scripts

    Type of script                  Delegates to instance of
    -------------------------------------------------------------------
    Build script                    Project
    Init script                     Gradle
    Setting script                  Settings


Statements

Script blocks ( configuration closure parameter )

    allprojects {}
    artifacts {}
    buildscript {}
    configurations {}
    dependencies {}
    repositories {}
    sourceSets {}
    subprojects {}
    publishing {}








