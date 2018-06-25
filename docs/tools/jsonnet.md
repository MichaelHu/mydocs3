# jsonnet

> todo

* [ 180621 ] `Jsonnet` - The Data Templating Language <https://jsonnet.org/> github: <https://github.com/google/jsonnet> <iframe src="http://258i.com/gbtn.html?user=google&repo=jsonnet&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
    * google出品
    * 目前只有C/C++版本，需自行本地make install
    * 安装&运行：
            $ git clone https://github.com/google/jsonnet.git
            $ cd jsonnet
            $ make # with GCC 
            $ make CC=clang CXX=clang++ # with Clang 
            $ ./jsonnet
    * 使用案例：
        
        test.json:

            {
              person1: {
                name: "Alice",
                welcome: "Hello " + self.name + "!",
              },
              person2: self.person1 { name: "Bob" },
            }

        执行命令：

            ./jsonnet test.json

        执行jsonnet后，输出：

            {
              "person1": {
                "name": "Alice",
                "welcome": "Hello Alice!"
              },
              "person2": {
                "name": "Bob",
                "welcome": "Hello Bob!"
              }
            }
    * 可以快速生成配置文件，内部支持多种编程语言特性
