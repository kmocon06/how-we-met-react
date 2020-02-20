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
      console.log(registerJson.data)

    } catch (err) {
      if(err) {
        console.error(err)
      }
    }
  }

  //login user
  login = async (loginInfo) => {
    console.log("login() in App.js +", loginInfo);
    const loginUrl = process.env.REACT_APP_API_URL + '/api/v1/users/login' 

    try {
      //get response and fetch call
      const loginResponse = await fetch(loginUrl, {
        credentials: 'include',
        //POST 
        method: 'POST',
        //turn body into JSON
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(loginResponse)

      //get the json from the reponse
      const loginJson = await loginResponse.json()
      console.log(loginJson)
      console.log(loginJson.data)


      if(loginResponse.status === 200) {
        this.setState({
          loggedIn: true,
          loggedInUsername: loginJson.data.username
        })
      }

    } catch (err) {
      if(err) {
        console.error(err)
      }
    }
  }

  render() {

    console.log(process.env);
    console.log(this.state)

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
