import React from 'react';
import './Timer.css'
const Timer = (props) => {
  let months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
    days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayOfTheWeek = days[props.currentDate.dayOfTheWeek],
    month = months[props.currentDate.month],
    day = props.currentDate.day,
    hours = props.currentDate.hours < 10 ? '0' + props.currentDate.hours : props.currentDate.hours,
    minutes = props.currentDate.minutes < 10 ? '0' + props.currentDate.minutes : props.currentDate.minutes,
    seconds = props.currentDate.seconds < 10 ? '0' + props.currentDate.seconds : props.currentDate.seconds

  let updateLocalDate = () => {
    props.updateLocalDate();
    props.setLocalDate();
  }
  setTimeout(updateLocalDate, 1000);

  return (
    <div className="timer">
      <div className='timer__current-date'>Местное время: {dayOfTheWeek}, {day} {month}, {hours}:{minutes}:{seconds}</div>
    </div>
  );
}

export default Timer;