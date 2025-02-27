import { Flex } from "antd";
import styles from "./style.module.scss";
import { Button } from "@/components/Button";
import { ProductCategory } from "@/enums/filter";

const optionsCategory = Object.values(ProductCategory).map((item) => ({
  label: item === "" ? "All" : item,
  value: item,
}));

export const TagCategories = () => {
  return (
    <>
      <div className={styles["product-categories-container"]}>
        <Flex gap={20} wrap>
          {optionsCategory.map(({ label, value }) => (
            <Button key={value} size="large">
              {label}
            </Button>
          ))}
        </Flex>
      </div>
    </>
  );
};
