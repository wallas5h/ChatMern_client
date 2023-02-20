import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { apiSocketUrl } from "../config/api";
import { MessageDto } from "../dto/message.dto";
import { PrivateUser } from "../dto/user";

export const socket = io(apiSocketUrl);

interface MessagesInterface {
  _id: string;
  messagesByDate: MessageDto[];
}

interface AppState {
  rooms: string[];
  currentRoom: string;
  members: PrivateUser[];
  messages: MessagesInterface[] | [];
  privateMemberMsg: PrivateUser | null;
  newMessages: {};
}

const initialState: AppState = {
  rooms: [],
  currentRoom: "general",
  members: [],
  messages: [],
  privateMemberMsg: null,
  newMessages: {},
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setPrivateMemberMSg: (state, action) => {
      state.privateMemberMsg = action.payload;
    },
    setNewMessages: (state, action) => {
      state.newMessages = action.payload;
    },
  },
});

export const {
  setRooms,
  setCurrentRoom,
  setMembers,
  setMessages,
  setPrivateMemberMSg,
  setNewMessages,
} = appSlice.actions;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
