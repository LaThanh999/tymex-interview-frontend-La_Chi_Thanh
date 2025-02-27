import { List } from "antd";
import { ProductCart } from "../product-cart";

export const ProductList = () => {
  return (
    <>
      <div className="product-list-wrapper">
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
          rowKey="id"
          dataSource={new Array(12).fill("")}
          renderItem={() => (
            <List.Item>
              <ProductCart />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
