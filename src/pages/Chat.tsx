import { Col, Container, Row } from "react-bootstrap";
import MessageForm from "../components/MessageForm";
import { Sidebar } from "../components/Sidebar";

export default function Chat() {
  return (
    <Container>
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
}
