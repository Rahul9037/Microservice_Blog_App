const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts" , (req,res) => {
    res.send(posts)
})

const handleRequests = (type,data) =>{
    if(type === 'PostCreated'){
        const { id,title } = data;
        posts[id] = { id , title , comments:[]}
    } 
    if(type === 'CommentCreated'){
        const { postId,content,id,status } = data;
        let post = posts[postId];
        post.comments.push({id,content,status})
    }  
    if(type === 'CommentUpdated'){
        const { postId,content,id,status } = data;
        let post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    } 
}

app.post("/events" , (req,res) => {
    const {type,data} = req.body;
    handleRequests(type,data);
    res.send({}) 
})

app.listen(4002, async ()=>{
    console.log("listening to 4002")
    try {

        const res = await axios.get('http://event-bus-srv:4005/events');

        for (let event of res.data){
            const {type,data} = event;
            handleRequests(type,data);
        }
        
    } catch (error) {
        console.log(error)
    }

})