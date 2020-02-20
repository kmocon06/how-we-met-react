import React, {Component} from 'react'


class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			username: '',
			password: '',
			action: 'login'
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
      	//otherwise we should just be able to login
    	} else {

      		this.props.login(this.state)      
    	}
  	}


	render() {
    	console.log(this.state);
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
				<button type="Submit">{this.state.action === "register" ? "Register" : "Login"}</button>
				</form>
				{
          		this.state.action === "register"
          		?
          		//register
          		<small>Already a user? Log in <span className="fake-link" onClick={this.switchForm}>here</span>.</small>
          		:
          		//login
          		<small>Not a user? Sign up <span className="fake-link" onClick={this.switchForm}>here</span>!</small>
        		}
			</div>
		)
	}
}


export default LoginRegisterForm