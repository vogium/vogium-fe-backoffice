import { OfferStatus } from "../enums/offers/offers-status.enum";

export interface IOffer {
  id: string;
  title: string;
  description: string;
  amount: number;
  documentUrl: string;
  status: OfferStatus;
  startDate: string;
  endDate: string;
}
