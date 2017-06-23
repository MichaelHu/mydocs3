# mongodb-user-role

> changelog: 1706, 1603, 1510 


## Gist

> 一些必知原则

* mongodb`没有默认管理员账号`，也就没有任何权限认证，可以匿名随意读写。要开启权限认证，需要先添加管理员账号
* 创建的账号，总是`隶属于`当前所在数据库，当前数据库称为新建账号的`宿主数据库`，新账号可以通过用户名和密码`直接`登录宿主数据库
* 切换到`admin`数据库，添加的账号才是`管理员账号`
* 用户只能在`宿主`数据库`登录`，包括管理员账号也不例外
* `管理员`可以管理所有数据库，但是不能直接管理其他数据库，要先在`admin`数据库`认证`后才可以

> 参考 `131204`: <http://blog.51yip.com/nosql/1575.html>


## admin database

> The `admin database` is a `privileged` database. Users must have access to the admin database to run certain administrative commands.

* 是`特权数据库`
* `管理命令`必须登录到`admin`数据库才能执行



## 常用命令

> According to mongodb `v3.4.5`

### shell commands

* <https://docs.mongodb.com/manual/reference/method/js-user-management/>
* <https://docs.mongodb.com/manual/reference/method/js-role-management/>

> 共`21个`shell命令

    Name                            Description
    ===========================================================================
    db.auth()                       Authenticates a user to a database.
    db.createUser()                 Creates a new user.
    db.updateUser()                 Updates user data.
    db.changeUserPassword()         Changes an existing user’s password.
    db.removeUser()                 Deprecated. Removes a user from a database.
    db.dropAllUsers()               Deletes all users associated with a database.
    db.dropUser()                   Removes a single user.
    db.grantRolesToUser()           Grants a role and its privileges to a user.
    db.revokeRolesFromUser()        Removes a role from a user.
    db.getUser()                    Returns information about the specified user.
    db.getUsers()                   Returns information about all users associated with a database.

    db.createRole()                 Creates a role and specifies its privileges.
    db.updateRole()                 Updates a user-defined role.
    db.dropRole()                   Deletes a user-defined role.
    db.dropAllRoles()               Deletes all user-defined roles associated with a database.
    db.grantPrivilegesToRole()      Assigns privileges to a user-defined role.
    db.revokePrivilegesFromRole()   Removes the specified privileges from a user-defined role.
    db.grantRolesToRole()           Specifies roles from which a user-defined role inherits privileges.
    db.revokeRolesFromRole()        Removes inherited roles from a role.
    db.getRole()                    Returns information for the specified role.
    db.getRoles()                   Returns information for all the user-defined roles in a database.


### db commands

* <https://docs.mongodb.com/manual/reference/command/nav-user-management/>
* <https://docs.mongodb.com/manual/reference/command/nav-role-management/>

> 共`17个`数据库命令

    Name                            Description
    =======================================================================
    createUser                      Creates a new user.
    updateUser                      Updates a user’s data.
    dropUser                        Removes a single user.
    dropAllUsersFromDatabase        Deletes all users associated with a database.
    grantRolesToUser                Grants a role and its privileges to a user.
    revokeRolesFromUser             Removes a role from a user.
    usersInfo                       Returns information about the specified users.

    createRole                      Creates a role and specifies its privileges.
    updateRole                      Updates a user-defined role.
    dropRole                        Deletes the user-defined role.
    dropAllRolesFromDatabase        Deletes all user-defined roles from a database.
    grantPrivilegesToRole           Assigns privileges to a user-defined role.
    revokePrivilegesFromRole        Removes the specified privileges from a user-defined role.
    grantRolesToRole                Specifies roles from which a user-defined role inherits privileges.
    revokeRolesFromRole             Removes specified inherited roles from a user-defined role.
    rolesInfo                       Returns information for the specified role or roles.
    invalidateUserCache             Flushes the in-memory cache of user information, including credentials and roles.


## Built-in Roles 

创建role或者user时，指定`roles选项`时，可以使用`系统内建`的角色，避免自己新建role。可参考<https://docs.mongodb.com/manual/reference/built-in-roles/>

    Database User Roles
        read
        readWrite
    Database Administration Roles
        dbAdmin
        dbOwner
        userAdmin
    Cluster Administration Roles
        clusterAdmin
        clusterManager
        clusterMonitor
        hostManager
    Backup and Restoration Roles
        backup
        restore
    All-Database Roles
        readAnyDatabase
        readWriteAnyDatabase
        userAdminAnyDatabase
        dbAdminAnyDatabase
    Superuser Roles
        root
    Internal Role
        __system
    


## createUser

### 创建超级账户

首次登录`mongodb`，设置`超级管理员（root:root）`账户，使用内建role：`root`：

    > use admin
    switched to db admin
    > db.version()
    3.4.5
    > show collections
    system.version
    > db.createUser( {
            user: 'root'
            , pwd: 'root'
            , roles: [ 'root' ]
        } )

* 必须先切换到`admin`数据库，才能创建`root`账户
* `readAnyDatabase`, `readWriteAnyDatabase`等role的用户，也必须先切换到`admin`数据库
* 权限很大的账户，都必须以`admin`作为`宿主`数据库


### 创建数据库使用者账户

> A. 可读写单个数据库的账户

在设置数据库`使用者`账户，比如`（hudamin:test）`，对`venus`数据库有`读写`权限，使用内建role：`readWrite`：

    # `use <db-name>`就创建了一个新的数据库 
    > use venus
    switched to db venus
    > db.createUser( {
            user: 'hudamin'
            , pwd: 'test'
            , roles: [ 'readWrite' ]
        } );

* 切换到`目标数据库`下，创建新账户，则读写权限默认`限制`为当前数据库
* 以上命令，`hudamin:test`用户对数据库`venus`拥有`读写`权限，其他数据库则无权限


> B. 可读写多个数据库的账户

那如果`hudamin:test`还需要对另一个数据库`other`要有`读写`权限的话，该怎么操作呢？

    # 切换到宿主数据库
    > use venus
    switched to db venus
    > db.updateUser( 
            'hudamin' 
            , {
                roles: [
                    { role: 'readWrite', db: 'venus' }
                    , { role: 'readWrite', db: 'other' }
                ]
            } 
        )

* 以上命令为venus下的账户`hudamin`添加了对`other`数据库的`读写`权限
* 但是，由于hudamin是`隶属`于venus的账户，所以`hudamin:test`不能直接登录`other`数据库，而是需要先从`venus`登录，再`切换`到other数据库


> C. 可读写多个数据库的账户，也能直接登录多个数据库

这种账户，目前所知是不存在的，即使是root这种超级账户，也必须先登录admin数据库，才能操作其他数据库。

要达到此类需求，或许只能在多个数据库下，同时新建同名用户了。



### 创建自定义权限的账户
> 较少用到，以下是一个实现的案例

    > use admin
    switched to db admin
    > db.version()
    3.4.5
    > show collections
    system.version
    > db.createRole( { 
            role: 'admin' 
            , privileges: [ 
                { resource: { db: '', collection: '' }, actions: [ 'anyAction' ] } 
            ] 
            , roles: [ ] 
        } )

    {
        "role" : "admin",
        "privileges" : [
            {
                "resource" : {
                    "db" : "",
                    "collection" : ""
                },
                "actions" : [
                    "anyAction"
                ]
            }
        ],
        "roles" : [ ]
    }

    > db.createUser( { user: 'hudamin', pwd: 'test', roles: [ 'admin' ] } )
    Successfully added user: { "user" : "hudamin", "roles" : [ "admin" ] }
    > show collections
    system.roles
    system.users
    system.version

