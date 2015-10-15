# Android Bridge

prompt接口

    var jsonString = JSON.stringify({
            method: ...
            , types: ...
            , args: ...
        });

    var result = prompt(jsonString);

应该是Android对该方法做了拦截
