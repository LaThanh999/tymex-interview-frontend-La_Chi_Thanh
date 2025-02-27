import { TFilterProduct } from "@/types/product";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface ProductsContextProps {
  filter: TFilterProduct;
  setFilter?: Dispatch<SetStateAction<TFilterProduct>>;
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
    primarySortField: "",
    primarySortOrder: "",
    secondarySortField: "",
    secondarySortOrder: "",
  });

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
