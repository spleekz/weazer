import React, { useEffect } from 'react';
import TimerContainer from '../Timer/TimerContainer';
import './WeatherInfo.css'

const WeatherInfo = (props) => {
  let mainUnit,
    temp = Math.floor(props.temperature.airTemp.temp),
    feelsLike = Math.floor(props.weather.temperature.feelsLike.temp),
    windSpeed = Math.floor(props.weather.windSpeed),
    sunriseHours = props.timeData.sunrise.hours < 10 ? '0' + props.timeData.sunrise.hours : props.timeData.sunrise.hours,
    sunriseMinutes = props.timeData.sunrise.minutes < 10 ? '0' + props.timeData.sunrise.minutes : props.timeData.sunrise.minutes,
    sunsetHours = props.timeData.sunset.hours < 10 ? '0' + props.timeData.sunset.hours : props.timeData.sunset.hours,
    sunsetMinutes = props.timeData.sunset.minutes < 10 ? '0' + props.timeData.sunset.minutes : props.timeData.sunset.minutes,
    weatherIconUrl = `http://openweathermap.org/img/wn/${props.weather.ui.icon}@2x.png`

  props.units.forEach((unit) => {
    if (unit.isSelected === true) {
      mainUnit = unit.label
    }
  })

  for (let key in props.temperature) {
    if (mainUnit === 'c') {
      props.temperature[key].temp = props.temperature[key].mainTemp - 273
    }
    else if (mainUnit === 'f') {
      props.temperature[key].temp = props.temperature[key].mainTemp * 1.8 - 459.67
    }
    else {
      props.temperature[key].temp = props.temperature[key].mainTemp
    }
  }
  useEffect(() => {
    document.title = props.location.city
  }, [props.location.city])
  return (
    <div className="weather-info">
      <div className="weather-info__location">{props.location.country}, {props.location.city}</div>
      <div className="weather-info__main">
        <div className="weather-info__main-section">
          <div className="temperature">
            <div className="temperature__value">{temp}°{mainUnit}</div>
            <div className="weather-icon" style={{ backgroundImage: 'url(' + weatherIconUrl + ')' }}></div>
          </div>
        </div>
        <div className="weather-info__extra">
          <div className="weather-info__extra_item">{props.weather.ui.description}</div>
          <div className='weather-info__extra_item'>Ощущается как {feelsLike}°{mainUnit}</div>
          <div className='weather-info__extra_item'>Влажность: {props.weather.humidity} %</div>
          <div className='weather-info__extra_item'> Скорость ветра: {windSpeed} м/с </div>
          <div className='weather-info__extra_item'>Облачность: {props.weather.clouds} %</div>
          <div className="weather-info__sun">
            <div className="weather-info__extra_item">Восход в {sunriseHours}:{sunriseMinutes}</div>
            <div className="weather-info__extra_item">Закат в {sunsetHours}:{sunsetMinutes}</div>
          </div>
        </div>
      </div>
      <TimerContainer />
    </div>
  );
};

export default WeatherInfo;