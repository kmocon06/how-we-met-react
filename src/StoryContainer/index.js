import React from 'react'
import StoryList from '../StoryList'
import NewStoryForm from '../NewStoryForm'
import EditStoryModal from '../EditStoryModal'

class StoryContainer extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			stories: [],
			idOfStoryToEdit: -1
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

  	//DESTROY story
  	// delete /id
	deleteStory = async (id) => {
    	console.log("deleteStory() in StoryContainer")
    	console.log(id)

   		try {

      		const deleteStoryResponse = await fetch(process.env.REACT_APP_API_URL + "/api/v1/stories/" + id, {
        		credentials: 'include',
        		method: 'DELETE'
      		})

      		const deleteStoryJson = await deleteStoryResponse.json()
      		console.log("delete story response in json")
      		console.log(deleteStoryJson)

      		if(deleteStoryJson.status === 200) {
	      		//we need the current state of stories
	    		const stories = this.state.stories
	    		//we should loop through the stories starting with index 0
	      		let indexOfStory = 0

	    		for(let i = 0; i < stories.length; i++) {

	      			if(stories[i].id === id) {
	        			indexOfStory = i
	      			}
	      		}

	      		//get rid of the story from the array 
	    		stories.splice(indexOfStory, 1)

	      		this.setState({ 
	      			stories: stories
	      		})
               
      		} else {
        		throw new Error("Can't delete story")
      		}

    	} catch(err) {
      		console.error(err)
    	}
	}

	//EDIT story
	//GET /id
	editStory = (idOfStoryToEdit) => {
    	console.log("id of story")
    	console.log(idOfStoryToEdit)

    	this.setState({
      		idOfStoryToEdit: idOfStoryToEdit
    	})
  	}

  	//UPDATE story
  	//GET /id
  	updateStory = async (newStoryInfo) => {
    	// id of dog we need is in state
    	console.log("updateStory in StoryContainer")
    	console.log(newStoryInfo)

    	try {
    		const updateStoryResponse = await fetch(
      			process.env.REACT_APP_API_URL + "/api/v1/stories/" + this.state.idOfStoryToEdit, 
      			{
      				credentials: 'include',
        			method: 'PUT',
        			body: JSON.stringify(newStoryInfo), 
        			headers: {
          				'Content-Type': 'application/json'
        			}
      			}
    		)
    		console.log("response from updateStory in StoryContainer")
    		console.log(updateStoryResponse)

    		const updateStoryJson = await updateStoryResponse.json()
    		console.log("updateStoryJson")
    		console.log(updateStoryJson)

    	} catch(err) {
    		console.log(err)
    	}
	}


	render() {
		console.log(this.state)

		return(
			<React.Fragment>
			<h4>Story Container</h4>
			<StoryList stories={this.state.stories} 
			deleteStory={this.deleteStory} editStory={this.editStory}/>
			<NewStoryForm createStory={this.createStory}/>
			 {
          		this.state.idOfStoryToEdit !== -1 
          		? 
          		<EditStoryModal 
          			storyToEdit={this.state.stories.find((story) => story.id === this.state.idOfStoryToEdit)}
          			updateStory={this.updateStory}
          		/>
          		:
          		null
        	}
			</React.Fragment>
		)
	}
}


export default StoryContainer