import { useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiUrl } from "../config/api";
import { User } from "../dto/user";
import {
  setCurrentRoom,
  setMembers,
  setPrivateMemberMSg,
  setRooms,
  socket,
} from "../features/appSlice";
import { RootState } from "../features/store";
import { resetNotifications } from "../features/userSlice";

export const Sidebar = () => {
  const { rooms, members, currentRoom } = useSelector(
    (state: RootState) => state.app
  );
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      getRooms();
      getMembers();
      dispatch(setCurrentRoom("general"));
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  const getRooms = async () => {
    const res = await fetch(`${apiUrl}/rooms`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data) {
      dispatch(setRooms(data.rooms));
    }
  };

  const getMembers = async () => {
    socket.off("new-user").on("new-user", (payload) => {
      dispatch(setMembers(payload));
    });
  };

  const joinRoom = (room: string, isPublic = true) => {
    if (!user) {
      return toast.error("Login first");
    }
    socket.emit("join-room", room, currentRoom);
    dispatch(setCurrentRoom(room));

    if (isPublic) {
      dispatch(setPrivateMemberMSg(null));
    }
    dispatch(resetNotifications(room));
  };

  if (!user.id) {
    return <></>;
  }

  return (
    <>
      <h2 className="my-2">Available rooms</h2>
      <ListGroup>
        {rooms.map((room, index) => (
          <ListGroupItem
            className=" cursor-pointer hover:bg-green-300"
            key={index}
            onClick={() => joinRoom(room)}
          >
            {room}
          </ListGroupItem>
        ))}
      </ListGroup>
      <h2 className="my-2 mt-4">Members</h2>
      <ListGroup>
        {members.map((member: User, index) => (
          <ListGroupItem
            className=" cursor-pointer hover:bg-green-300"
            key={index}
          >
            {member.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};
