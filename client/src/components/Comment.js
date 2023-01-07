import React, { useState, useEffect } from "react";

import { Row, Col, Container,Card } from "react-bootstrap";
import { relativeDays } from "../common/common";
import { createComment, retrieveAllComments } from "../services/commentService";

const Commment = () => {
  const [comment, setComment] = useState("");
  const [data, setData] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  useEffect( () => {
 
   
    retriveData();
  }, []);

  async  function retriveData(comments) {
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

  return (
    <Container className="p-0 m-0 result-row">
      <Row className=" m-1">
        <Col className="col-8 p-0 m-0">
          <p className="left-align-text">Discussion</p>
        </Col>
        <Col className="col-4">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="mb-3">
                <input
                  type="text"
                  id="usernameInput"
                  className="form-control"
                  placeholder="What are your thoughts?"
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Comment
              </button>
            </fieldset>
          </form>
        </Col>
      </Row>
      {console.log("sdoifnad",data)}
      <Row>{data ? data.map((number) => 
   <>
   <Card>
   <li>{number.user}</li>
   <li>{number.comment}</li>
   <li>{relativeDays(number.createdAt)}</li>
   <div className="mb-3">
                <input
                  type="text"
                  id="usernameInput"
                  className="form-control"
                  placeholder="What are your thoughts?"
                  onChange={handleInputChange}
                />
              </div>
   </Card>
</>
      
      ) 
      
      : null}</Row>
    </Container>
  );
};

export default Commment;
