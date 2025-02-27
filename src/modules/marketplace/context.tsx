import { useQueryParams } from "@/hooks/useQueryParams";
import { TFilterProduct } from "@/types/product";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ProductsContextProps {
  filter: TFilterProduct;
  setFilter: Dispatch<SetStateAction<TFilterProduct>>;
}

export const ProductsContext = createContext<ProductsContextProps>({
  filter: {},
  setFilter: () => {},
});

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filter, setFilter] = useState<TFilterProduct>({
    tier: "",
    theme: "",
    keyword: "",
    sortTime: "desc",
    sortPrice: "asc",
  });

  const { getParams } = useQueryParams();

  const params = getParams([
    "keyword",
    "priceRange",
    "tier",
    "theme",
    "sortTime",
    "sortPrice",
    "categories",
  ]);

  useEffect(() => {
    if (!filter.keyword && !!params.keyword) {
      setFilter({
        ...filter,
        keyword: params.keyword as string,
      });
    }
    if (!filter.tier && !!params.tier) {
      setFilter({
        ...filter,
        tier: params.tier as string,
      });
    }
    if (!filter.theme && !!params.theme) {
      setFilter({
        ...filter,
        theme: params.theme as string,
      });
    }
    if (!filter.sortTime && !!params.sortTime) {
      setFilter({
        ...filter,
        sortTime: params.sortTime as string,
      });
    }
    if (!filter.sortPrice && !!params.sortPrice) {
      setFilter({
        ...filter,
        sortPrice: params.sortPrice as string,
      });
    }
    if (!filter.categories && !!params.categories) {
      setFilter({
        ...filter,
        categories: [params.categories].flat() as string[],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const value = useMemo(
    () => ({
      filter,
      setFilter,
    }),
    [filter]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
