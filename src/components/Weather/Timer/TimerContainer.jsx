import { connect } from 'react-redux';
import { setLocalDate, updateLocalDate } from '../../../redux/reducers/weatherReducer';
import Timer from './Timer';

let mapStateToProps = (state) => {
  return {
    currentDate: state.weatherData.timeData.currentDate
  }
}
export default connect(mapStateToProps, { updateLocalDate, setLocalDate })(Timer);