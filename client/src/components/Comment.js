import React, { useState, useEffect } from "react";

import { Row, Col, Container, Card, Image } from "react-bootstrap";
import { relativeDays } from "../common/common";
import {
  createComment,
  retrieveAllComments,
  updateCommentWithReply,
  updateCommentWithUpwork,
} from "../services/commentService";
import upvoteIcon from "../assets/upvote.svg";
import profilePic from "../assets/profile.png";
import "./comment.css";

const Commment = () => {
  const [comment, setComment] = useState("");
  const [data, setData] = useState("");
  const [noUpwork, setNoUpwork] = useState(0);
  const [reply, setReply] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    retriveData();
  }, []);

  async function retriveData(comments) {
    const result = await retrieveAllComments();
    setData(result);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await createComment(comment);

      alert(result[1]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpwork = (index) => {
    setNoUpwork(noUpwork + 1);
    updateCommentWithUpwork(noUpwork, index);
  };

  const handleReply = (e, index) => {
    setReply(e.target.value);
    setTimeout(() => {

      updateCommentWithReply(reply, index);
    }, 3000);
  };

  return (
    <Container className="p-3 m-4">
      <p className="heading-text">Discussion</p>
      <Row className=" m-1">
        <Col>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <Row>
                <Col className="col-8">
                  {" "}
                  <input
                    type="text"
                    id="usernameInput"
                    className="form-control"
                    placeholder="What are your thoughts?"
                    onChange={handleInputChange}
                  />
                </Col>
                <Col lassName="col-1 ">
                  <button type="submit" className="btn btn-comment">
                    Comment
                  </button>
                </Col>
              </Row>
            </fieldset>
          </form>
        </Col>
      </Row>

      <Row>
        {data
          ? data.map((item, index) => (
              <>
                <Card>
                  <Row>
                    <Col>
                      {" "}
                      <Image src={profilePic} className="pe-2"></Image>
                    </Col>
                    <Col>{item.user}</Col>

                    <Col className="time-text">
                      .{relativeDays(item.createdAt)}
                    </Col>
                  </Row>
                  <Row>
                    {" "}
                    <Col>{item.comment}</Col>
                  </Row>
                  <Row>
                    <Col>
                      {" "}
                      <Image
                        src={upvoteIcon}
                        onClick={() => handleUpwork(item.id)}
                        className="pe-2"
                      ></Image>
                    </Col>
                  </Row>

                  {item.reply ? (
                    item.reply
                  ) : (
                    <div className="mb-3">
                      <input
                        type="text"
                        id="usernameInput"
                        className="form-control"
                        placeholder="reply "
                        onClick={(e) => handleReply(e, item.id)}
                      />
                    </div>
                  )}
                </Card>
              </>
            ))
          : null}
      </Row>
    </Container>
  );
};

export default Commment;
