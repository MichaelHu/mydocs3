# web-services

## notes2

> 定位于`支持CORS`的`独立`的web-service， todo

### 获取文章列表

`接口`
    GET http://127.0.0.1:8700/notes/:start/:count

`示例`
    GET http://127.0.0.1:8700/notes/50/2

    [
        {
            "_id": "58f6da2aac9b24a9420cf924",
            "note_id": 50,
            "file_name": "/Users/hudamin/projects/git/mydocs3/docs/database/mongodb-operators.md",
            "title": "MongoDB Operators ",
            "modified_time": null,
            "author": ""
        },
        {
            "_id": "58f6da2aac9b24a9420cf9f0",
            "note_id": 51,
            "file_name": "/Users/hudamin/projects/git/mydocs3/docs/database/mongodb-shell.md",
            "title": "MongoDB Shell",
            "modified_time": null,
            "author": ""
        },
        {
            "_id": "58f6da2bac9b24a9420cfb6e",
            "note_id": 52,
            "file_name": "/Users/hudamin/projects/git/mydocs3/docs/database/mongodb-user-role.md",
            "title": "MongoDB User&Role Memo",
            "modified_time": null,
            "author": ""
        }
    ]

### 获取文章内容

`接口`
    GET http://127.0.0.1:8700/note/:note_id

`示例`
    GET http://127.0.0.1:8700/note/17

    [
        {
            "_id": "58f6da2aac9b24a9420ceb17",
            "note_id": 17,
            "file_name": "/Users/hudamin/projects/git/mydocs3/docs/arch/arch.md",
            "title": "arch",
            "modified_time": null,
            "author": ""
        },
        [
            {
                "_id": "58f6da2aac9b24a9420ceb18",
                "note_id": 17,
                "lineno": 1244,
                "text": "# arch"
            },
            {
                "_id": "58f6da2aac9b24a9420ceb19",
                "note_id": 17,
                "lineno": 1245,
                "text": ""
            },
            {
                "_id": "58f6da2aac9b24a9420ceb1a",
                "note_id": 17,
                "lineno": 1246,
                "text": "* 不要派发`指令型`事件，而是派发`描述型`事件"
            },
            {
                "_id": "58f6da2aac9b24a9420ceb1b",
                "note_id": 17,
                "lineno": 1247,
                "text": "* 充分理解c/c++的assert断言的思想，在小单元开发中作用非常明显。比如js小单元中可以使用`throw new Error()`来代替"
            },
            {
                "_id": "58f6da2aac9b24a9420ceb1c",
                "note_id": 17,
                "lineno": 1248,
                "text": ""
            }
        ]
    ]


## CORS

> 支持`CORS`的服务器接口

`接口`
    GET http://258i.com/phpapp/cors.php 

`示例`
    GET http://258i.com/phpapp/cors.php 

    {
        "name": "胡大民"
    }


