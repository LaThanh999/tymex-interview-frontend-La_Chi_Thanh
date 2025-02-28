import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductCart } from "./index"; // Adjust the import path if necessary
import { TProduct } from "@/types/product";

const mockProduct: TProduct = {
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
};

describe("ProductCart", () => {
  it("renders the product card with correct data", () => {
    render(<ProductCart data={mockProduct} />);

    const productName = screen.getByText(/sample product/i);
    expect(productName).toBeInTheDocument();

    const productPrice = screen.getByText(/\$100/i);
    expect(productPrice).toBeInTheDocument();

    const productImage = screen.getByAltText(/sample product/i);
    expect(productImage).toBeInTheDocument();

    const onlineIcon = screen.getByAltText(/online/i);
    expect(onlineIcon).toBeInTheDocument();
  });
});
