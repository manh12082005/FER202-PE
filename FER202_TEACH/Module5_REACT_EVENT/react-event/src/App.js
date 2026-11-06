import React from 'react';
import { EventOnClick } from './components/EventOnClick';
import { EventOnChange } from './components/EventOnChange';
import { EventOnSubmit } from './components/EventOnSubmit';
import './App.css';

function App() {
  return (
    <div className="App" style={{ padding: '20px', textAlign: 'left' }}>
      <h1>React Events Demo</h1>
      <hr />
      <EventOnClick />
      <hr />
      <EventOnChange />
      <hr />
      <EventOnSubmit />
    </div>
  );
}

export default App;
