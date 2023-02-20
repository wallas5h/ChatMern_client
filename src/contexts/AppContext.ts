import React from "react";

interface logContextType {
  rooms: string[];
  changeRoom: (value: string) => void;
  setCurrentRoom: (value: string) => void;
  setMembers: (value: string) => void;
  setPrivateMemberMSg: (value: string) => void;
  setNewMessages: (value: string) => void;
}

export const defaultObject = {
  rooms: [],
  curentRoomm: [],
  members: [],
  messages: [],
  privateMemberMsg: {},
  newMessages: {},
  setRoomss: () => {},
  setCurrentRoomm: () => {},
  setMemberss: () => {},
  setMessagess: () => {},
  setPrivateMemberMSgg: () => {},
  setNewMessagess: () => {},
};

export const AppContext = React.createContext(defaultObject);
