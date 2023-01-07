import axios from 'axios';

var randomstring = require("randomstring");

export const createComment = async  (comment)=>{
    
 const result = await axios.post('http://localhost:8080/api/comments', {comment,user:randomstring.generate(7)})

  return result.data;
 




}


export const retrieveAllComments = async  (comment)=>{
    
    const result = await axios.get('http://localhost:8080/api/comments')
   
     return result.data;
    
   
   }