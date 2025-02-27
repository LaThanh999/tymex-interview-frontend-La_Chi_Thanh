import { DataResponse, ParamsPaging } from "@/types/common";
import { TFilterProduct, TProduct } from "@/types/product";
import axios from "axios";

export const getListProduct = async ({
  offset = 0,
  limit = 10,
  ...rest
}: TFilterProduct & ParamsPaging): Promise<DataResponse<TProduct[]>> => {
  try {
    const { data } = await axios.post<DataResponse<TProduct[]>>(
      `api/products`,
      {
        offset,
        limit,
        ...rest,
      }
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
