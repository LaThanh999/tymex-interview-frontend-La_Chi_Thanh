import { Empty, Flex, List, Typography } from "antd";
import { ProductCart } from "../product-cart";
import { useProduct } from "./hook";
import { Button } from "@/components/Button";
import styles from "./style.module.scss";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const ProductList = () => {
  const { dataProduct, hasMore, fetchNextPage, isLoading } = useProduct();

  return (
    <>
      <div className={styles["product-list-container"]}>
        {isLoading && dataProduct.length > 0 && <LoadingSpinner />}
        {!isLoading && (
          <List
            grid={{
              gutter: 16,
              xs: 2,
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
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <Typography.Title level={4}>
                      No items found
                    </Typography.Title>
                  }
                />
              ),
            }}
          />
        )}
        {hasMore && (
          <Flex
            align="center"
            justify="center"
            className={styles["btn-load-more"]}
          >
            <Button
              loading={isLoading}
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
