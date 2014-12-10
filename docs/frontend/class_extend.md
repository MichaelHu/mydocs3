# js类扩展方式

> 从已存在的父类中派生出一个子类的实现方式 

## 一、Backbone实现

支持通过`Class.__super__`调用父类的原型链，比如子类的init方法中调用父类的init方法：

    ...
    Class.__super__.init &&
        Class.__super__.init.apply(this, arguments);
    ... 

具体实现如下：

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var extend = function(protoProps, staticProps) {
      var parent = this;
      var child;

      // The constructor function for the new subclass is either defined by you
      // (the "constructor" property in your `extend` definition), or defaulted
      // by us to simply call the parent's constructor.
      if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
      } else {
        child = function(){ return parent.apply(this, arguments); };
      }

      // Add static properties to the constructor function, if supplied.
      _.extend(child, parent, staticProps);

      // Set the prototype chain to inherit from `parent`, without calling
      // `parent`'s constructor function.
      var Surrogate = function(){ this.constructor = child; };
      Surrogate.prototype = parent.prototype;
      child.prototype = new Surrogate;

      // Add prototype properties (instance properties) to the subclass,
      // if supplied.
      if (protoProps) _.extend(child.prototype, protoProps);

      // Set a convenience property in case the parent's prototype is needed
      // later.
      child.__super__ = parent.prototype;

      return child;
    };

`解析`：

1. 函数中的`var parent = this;`代表的是父类本身，比如Model
2. 可以自行提供子类的构造函数，使用`constructor`字段
3. 默认情况下，子类构造函数会自动调用父类构造函数
4. 父类`静态方法`自动添加到子类
5. 设置子类prototype时，避免直接调用父类构造函数，而是使用一个`dummy function`，该函数
    只是简单的设置`this.constructor`属性。





## 二、Quintus实现

支持`this._super()`方法，通过该方法可以调用`同名`的父类方法，比如子类的init方法中调用父类的init方法：

    ...
    this._super(...);
    ... 

具体实现如下：


    /**
     * Create a new Class that inherits from this class
     *
     * @method extend
     * @param {String} className
     * @param {Object} properties - hash of properties (init will be the constructor)
     * @param {Object} [classMethods] - optional class methods to add to the class
     */
    Q.Class.extend = function(className, prop, classMethods) {
      /* No name, don't add onto Q */
      if(!Q._isString(className)) {
        classMethods = prop;
        prop = className;
        className = null;
      }
      var _super = this.prototype,
          ThisClass = this;

      /* Instantiate a base class (but only create the instance, */
      /* don't run the init constructor) */
      initializing = true;
      var prototype = new ThisClass();
      initializing = false;

      function _superFactory(name,fn) {
        return function() {
          var tmp = this._super;

          /* Add a new ._super() method that is the same method */
          /* but on the super-class */
          this._super = _super[name];

          /* The method only need to be bound temporarily, so we */
          /* remove it when we're done executing */
          var ret = fn.apply(this, arguments);
          this._super = tmp;

          return ret;
        };
      }

      /* Copy the properties over onto the new prototype */
      for (var name in prop) {
        /* Check if we're overwriting an existing function */
        prototype[name] = typeof prop[name] === "function" &&
          typeof _super[name] === "function" &&
            fnTest.test(prop[name]) ?
              _superFactory(name,prop[name]) :
              prop[name];
      }
      /* The dummy class constructor */
      function Class() {
        /* All construction is actually done in the init method */
        if ( !initializing && this.init ) {
          this.init.apply(this, arguments);
        }
      }

      /* Populate our constructed prototype object */
      Class.prototype = prototype;

      /* Enforce the constructor to be what we expect */
      Class.prototype.constructor = Class;
      /* And make this class extendable */
      Class.extend = Q.Class.extend;

      /* If there are class-level Methods, add them to the class */
      if(classMethods) {
        Q._extend(Class,classMethods);
      }

      if(className) {
        /* Save the class onto Q */
        Q[className] = Class;

        /* Let the class know its name */
        Class.prototype.className = className;
        Class.className = className;
      }

      return Class;
    };
    ));


从当前类派生子类：

1. `_super = this.prototype`：当前类的prototype
2. `ThisClass = this`：当前类
3. `prototype = new ThisClass`：当前类的实例，将作为子类的prototype
4. `_superFactory(name, prop[name])`：prop中存在的方法，若在当前类的prototype中有同名函数，
    则构建一个`临时属性this._super`，通过之可以直接调用上级prototype的同名方法
5. `Class`：子类构造函数




## 三、Rocket-p实现

参考了Backbone和Quintus实现，具有以下特征：
1. 子类通过`Class._superClass`获得父类的引用
2. 子类方法（原型链方法）通过`this._super`，可调用父类对应方法 
3. 可以自行提供子类的构造函数，使用`constructor`字段

具体实现如下：

    function classExtend(protoProps, staticProps){
                                                 
        var parentClass = this;                  
        var subClass;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if(protoProps && Utils.has(protoProps, 'constructor')){
            subClass = protoProps.constructor;   
        }
        else{
            subClass = function(){ return parentClass.apply(this, arguments); }; 
        }
        
        // Add static properties to the constructor function, if supplied.
        Utils.extend(subClass, parentClass, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function(){ this.constructor = subClass; }; 
        Surrogate.prototype = parentClass.prototype;  
        subClass.prototype = new Surrogate;

        function _superFactory(name, fn) {
            return function() {
                var tmp = this._super;

                /* Add a new ._super() method that is the same method */
                /* but on the super-class */
                this._super = parentClass.prototype[name];    

                /* The method only need to be bound temporarily, so we */
                /* remove it when we're done executing */     
                var ret = fn.apply(this, arguments);          
                this._super = tmp;

                return ret;
            };
        }
        if(protoProps){
            // Note: Does not take effect when name is `"constructor"`
            for(var name in protoProps){
                subClass.prototype[name] = 
                    typeof protoProps[name] === 'function'        
                        && typeof parentClass.prototype[name] === 'function'
                    ? _superFactory(name, protoProps[name])       
                    : protoProps[name];
            }
        }

        subClass._superClass = parentClass;

        return subClass;
    }
