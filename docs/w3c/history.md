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
