import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Weather from './Weather.jsx';

const apiKey = "xxxxxx";

// App component - represents the whole app
export default class App extends Component {
  
  // App class constructor
  constructor(props) {
    // Call parent class (Component) constructor to setup props
    super(props);
    // Setup class state object to hold changing weather data object
    this.state = {weatherData: {}};
  }
  
  // Button click event handler
  handleGetWeatherButtonClick(event) {
    // Prevent default submit event
    event.preventDefault();

    // Find input field data via the React ref
    let zipCode = ReactDOM.findDOMNode(this.refs.zipInput).value.trim();
    let countryCode = ReactDOM.findDOMNode(this.refs.countryInput).value.trim();

    // Initiate RESTful call
    this.getWeatherData(zipCode, countryCode);
  }
  
  // RESTful web service call, will set class state weatherData object, which will initiate the App component reactive response calling render()
  getWeatherData(zipCode, countryCode) {
    // Call server-side method to return weather
    // Why bind(this) below: http://stackoverflow.com/questions/35581611/exception-in-delivering-result-of-invoking-typeerror-is-not-a-function-in-met
    // Note that setState is asynchronous, which means you should not immediately (sequential) depend on setState changing
    if (Meteor.isClient) {
      Meteor.call("getWeatherData", zipCode, countryCode, apiKey, function(error, results) {
        try{
          console.log(results);
          if (error) {
            console.log("Error in retrieving weather data: " + error);
          } else {
            this.setState({weatherData: JSON.parse(results)});
          }
        } catch (err) {
          console.log("Error in Meteor call: " + err);
        }
      }.bind(this));
    }
  }
  
  // Called by App render to retrieve Weather JSX, passing weather data to component
  renderWeather() {
    if (this.state.weatherData) {
      return <Weather data={this.state.weatherData} />
    }
  }

  // Required render method, renders App component
  render() {
    return (
      <div className="container">
        <header>
          <div id="title">Weather</div><br />
          <div id="credit">Powered by <a href="http://www.openweathermap.org/">OpenWeatherMap</a></div>
        </header>
        <main>
          <div id="tagline">Get A Current Weather Report!</div>
          <form className="weatherInfo" >
              <label className="leftColumn" htmlFor="zipInput">ZIP:</label>
              <input type="text" ref="zipInput" placeholder="Enter ZIP code" /><br />
              <label className="leftColumn" htmlFor="countryInput">Country Code:</label>
              <input type="text" ref="countryInput" placeholder="Enter two letter country code" /><br />
              <div id="weatherSubmit">
                <button id="getWeatherButton" onClick={this.handleGetWeatherButtonClick.bind(this)}>Get Weather</button>
              </div>
          </form>
        <div>
          {this.renderWeather()}
        </div>
        <div>
          
        </div>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}
