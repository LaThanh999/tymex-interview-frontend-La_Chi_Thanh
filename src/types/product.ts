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
  primarySortField?: string;
  primarySortOrder?: string;
  secondarySortField?: string;
  secondarySortOrder?: string;
  minPrice?: number;
  maxPrice?: number;
};
