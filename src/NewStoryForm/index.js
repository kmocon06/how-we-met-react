import React, { Component } from 'react'
import { Button, TextArea, Form } from 'semantic-ui-react'


class NewStoryForm extends Component {

	constructor(props) {
		super(props)

		this.state = {
    		title: '',
    		content: '',
    		image: ''
    	}
  	}

  //figure out how to upload images here later
  //imageHandler = () => {

  //}

  	handleChange = (event) => {
		//handles the change of each event and its value
    	this.setState({
      		[event.target.name]: event.target.value
    	})

    	//console.log(event)
  	}

  	handleSubmit = (event) => {
  		//default action shouldn't be taken, prevent default
    	event.preventDefault()

    	this.props.createStory(this.state)

    	//reset the state of the story
    	this.setState({
       		title: '',
       		content: '', 
       		image: ''
    	})
  	}


  	render() {
  		//console.log(this.state);

	    return(
	    	<div>
	    		<h4>Add a new love story:</h4>
	    		<Form onSubmit={this.handleSubmit}>
	        		<p>Title:</p>
	        		<input 
	            		type="text"
	            		name="title"
	            		value={this.state.title}
	            		onChange={this.handleChange}
	          		/>
	          		<p>Story:</p>
	          		<TextArea 
	            		type="text"
	            		name="content"
	            		value={this.state.content}
	            		onChange={this.handleChange}
	          		/>         
	          		<p>Image:</p>
	          		<input 
	            		type="file"
	            		name="image"
	            		value={this.state.image}
	            		onChange={this.handleChange}
	          		/>
	          		<Button type="Submit">Create Story</Button>
	        	</Form>
	      	</div>
	    )
	}
}


export default NewStoryForm
