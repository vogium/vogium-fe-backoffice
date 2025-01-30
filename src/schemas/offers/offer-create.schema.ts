import * as yup from "yup";
import { OfferStatus } from "../../enums/offers/offers-status.enum";

const offerCreateSchema = yup.object().shape({
  offerTitle: yup.string().min(3).max(100),

  offerDescription: yup.string().min(10).max(1000),

  offerDocument: yup.string().nullable(),

  offerPrice: yup.number().min(0).max(1000000),

  offerStatus: yup
    .number()
    .oneOf(
      Object.values(OfferStatus).filter((value) => typeof value === "number")
    ),

  startDate: yup.date().min(new Date()).max(yup.ref("endDate")),
  endDate: yup.date().min(yup.ref("startDate")).max(new Date()),
});

export default offerCreateSchema;
