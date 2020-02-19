import React, {Component} from 'react'


class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
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


	render() {
		return(
			<div className="LoginRegisterForm">
        		<h2 className="LoginRegisterForm-action">{this.state.action + " here"}</h2>
				<form>
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
				            />
				            </div>
				            <div>
				            <input
				            	type="text"
				            	name="email"
				                placeholder="Enter Email"
				                value={this.state.email}
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
						/>
					</div>
					<div>
						<input
							type="password"
							name="password"
							placeholder="Enter Password"
							value={this.state.password}
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