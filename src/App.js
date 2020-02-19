import React, {Component} from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import StoryContainer from './StoryContainer'

class App extends Component {
  constructor(props) {
    super(props)

    //no one is logged in yet so loggedIn is false
    //logged in username = null because no username is logged in yet
    this.state = {
      loggedIn: false,
      loggedInUsername: null
    }
  }

  render() {

    console.log(process.env);

    return (
      <div className="App">
        <h1>How We Met</h1>
        {
          this.state.loggedIn 
          ? <StoryContainer />
          : <LoginRegisterForm />
        }
      </div>
    )
  }
}

export default App;
