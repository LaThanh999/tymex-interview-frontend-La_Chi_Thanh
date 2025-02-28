import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { List, Empty, Typography } from "antd";
import { ProductCart } from "../product-cart/index";
import { TProduct } from "@/types/product";

const mockProducts: TProduct[] = [
  {
    tier: "premium",
    theme: "light",
    created: "2021-11-20T14:22:10.000Z",
    backgroundItem: "bg-item-2",
    item: "item-2",
    category: "Lower Body",
    nameItem: "Incredible Cotton Shoes",
    price: 75,
    nameCreator: "Jane Smith",
    statusOnline: false,
  },
  {
    tier: "basic",
    theme: "dark",
    created: "2021-11-20T14:22:10.000Z",
    backgroundItem: "bg-item-2",
    item: "item-2",
    category: "Lower Body",
    nameItem: "Incredible Cotton Shoes",
    price: 75,
    nameCreator: "Jane Smith",
    statusOnline: false,
  },
];

describe("Product List", () => {
  it("renders the product list with correct data", () => {
    render(
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
        dataSource={mockProducts}
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
                <Typography.Title level={4}>No items found</Typography.Title>
              }
            />
          ),
        }}
      />
    );

    mockProducts.forEach((product) => {
      expect(
        screen.getByText(new RegExp(product.nameItem, "i"))
      ).toBeInTheDocument();
    });

    expect(screen.queryByText(/no items found/i)).not.toBeInTheDocument();
  });

  it("renders empty state when no products are available", () => {
    render(
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
        rowKey={(product) => JSON.stringify(product)}
        dataSource={[]}
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
                <Typography.Title level={4}>No items found</Typography.Title>
              }
            />
          ),
        }}
      />
    );

    expect(screen.getByText(/no items found/i)).toBeInTheDocument();
  });
});
