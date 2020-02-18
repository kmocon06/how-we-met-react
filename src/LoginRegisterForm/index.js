import React, {Component} from 'react'

class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<React.Fragment>
				<h2>Already a User? Login</h2>
				<form>
					<div>
						<input
							type="text"
							name="username"
							placeholder="Enter Username"
						/>
					</div>
					<div>
						<input
							type="password"
							name="password"
							placeholder="Enter Password"
						/>
					</div>
				<button>Login</button>
				</form>
			</React.Fragment>
		)
	}
}


export default LoginRegisterForm