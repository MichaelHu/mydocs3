# enzyme

> Enzyme is a JavaScript Testing utility for React that makes it easier to `assert`, `manipulate`, and `traverse` your `React Components'` output.

> 猜测：扩展选择器、事件模拟等。`airbnb`出品，与`React Component`结合紧密


* website: <http://airbnb.io/enzyme/>
* github: <https://github.com/airbnb/enzyme>


独立于使用的单测引擎或断言库。`mocha`, `chai`, `jest`, `karma`等都可以。


## 用例入门

React组件`CheckboxWithLabel`的测试用例：

	import React from 'react';
	import {shallow} from 'enzyme';
	import CheckboxWithLabel from '../CheckboxWithLabel';

	it('CheckboxWithLabel changes the text after click', () => {
		// Render a checkbox with label in the document
		const checkbox = shallow(
			<CheckboxWithLabel labelOn="On" labelOff="Off" />
		);

		expect(checkbox.text()).toEqual('Off');

		checkbox.find('input').simulate('change');

		expect(checkbox.text()).toEqual('On');
	});




## Installation

	npm install --save-dev enzyme
	# if react
	npm install --save-dev react-addons-test-utils
	npm install --save-dev react-dom



## 3种渲染方式

### Shallow Rendering

	import { shallow } from 'enzyme';
	const wrapper = shallow( <Foo /> );

### Full DOM Rendering

	import { mount } from 'enzyme';
	const wrapper = mount(<Foo bar="baz" />);

### Static Rendered Markup
	import { render } from 'enzyme';
	const wrapper = render( <Foo /> );




## React Test Utilities

> `ReactTestUtils`，主要用于测试`react component`时来使用。这与`enzyme`是两个不同的东西，只是角色有重叠，所以放在一个文档中。

* facebook针对自家react开发的测试套件
* 可与`enzyme`天生搭配

docs: <https://facebook.github.io/react/docs/test-utils.html>

### Install

	npm install --save-dev react-addons-test-utils


### Import

    import ReactTestUtils from 'react-addons-test-utils' // ES6
    var ReactTestUtils = require('react-addons-test-utils') // ES5 with npm
    var ReactTestUtils = React.addons.TestUtils; // ES5 with react-with-addons.js


### APIs' overview

    Simulate
    renderIntoDocument()
    mockComponent()
    isElement()
    isElementOfType()
    isDOMComponent()
    isCompositeComponent()
    isCompositeComponentWithType()
    findAllInRenderedTree()
    scryRenderedDOMComponentsWithClass()
    findRenderedDOMComponentWithClass()
    scryRenderedDOMComponentsWithTag()
    findRenderedDOMComponentWithTag()
    scryRenderedComponentsWithType()
    scryRenderedComponentWithType()

### Shallow Rendering

> 只渲染一层( `one level deep` )，不考虑子组件的渲染

    createRenderer()
    shallowRenderer.render()
    shallowRenderer.getRenderOutput()

例子：

    function myComponent() {
        return (
            <div>
                <span className="heading">Title</span>
                <SubComponent foo="bar" />
            </div>
        );
    }

Test assertion:

    const renderer = ReactTestUtils.createRenderer();
    renderer.render( <MyComponent /> );
    const result = renderer.getRenderOutput();

    expect( result.type ).toBe( 'div' );
    expect( result.props.children ).toEqual( [
        <span className="heading">Title</span>,
        <SubComponent foo="bar" />
    ] );

目前`局限`是，`不支持refs`。


### Simulate

    Simulate.{eventName}( element, [ eventData ] )

例子：

    // <button ref="button">...</button>
    const node = this.refs.button;
    ReactTestUtils.Simulate.click( node );

又如：

    // <input ref="input" />
    const node = this.refs.input;
    node.value = 'giraffe';
    ReactTestUtils.Simulate.change( node );
    ReactTestUtils.Simulate.keyDown( node, { key: 'Enter', keyCode: 13, which: 13 } );


### ... todo





