# react-native

## Resources

* `react-native`中文翻译文档 <https://reactnative.cn/docs/getting-started/>
* `Expo` tool chain - <https://expo.io/>
* Debugging - <https://docs.expo.io/versions/latest/guides/debugging.html>


## Features

* iOS和Android跨平台支持
* 可以无缝调用原生编写的组件
* 可以调用原生API
* 生成的APP与Native无异，并不是Web网页的形式


## Expo工具链

### Features

* 提供`代码脚手架`，支持Blank、Tabs两类脚手架


### 安装及使用

    $ npm install expo-cli --global
    $ expo init my-new-proj
    $ cd my-new-proj
    $ expo start

* 手机上安装Expo应用，可以在应用商店获得
* 注册账号
* iOS通过相机直接扫描二维码，打开应用

### 代码结构

### 第一个基于Blank模板的App.js

    import React from "react";
    import { StyleSheet, Text, View } from "react-native";

    export default class App extends React.Component {
        render() {
            return (
                <View style={styles.container}>
                    <Text>Open up App.js to start working on your app!</Text>
                </View>
            );
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
        }
    });


### 第一个基于Tabs模板的App.js



## Tips

* App icons，提供的素材`必须是正方形`，最大支持`1024 x 1204`，应用会自动生成需要的各种尺寸的icon，注意`1023 x 1024`也是不行的


## Code




