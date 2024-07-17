import React,{useState,useEffect} from 'react';
import axios from 'axios';

const CommentList = ({comments}) => {
    // const [comments, setComments] = useState({})

    // const fetchComments = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data);
    // }

    // useEffect(() => {
    //     fetchComments();
    // }, [])

    const renderedPost = Object.values(comments).map(post => {
        return <li key={post.id}>{post.content}</li>
    })
  return (
    <ul>{renderedPost}</ul>
  )
}

export default CommentList