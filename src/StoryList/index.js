import React from 'react'


function StoryList(props) {
	//loop through all of the stories 
	const stories = props.stories.map((story) => {
    	return (
        <div className='ui celled list'>
        <li key={story.content}>
    	   <p>Title: {story.title} </p>
         <p> 
          {story.content} </p>
         by {story.user_id.username}
        </li>
        <button onClick={() => props.deleteStory(story.id)}>Delete</button>
        <button onClick={() => props.editStory(story.id)}>Edit</button>
        </div>
      )
  	})
  return(
  	<div>
    	<h1>My Love Stories</h1>
    		<ul>
    			{stories}
    		</ul>
    </div>
  )
}

export default StoryList