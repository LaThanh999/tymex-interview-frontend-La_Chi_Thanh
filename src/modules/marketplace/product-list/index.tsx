import { Flex, List } from "antd";
import { ProductCart } from "../product-cart";
import { useProduct } from "./hook";
import { Button } from "@/components/Button";
import styles from "./style.module.scss";

export const ProductList = () => {
  const { dataProduct, hasMore, fetchNextPage } = useProduct();

  return (
    <>
      <div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          itemLayout="horizontal"
          rowKey={(product) => product.created}
          dataSource={dataProduct}
          renderItem={(product) => (
            <List.Item>
              <ProductCart data={product} />
            </List.Item>
          )}
        />
        {hasMore && (
          <Flex
            align="center"
            justify="center"
            className={styles["btn-load-more"]}
          >
            <Button
              onClick={() => {
                fetchNextPage();
              }}
              type="primary"
              size="large"
            >
              View more
            </Button>
          </Flex>
        )}
      </div>
    </>
  );
};
