import { User } from "./user";

export interface MessageDto {
  _id: string;
  content: String;
  from: User;
  sockedId: String;
  time: String;
  date: String;
  to: String;
}
