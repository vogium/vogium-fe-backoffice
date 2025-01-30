import { ContractStatus } from "../enums/contracts/contract-status.enum";
import { ContractType } from "../enums/contracts/contract-type.enum";

export interface IContract {
  id: string;
  type: ContractType;
  userIds: string[];
  startDate: string;
  endDate: string;
  status: ContractStatus;
  description: string;
  documentIds: string[];
  signatures: ISignature[];
  logs: any[]; //Todo değişecek...
  date: string; // oluşturulma tarihi
}

export interface IContractDocument {
  id: string;
  authorIds: string[];
  description: string;
  type: string; //todo enumlaşacak mı...
  createDate: string;
  deleteDate: string;
}

export interface ISignature {
  id: string;
  authorId: string;
  type: string;
  state: string; //Todo state enum mı olacak...
  ip: string;
  deviceName: string;
  deviceOS: string;
  date: string;
  documentIds: string[];
}
