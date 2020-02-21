import React from 'react'
import { Button, TextArea, Form, Modal, Header, Icon } from 'semantic-ui-react'

class EditStoryModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '',
			content: '',
			image: ''
		}
	}

	componentDidMount() {

		this.setState({
			title: this.props.storyToEdit.title,
			content: this.props.storyToEdit.content,
			image: this.props.storyToEdit.image
		})
	}

	handleChange = (event) => {
    	this.setState({
      		[event.target.name]: event.target.value
    	})
  	}

  	handleSubmit = (event) => {
    	event.preventDefault()

    	this.props.updateStory(this.state)
  	}

	render() {
		//console.log('props in EditStoryModal')
		//console.log(this.props)

		return (
			<Modal open={true} onClose={(e)=>{this.props.closeEditModal()}} closeIcon>
	    		<Header>Edit your love story:</Header>
	    		<Modal.Content>
	    		<Form onSubmit={this.handleSubmit}>
	        		<p>Title:</p>
	        		<Form.Input 
	            		type="text"
	            		name="title"
	            		value={this.state.title}
	            		onChange={this.handleChange}
	          		/>
	          		<p>Story:</p>
	          		<TextArea 
	            		type="text"
	            		name="content"
	            		style={{ minHeight: 100, minWidth: 300 }}
	            		value={this.state.content}
	            		onChange={this.handleChange}
	          		/>          
	          		<p>Image:</p>
	          		<Form.Input 
	            		type="file"
	            		name="image"
	            		value={this.state.image}
	            		onChange={this.handleChange}
	          		/>
	          		<Modal.Actions>
	          			<Button type="Submit">Edit Story</Button>
	          		</Modal.Actions>
	        	</Form>
	        	</Modal.Content>
	        	</Modal>
		)	
	}
}

export default EditStoryModal
