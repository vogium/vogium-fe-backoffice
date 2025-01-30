import * as Yup from "yup";
import { ContractStatus } from "../../enums/contracts/contract-status.enum";
import { ContractType } from "../../enums/contracts/contract-type.enum";

export const contractUpdateSchema = Yup.object().shape({
  id: Yup.string(),
  type: Yup.mixed<ContractType>().oneOf(
    Object.values(ContractType).filter(
      (value): value is ContractType => typeof value !== "string"
    )
  ),
  userIds: Yup.array().of(Yup.string().required()),
  startDate: Yup.date(),
  endDate: Yup.date(),
  status: Yup.mixed<ContractStatus>().oneOf(
    Object.values(ContractStatus).filter(
      (value): value is ContractStatus => typeof value !== "string"
    )
  ),
  description: Yup.string().required("Description is required"),
  documentIds: Yup.array().of(Yup.string().required()),
  signatures: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required("Signature ID is required"),
      authorId: Yup.string().required("Author ID is required"),
      type: Yup.string().required("Type is required"),
      state: Yup.string().required("State is required"),
      ip: Yup.string().required("IP is required"),
      deviceName: Yup.string().required("Device name is required"),
      deviceOS: Yup.string().required("Device OS is required"),
      date: Yup.date().required("Date is required"),
      documentIds: Yup.array()
        .of(Yup.string().required())
        .required("Document IDs are required"),
    })
  ),
  logs: Yup.array().of(Yup.mixed()),
});
