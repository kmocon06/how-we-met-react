import React from 'react'

function StoryList(props) {
	//loop through all of the stories
	const stories = props.stories.map((story) => {
    	return <li key={story.id}>
    	Title: {story.title} by {story.user_id.username}</li>
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