import React, { useState } from 'react';
import './SearchForm.css'
const SearchForm = (props) => {
  let input = React.createRef(), mainUnit
  props.units.forEach((unit) => {
    if (unit.isSelected === true) {
      mainUnit = unit.name
    }
  })
  for (let key in props.temperature) {
    if (mainUnit === 'celsius') {
      props.temperature[key].temp = props.temperature[key].mainTemp - 273
    }
    else if (mainUnit === 'fahrenheit') {
      props.temperature[key].temp = props.temperature[key].mainTemp * 1.8 - 459.67
    }
    else {
      props.temperature[key].temp = props.temperature[key].mainTemp
    }
  }

  let getWeather = (city) => {
    props.getWeather(city)
    props.getBgImage(props.season)
  }
  let updateInputValue = () => {
    let newInputValue = input.current.value;
    props.updateInputValue(newInputValue);
  }
  let enterHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      getWeather(props.inputValue);
    }
  }
  const [isRotate, setIsRotate] = useState(false)
  let updateWeather = () => {
    setIsRotate(true);
    getWeather(props.location.city)
  }
  return (
    <div className='search-form'>
      <div className="search-form__section-1">
        <button className="refresh-container" onClick={updateWeather} disabled={isRotate}>
          <div onAnimationEnd={() => { setIsRotate(false) }} className={isRotate ? 'search-form__refresh rotate' : 'search-form__refresh'}></div>
        </button>
        <input className='search-form__input' onChange={updateInputValue}
          onKeyPress={enterHandler} ref={input} placeholder='Введите город' />
        <button className='search-form__button' onClick={() => { getWeather(props.inputValue) }}>Поиск</button>
      </div>
      <div className="search-form__section-2">
        <div className="search-form__units">
          {props.units.map((unit) => {
            return (
              <button className={unit.isSelected ? 'search-form__unit selected' : 'search-form__unit'}
                key={props.units.indexOf(unit)}
                onClick={() => { props.setMainUnit(unit.name) }}>°{unit.label}</button>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
