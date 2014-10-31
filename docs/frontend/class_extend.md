# js类扩展方式

> 从已存在的父类中派生出一个子类的实现方式 

## Backbone实现

支持通过`this.__super__`调用父类的原型链，比如子类的init方法中调用父类的init方法：

    ...
    this.__super__.init &&
        this.__super__.init.apply(this, arguments);
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




## Quintus实现

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




