import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBgImage, getWeather, updateInputValue } from '../../redux/reducers/weatherReducer';
import Weather from './Weather';
class WeatherContainer extends Component {
  render() {
    return (
      < Weather {...this.props} />
    );
  }
}
let mapStateToProps = (state) => {
  return {
    location: state.weatherData.location,
    inputValue: state.inputValue,
  }
}
export default connect(mapStateToProps, { getWeather, updateInputValue, getBgImage, })(WeatherContainer);