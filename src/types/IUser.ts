export interface IUser {
  vogCount: number;
  questionCommentCount: number;
  authId: string;
  emailAddress: string;
  username: string;
  realname: string;
  phoneNumber: string | null;
  createDate: {
    _seconds: number;
    _nanoseconds: number;
  };
  banDate: null;
}
