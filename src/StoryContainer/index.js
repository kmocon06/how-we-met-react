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
	//POST
	createStory = async (newStory) => {
		console.log('newStory in createStory() in StoryContainer')
    	console.log(newStory);

		try {
      
    		const createStoryResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/stories/', {
    			credentials: 'include',
      			method: 'POST',
    			body: JSON.stringify(newStory), 
    			headers: {
        			'Content-Type': 'application/json'
        		}
    		})

      		const createStoryJson = await createStoryResponse.json()
      		console.log("createStoryJson in createStory() in StoryContainer");
      		console.log(createStoryJson)

      		//if the status is 201 then we add the new data
      		if(createStoryResponse.status === 201) {
        		//getting all stories with spread operator
        		//(... means all of the stories) and then the one we want to add
        		this.setState({
          			stories: [...this.state.stories, createStoryJson.data]
       			})
      		}


    	} catch(err) {
      		console.error(err)
    	}
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