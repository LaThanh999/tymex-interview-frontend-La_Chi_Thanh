export type TProduct = {
  tier: string;
  theme: string;
  created: string;
  backgroundItem: string;
  item: string;
  category: string;
  nameItem: string;
  price: number;
  nameCreator: string;
  statusOnline: boolean;
};

export type TFilterProduct = {
  tier?: string;
  theme?: string;
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  priceRange?: number[];
  sortTime?: string;
  sortPrice?: string;
  categories?: string[];
};
