import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ParamValues {
  [key: string]: string | string[] | undefined;
}

export const useQueryParams = () => {
  const searchParams = useSearchParams();

  // Lấy params từ URL
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

  // Cập nhật params mà không reload
  const setParams = useCallback(
    (params: ParamValues, options?: { replace?: boolean }) => {
      const current = new URLSearchParams(searchParams.toString());

      // Cập nhật hoặc thêm params
      Object.entries(params).forEach(([key, value]) => {
        current.delete(key); // Xóa giá trị cũ
        if (Array.isArray(value)) {
          value.forEach((val) => current.append(key, val));
        } else if (value !== undefined && value !== null) {
          current.set(key, value);
        }
      });

      const searchString = current.toString();
      const newUrl = `${window.location.pathname}${
        searchString ? `?${searchString}` : ""
      }`;

      // Dùng history API thay vì router
      if (options?.replace) {
        window.history.replaceState(null, "", newUrl);
      } else {
        window.history.pushState(null, "", newUrl);
      }
    },
    [searchParams]
  );

  // Xóa params mà không reload
  const removeParams = useCallback(
    (keys: string[]) => {
      const current = new URLSearchParams(searchParams.toString());
      keys.forEach((key) => current.delete(key));

      const searchString = current.toString();
      const newUrl = `${window.location.pathname}${
        searchString ? `?${searchString}` : ""
      }`;

      window.history.pushState(null, "", newUrl);
    },
    [searchParams]
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
