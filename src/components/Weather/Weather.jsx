import React from 'react';
import WeatherInfoContainer from './WeatherInfo/WeatherInfoContainer';
import './Weather.css'

const Weather = () => {
  return (
    <div className='weather'>
      <WeatherInfoContainer />
    </div>
  );
}

export default Weather;
