import { Flex } from "antd";
import styles from "./style.module.scss";
import { Button } from "@/components/Button";
import { ProductCategory } from "@/enums/filter";
import { useProductsContext } from "../../../contexts/productsContext";
import debounce from "lodash.debounce";
import { useQueryParams } from "@/hooks/useQueryParams";

const optionsCategory = Object.values(ProductCategory).map((item) => ({
  label: item === "" ? "All" : item,
  value: item,
}));

export const TagCategories = () => {
  const { filter, setFilter } = useProductsContext();

  const { setParams, removeParams } = useQueryParams();

  const valuesCateogry = filter.categories;

  const onChangeCategory = debounce((value: string) => {
    if (value === "") {
      setFilter({ ...filter, categories: [] });
      removeParams(["categories"]);
      return;
    }
    const newValues = Array.isArray(valuesCateogry)
      ? valuesCateogry.includes(value)
        ? valuesCateogry.filter((item) => item !== value)
        : [...valuesCateogry, value]
      : [value];

    setFilter({ ...filter, categories: newValues });
    setParams({ categories: newValues }, { replace: false });
  }, 300);

  return (
    <>
      <div className={styles["product-categories-container"]}>
        <Flex gap={20} wrap>
          {optionsCategory.map(({ label, value }) => (
            <Button
              key={value}
              type={
                valuesCateogry?.includes(value) ||
                (valuesCateogry?.length === 0 && value === "")
                  ? "primary"
                  : "default"
              }
              onClick={() => onChangeCategory(value)}
              size="large"
            >
              {label}
            </Button>
          ))}
        </Flex>
      </div>
    </>
  );
};
