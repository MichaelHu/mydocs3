# camera

## Features

* 调起本机的媒体设备，支持`Promise`接口
* 媒体设备与`video`或`audio`等标签进行连接，显示实时内容


## Examples

    navigator.mediaDevices
        .getUserMedia({video: true})
        .then(function(stream) {
            document.getElementById('camera').src = URL.createObjectURL(stream);
        }).catch(function() {
            alert('could not connect stream');
        });


