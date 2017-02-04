# history

> `HTML5标准`中进行定义

* `html5`: <http://www.w3.org/TR/2014/REC-html5-20141028/>
* `specs`: <https://www.w3.org/TR/2014/REC-html5-20141028/browsers.html#history>


## History Interface

	interface History {
		readonly attribute long length;
		readonly attribute any state;
		void go(optional long delta);
		void back();
		void forward();
		void pushState(any data, DOMString title, optional DOMString? url = null);
		void replaceState(any data, DOMString title, optional DOMString? url = null);
	};


## history npm package

> Manage session history with JavaScript

`github`: <https://github.com/mjackson/history>

examples:

    import createHistory from 'history/createBrowserHistory'

    const history = createHistory()

        // Get the current location.
        const location = history.location

        // Listen for changes to the current location.
        const unlisten = history.listen((location, action) => {
                  // location is an object like window.location
                  console.log(action, location.pathname, location.state)
                  })

    // Use push, replace, and go to navigate around.
    history.push('/home', { some: 'state' })

    // To stop listening, call the function returned from listen().
    unlisten()



