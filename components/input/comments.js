import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState([])

  useEffect(() => {
    if(showComments) {
      const API = `/api/comments/${eventId}`
      fetch(API).then(response => response.json()).then(data => {
        setCommentsList(data.comments)
      })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentsObj) {
    // send data to API
    console.log(`In addCommentHandler and email = ${commentsObj.email}`)
    const API = `/api/comments/${eventId}`
    fetch(API, {
      method: 'POST',
      body: JSON.stringify({
        email: commentsObj.email,
        name: commentsObj.name,
        text: commentsObj.text
      }),
      'Content-Type': 'application/json'
    }).then(response => response.json()).then(data => console.log(data))
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={commentsList}/>}
    </section>
  );
}

export default Comments;
