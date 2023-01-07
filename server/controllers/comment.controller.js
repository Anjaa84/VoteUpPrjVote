const db = require("../models");
const Comment = db.comments;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    console.log("title",req.body)
    
  
    // Create a Comment
    const comment = new Comment({
      user: req.body.user,
      comment: req.body.comment,
      reply: req.body.reply,
      noOfupvote: req.body.noOfupvote,
    



      published: req.body.published ? req.body.published : false
    });
  
    // Save comment in the database
    comment
      .save(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the comment."
        });
      });
  };
// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Comment.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comment."
        });
      });
  };



// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Comment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {    
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Comment was not found!`
          });
        } else res.send({ message: "Comment was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
