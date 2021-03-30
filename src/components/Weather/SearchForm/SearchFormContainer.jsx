import { connect } from 'react-redux';
import { getBgImage, getWeather, setMainUnit, updateInputValue } from '../../../redux/reducers/weatherReducer';
import SearchForm from './SearchForm';

let mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    location: state.weatherData.location,
    units: state.units,
    temperature: state.weatherData.weather.temperature
  }
}

export default connect(mapStateToProps, { getWeather, updateInputValue, getBgImage, setMainUnit })(SearchForm);