import { connect } from "react-redux";
import App from "./App";
import { getBgImage, setIsFetching, setUserLocation } from "./redux/reducers/weatherReducer";
import React, { useEffect } from 'react';
import Preloader from "./assets/ComponentsAssets/Preloader/Preloader";
import PreloadImage from './assets/images/preload-image.jpg'
const AppContainer = (props) => {
  let season;
  let style
  let bgImage
  useEffect(() => {
    props.setUserLocation()
  }, [])
  let getSeason = (month) => {
    if (month >= 2 && month <= 4) {
      season = 'spring'
    }
    else if (month > 4 && month <= 7) {
      season = 'summer'
    }
    else if (month > 7 && month <= 10) {
      season = 'autumn'
    }
    else if (month === 11 || ((month >= 0) && (month < 2))) {
      season = 'winter'
    }
    return season
  }
  useEffect(() => {
    if (props.month) {
      props.getBgImage(getSeason(props.month))
    }
  }, [props.month])

  if (!props.month) {
    bgImage = PreloadImage
  }
  else {
    bgImage = props.bgImage
  }
  style = {
    backgroundImage: 'linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(' + bgImage + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
  return (
    <div className='app-wrapper ' style={style}>
      {props.isFetching ? <Preloader /> : <App season={getSeason(props.month)} />}
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    bgImage: state.bgImage,
    month: state.weatherData.timeData.currentDate.month,
    isFetching: state.isFetching
  }
}
export default connect(mapStateToProps, { getBgImage, setUserLocation, setIsFetching })(AppContainer);
