import React from 'react';
import './App.css';
import StoryContainer from './StoryContainer'

function App() {

  console.log(process.env);

  return (
    <div className="App">
      <h1>How We Met</h1>
      <StoryContainer />
    </div>
  );
}

export default App;
