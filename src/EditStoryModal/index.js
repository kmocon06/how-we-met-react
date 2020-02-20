import React from 'react'

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

	render() {
		console.log('props in EditStoryModal')
		console.log(this.props)

		return (
			<div>
	    		<h4>Edit your love story:</h4>
	    		<form onSubmit={this.handleSubmit}>
	        		<p>Title:</p>
	        		<input 
	            		type="text"
	            		name="title"
	            		value={this.state.title}
	            		onChange={this.handleChange}
	          		/>
	          		<p>Story:</p>
	          		<input 
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
	          		<button type="Submit">Edit Story</button>
	        	</form>
	      	</div>
		)	
	}
}

export default EditStoryModal
