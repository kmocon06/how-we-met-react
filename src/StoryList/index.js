import React from 'react'

function StoryList(props) {
	//loop through all of the stories
	const stories = props.stories.map((story) => {
    	return (
        <div>
        <li key={story.id}>
    	   Title: {story.title} by {story.user_id.username}
        </li>
        <button onClick={() => props.deleteStory(story.id)}>Delete</button>
        <button onClick={() => props.editStory(story.id)}>Edit</button>
        </div>
      )
  	})
  return(
  	<div>
    	<h1>"Story List"</h1>
    		<ul>
    			{stories}
    		</ul>
    </div>
  )
}

export default StoryList