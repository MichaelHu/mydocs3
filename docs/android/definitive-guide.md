# definitive-guide

> 「 Android开发权威指南 」书摘

> changelog: 170819, 170630


## Keywords

    parcel          包裹
    parcelable      可打包的
    ADB             Android Debug Bridge，调试桥
    DDMS            Dalvik Debug Monitor Service，Dalvik虚拟机调试监控服务           
    logcat



## Versions

* Android Studio 2.3.2
* Gradle 3.3. （奇怪的版本号）



## Layout文件

> `activity_quiz.xml`

    可使用组件名作为XML节点，并为其配置相关属性

        LinearLayout
        TextView
        Button

        <Button ... />

    属性：

        android:layout_width
            match_parent
        android:layout_height
            wrap_content
            match_parent
            fill_parent

        android:layout_weight="1"

        tools:context="com.bignerdranch..."
        tools:text="..."

        android:layout_alignParentBottom="true"
        android:layout_alignParentTop="true"
        android:layout_alignParentLeft="true"
        android:layout_alignParentRight="true"
        android:layout_centerInParent="true"

        android:layout_above="@+id/btn"

        android:layout_marginBottom="50dp"
        android:layout_marginLeft="45dp"

        android:background="#999"

        android:padding="24dp"
            dp: density-independent pixel，我理解类似css的逻辑像素

        android:tag="help_title"

        android:scaleType="centerCrop"
            图片裁剪

        android:orientation="vertical"
            特定LinearLayout
            LinearLayout显示顺序与其定义顺序有关 

        android:text
            字符串资源的引用，而不是字符串
            使用字符串资源，方便应用本地化

        android:gravity="center"

        android:textSize="12dp"
        android:textStyle="bold"

        android:divider="@null"
        android:fadingEdge="vertical"
        android:fadingEdgeLength="10dp"
        android:listSelector="@android:color/transparent"
        android:overScrollMode="never"
        android:requiresFadingEdge="vertical"
        android:lineSpacingExtra

        android:onClick="onClick"


## 资源文件

    字符串资源：strings.xml
        位置：app/res/values/strings.xml
        引用方式：@string/false_button
            @<类型>/<资源名称>

        可以用预览工具预览

        转义：\', \n等

        文件内容一览：
        <resources>
            <string name="app_name">GeoQuiz</string>
            <string name="question_text">
                Constantinople is largest city in Turkey.
            </string>
            <string name="true_button">TRUE</string>
            <string name="false_button">FALSE</string>
        </resources>

    其他资源文件
        colors.xml
            app/res/values/colors.xml

        styles.xml
            app/res/values/styles.xml


    所有资源文件都存在 app/res 下
        app/res/values
        app/res/layout
            app/res/layout/activity_quiz.xml 
            资源ID引用方式：R.layout.activity_quiz
        

## Gradle构建工具

    命令行方式，利于自动化
        $ cd project/directory
        # 显示可用任务
        $ ./gradlew tasks 
        # 安装应用到连接设备上，但不启动
        $ ./gradlew installDebug

    Android Studio底层使用Gradle命令行

### Gradle命令行

第一次运行`./gradlew tasks`，会`download`很多的`.pom`文件，会安装很多依赖包，最终输出：

    $ ./gradlew tasks

        ------------------------------------------------------------
        All tasks runnable from root project
        ------------------------------------------------------------

        Android tasks
        -------------
        androidDependencies - Displays the Android dependencies of the project.
        signingReport - Displays the signing info for each variant.
        sourceSets - Prints out all the source sets defined in this project.

        Build tasks
        -----------
        assemble - Assembles all variants of all applications and secondary packages.
        assembleAndroidTest - Assembles all the Test applications.
        assembleDebug - Assembles all Debug builds.
        assembleRelease - Assembles all Release builds.
        build - Assembles and tests this project.
        buildDependents - Assembles and tests this project and all projects that depend on it.
        buildNeeded - Assembles and tests this project and all projects it depends on.
        clean - Deletes the build directory.
        cleanBuildCache - Deletes the build cache directory.
        compileDebugAndroidTestSources
        compileDebugSources
        compileDebugUnitTestSources
        compileReleaseSources
        compileReleaseUnitTestSources
        mockableAndroidJar - Creates a version of android.jar that's suitable for unit tests.

        Build Setup tasks
        -----------------
        init - Initializes a new Gradle build. [incubating]
        wrapper - Generates Gradle wrapper files. [incubating]

        Help tasks
        ----------
        buildEnvironment - Displays all buildscript dependencies declared in root project 'MyApplication2'.
        components - Displays the components produced by root project 'MyApplication2'. [incubating]
        dependencies - Displays all dependencies declared in root project 'MyApplication2'.
        dependencyInsight - Displays the insight into a specific dependency in root project 'MyApplication2'.
        dependentComponents - Displays the dependent components of components in root project 'MyApplication2'. [incubating]
        help - Displays a help message.
        model - Displays the configuration model of root project 'MyApplication2'. [incubating]
        projects - Displays the sub-projects of root project 'MyApplication2'.
        properties - Displays the properties of root project 'MyApplication2'.
        tasks - Displays the tasks runnable from root project 'MyApplication2' (some of the displayed tasks may belong to subprojects).

        Install tasks
        -------------
        installDebug - Installs the Debug build.
        installDebugAndroidTest - Installs the android (on device) tests for the Debug build.
        uninstallAll - Uninstall all applications.
        uninstallDebug - Uninstalls the Debug build.
        uninstallDebugAndroidTest - Uninstalls the android (on device) tests for the Debug build.
        uninstallRelease - Uninstalls the Release build.

        Verification tasks
        ------------------
        check - Runs all checks.
        connectedAndroidTest - Installs and runs instrumentation tests for all flavors on connected devices.
        connectedCheck - Runs all device checks on currently connected devices.
        connectedDebugAndroidTest - Installs and runs the tests for debug on connected devices.
        deviceAndroidTest - Installs and runs instrumentation tests using all Device Providers.
        deviceCheck - Runs all device checks using Device Providers and Test Servers.
        lint - Runs lint on all variants.
        lintDebug - Runs lint on the Debug build.
        lintRelease - Runs lint on the Release build.
        test - Run unit tests for all variants.
        testDebugUnitTest - Run unit tests for the debug build.
        testReleaseUnitTest - Run unit tests for the release build.

        To see all tasks and more detail, run gradlew tasks --all

        To see more detail about a task, run gradlew help --task <task>

        BUILD SUCCESSFUL

        Total time: 6 mins 59.888 secs

    $ ./gradlew help

        Welcome to Gradle 3.3.
        To run a build, run gradlew <task> ...
        To see a list of available tasks, run gradlew tasks
        To see a list of command-line options, run gradlew --help
        To see more detail about a task, run gradlew help --task <task> 

    $ ./gradlew androidDependencies

        ...

    $ ./gradlew signingReport

        Variant: releaseUnitTest
        Config: none
        ----------
        Variant: debug
        Config: debug
        Store: /Users/hudamin/.android/debug.keystore
        Alias: AndroidDebugKey
        MD5: FD:E3:32:7E:79:D6:5B:51:83:A4:CA:74:C9:81:C1:72
        SHA1: E9:CB:A2:65:DA:71:6C:71:23:56:7C:C4:74:A3:C3:04:EA:15:1A:A0
        Valid until: 2047年6月20日 星期四
        ----------
        Variant: debugAndroidTest
        Config: debug
        Store: /Users/hudamin/.android/debug.keystore
        Alias: AndroidDebugKey
        MD5: FD:E3:32:7E:79:D6:5B:51:83:A4:CA:74:C9:81:C1:72
        SHA1: E9:CB:A2:65:DA:71:6C:71:23:56:7C:C4:74:A3:C3:04:EA:15:1A:A0
        Valid until: 2047年6月20日 星期四
        ----------
        Variant: release
        Config: none
        ----------
        Variant: debugUnitTest
        Config: debug
        Store: /Users/hudamin/.android/debug.keystore
        Alias: AndroidDebugKey
        MD5: FD:E3:32:7E:79:D6:5B:51:83:A4:CA:74:C9:81:C1:72
        SHA1: E9:CB:A2:65:DA:71:6C:71:23:56:7C:C4:74:A3:C3:04:EA:15:1A:A0
        Valid until: 2047年6月20日 星期四
        ----------

        BUILD SUCCESSFUL

        Total time: 1.078 secs

    $ ./gradlew properties

        ------------------------------------------------------------
        Root project
        ------------------------------------------------------------

        allprojects: [root project 'MyApplication2', project ':app']
        ant: org.gradle.api.internal.project.DefaultAntBuilder@6b86e3b1
        antBuilderFactory: org.gradle.api.internal.project.DefaultAntBuilderFactory@4e087069
        artifacts: org.gradle.api.internal.artifacts.dsl.DefaultArtifactHandler_Decorated@451c15ac
        asDynamicObject: DynamicObject for root project 'MyApplication2'
        attributesSchema: org.gradle.api.internal.attributes.DefaultAttributesSchema_Decorated@1b81e1bd
        baseClassLoaderScope: org.gradle.api.internal.initialization.DefaultClassLoaderScope@47461217
        buildDir: /Users/hudamin/AndroidStudioProjects/MyApplication2/build
        buildFile: /Users/hudamin/AndroidStudioProjects/MyApplication2/build.gradle
        buildScriptSource: org.gradle.groovy.scripts.UriScriptSource@4ac0a9ae
        buildscript: org.gradle.api.internal.initialization.DefaultScriptHandler@6f54642f
        childProjects: {app=project ':app'}
        class: class org.gradle.api.internal.project.DefaultProject_Decorated
        classLoaderScope: org.gradle.api.internal.initialization.DefaultClassLoaderScope@7bccec71
        clean: task ':clean'
        components: []
        configurationActions: org.gradle.configuration.project.DefaultProjectConfigurationActionContainer@c6d9fb5
        configurations: []
        convention: org.gradle.api.internal.plugins.DefaultConvention@43afca4f
        defaultTasks: []
        deferredProjectConfiguration: org.gradle.api.internal.project.DeferredProjectConfiguration@f16ab09
        dependencies: org.gradle.api.internal.artifacts.dsl.dependencies.DefaultDependencyHandler_Decorated@13a571fe
        depth: 0
        description: null
        displayName: root project 'MyApplication2'
        ext: org.gradle.api.internal.plugins.DefaultExtraPropertiesExtension@7355c408
        extensions: org.gradle.api.internal.plugins.DefaultConvention@43afca4f
        fileOperations: org.gradle.api.internal.file.DefaultFileOperations@4e95959f
        fileResolver: org.gradle.api.internal.file.BaseDirFileResolver@74e121a7
        gradle: build 'MyApplication2'
        group:
        identityPath: :
        inheritedScope: org.gradle.api.internal.ExtensibleDynamicObject$InheritedDynamicObject@4c739444
        logger: org.gradle.internal.logging.slf4j.OutputEventListenerBackedLogger@115b6c46
        logging: org.gradle.internal.logging.services.DefaultLoggingManager@73003a9f
        modelRegistry: org.gradle.model.internal.registry.DefaultModelRegistry@e11c141
        modelSchemaStore: org.gradle.model.internal.manage.schema.extract.DefaultModelSchemaStore@5e10b573
        module: org.gradle.api.internal.artifacts.ProjectBackedModule@36119476
        name: MyApplication2
        org.gradle.jvmargs: -Xmx1536m
        parent: null
        parentIdentifier: null
        path: :
        pluginManager: org.gradle.api.internal.plugins.DefaultPluginManager_Decorated@14e3dbab
        plugins: [org.gradle.api.plugins.HelpTasksPlugin@6f1b0bd6]
        processOperations: org.gradle.api.internal.file.DefaultFileOperations@4e95959f
        project: root project 'MyApplication2'
        projectDir: /Users/hudamin/AndroidStudioProjects/MyApplication2
        projectEvaluationBroadcaster: ProjectEvaluationListener broadcast
        projectEvaluator: org.gradle.configuration.project.LifecycleProjectEvaluator@6645df6a
        projectPath: :
        projectRegistry: org.gradle.api.internal.project.DefaultProjectRegistry@665e112a
        properties: {...}
        repositories: [org.gradle.api.internal.artifacts.repositories.DefaultMavenArtifactRepository_Decorated@3d3e9bbf]
        resources: org.gradle.api.internal.resources.DefaultResourceHandler@378a2130
        rootDir: /Users/hudamin/AndroidStudioProjects/MyApplication2
        rootProject: root project 'MyApplication2'
        scriptHandlerFactory: org.gradle.api.internal.initialization.DefaultScriptHandlerFactory@7ffc0624
        scriptPluginFactory: org.gradle.configuration.ScriptPluginFactorySelector@693d9fb0
        serviceRegistryFactory: org.gradle.internal.service.scopes.ProjectScopeServices$4@2017124b
        services: ProjectScopeServices
        standardOutputCapture: org.gradle.internal.logging.services.DefaultLoggingManager@73003a9f
        state: project state 'EXECUTED'
        status: release
        subprojects: [project ':app']
        tasks: [task ':clean', task ':properties']
        version: unspecified

        BUILD SUCCESSFUL

        Total time: 1.005 secs

    $ ./gradlew buildEnvironment
        ...

    $ ./gradlew build
        ...

    # 如果连接了USB设备，则会往USB设备安装apk
    $ ./gradlew installDebug

    $ find . -type f | grep '.apk'
        ./app/build/outputs/apk/app-debug.apk
        ./app/build/outputs/apk/app-release-unsigned.apk


构建的`.apk`文件在`./app/build/outputs/apk/`目录下


### 相关Gradle脚本

    $ find . -type f | grep -E 'gradle|proguard|local'

        .idea/gradle.xml
        app/build.gradle
        app/proguard-rules.pro
        build.gradle
        gradle/wrapper/gradle-wrapper.jar
        gradle/wrapper/gradle-wrapper.properties
        gradle.properties
        local.properties
        settings.gradle


### Gradle版本问题

从`ant ADT`项目迁移至`Android Studio 2.3.2`，执行`./gradlew installDebug`不成功，报以下错误：

    Installing APK 'app-debug.apk' on 'HUAWEI TIT-AL00 - 5.1' for app:debug
    E/1908033842: Error while uploading app-debug.apk : Unknown failure ([CDS]close[0])

解决办法，做以下`3处`更新，再执行`./gradlew installDebug`。

    1. 
    gradle-2.14.1-all.zip => gradle-3.3-all.zip

    2. 
    dependencies {
        classpath 'com.android.tools.build:gradle:2.2.0'
    }

            | | |

    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.2'
    }

    3. 
    distributionUrl=https\://services.gradle.org/distributions/gradle-2.14.1-all.zip

            | | |

    distributionUrl=https\://services.gradle.org/distributions/gradle-3.3-all.zip

* 项目迁移，默认生成的Gradle Script`不一定`和Android Studio`匹配`
* 安装apk到连接的设备，`Android Studio`可以成功，`./gradlew installDebug`不一定成功
* 更新`Gradle Wrapper`能解决安装不成功的问题


### Gradle语法

<ref://../build-tools/gradle.md.html>


### 新概念

    java增量编译
    ABIs - Android设备的CPU类型
        armeabiv-v7a
        arm64-v8a
        armeabi
        x86
        x86-64

    NDK - Android SDK
        .so文件
        如果项目中使用了NDK，它将会生成.so文件
    ANDROID_NDK_HOME








## 开发工具视图 for Android Studio

    Android项目视图
    Project视图

        在Project视图下可以查看到资源ID，8位16进制数，是一个int类型

        app/build/generated/source/r/debug -> R.java
        
        // R.java
        ...
        public final class R {
            public static final class layout {
                ...
                public static final int activity_quiz = 0x7f030017;
            }
            ...
            public static final class string {
                ...
                public static final int app_name = 0x7f0a0010;
            }
        }


### R.java

    $ find . -type f -name "R.java"
        ./app/build/generated/source/r/androidTest/debug/android/app/R.java
        ./app/build/generated/source/r/androidTest/debug/android/support/test/espresso/idling/R.java
        ./app/build/generated/source/r/androidTest/debug/android/support/test/espresso/R.java
        ./app/build/generated/source/r/androidTest/debug/android/support/test/R.java
        ./app/build/generated/source/r/androidTest/debug/android/support/test/rule/R.java
        ./app/build/generated/source/r/androidTest/debug/com/example/hudamin/myapplication/test/R.java
        ./app/build/generated/source/r/debug/android/support/compat/R.java
        ./app/build/generated/source/r/debug/android/support/constraint/R.java
        ./app/build/generated/source/r/debug/android/support/coreui/R.java
        ./app/build/generated/source/r/debug/android/support/coreutils/R.java
        ./app/build/generated/source/r/debug/android/support/fragment/R.java
        ./app/build/generated/source/r/debug/android/support/graphics/drawable/animated/R.java
        ./app/build/generated/source/r/debug/android/support/graphics/drawable/R.java
        ./app/build/generated/source/r/debug/android/support/mediacompat/R.java
        ./app/build/generated/source/r/debug/android/support/v4/R.java
        ./app/build/generated/source/r/debug/android/support/v7/appcompat/R.java
        ./app/build/generated/source/r/debug/com/example/hudamin/myapplication/R.java
        ./app/build/generated/source/r/release/android/support/compat/R.java
        ./app/build/generated/source/r/release/android/support/constraint/R.java
        ./app/build/generated/source/r/release/android/support/coreui/R.java
        ./app/build/generated/source/r/release/android/support/coreutils/R.java
        ./app/build/generated/source/r/release/android/support/fragment/R.java
        ./app/build/generated/source/r/release/android/support/graphics/drawable/animated/R.java
        ./app/build/generated/source/r/release/android/support/graphics/drawable/R.java
        ./app/build/generated/source/r/release/android/support/mediacompat/R.java
        ./app/build/generated/source/r/release/android/support/v4/R.java
        ./app/build/generated/source/r/release/android/support/v7/appcompat/R.java
        ./app/build/generated/source/r/release/com/example/hudamin/myapplication/R.java



### 目录结构

    .gitignore
    .gradle
    .idea
    app
        .gitignore
        app.iml
        build
            generated
            intermediates
            outputs
            reports
            test-results
            tmp
        build.gradle
        libs
        proguard-rules.pro
        src
            androidTest
            main
                AndroidManifest.xml
                java/com/example/hudamin/myapplication/MainActivity.java
                res/layout/activity_main.xml
                res/mipmap-hdpi/ic_launcher.png
                res/mipmap-hdpi/ic_launcher_round.png
                res/mipmap-mdpi/ic_launcher.png
                res/mipmap-mdpi/ic_launcher_round.png
                res/mipmap-xhdpi/ic_launcher.png
                res/mipmap-xhdpi/ic_launcher_round.png
                res/mipmap-xxhdpi/ic_launcher.png
                res/mipmap-xxhdpi/ic_launcher_round.png
                res/mipmap-xxxhdpi/ic_launcher.png
                res/mipmap-xxxhdpi/ic_launcher_round.png
                res/values/colors.xml
                res/values/strings.xml
                res/values/styles.xml
            test
    build
    build.gradle
    gradle
    gradle.properties
    gradlew
    gradlew.bat
    local.properties
    MyApplication2.iml
    settings.gradle
    

默认创建了git仓库




## 使用组件

    引用字符串的资源ID：

        setTitle( R.string.app_name );

    资源引用方式：
        R.<类型>.<资源名称>

    为组件生成资源ID：

        添加android:id属性，`+`前缀

        <Button
            android:id="@+id/true_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/true_button" />


    添加Button类型的成员变量：
        private Button mTrueButton;

        Error: Cannot resolve symbol 'Button'

        // 也可使用快捷键Option + Return ( 或Alt + Enter )来让IDE自动导入
        import android.widget.Button;



    一些不成熟的理解
                
        Web                             Android
        ---------------------------------------------------------
        HTML                            Layout
        DOM                             Activity
        document.getElementById         Activity.findViewById


    public View findViewById( int id )

    // 赋值成员变量
    mTrueButton = ( Button ) findViewById( R.id.true_button );

    View.OnClickListener监听器接口

    mTrueButton.setOnClickListener( new OnClickListener() {
        @override
        public void onClick( View v ) {
            ...
        }
    } );

    提供一个匿名内部类( annonymous inner class )的实例作为参数。同JS的匿名函数类似。
        this                // 匿名类实例
        QuizActivity.this   // 外部QuizActivity类的实例





    toast提示消息

        // 通过context才能获取到对应的资源
        public static Toast makeText( Context context, int resId, int duration )
        Toast.show()

        Toast.makeText( QuizActivity.this
            , R.string.correctly_toast
            , Toast.LENGTH_SHORT
        ).show();



    Activity是Context的子类

    Android Studio代码补全功能，会自动添加类引用


    DDMS - LogCat
        NullPointerException





## Android编译过程

    .apk
        资源文件
        代码文件
        AndroidManifest.xml （ 应用元数据 ），用于向Android操作系统描述应用

    .apk若要在模拟器上运行，需要以`debug key`签名。
    分发给用于安装运行，需要以`release key`签名


### 编译流程图


                            AndroidManifest.xml     gen/            src/
                            ------------------          R.java          QuizActivity.java
                                  |               --------------    ---------------------
                                  |                   ^      |            |
                                  |                   |      |            |
                                  |                   |      |            |
        res/                      |                   |      |            |
            activity_quiz.xml     |                   |      |            |
            strings.xml           |                   |      |            | 
        ---------------------     |                   |      |                 
                    |             |      |-------------      |->  编译java源码
                    |             |      |                        -----------
                    |             |      |                             | 
                    |             |      |                             | 
                    |             |      |                             | 
                    |             |      |              java字节码  <--|
                    |             |      |            --------------
                    |             |      |                  |
                                  |      |                  |
               资源打包工具 <------|      |                   
                  (aapt)    |-------------           交叉编译以支持在
              -------------                          dalvik虚拟机上运行
                    |                                ------------------
                    |                                       |              
                    |                                       |             
                    |                                       |            
                    |                                       |           
                    |                                       | 
                                                            |
                已编译资源          dalvik字节码(.dex) <-----|
                ----------          -----------------
                    |                       | 
                    |                       | 
                    |     ------------------| 
                    |     |         
                    |     |        
                    |     |       

                创建并签署apk |  -------->  Android应用包(apk) | -----> 安装应用并运行
               ---------------             -------------------          --------------


> `activity_quiz.xml`布局资源文件的内容如何转变为View`对象`？

    // 将布局文件和java代码关联起来
    public void setContentView( int layoutResID )
    
调用`QuizActivity`的以上方法时，内部使用`LayoutInflater`类实例化布局文件中定义的每一个`View对象`。



## 发布apk准备工作

    加密密钥，签署应用参考 <https://developer.android.com/tools/publishing/app-signing.html>
        开发者持有私钥的证书进行数字签署
        目的是识别应用作者和确定应用之间信任关系
        必须有效期在2033年10月22日后

    应用图标，参考图标指南 <https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html>
    发布apk的准备工作：<https://developer.android.com/studio/publish/preparing.html>
    EULA 最终用户许可协议
        有助于为个人、组织和知识产权提供保护

    选择一个适当的软件包名称
    关闭日志记录和调试
        android:debuggable
        startMethodTracing()
        stopMethodTracing()
        WebView.setWebContentsDebuggingEnabled()
        
    清理项目目录
        jni/
            .c .cpp .h .mk
        lib/
            .so
        src/
            .java .aidl

    查看并更新您的清单和Gradle构建设置
        <uses-permission>
        <application>
            android:icon
            android:label
        <manifest>
            android:versionCode
            android:versionName
        <uses-sdk>
            android:minSdkVersion
            android:targetSdkVersion

    地址兼容性问题
        屏幕配置支持，支持多种屏幕的最佳做法：<https://developer.android.com/guide/practices/screens_support.html#screen-independence>
        针对Android平板的优化
        考虑使用支持库

    更新服务器和服务的网址
    实现许可（Google Play)
    构建应用
        签署APK
            jdk提供工具：Keytool, Jarsigner
        编译和优化APK
            Android SDK提供相关工具
            Android Studio提供自动化工具，底层调用Gradle构建工具
            或单纯使用Gradle的命令行构建，方便自动化，参考配置Gradle构建 <https://developer.android.com/tools/building/configuring-gradle.html>


### keytool

> `jdk`提供的工具

    hudamin@local demo $ keytool -help
    密钥和证书管理工具

    命令:

     -certreq            生成证书请求
     -changealias        更改条目的别名
     -delete             删除条目
     -exportcert         导出证书
     -genkeypair         生成密钥对
     -genkey             同-genkeypair
     -genseckey          生成密钥
     -gencert            根据证书请求生成证书
     -importcert         导入证书或证书链
     -importpass         导入口令
     -importkeystore     从其他密钥库导入一个或所有条目
     -keypasswd          更改条目的密钥口令
     -list               列出密钥库中的条目
     -printcert          打印证书内容
     -printcertreq       打印证书请求的内容
     -printcrl           打印 CRL 文件的内容
     -storepasswd        更改密钥库的存储口令

    使用 "keytool -command_name -help" 获取 command_name 的用法

    hudamin@local demo $ keytool -genseckey -help
    keytool -genseckey [OPTION]...

    生成密钥

    选项:

     -alias <alias>                  要处理的条目的别名
     -keypass <arg>                  密钥口令
     -keyalg <keyalg>                密钥算法名称
     -keysize <keysize>              密钥位大小
     -keystore <keystore>            密钥库名称
     -storepass <arg>                密钥库口令
     -storetype <storetype>          密钥库类型
     -providername <providername>    提供方名称
     -providerclass <providerclass>  提供方类名
     -providerarg <arg>              提供方参数
     -providerpath <pathlist>        提供方类路径
     -v                              详细输出
     -protected                      通过受保护的机制的口令

    hudamin@local keytool $ keytool -genkey -help
    keytool -genkeypair [OPTION]...

    生成密钥对

    选项:

     -alias <alias>                  要处理的条目的别名
     -keyalg <keyalg>                密钥算法名称
     -keysize <keysize>              密钥位大小
     -sigalg <sigalg>                签名算法名称
     -destalias <destalias>          目标别名
     -dname <dname>                  唯一判别名
     -startdate <startdate>          证书有效期开始日期/时间
     -ext <value>                    X.509 扩展
     -validity <valDays>             有效天数
     -keypass <arg>                  密钥口令
     -keystore <keystore>            密钥库名称
     -storepass <arg>                密钥库口令
     -storetype <storetype>          密钥库类型
     -providername <providername>    提供方名称
     -providerclass <providerclass>  提供方类名
     -providerarg <arg>              提供方参数
     -providerpath <pathlist>        提供方类路径
     -v                              详细输出
     -protected                      通过受保护的机制的口令


`说明`：

    -genkey 同 -genkeypair
    默认`密钥库`文件：`~/.keystore`
    默认口令有效天数90天



### jarsigner

    hudamin@local demo $ jarsigner
    用法: jarsigner [选项] jar-file 密钥别名
           jarsigner -verify [选项] jar-file [密钥别名...]

    [-keystore <url>]           密钥库位置
    [-storepass <口令>]         用于密钥库完整性的口令
    [-storetype <类型>]         密钥库类型
    [-keypass <口令>]           私有密钥的口令 (如果不同)
    [-certchain <文件>]         替代证书链文件的名称
    [-sigfile <文件>]           .SF/.DSA 文件的名称
    [-signedjar <文件>]         已签名的 JAR 文件的名称
    [-digestalg <算法>]        摘要算法的名称
    [-sigalg <算法>]           签名算法的名称
    [-verify]                   验证已签名的 JAR 文件
    [-verbose[:suboptions]]     签名/验证时输出详细信息。
                                子选项可以是 all, grouped 或 summary
    [-certs]                    输出详细信息和验证时显示证书
    [-tsa <url>]                时间戳颁发机构的位置
    [-tsacert <别名>]           时间戳颁发机构的公共密钥证书
    [-tsapolicyid <oid>]        时间戳颁发机构的 TSAPolicyID
    [-altsigner <类>]           替代的签名机制的类名
    [-altsignerpath <路径列表>] 替代的签名机制的位置
    [-internalsf]               在签名块内包含 .SF 文件
    [-sectionsonly]             不计算整个清单的散列
    [-protected]                密钥库具有受保护验证路径
    [-providerName <名称>]      提供方名称
    [-providerClass <类>        加密服务提供方的名称
      [-providerArg <参数>]]... 主类文件和构造器参数
    [-strict]                   将警告视为错误


### 命令行签名

#### 生成密钥对

    # 在密钥库test.keystore中生成密钥对k1
    $ keytool -genkey \
        -keystore test.keystore \
        -keyalg RSA \
        -storepass 123456 \
        -keypass 654321 \
        -validity 10000 \
        -alias k1 

    # 在密钥库test.keystore中生成密钥对k2
    $ keytool -genkeypair \
        -keystore test.keystore \
        -keyalg RSA \
        -storepass 123456 \
        -keypass 333333 \
        -validity 10000 \
        -alias k2 

    # 列出密钥库test.keystore中所有密钥
    $ keytool -list \
        -keystore test.keystore \
        -storepass 123456

    # 列出密钥库test.keystore中密钥对k2
    $ keytool -list \
        -keystore test.keystore \
        -storepass 123456 \
        -alias k2


#### 生成密钥

    # 在密钥库test.keystore中生成密钥k5
    $ keytool -genkey \
        -keystore test.keystore \
        -keyalg RSA \
        -storepass 123456 \
        -keypass 654321 \
        -alias k5 


* 列出密钥库内的密钥，只需要提供`-storepass`，就可以列出所有密钥
* `-keypass`主要在`签名`的时候使用，比如需要用某个key对文件进行签名时，如果-keypass`不同于`-storepass，则需需要提供


#### 用密钥给文件签名

> 以下例子给`jar`文件签名和验证，也可以直接给`apk`文件签名

    # 用密钥库的密钥对k2对mockable-android-19.jar进行签名
    $ jarsigner -verbose \
        -keystore test.keystore \
        -storepass 123456 \
        -keypass 333333 \
        mockable-android-19.jar \
        k2

    # 用密钥库的密钥对k2对已签名的mockable-android-19.jar进行签名验证
    $ jarsigner -verify \
        -keystore test.keystore \
        -storepass 123456 \
        mockable-android-19.jar \
        k2
    






            
didi/VirtualAPK


## 四大类
    Activity
    Service
    Receiver
    Provider



## Activity Subclass

    app/java

    onCreate
        super.onCreate( savedInstanceState );
        setContentView( R.layout.activity_quiz );

    // 将布局文件和java代码关联起来
    public void setContentView( int layoutResID )



## 开启USB调试模式
    Android 4.0以前
        设定 -> 应用项 -> 开发
    Android 4.0/4.1
        设定 -> 开发，勾选USB调试
    Android 4.2以后
        设定 -> 关于 -> 版本号（Build Number），点击7次



## Android MVC Design Pattern

    控制器通常是Activity / Fragment / Service的一个子类
    按类来抽象，按MVC来分层设计
    按层而不是一个个单独的类来考虑问题



## 0703

    Android Studio首选项 -> Editor -> Code Style -> Java Tab -> Code Generation -> Naming
        Fields
        Static Fields

    自动生成getter和setter方法
    Generate -> Getter and Setter



    图标资源
        app/src/main/src
            drawable-ldpi
            drawable-hdpi: 160dpi
            drawable-mdpi: 240dpi
            drawable-xhdpi: 320dpi
            drawable-xxhdpi: 480dpi
            drawable-xxxhdpi

        drawable是一种资源类型，同string、color、style类似

        控制app大小，可以只准备主流分辨率的图标，其他的由Android系统自行适配

        .png, .jpg, .gif会自动获得资源ID，文件名必须全部小写，且不能包含空格

        <Button
            ...
            android:drawableRight="@drawable/arrow_right"
            android:drawablePadding="4dp"
            />

        快捷键旋转模拟器 Fn+Ctrl+F12 / Ctrl+F12

        按钮 - Button -> TextView
        图标按钮 - ImageButton -> ImageView
            android:src="@drawable/arrow_right"
            android:contentDescription="..."



## Activity生命周期

    四种状态：运行、暂停、停止；以及暂存状态


                                        ----运行（可见&在前台）-----

                                            |               | 

                                        onResume()      离开前台

                                        进入前台        onPause()

                                            |               |

              |<--------------------    --------暂停（可见）--------
              |
              |                             |               |
              |        
              |                          onStart()       不再可见
              |
              |                         对用户可见      onStop()
              |
                                            |               |
     暂存状态 - stash( 
     activity实例已销毁  <----------   -------停止（不可见）------
     ，实例状态已保存） 
              |                             |               |
              |
              | -------------------->   onCreate()      完成或销毁

                                            启动        onDestroy()
                                            
                                            |               |

                                        ----------不存在----------



    onCreate( bundle )
        setContentView( int )
        引用已实例化的组件
        为组件设置监听器 
            new View.OnClickListener等
        访问外部模型数据

    禁止主动调用这些生命周期方法
    6个生命周期函数，仅有onCreate是protected，其他5个都是public
    仅有onCreate带参数，其他5个都不带参数
    停止状态，不确切知道能保留多久，因为系统进行内存回收时，会首先销毁停止状态的activity




## 0704

    android.util.Log
        系统级别的共享日志中心
        public static int d( String tag, String msg )
        public static int d( String tag, String msg, Throwable e )
            tag - 类名
            
            public class QuizActivity extends AppCompatActivity {
                private static final String TAG = 'QuizActivity';
                ...

                @Override
                protected void onCreate( Bundle savedInstanceState ) {
                    super.onCreate( savedInstanceState );
                    Log.d( TAG, "onCreate( Bundle ) called" );
                    setContentView( R.layout.activity_quiz );
                }
            }


        @Override指示编译器确保当前类具有你要覆盖的方法，若无则发出警告。

        使用LogCat查看日志，TAG过滤日志
        其他：
            Log.e
            Log.w
            Log.i
            Log.d
            Log.v


    底排按钮：
        后退键        主屏幕键        最近应用键

        后退键会完全销毁activity及其所在进程，当然暂存状态也就销毁了





    屏幕旋转与Activity生命周期

        原Activity被销毁，重新创建一个新的Activity实例
            onPause()
            onStop()
            onDestroy()
            onCreate( Bundle )
            onStart()
            onResume()


        设备配置
            屏幕方向
            屏幕密度
            屏幕尺寸
            键盘类型
            底座模式
            语言
            等

        旋转会改变设备配置
        runtime configuration change，不同于dpi，方向的变化是运行时的

        res目录 -> New -> Android resource directory
            Orientation -> Landscape

        Orientation是一种资源，添加Landscape会增加对应res/layout-land目录，下方存放layout文件，与activity_quiz.xml同名

        FrameLayout取代LinearLayout，是最简单的ViewGroup组件，不以特定方式安排其子视图的位置
            子视图位置取决于格子的android:layout_gravity属性
            android:layout_gravity 
                center_horizontal
                center_vertical
                bottom
                right
                top
                left
                center_horizontal |  center_vertical
                bottom |  right
                top |  left


        设备旋转带来Activity的销毁，需要保存数据

            // onPause, onStop, onDestroy之前都会
            // 调用onSaveInstanceState，状态存入Bundle
            onSaveInstanceState( Bundle )
            // 创建时从Bundle中读回
            onCreate( Bundle )

        实现覆盖onSaveInstanceState( Bundle )

            ...
            private static final String KEY_INDEX = "index";

            @Override 
            public void onSaveInstanceState( Bundle savedInstanceState ) {
                super.onSaveInstanceState( savedInstanceState );
                Log.i( TAG, "onSaveInstanceState" );
                savedInstanceState.pubInt( KEY_INDEX, mCurrentIndex );
            }
            ...


        Bundle只支持基本数据类型，以及可以实现Serializable或Parcelable接口的对象。
        不适合自定义对象，建议保存自定义类的引用。

        activity暂存状态
            Activity记录（Bundle），进程级存储，由OS操作，可以传递到下次Activity创建
            后退键会销毁记录数据，重启或长时间不用activity，也会销毁记录数据

        测试onSaveInstanceState
            Settings -> Dont't keep activities




## todo

Android应用的调试


## 0705

    .pom文档?
    pom.xml
    与Maven有关


## 0708


    ...
    android {
        lintOptions {
            abortOnError false
        }
    }






> 170818

## Android应用的调试
    DDMS Command + 9 打开
    logcat

    设备会将日志保留在log文件中一段时间，在连上Android Studio后，可以将之前记录的log日志显示出来

    断点调试

    Android Lint，其提出的问题都值得关注
        设备兼容性警告
        检查定义在XML文件中的对象类型
        等

        提示信息出现在Inspection Results

    R类问题
        引用未添加资源，或删除仍被引用的资源
        解决办法：
            检查资源文件中XML文件
            清理项目：Build -> Clean Project
            若改了build.gradle文件，Tools -> Android -> Sync Project with Gradle Files
            运行Android Lint


## 第5章 第二个Activity

Activity对应一个`用户界面`

### 创建新的activity

    使用Android Studio提供的新建Activity向导

    新建新的activity，至少涉及`三个文件`的新建或变化：Java类、XML布局、应用manifest文件

        新生成java类文件
        新创建xml布局文件
        更新AndroidManifest.xml文件
            应用的所有activity都必须在manifest配置文件中声明，这样操作系统才能使用它们

            <manifest>
                <application
                    android:allowBackup="true"
                    android:icon="@mipmap/ic_launcher"
                    android:label="@string/app_name"
                    android:theme="@style/AppTheme">
                    <activity
                        android:name=". QuizActivity"
                        android:label="@string/app_name">
                        <intent-filter>
                            <action android:name="android.intent.action.MAIN" />
                            <category android:name="android.intent.category.LAUNCHER" />
                        </intent-filter>
                    </activity>
                    <activity android:name=". CheatActivity">
                    </activity>
                </application>
            </manifest>

            1. `android:name`属性是必需的，属性值前的`. `告诉操作系统，activity类文件位于manifest配置文件头部包属性值指定的包路径下。
            2. `android:name`属性值也可以设置成完整的包路径，例如`com.bignerdranch.android.geoquiz.CheatActivity`


    原有activity添加新按钮，并添加点击处理函数：

        修改layout/activity_quiz.xml以及layout-land/activity_quiz.xml，添加新按钮：
            <!-- 竖屏 --> 
            <Button
                android:id="@+id/cheat_button"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/cheat_button" />

            <!-- 横屏，底部居中 --> 
            <Button
                android:id="@+id/cheat_button"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="bottom|center"
                android:text="@string/cheat_button" />

        Java文件中添加按钮引用以及点击处理函数：

            ...
            private Button mCheatButton;
            ...

            @override
            protected void onCreate( Bundle savedInstanceState ) {
                ...
                mCheatButton = (Button)findViewById( R.id.cheat_button );
                mCheatButton.setOnClickListener( new View.OnClickListener() {
                    @override
                    public void onClick( View v ) {
                        ...
                    }
                } );
                ...
            }
            ...


    未专门创建横屏的布局文件，仍然可以使用默认布局在横屏下展示。



### 启动另一个activity

    startActivity方法：

        public void startActivity( Intent intent )

            [ Your application ]    |     [ Android OS ]        
                                    |               
    Activity                        |       ActivityManager
        |                           |               |
        |                           |               |
        | ---startActivity(intent)--|-------------> |
        |                           |               |
        |         -------------     |               |
        |         |     ?     | <---|-------------- |
        |         -------------     |               |
        |               |           |               |
        |               |           |               |
        |               |           |               |
        |               |           |               |
                                    |                
                                    |                


    1. 调用`startActivity()`，实际上将请求发送给了OS的`ActivityManager`,由`ActivityManager`负责创建Activity实例并调用`onCreate()`方法。
    2. ActivityManager该启动哪个Activity，在于`startActivity()`方法传入的`intent`参数。


    基于intent的通信

        1. intent对象是component用来与OS通信的一种媒介工具。
        2. component常见的有activity, service, broadcast receiver, content provider
        3. intent是一种`多用途`通信工具，提供多个构造方法

            [ GeoQuiz ]             |     [ Android OS ]        
                                    |               
    QuizActivity                    |       ActivityManager
        |                           |               |
        |                           |               |
        | ---startActivity(intent)  |               |
        |        |                  |               |
        |        |     --------------------------   |
        |        |---> |         intent         | ->|
        |              | component=CheatActivity|   |
        |              --------------------------   |
        |                           |               |
        |                           |               |
        |                           |               |
        |         -------------     |               |
        |       | CheatActivity | <-----(Intent)--- |
        |         -------------     |               |
        |               |           |               |
        |               |           |               |
                                    |                
                                    |                



    现在可以进一步在原activity的java文件中，为mCheatButton添加点击处理逻辑：

        @override
        public void onClick( View v ) {
            // Start CheatActivity
            Intent i = new Intent( QuizActivity.this, CheatActivity.class );
            startActivity( i );
        }


    * 通过`startActivity()`方法启动的新的activity，可以通过`回退`按钮关闭而回到上一activity
    * 显式intent，同一应用中一个activity创建另一个activity
    * 隐式intent，一个activity启动不同应用中的另一个activity

    `newIntent()`封装


### 父子activity数据传递

    * 使用intent extra存储用于activity间传递的信息
    * extra是一种键值结构
    * 使用`Intent.putExtra( ... )`方法来操作extra字段，提供多种形式，以下为`布尔值`的形式：
            public Intent putExtra( String name, boolean value )




## 问题列表

* Tools -> Android -> Sync Project with Gradle Giles，出现以下错误：
        Error: Failed to find Build Tools revision 26.0.1

    解决办法：安装对应版本的Build Tools即可。可直接点击提示链接`Install Build Tools 26.0.1 and sync project`




