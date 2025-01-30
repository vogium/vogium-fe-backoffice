import * as yup from "yup";

const reportUpdateSchema = yup
  .object({
    type: yup.string(),
    reportTitle: yup.string(),
    reportDescription: yup.string(),
    reportNote: yup.string().max(3),
    date: yup.string(),
    reportStatus: yup.string(),
  })
  .required();

export default reportUpdateSchema;
