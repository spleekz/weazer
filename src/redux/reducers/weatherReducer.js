import { imageApi, locationApi, weatherApi } from "../../API/API";
const SET_WEATHER = 'SET_WEATHER',
  UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE',
  SET_MAIN_UNIT = 'SET_MAIN_UNIT',
  SET_BG_IMAGE = 'SET_BG_IMAGE',
  SET_LOCAL_DATE = 'SET_LOCAL_DATE',
  UPDATE_LOCAL_DATE = 'UPDATE_LOCAL_DATE',
  SET_IS_FETCHING = 'SET_IS_FETCHING',
  SET_SUN_TIME = 'SET_SUN_TIME'

let initialState = {
  weatherData: {
    weather: {
      temperature: {
        airTemp: {
          temp: '',
          mainTemp: ''
        },
        feelsLike: {
          temp: '',
          mainTemp: ''
        }
      },
      ui: {
        description: '',
        icon: ''
      },
      humidity: '',
      windSpeed: '',
      clouds: '',
    },
    location: {
      city: '',
      country: '',
      coordinates: {
        lon: null,
        lat: null
      },
    },
    timeData: {
      sunrise: {
        date: '',
        minutes: '',
        hours: '',
      },
      sunset: {
        date: '',
        minutes: '',
        hours: ''
      },
      currentDate: {
        timezone: '',
        localDate: '',
        dayOfTheWeek: '',
        day: '',
        month: '',
        hours: '',
        minutes: '',
        seconds: ''
      }
    },
  },
  units: [
    { name: 'kelvin', label: 'k', isSelected: false },
    { name: 'celsius', label: 'c', isSelected: true },
    { name: 'fahrenheit', label: 'f', isSelected: false },
  ],
  inputValue: '',
  bgImage: undefined,
  isFetching: false,
}

let weatherReducer = (state = initialState, action) => {
  if (action.type === SET_WEATHER) {
    return {
      ...state,
      weatherData: {
        ...state.weatherData,
        weather: {
          temperature: {
            ...state.weatherData.weather.temperature,
            airTemp: {
              ...state.weatherData.weather.temperature.airTemp,
              temp: action.data.main.temp,
              mainTemp: action.data.main.temp
            },
            feelsLike: {
              ...state.weatherData.weather.temperature.feelsLike,
              temp: action.data.main.feels_like,
              mainTemp: action.data.main.feels_like
            }
          },
          ui: {
            description: action.data.weather[0].description,
            icon: action.data.weather[0].icon
          },
          humidity: action.data.main.humidity,
          windSpeed: action.data.wind.speed,
          clouds: action.data.clouds.all,
        },
        location: {
          ...state.weatherData.weather.location,
          coordinates: {
            ...state.weatherData.locationcoordinates,
            lon: action.data.coord.lon,
            lat: action.data.coord.lat
          },
          city: action.data.name,
          country: action.data.countryName
        },
        timeData: {
          ...state.weatherData.timeData,
          sunrise: {
            ...state.weatherData.timeData.sunrise,
            date: new Date(action.data.sys.sunrise * 1000)
          },
          sunset: {
            ...state.weatherData.timeData.sunset,
            date: new Date(action.data.sys.sunset * 1000)
          },
          currentDate: {
            ...state.weatherData.timeData.currentDate,
            localDate: (new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000 + (1000 * action.data.timezone))),
            timezone: action.data.timezone
          }
        }
      }
    }
  }
  if (action.type === UPDATE_INPUT_VALUE) {
    return {
      ...state,
      inputValue: action.value
    }
  }
  if (action.type === SET_MAIN_UNIT) {
    return {
      ...state,
      units: state.units.map((unit) => {
        if (unit.name === action.unit) {
          return {
            ...unit,
            isSelected: true
          }
        }
        return {
          ...unit,
          isSelected: false
        }
      })
    }
  }
  if (action.type === SET_BG_IMAGE) {
    return {
      ...state,
      bgImage: action.url
    }
  }
  if (action.type === SET_LOCAL_DATE) {
    return {
      ...state,
      weatherData: {
        ...state.weatherData,
        timeData: {
          ...state.weatherData.timeData,
          currentDate: {
            ...state.weatherData.timeData.currentDate,
            dayOfTheWeek: state.weatherData.timeData.currentDate.localDate.getDay(),
            day: state.weatherData.timeData.currentDate.localDate.getDate(),
            month: state.weatherData.timeData.currentDate.localDate.getMonth(),
            hours: state.weatherData.timeData.currentDate.localDate.getHours(),
            minutes: state.weatherData.timeData.currentDate.localDate.getMinutes(),
            seconds: state.weatherData.timeData.currentDate.localDate.getSeconds()
          }
        }
      }
    }
  }
  if (action.type === UPDATE_LOCAL_DATE) {
    return {
      ...state,
      weatherData: {
        ...state.weatherData,
        timeData: {
          ...state.weatherData.timeData,
          currentDate: {
            ...state.weatherData.timeData.currentDate,
            localDate: (new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000 + (1000 * state.weatherData.timeData.currentDate.timezone)))
          }
        }
      }
    }
  }
  if (action.type === SET_IS_FETCHING) {
    return {
      ...state,
      isFetching: action.isFetching
    }
  }
  if (action.type === SET_SUN_TIME) {
    return {
      ...state,
      weatherData: {
        ...state.weatherData,
        timeData: {
          ...state.weatherData.timeData,
          sunrise: {
            ...state.weatherData.timeData.sunrise,
            hours: state.weatherData.timeData.sunrise.date.getHours(),
            minutes: state.weatherData.timeData.sunrise.date.getMinutes(),
          },
          sunset: {
            ...state.weatherData.timeData.sunset,
            hours: state.weatherData.timeData.sunset.date.getHours(),
            minutes: state.weatherData.timeData.sunset.date.getMinutes(),
          },
        }
      }
    }
  }
  return state
}
//thunks
export const getWeather = (city) => {
  return (dispatch) => {
    weatherApi.getWeather(city)
      .then(data => {
        locationApi.getCountry(data.coord.lat, data.coord.lon)
          .then(country => {
            data.countryName = country;
            dispatch(setWeather(data));
            dispatch(setSunTime());
            dispatch(setLocalDate())
          })
      })
  }
}
export const getBgImage = (season) => {
  return (dispatch) => {
    imageApi.getImage(season)
      .then(url => {
        dispatch(setBgImage(url))
      })
  }
}
export const setUserLocation = () => {
  return (dispatch) => {
    dispatch(setIsFetching(true))
    locationApi.getUserLocation()
      .then(userLocation => {
        weatherApi.getWeather(userLocation.city)
          .then(data => {
            locationApi.getCountry(data.coord.lat, data.coord.lon)
              .then(country => {
                data.countryName = country;
                dispatch(setWeather(data));
                dispatch(setSunTime());
                dispatch(setLocalDate())
                setTimeout(() => { dispatch(setIsFetching(false)) }, 1500)
              })
          })
      })
  }
}
//action creators
export const setWeather = (data) => {
  return {
    type: SET_WEATHER,
    data
  }
}
export const updateInputValue = (value) => {
  return {
    type: UPDATE_INPUT_VALUE,
    value
  }
}
export const setMainUnit = (unit) => {
  return {
    type: SET_MAIN_UNIT,
    unit
  }
}
export const setBgImage = (url) => {
  return {
    type: SET_BG_IMAGE,
    url
  }
}
export const setLocalDate = () => {
  return {
    type: SET_LOCAL_DATE,
  }
}
export const updateLocalDate = () => {
  return {
    type: UPDATE_LOCAL_DATE
  }
}
export const setIsFetching = (isFetching) => {
  return {
    type: SET_IS_FETCHING,
    isFetching
  }
}
export const setSunTime = () => {
  return {
    type: SET_SUN_TIME
  }
}
export default weatherReducer;