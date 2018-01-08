# Linux Expect

> `expect` - programmed dialogue with interactive programs. `Expect` is a program that `"talks"` to other interactive programs according to a script.

## Resources

* <http://xuhuandh.iteye.com/blog/947039>
* <http://tomo.im/261>


## Examples


    #!/usr/bin/expect 
    
    # @require: ~/.ssh/config: ControlPath
    
    set timeout 30 
    
    set username [lrange $argv 0 0]
    
    if { $username == "" } { 
        spawn ssh relay.258i.com 
    } else {
        spawn ssh $username@relay.258i.com 
    }
    
    expect -re ".*ssl.*" 
    send "ssh fe@258i-fe.vm\r" 
    expect -re ".*password:" 
    send "okokok\r" 
    interact 

