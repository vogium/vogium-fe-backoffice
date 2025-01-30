import * as yup from "yup";
import { OfferStatus } from "../../enums/offers/offers-status.enum";

const offerUpdateSchema = yup.object().shape({
  offerTitle: yup.string().min(3).max(100),

  offerDescription: yup.string().min(10).max(1000),

  offerDocument: yup.string().nullable(),

  offerPrice: yup.number().min(0).max(1000000),

  offerStatus: yup
    .number()
    .oneOf(
      Object.values(OfferStatus).filter((value) => typeof value === "number")
    ),

  //Todo iso string?
  startDate: yup.date(),

  endDate: yup.date(),
});

export default offerUpdateSchema;
