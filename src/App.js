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

  //register user
  register = async (registerInfo) => {
    console.log("register() in App.js +", registerInfo);
    const registerUrl = process.env.REACT_APP_API_URL + '/api/v1/users/register'

    try {
      //get response and fetch call
      const registerResponse = await fetch(registerUrl, {
        credentials: 'include', 
        //POST 
        method: 'POST',
        //turn body into JSON
        body: JSON.stringify(registerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(registerResponse)

      //get the json from the reponse
      const registerJson = await registerResponse.json()
      console.log(registerJson)

    } catch (err) {
      if(err) {
        console.error(err)
      }
    }
  }

  //login user
  login = async (loginInfo) => {
    console.log("login() in App.js +", loginInfo);
  }

  render() {

    console.log(process.env);

    return (
      <div className="App">
        <h1>How We Met</h1>
        {
          this.state.loggedIn 
          ? <StoryContainer />
          : <LoginRegisterForm 
            register={this.register}
            login={this.login}
          />
        }
      </div>
    )
  }
}

export default App;
