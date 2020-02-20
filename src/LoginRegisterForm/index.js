import React, {Component} from 'react'
import { Button } from 'semantic-ui-react'

class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			username: '',
			password: '',
			message: '',
			action: 'login',
		}
	}

	switchForm = () => {
		//if the action is login then you see the login form
		//and state of action switches to register
		if(this.state.action === 'login') {
			this.setState({
				action: 'register'
			})

		//otherwise if the action state is register then it switches to login
		} else {
			this.setState({
				action: 'login'
			})
		}
	}

	handleChange = (event) => {
		//handles the change of each event and its value
    	this.setState({
      		[event.target.name]: event.target.value
    	})
  	}

  	handleSubmit = (event) => {
    	event.preventDefault()
    	//console.log(`Handle submit with ${this.state.action}`)
    	//console.log(event);
    	this.loginOrRegister()
  	}

  	loginOrRegister = () => {
  		//if the action is register then we should register the user
    	if(this.state.action === "register") {

      		this.props.register(this.state)

      		//if we are trying to register, but the username or email 
      		//already exists then there should be an error message
      		
      	//otherwise we should just be able to login
    	} else {

      		this.props.login(this.state)      
    	}
  	}


	render() {
    	//console.log(this.state);
		return(
			<div className="LoginRegisterForm">
        		<h2 className="LoginRegisterForm-action">{this.state.action + " here"}</h2>
				<form onSubmit={this.handleSubmit}>
					{
            			this.state.action === "register"
            			?
            			<React.Fragment>
            				<div>
				            <input
				            	type="text"
				            	name="name"
				                placeholder="Enter Name"
				                value={this.state.name}
				                onChange={this.handleChange}
				            />
				            </div>
				            <div>
				            <input
				            	type="text"
				            	name="email"
				                placeholder="Enter Email"
				                value={this.state.email}
				                onChange={this.handleChange}
				            />
				            </div>
				        </React.Fragment>
				        :
				        null
				    }
					<div>
						<input
							type="text"
							name="username"
							placeholder="Enter Username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<input
							type="password"
							name="password"
							placeholder="Enter Password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>
				<Button type="Submit">{this.state.action === "register" ? "Register" : "Login"}</Button>
				</form>
				{
          		this.state.action === "register"
          		?
          		//switch to login when you click on button 
          		<small>Already a user? <button className="login-button" onClick={this.switchForm}>Login</button></small>
          		:
          		//switch to register when you click on button 
          		<small>Not a user? <button className="signup-button" onClick={this.switchForm}>Sign Up</button></small>
        		}
			</div>
		)
	}
}


export default LoginRegisterForm