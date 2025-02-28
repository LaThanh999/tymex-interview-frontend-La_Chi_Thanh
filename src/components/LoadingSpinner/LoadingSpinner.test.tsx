import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoadingSpinner } from "./index"; // Adjust the import path if necessary

describe("LoadingSpinner", () => {
  it("renders the loading spinner", () => {
    const { container } = render(<LoadingSpinner />);
    const spinnerElement = container.querySelector(".ant-spin");
    expect(spinnerElement).toBeInTheDocument();
  });

  it("applies the correct className", () => {
    const { container } = render(<LoadingSpinner />);
    const divElement = container.querySelector("div");
    expect(divElement).toHaveClass("loading-spinner");
  });
});
