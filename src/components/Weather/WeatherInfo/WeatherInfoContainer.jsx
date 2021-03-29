import { connect } from 'react-redux';
import { setMainUnit } from '../../../redux/reducers/weatherReducer';
import WeatherInfo from './WeatherInfo';

let mapStateToProps = (state) => {
  return {
    weather: state.weatherData.weather,
    temperature: state.weatherData.weather.temperature,
    location: state.weatherData.location,
    units: state.units,
    timeData : state.weatherData.timeData
  }
}
export default connect(mapStateToProps, { setMainUnit })(WeatherInfo);
