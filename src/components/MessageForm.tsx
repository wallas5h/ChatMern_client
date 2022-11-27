import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, socket } from "../features/appSlice";
import { RootState } from "../features/store";

const MessageForm = () => {
  const user = useSelector((state: RootState) => state.user);
  const { currentRoom, messages, privateMemberMsg } = useSelector(
    (state: RootState) => state.app
  );
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // useEffect(() => {
  //   console.log(privateMemberMsg);
  // }, [privateMemberMsg]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message) return;

    const stringYearDate = getStringDate();
    const stringHoursDate = getStringHours();
    const roomId = currentRoom;
    setMessage("");
    socket.emit(
      "message-room",
      roomId,
      message,
      user,
      stringHoursDate,
      stringYearDate
    );
  };

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    dispatch(setMessages(roomMessages));
  });

  function scrollToBottom() {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const getStringDate = () => {
    const year = new Date().getFullYear().toString();
    const month = (new Date().getMonth() + 1).toString();
    const day = new Date().getUTCDate().toString();

    return `${day}/${month}/${year}`;
  };

  const getStringHours = () => {
    const localStringDate = new Date().toLocaleString();
    const date1 = localStringDate.split(", ");
    const date = date1[1];

    return date;
  };

  return (
    <>
      <div className="messages-output h-[80vh] border border-slate-300 overflow-y-scroll mb-[20px]">
        {user.id && !privateMemberMsg?._id && (
          <div className="alert alert-info">You are in the {currentRoom}</div>
        )}
        {user.id && privateMemberMsg?._id && (
          <>
            <div className="alert alert-info p-0 m-0 text-center h-[100px]">
              <div>
                Your conversation with {privateMemberMsg.name}
                <img
                  src={privateMemberMsg.image}
                  alt={privateMemberMsg.name}
                  className="w-[60px] h-[60px] object-cover my-2 mx-auto mb-8 rounded-full ml-2"
                />
              </div>
            </div>
          </>
        )}
        {user.id &&
          messages.map(({ _id, messagesByDate }, index) => (
            <div key={index}>
              <>
                <p className="alert alert-info w-[150px] my-0 mx-auto">{_id}</p>
                {messagesByDate.map(
                  ({ content, time, from: sender }, index) => (
                    <div
                      key={index}
                      className={
                        sender?.email === user?.email
                          ? "flex justify-end mr-[20px] my-3"
                          : " flex justify-start mr-[20px] my-3"
                      }
                    >
                      <div className="flex items-center ml-[20px] mb-[10px] p-[10px] min-w-[200px] max-w-[90%] text-left min-h-[80px]  rounded bg-[#d1e7dd]">
                        <div className="flex flex-wrap items-center mb-3 bg-orange-100">
                          <img
                            src={sender.image}
                            alt={sender.name}
                            className="w-[35px] h-[35px] object-cover rounded-full mr-[10px]"
                          />
                          <p className="pr-2 text-blue-600">
                            {sender.id == user.id ? "You: " : sender.name}
                          </p>
                          <p className="pr-2 ">{content}</p>
                          <p className=" block text-sm w-full text-right">
                            {time}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </>
            </div>
          ))}

        {!user.id && <div className="alert alert-danger"> Login first</div>}
        <div ref={messageEndRef} />
      </div>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col md={11}>
            <FormGroup>
              <Form.Control
                type="text"
                placeholder="Your message"
                disabled={!user.id}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </FormGroup>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              className="px-2 bg-orange-400 cursor-pointer"
              disabled={!user.id}
            >
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
