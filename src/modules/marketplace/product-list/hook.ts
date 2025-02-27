import { getListProduct } from "@/server/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useProductsContext } from "../context";

export const useProduct = () => {
  const { filter } = useProductsContext();

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["getListProduct", JSON.stringify(filter)],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      getListProduct({ offset: pageParam, limit: 10, ...filter }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextOffset : undefined;
    },
    refetchOnWindowFocus: false,
  });

  return {
    dataProduct: data?.pages?.flatMap((page) => page.data) || [],
    isLoading,
    hasMore: hasNextPage || false,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  };
};
