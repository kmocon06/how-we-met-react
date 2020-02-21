import React from 'react'
import StoryList from '../StoryList'
import NewStoryForm from '../NewStoryForm'
import EditStoryModal from '../EditStoryModal'
import { Container, Header, Button } from 'semantic-ui-react'
import './index.css'

class StoryContainer extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			stories: [],
			idOfStoryToEdit: -1,
      newFormModalOpen: false
		}
	}

	//component lifecycle method
	//instantiate the network request
	componentDidMount() {

		this.getStories()
	}

  //get all of the user stories
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

  //get all the other stories besides just user
  getAllStories = async () => {
    try {
      const allStoriesResponse = await fetch(process.env.REACT_APP_API_URL + "/api/v1/all_stories/", {
        credentials: 'include'
      })

      const allStoriesJson = await allStoriesResponse.json()

      this.setState({
            allStories: allStoriesJson.data
      })

    } catch(err) {
      console.log(err)
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

            this.closeNewFormModal()

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
    	//console.log("id of story")
    	//console.log(idOfStoryToEdit)

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
    		//console.log("response from updateStory in StoryContainer")
    		//console.log(updateStoryResponse)

    		const updatedStoryJson = await updateStoryResponse.json()
    		//console.log("updateStoryJson")
    		//console.log(updateStoryJson)

    		if(updateStoryResponse.status === 200) {
        
    			const newArrayWithUpdatedStory = this.state.stories.map((story) => {
          			//if the story.id matches the state of the id we want to edit
          			//then we should return the updated data
          			if(story.id === this.state.idOfStoryToEdit) {
            			return updatedStoryJson.data
            		//otherwise just return the same story
          			} else {
            			return story
          			}
        		})
        		console.log(newArrayWithUpdatedStory)

        		this.setState({
          			stories: newArrayWithUpdatedStory
        		})

            //close modal after updating
            this.closeModal()
        	}

    	} catch(err) {
    		console.log(err)
    	}
    }

  closeEditModal = () => {
    this.setState({
      idOfStoryToEdit: -1,
    })
  }

  openNewFormModal = () => {
    this.setState({
      newFormModalOpen: true,
    })
  }

  closeNewFormModal = () => {
    this.setState({
      newFormModalOpen: false,
    })
  }


	render() {
		console.log(this.state)

		return(
			<React.Fragment>
        <Container>
            <Header className="ButtonHeader">
            <Button className="Button" onClick={this.openNewFormModal}>Create New Story</Button>
            </Header>
    			<StoryList stories={this.state.stories} 
    			deleteStory={this.deleteStory} editStory={this.editStory}/>
    			 <NewStoryForm 
            createStory={this.createStory} 
            newFormModalOpen={this.state.newFormModalOpen}
            closeNewFormModal={this.closeNewFormModal}
            />
    			 {
          		this.state.idOfStoryToEdit !== -1 
          		? 
          		<EditStoryModal 
          			storyToEdit={this.state.stories.find((story) => story.id === this.state.idOfStoryToEdit)}
          			updateStory={this.updateStory}
                closeEditModal={this.closeEditModal}
          		/>
          		:
          		null
        	 }
        </Container>
			</React.Fragment>
		)
	}
}


export default StoryContainer