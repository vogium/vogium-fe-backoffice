import { AccountTypes } from "../enums/user/account-type.enum";

export interface IIdentity {
  authId: string;
  username: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  accountType: AccountTypes;
}
