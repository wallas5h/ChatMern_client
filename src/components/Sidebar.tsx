import { useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiUrl } from "../config/api";
import { PrivateUser } from "../dto/user";
import {
  setCurrentRoom,
  setMembers,
  setPrivateMemberMSg,
  setRooms,
  socket,
} from "../features/appSlice";
import { RootState } from "../features/store";
import { addNotifications, resetNotifications } from "../features/userSlice";

export const Sidebar = () => {
  const { rooms, members, currentRoom, privateMemberMsg } = useSelector(
    (state: RootState) => state.app
  );
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      getRooms();
      getMembers();
      dispatch(setCurrentRoom("general"));
      dispatch(setPrivateMemberMSg(null));
      socket.emit("join-room", "general");
      socket.emit("new-user");
      console.log(user);
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

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });

  const orderId = (id1: string, id2: string) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  const handlePrivateMemberMsg = (member: PrivateUser) => {
    dispatch(setPrivateMemberMSg(member));
    const roomId = orderId(String(user.id), String(member?._id));
    joinRoom(roomId, false);
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
            active={room == currentRoom}
          >
            {room}{" "}
            {currentRoom !== room && (
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[room]}
              </span>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
      <h2 className="my-2 mt-4">Members</h2>
      <ListGroup>
        {members.map((member: PrivateUser, index) => (
          <ListGroupItem
            className=" cursor-pointer hover:bg-green-300"
            key={index}
            active={privateMemberMsg?._id === member?._id}
            onClick={() => handlePrivateMemberMsg(member)}
            disabled={member._id === user.id}
          >
            <div className="flex items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-[20px] h-[20px] object-cover rounded-full mr-[10px]"
              />
              <p>{member.name}</p>
              {member._id === user.id ? <p className="ml-3">(You)</p> : ""}
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};
