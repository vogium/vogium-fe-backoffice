import {
  BaseKey,
  BaseRecord,
  CreateParams,
  CreateResponse,
  DeleteOneParams,
  DeleteOneResponse,
  GetListParams,
  GetListResponse,
  GetOneParams,
  GetOneResponse,
  MetaQuery,
  UpdateManyParams,
  UpdateManyResponse,
  UpdateResponse,
} from "@refinedev/core";
import { IResponsePaginatedList } from "./IResponse";

interface UpdateParams<TVariables = {}> {
  resource: string;
  id: BaseKey;
  variables: TVariables;
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
}

export type ICustomDataProvider = {
  getList: <TData extends BaseRecord = BaseRecord>(
    params: GetListParams
    // ) => Promise<GetListResponse<TData>>;
  ) => Promise<IResponsePaginatedList<TData>>;

  //   getMany?: <TData extends BaseRecord = BaseRecord>(
  //     params: GetManyParams
  //   ) => Promise<GetManyResponse<TData>>;

  getOne: <TData extends BaseRecord = BaseRecord>(
    params: GetOneParams
  ) => Promise<GetOneResponse<TData>>;

  create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: CreateParams<TVariables>
  ) => Promise<CreateResponse<TData>>;

  //   createMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
  //     params: CreateManyParams<TVariables>
  //   ) => Promise<CreateManyResponse<TData>>;

  update: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: UpdateParams<TVariables>
  ) => Promise<UpdateResponse<TData>>;

  updateMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: UpdateManyParams<TVariables>
  ) => Promise<UpdateManyResponse<TData>>;

  deleteOne: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: DeleteOneParams<TVariables>
  ) => Promise<DeleteOneResponse<TData>>;

  //   deleteMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
  //     params: DeleteManyParams<TVariables>
  //   ) => Promise<DeleteManyResponse<TData>>;

  getApiUrl: () => string;

  //   custom?: <
  //     TData extends BaseRecord = BaseRecord,
  //     TQuery = unknown,
  //     TPayload = unknown
  //   >(
  //     params: CustomParams<TQuery, TPayload>
  //   ) => Promise<CustomResponse<TData>>;
};
