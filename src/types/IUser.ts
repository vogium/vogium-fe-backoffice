import { BaseRecord } from "@refinedev/core";

export interface IUser extends BaseRecord {
  vogCount: number;
  questionCommentCount: number;
  authId: string;
  emailAddress: string;
  username: string;
  realname: string;
  phoneNumber: string;
  createDate: {
    _seconds: number;
    _nanoseconds: number;
  };
  banDate: null;
}
