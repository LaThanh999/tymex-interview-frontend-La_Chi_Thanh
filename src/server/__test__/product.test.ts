import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MAX_PRICE } from "@/constants/common";
import { DataResponse, ParamsPaging } from "@/types/common";
import { TFilterProduct, TProduct } from "@/types/product";
import { getListProduct } from "../product";

describe("getListProduct", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should fetch product list successfully", async () => {
    const mockResponse: DataResponse<TProduct[]> = {
      data: [
        {
          tier: "premium",
          theme: "light",
          created: "2021-11-20T14:22:10.000Z",
          backgroundItem: "bg-item-2",
          item: "item-2",
          category: "Lower Body",
          nameItem: "Incredible Cotton Shoes",
          price: 75,
          nameCreator: "Jane Smith",
          statusOnline: false,
        },
      ],
      hasMore: false,
      nextOffset: 10,
    };

    mock.onPost("api/products").reply(200, mockResponse);

    const params: TFilterProduct & ParamsPaging = {
      offset: 0,
      limit: 10,
      priceRange: [0, MAX_PRICE],
    };

    const result = await getListProduct(params);

    expect(result).toEqual(mockResponse);
  });

  it("should handle error when fetching product list", async () => {
    mock.onPost("api/products").reply(500);

    const params: TFilterProduct & ParamsPaging = {
      offset: 0,
      limit: 10,
      priceRange: [0, MAX_PRICE],
    };

    await expect(getListProduct(params)).rejects.toThrow();
  });
});
