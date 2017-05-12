# h5游戏引擎

## 关键词

stage
scene
sprites
sheet
shape

keyboardcontrol
joypadcontrol

gravityX
gravityY

collision
bump
collisionMask

load(resources, callback);



## Quintus

> HTML5 Game Engine

* 官网：<http://www.html5quintus.com>
* GIT: <https://github.com/cykod/Quintus>

### 初始化部分：

    var Q = window.Q = Quintus({audioSupported: [ 'wav','mp3','ogg' ]})
            .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
            // Maximize this game to whatever the size of the browser is
            .setup({ maximize: true })
            // And turn on default input controls and touch input (for UI)
            .controls(true).touch()
            // Enable sounds.
            .enableSound();

### 模块与组件

> core＋extend modules的方式，分布在以下文件中。包含模块使用Q.include方式。包含组件使用this.add方式。

    quintus.js
    quintus_2d.js
    quintus_anim.js
    quintus_audio.js
    quintus_input.js
    quintus_scenes.js
    quintus_sprites.js
    quintus_tmx.js
    quintus_touch.js
    quintus_ui.js 

包含模块列出如下：

#### 1. 2D

包含组件：
* viewport
* 2d
* aiBounce

扩展Q.Sprite类：
* TileLayer 

扩展Q：
* Q.gravityX = 9.8 * 100
* Q.gravityY

#### 2. Anim 

包含组件：
* animation
* tween

扩展Q.Sprite类：
* Repeater 

扩展Q：
* Q.animations
* Q.animation
* Q.Easing
* Q.Tween = Q.Class.extend(...

#### 3. Audio

扩展Q：
* Q.audio
* Q.hasWebAudio
* Q.enableSound

#### 4. Input

包含组件：
* platformerControls
* stepControls

扩展Q：
* Q.KEY_NAMES
* Q.inputs
* Q.joypad
* Q.canvasToStageX
* Q.canvasToStageY
* Q.InputSystem 
* Q.controls


#### 5. Scenes

扩展Q：
* Q.Scene = Q.Class.extend(...
* Q.scene()
* Q.collision
* Q.overlap
* Q.Stage = Q.GameObject.extend({...});
* Q.activeStage
* Q.StageSelector = Q.Class.extend(...);
* Q.select
* Q.stage
* Q.stageScene
* Q.stageGameLoop
* Q.clearStage
* Q.clearStages


#### 6. Sprites

扩展类：
* SpriteSheet = Q.Class.extend(...) 
* Sprite = Q.GameObject.extend(...) 

    Sprite.draw:

        ...
        draw: function(ctx) {
          var p = this.p;
          if(p.sheet) {
            this.sheet().draw(ctx,-p.cx,-p.cy,p.frame);
          } else if(p.asset) {
            ctx.drawImage(Q.asset(p.asset),-p.cx,-p.cy);
          } else if(p.color) {
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.cx,-p.cy,p.w,p.h);
          }
        },
        ...

扩展Sprite类：
* MovingSprite

扩展Q：
* Q.sheets = {...};
* Q.sheet
* Q.compileSheets
* 常量：
    * Q.SPRITE_NONE
    * Q.SPRITE_DEFAULT
    * Q.SPRITE_PARTICLE
    * Q.SPRITE_ACTIVE
    * Q.SPRITE_FRIENDLY
    * Q.SPRITE_ENEMY
    * Q.SPRITE_POWERUP
    * Q.SPRITE_UI
    * Q.SPRITE_ALL
* Q._generatePoints
* Q._generateCollisionPoints


#### 7. TMX


扩展Q：
* Q.loadAssetTMX
* Q._tmxEtractAssetName
* Q._tmxExtractSources
* Q.loadTMX
* Q._tmxLoadTilesets 
* Q._tmxProcessImageLayer
* Q._lookuoGid
* Q._tmxProcessTileLayer
* Q._tmxProcessObjectLayer
* Q._tmxProcessors = {...}
* Q.stageTMX



#### 8. Touch

扩展类：
* Q.Evented.extend('TouchSystem', ...)

扩展Q：
* Q.touch
* Q.untouch


#### 9. UI


包含组件：
* viewport
* 2d
* aiBounce
* tween

扩展Q.Sprite类：
* TileLayer 

扩展Q：
* Q.UI.roundRect
* Q.UI.Container
* Q.UI.Text
* Q.UI.Button
* Q.UI.IFrame
* Q.UI.HTMLElement
* Q.UI.VerticalLayout




### 类层次

* Q.Class
    * Q.Evented
        * Q.Component
        * Q.GameObject
            * Q.GameState
            * Q.Sprite
                * Q.MovingSprite
    * Q.Matrix2D
    * Q.SpriteSheet



### 关键类

* Q.Matrix2D
    * init
    * identity 
    * clone(matrix)
    * multiply(matrix)
    * rotate(radians)
    * rotateDeg(deg)
    * scale(sx, sy)
    * translate(tx, ty)
    * transform(x, y)
    * transformPt(obj)
    * transformArr(inArr, outArr)
    * transformX(x, y)
    * transformY(x, y)
    * release()

* Q.Sprite
    * `this._super()`
        调用父类同名函数
    * this.add()
        添加component
    * this.animate()
        动画，添加animation组件以后可调用
    * this.play()
        播放某个预定义动画
    * this.destroy()
        销毁
    * this.p: 有哪些预定义属性？
        x, y, cx, cy, vx, vy, ...
    

* Q.Stage
    * this.unfollow()
    * this.add()
    * this.follow()

### 方法

* Q.scene()
    定义场景

* Q.stageScene()
    切换场景

* Q.loadTMX()

        Q.loadTMX("level1.tmx, collectables.json, doors.json, enemies.json, "
            + "fire.mp3, jump.mp3, heart.mp3, hit.mp3, coin.mp3, player.json, player.png"
            , function() {
                Q.compileSheets("player.png","player.json");
                ...
                Q.animations("fly", EnemyAnimations);
                ...
                Q.stageScene("level1"); 
                Q.stageScene('hud', 3, Q('Player').first().p); 
            }
            , {
                progressCallback: function(loaded,total) {
                    ...
                }
            }
            

* Q.compileSheets()

* Q.stageTMX()
    从.tmx文件中装载场景
        Q.stageTMX("level1.tmx",stage); 

* Q.compileSheets()

* Q.input.on()
    添加`Input`组件以后，可以调用，比如:
        Q.input.on("down",this,"checkDoor");

* Q.audio.play()
    添加`Audio`组件以后，可以调用，比如:
        Q.audio.play('jump.mp3');



## Crafty

* 官网：<http://craftyjs.com>，不太容易打开
* github: <https://github.com/craftyjs/Crafty>

 

## Egret

TypeScript编写

围住神经猫


## QICI engine

> 青瓷游戏引擎，hightopo出品，用的人不算多

* github: <https://github.com/qiciengine/qiciengine>
* site: <http://engine.qiciengine.com/demo/>



