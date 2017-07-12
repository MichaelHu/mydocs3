# angularjs

## Features

* google



## Versions



## Modules

`9大`Modules：

    ng
    , ngRoute
    , ngAnimate
    , ngAria
    , ngResource
    , ngCookies
    , ngTouch
    , ngSanitize
    , ngMock


## Concepts

`two-way` Data Binding

`Controllers`: 初始化`$scope`，添加$scope的行为。不建议在这里操作DOM、格式化输入、过滤输出等

    var myApp = angular.module( 'myApp', [] );

    myApp.controller( 'GreetingController', [ '$scope', function( $scope ) {
          $scope.greeting = 'Hola!';
    } ] );


    myApp.controller( 'DoubleController', [ '$scope', function( $scope ) {
        $scope.double = function( value ) { return value * 2; };
    } ] );


`Services`: `$http`等

Scope: 提供一些API，如`$watch`, `$apply`等

    angular.module('scopeExample', [])
        .controller('MyController', ['$scope', function($scope) {
            $scope.username = 'World';

            $scope.sayHello = function() {
                $scope.greeting = 'Hello ' + $scope.username + '!';
            };
        }]);


Dependency Injection

工厂方法中使用

    ngular.module( 'myModule', [] )
        .factory( 'serviceId', [ 'depService', function( depService ) {
            // ...
        } ] )
        .directive( 'directiveName', [ 'depService', function( depService ) {
            // ...
        } ] )
        .filter( 'filterName', [ 'depService', function( depService ) {
            // ...
        } ] );

模块方法中使用

    angular.module( 'myModule', [] )
        .config( [ 'depProvider', function( depProvider ) {
            // ...
        } ] )
        .run( [ 'depService', function( depService ) {
          // ...
        } ] );

控制器中使用

    someModule.controller( 'MyController', [ '$scope', 'dep1', 'dep2', function( $scope, dep1, dep2 ) {
        ...
        $scope.aMethod = function() {
            ...
        }
        ...
    } ] );


`Templates`

`Expressione`

`Filters`

    {{ expression | filter }}
    {{ expression | filter1 | filter2 | ... }}
    {{ expression | filter:argument1:argument2:... }}



## Codes

全局变量前缀`$`，内部变量前缀`$$`

    <!doctype html>
    <html lang="en" ng-app>
    <head>
        <meta charset="utf-8">
        <title>My HTML File</title>
        <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
        <link rel="stylesheet" href="css/app.css">
        <script src="bower_components/angular/angular.js"></script>
    </head>
    <body>
        <p>Nothing here {{'yet' + '!'}}</p>
    </body>
    </html>

    <script>
    var phonecatApp = angular.module( 'phonecatApp', [] );
    phonecatApp.controller( 'PhoneListCtrl', function( $scope, $http ) {
        $http.get( 'phones/phones.json' )
            .success( function( data ) {
                $scope.phones = data;
            } );
        $scope.orderProp = 'age';
    });
    </script>





