import axios from "axios";
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

export const createComment = async (comment) => {
  const result = await axios.post("http://localhost:8080/api/comments", {
    comment,
    user: uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
      length: 2,
    }),
  });

  return result.data;
};

export const retrieveAllComments = async (comment) => {
  const result = await axios.get("http://localhost:8080/api/comments");

  return result.data;
};

export const updateCommentWithUpwork = async (noOfUpvote, index) => {
  const result = await axios.put(
    `http://localhost:8080/api/comments/${index}`,
    { noOfUpvote }
  );

  return result.data;
};

export const updateCommentWithReply = async (reply, index) => {
  const result = await axios.put(
    `http://localhost:8080/api/comments/${index}`,
    { reply }
  );

  return result.data;
};
