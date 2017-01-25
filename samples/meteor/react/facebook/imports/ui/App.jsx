// JSX - inline markup transpiled
// Note that some packages are Meteor, others are React
// React package required, importing named items as well
import React, { Component, PropTypes } from 'react';
// ReactDOM required when interacting with React DOM elements
import ReactDOM from 'react-dom';
// Named method/object to check data types (https://docs.meteor.com/api/check.html) against a pattern
// Causes (throws/raises) error upon failure
import { check } from 'meteor/check'

// Importing default CLASS or FUNCTION, matches HelloWorld.jsx exports
import DefaultClass from './HelloWorld.jsx';
// import DefaultFunction from './HelloWorld.jsx';

// Named imports (could have combined into single statement)
import { NamedClass } from './HelloWorld.jsx';
import { NamedFunction } from './HelloWorld.jsx';
import { NamedClassProps } from './HelloWorld.jsx';
import { Clock } from './HelloWorld.jsx';
import { CountClicks } from './HelloWorld.jsx';
import { ConditionalRandom } from './HelloWorld.jsx';
import { FormInput } from './HelloWorld.jsx';

// Consider the APP JSX the main component (top-level component) of your web app
// APP JSX loaded via client/main.js
export default class App extends Component {
    constructor(props) {
        // Want a class property? Define within constructor after calling parent using
        // super() (base class), not required but should use props
        // You can also add other class properties "on-the-fly" in any class method
        super(props);
        this.name = "Phil";
    }
    // Class methods commonly used to render individual components to provider
    // rendered content to render() method, but not required (see below)
    renderFunction() {
        return <DefaultClass />
    }
    // CLASS methods can accept arguments
    renderFunctionWithArguments(num) {
        check(num, Number);
        return num * num;
    }
    // All classes subclassed from React Component must provider a render() method
    // Note use of { /* */} for comments within React JSX block below
    // Note use of className rather than class attribute name to prevent conflicht
    // with JavaScript class reserved keyword
    // Note lowercase tags indicate standard HTML tags (<div />, 
    // uppercase tags indicate JSX component (<NamedClass />), use camelCase!
    // Note use of self-closing tags, such as <br />
    render() {
        return (
            <div className="container">
                {/* Call class (this) method to render individual component */}
                {/* Reminder that the this keyword refers to the instance of the class */}
                {this.renderFunction()}<br />
                {/* Or you can just call the JSX components directly */}
                <NamedClass /><br />
                <NamedFunction /><br />
                {/* You can pass data to JSX component used props (named properties) */}
                <NamedClassProps name={this.name} /><br />
                {/* JavaScript expressions can be added using { } */}
                Expression: 3 + 4 = {3+4}<br />
                {/* Must return a value, not an object */}
                Static current date/time is: {Date()}<br />
                Static current time is: {new Date().toLocaleTimeString()}<br />
                Updated current time is <Clock /><br />
                Square of 3 is {this.renderFunctionWithArguments(3)}<br />
                <CountClicks /><br />
                {/* Note use of { } to pass a number as props to Component */}
                <ConditionalRandom number={3}/><br />
                <FormInput />
            </div>
        );
    }
}

// User-entered data is safe to embed in JSX, as React DOM escapes and converts
// to strings all user-entered data, thus preventin XSS (cross-site-scripting)
// React elements are the smalled building blocks of React Apps (not to be confused
// with React Components)
// React elements are immutable (once created cannot be changed, thus must be 
// recreated to be changed
// Only elements that change are updated by React DOM
