import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ParamValues {
  [key: string]: string | string[] | undefined;
}

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParams = useCallback(
    (keys: string[]) => {
      const result: ParamValues = {};
      keys.forEach((key) => {
        const value = searchParams.getAll(key);
        result[key] = value.length > 1 ? value : value[0];
      });
      return result;
    },
    [searchParams]
  );

  const setParams = useCallback(
    (params: ParamValues, options?: { replace?: boolean }) => {
      const current = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        current.delete(key); // Xóa giá trị cũ trước
        if (Array.isArray(value)) {
          value.forEach((val) => current.append(key, val));
        } else if (value !== undefined && value !== null) {
          current.set(key, value);
        }
      });

      const searchString = current.toString();
      const path = `${window.location.pathname}${
        searchString ? `?${searchString}` : ""
      }`;

      if (options?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    },
    [router, searchParams]
  );

  const removeParams = useCallback(
    (keys: string[]) => {
      const current = new URLSearchParams(searchParams.toString());
      keys.forEach((key) => current.delete(key));

      const searchString = current.toString();
      const path = `${window.location.pathname}${
        searchString ? `?${searchString}` : ""
      }`;
      router.push(path);
    },
    [router, searchParams]
  );

  return useMemo(
    () => ({
      getParams,
      setParams,
      removeParams,
    }),
    [getParams, setParams, removeParams]
  );
};
