import React from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import StoryContainer from './StoryContainer'

function App() {

  console.log(process.env);

  return (
    <div className="App">
      <h1>How We Met</h1>
      <LoginRegisterForm />
      <StoryContainer />
    </div>
  );
}

export default App;
