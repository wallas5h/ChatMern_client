import { ListGroup, ListGroupItem } from "react-bootstrap";

export const Sidebar = () => {
  const rooms = ["first room", "second room", "third room"];
  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroupItem key={idx}>{room}</ListGroupItem>
        ))}
      </ListGroup>
      <h2>Members</h2>
    </>
  );
};
