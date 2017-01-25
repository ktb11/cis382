// React package required for all React components
import React from 'react';
// ReactDOM required when interacting with React DOM elements
import ReactDOM from 'react-dom';

// Causes (throws/raises) error upon failure
import { check } from 'meteor/check'

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

// Only one default export allowed per file (export default)
// Could use function or class format

// When subclassing React.Component, supplying render() method required

// CLASS syntax default export
export default class DefaultClass extends React.Component {
  render() {
    return <div>Hello, World! (Default CLASS)</div>;
  }
}
// FUNCTION syntax default export
/*
export default function DefaultFunction() {
    return <h1>Hello, World! (Default FUNCTION)</h1>;
}
*/

// CLASS syntax named export (can mix class and function syntax with named exports)
export class NamedClass extends React.Component {
  render() {
    return <p>Hello, World! (Named CLASS)</p>;
  }
}

// FUNCTION syntax named export (can mix class and function syntax with named exports)
export function NamedFunction() {
    return <p>Hello, World! (Named FUNCTION)</p>;
}

// CLASS with parameters (props), this.props supplied automatically as go-between
// note use of { } around JSX variable
// Props are read-only
export class NamedClassProps extends React.Component {
  render() {
    return <p>Hello, {this.props.name}! (Named CLASS PROPS)</p>;
  }
}

// Use a class to fully encapsulate related functionality/behavior (displaying 
// changing time)
export class Clock extends React.Component {
  // Constructor methods are called upon creation of class
  // Normally you don't need a constructor for a class, but if you want
  // some type of initialization, then use a constructor
  constructor(props) {
    // Props (mechanism for passing read-only data in React Component) should
    // be setup to be passed into Component and then passed to base class
    super(props);
    // this.state assignment technique ONLY allowed in constructor
    // All other Component methods use this.setState() method
    // Special note: state may be updated asynchronously, so do not use
    // state as a property, rather use setState as a function to receive previous
    // state: this.setState( (prevState) => ({ prevState.someClassProperty .... }));
    // Set an initial value for the date property to a Date object
    // Why not a prop (property)? Props are read-only
    this.state = {date: new Date()};
  }
  // Lifecycle hook methods
  // Runs after component output rendered to the DOM
  componentDidMount() {
    // Use ES6 arrow syntax to establish a function, something must be to the left of arrow, use () when
    // no parameters
    // setInterval wants function to be called for the specified interval in milliseconds, in this
    // case an anonymous function using ES6 arrow syntax
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }
  // Runs before component is destroyed
  componentWillUnmount() {
    // Remove the timer - clean up used resources
    clearInterval(this.timerID);
  }
  // tick function used to update the state property date with the current date object
  tick() {
    this.setState({
      date: new Date()
    });
  }
  // Display the current date as a locale-specific string from date state property Date object
  render() {
    return (
      // JSX { } around JavaScript expression
      <div>{this.state.date.toLocaleTimeString()}</div>
    );
  }
}
// Use a CLASS to handle and event and change a state counter, displayed on button face
export class CountClicks extends React.Component {
  constructor(props) {
    super(props);
    // Initialize a state counter property
    // Why not a prop (property)? Props are read-only
    this.state = {counter: 0};
  }
  // Setup callback function to handle button click
  handleClick(event) {
    // Prevent any default action as a result of clicking button
    event.preventDefault();
    // Note parenthesis not required to hold a single parameter using ES6 function arrow syntax,
    // but would be required with a second parameter separated by a comma
    // Remember that state and props are propertys, so use property syntax ( : )
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
  }
  // Display the button, and update the button face using JSX expression
  // Use onClick to setup callback for the button click, binding the this object (the button) using .bind
  // (required with React, other techniques available, this technique working best for now)
  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>{"Click Me - " + this.state.counter}</button>
    );
  }
}
// Conditional Component render, adding check to verify Consumer of Component sent a number
// ES6 use of let (var replacement)
export class ConditionalRandom extends React.Component {
  render() {
    check(this.props.number, Number);
    let oddEven = 'Odd';
    if (this.props.number % 2 == 0) {
      oddEven = 'Even'
    }
    return (
      // Have to surround return with tags to prevent interpreting as JavaScript
      // Why? React JSX components can ONLY return a single element
      <span>
        Number {this.props.number} is {oddEven}<br />
        Ternary: {this.props.number} is {this.props.number % 2 == 0 ? 'Even' : 'Odd'}
      </span>
    );
  }
}

// Note: Returning null from a Component prevents display of Component
// Controlled components, demonstrating using Component state to authoritatively hold input value
// See https://facebook.github.io/react/docs/forms.html for more about handling forms
export class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ''};
  }
  handleChange(event) {
    // We can ignore the default action since we're responding to the onChange event
    // event.preventDefault();
    this.setState({inputValue: event.target.value});
  }
  render() {
    return (
      <span>
      Enter Something: <input type="text" value={this.state.inputValue} onChange={this.handleChange.bind(this)} />
      Output: {this.state.inputValue}
      </span>
    );
  }
}

// Want to know how to convert between React functions and classes? See
// https://facebook.github.io/react/docs/state-and-lifecycle.html, look for
// Converting a Function to a Class
