module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        user: String,
        comment: String,
        reply: String,
        noOfUpvote:Number
      },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Comment = mongoose.model("Comment", schema);
  return Comment;
};