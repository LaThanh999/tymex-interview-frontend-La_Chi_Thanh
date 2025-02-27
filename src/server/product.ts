import { DataResponse, ParamsPaging } from "@/types/common";
import { TFilterProduct, TProduct } from "@/types/product";
import axios from "axios";

export const getListProduct = async ({
  offset = 0,
  limit = 10,
}: TFilterProduct & ParamsPaging): Promise<DataResponse<TProduct[]>> => {
  try {
    const { data } = await axios.get<DataResponse<TProduct[]>>(
      `api/products?limit=${limit}&offset=${offset}`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
