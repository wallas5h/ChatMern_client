import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { CiPaperplane } from "react-icons/ci";

const MessageForm = () => {
  return (
    <>
      <div className="messages-output h-[80vh] border border-slate-300 overflow-y-scroll mb-[20px]"></div>
      <Form>
        <Row>
          <Col md={11}>
            <FormGroup>
              <Form.Control
                type="text"
                placeholder="Your message"
              ></Form.Control>
            </FormGroup>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              className="w-full bg-orange-400"
            >
              {" "}
              <CiPaperplane />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
