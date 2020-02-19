import React from 'react'
import StoryList from '../StoryList'
import NewStoryForm from '../NewStoryForm'

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
			const storiesResponse = await fetch(process.env.REACT_APP_API_URL + "/api/v1/stories/", {
				credentials: 'include'
			})

			//json of response
			const storiesJson = await storiesResponse.json()
			//console.log('data from getStories() in StoryContainer')
			//console.log(storiesJson)

			this.setState({
        		stories: storiesJson.data
      		})


		} catch(err) {
			console.log(err);
		}
	}

	//CREATE story
	createStory = async (newStory) => {
		console.log('newStory in createStory() in StoryContainer')
    	console.log(newStory);
  }


	render() {
		console.log(this.state)

		return(
			<React.Fragment>
			<h4>Story Container</h4>
			<StoryList stories={this.state.stories}/>
			<NewStoryForm createStory={this.createStory}/>
			</React.Fragment>
		)
	}
}


export default StoryContainer