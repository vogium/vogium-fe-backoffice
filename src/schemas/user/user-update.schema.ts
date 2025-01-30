import * as yup from "yup";

const userUpdateSchema = yup
  .object({
    // authId: string;

    vogCount: yup.number().positive(),
    questionCommentCount: yup.number(),
    emailAddress: yup.string(),
    authId: yup.string(),
    username: yup.string().min(3),
    //realname: yup.string().min(3),
    phoneNumber: yup.string().nullable(),
    createDate: yup.object({
      _seconds: yup.number(),
      _nanoseconds: yup.number(),
    }),
    sex: yup.string(),
    banDate: yup.mixed().notRequired(),
  })
  .required();

export default userUpdateSchema;
