import * as yup from "yup";

const userUpdateSchema = yup
  .object({
    // authId: string;

    vogCount: yup.number().required(),
    questionCommentCount: yup.number().required(),
    emailAddress: yup.string().required(),
    authId: yup.string().required(),
    username: yup.string().required().min(3),
    //realname: yup.string().required().min(3),
    phoneNumber: yup.string().nullable(),
    createDate: yup.object({
      _seconds: yup.number().required(),
      _nanoseconds: yup.number().required(),
    }),
    gender: yup.string().required(),
    banDate: yup.mixed().notRequired(),
  })
  .required();

export default userUpdateSchema;
