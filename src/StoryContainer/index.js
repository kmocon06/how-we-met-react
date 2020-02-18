import React from 'react'

class StoryContainer extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			stories: []
		}
	}

	//component lifecycle method
	//instantiate the network request
	componentDidMount() {

		this.getStories()
	}

	getStories = async () => {
		try {
			//response from the request
			//fetch the data
			const storiesResponse = await fetch(process.env.REACT_APP_API_URL + "/api/v1/stories/")

			//json of response
			const storiesJson = await storiesResponse.json()
			console.log('data from getStories() in StoryContainer')
			console.log(storiesJson)


		} catch(err) {
			console.log(err);
		}
	}


	render() {
		console.log(this.state)

		return(
			<React.Fragment>
			<h4>Story Container</h4>
			</React.Fragment>
		)
	}
}


export default StoryContainer