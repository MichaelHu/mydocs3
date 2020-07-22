# sqlite

轻量级数据库


连接数据库

    $ sqlite db_file

常用命令
    > .help

    # 列出所有表格
    > .tables

    # 查看表格规则
    > .schema table_name

    # 显示当前模式
    > .mode

    # 设置模式为csv模式
    > .mode csv

    # 显示目前配置
    > .show

    # 导入csv文件
    > .mode csv
    > .import file_path table_name

语句
    > select * from table_name;



