# django


安装
    $ pip install Django
    $ python -m pip install Django

验证
    $ python -m django --version


创建一个项目
    $ django-admin startproject mysite

启动开发服务器
    $ cd mysite
    $ python manage.py runserver

创建一个新的APP polls
    $ python manage.py startapp polls

admin应用
    $ python manage.py createsuperuser
    
创建数据库表，根据APP的模型配置：
    $ python manage.py migrate

将模型的变化保存成migration文件：
    $ python manage.py makemigrations polls

查看migration对应的SQL语句：
    $ python manage.py sqlmigrate polls 0001
