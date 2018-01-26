import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Weather component - represents a single weather result
export default class Weather extends Component {
  render() {
    if (this.props.data.name != undefined) {
      let conditions = [];
      if (this.props.data.weather.length > 0) {
        for (let i = 0; i < this.props.data.weather.length; i++) {
          let w = '';
          let c1 = this.props.data.weather[i].main;
          let c2 = this.props.data.weather[i].description;
          if (i == 0) {
            w = 'Weather Conditions:';
          }
          conditions.push(<div key={i}><label>&nbsp;{w}</label><data>{c1} ({c2})</data></div>);
        }
      }
      return (
        <div className='reactWeatherInfo'>
          <div id="tagline">Current weather conditions for {this.props.data.name}</div>
          <div><label>Temperature:</label> <data>{this.props.data.main.temp}</data></div>
          <div><label>Pressure:</label> <data>{this.props.data.main.pressure}</data></div>
          <div><label>Humidity:</label> <data>{this.props.data.main.humidity}</data></div>
          <div><label>Min Temperature:</label> <data>{this.props.data.main.temp_min}</data></div>
          <div><label>Max Temperature:</label> <data>{this.props.data.main.temp_max}</data></div>
          <div><label>Wind:</label> <data>{this.props.data.wind.speed} at {this.props.data.wind.deg} degrees</data></div>
          { conditions }
        </div>
      )
    } else {
      return null;
    }
    
  }
}

Weather.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  data: PropTypes.object.isRequired,
};

