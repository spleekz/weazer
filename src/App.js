import React from 'react';
import MapContainer from './components/Map/MapContainer';
import SearchFormContainer from './components/Weather/SearchForm/SearchFormContainer';
import './App.css'
import Weather from './components/Weather/Weather';

const App = (props) => {
  return (
    <div className='main'>
      <div className='header'>
        <SearchFormContainer season={props.season} />
      </div>
      <div className='app'>
        <Weather />
        <MapContainer />
      </div>
    </div>
  );
}

export default App;