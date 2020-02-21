import React, {Component} from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import StoryContainer from './StoryContainer'
import { Button, Message } from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
    super(props)

    //no one is logged in yet so loggedIn is false
    //logged in username = null because no username is logged in yet
    this.state = {
      loggedIn: false,
      loggedInUsername: null,
      message: ''
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

      if(registerResponse.status === 201) {
        this.setState({
          loggedIn: true,
          loggedInUsername: registerJson.data.username,
          message: ''
        })
      } else {
        this.setState({
          message: 'A user with that username or email already exists'
        })
      }
    } catch (err) {
        console.error(err)
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
          loggedInUsername: loginJson.data.username,
          message: ''
        })
      } else {
        this.setState({message: 'Invalid username or password'})
      }

    } catch (err) {
      if(err) {
        console.error(err)
      }
    }
  }

  logout = async () => {
    console.log("logout() in App.js +");
    const logoutUrl = process.env.REACT_APP_API_URL + '/api/v1/users/logout' 

    try {
      //get response and fetch call
      const logoutResponse = await fetch(logoutUrl, {
        credentials: 'include',
        //POST 
        method: 'GET',
        //turn body into JSON
        body: JSON.stringify(),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(logoutResponse)

      //get the json from the reponse
      const logoutJson = await logoutResponse.json()
      console.log(logoutJson)
      console.log(logoutJson.data)


      if(logoutResponse.status === 200) {
        this.setState({
          loggedIn: false,
          loggedInUsername: null
        })
      } 

    } catch (err) {
      if(err) {
        console.error(err)
      }
    }

  }

  render() {

    //console.log(process.env);
    //console.log(this.state)

    return (
      <div className="App">
        <h1 className="HowWeMet">How We Met</h1>
        <p className='message'>{this.state.message}</p>
        {
          this.state.loggedIn 
          ? 
          <div>
            <p>{this.state.loggedInUsername} is logged in</p>
            <nav>
              <Button onClick={this.logout}>Logout</Button>
            </nav>
              <StoryContainer />
          </div>
          : 
          <div>
        <p className="HowWeMet">An app created to tell your love story</p>
          <LoginRegisterForm 
            register={this.register}
            login={this.login}
          />
          </div>
        }
        <small className="background">CSS background by Manuel Pinto: https://manuelpinto.in</small>
      </div>
    )
  }
}

export default App;
