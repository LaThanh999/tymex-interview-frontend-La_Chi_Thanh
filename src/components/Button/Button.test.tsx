import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./index"; // Adjust the import path if necessary

describe("Button", () => {
  it("renders correctly with children", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Button className="custom-class">Click Me</Button>
    );
    const buttonElement = container.querySelector(".ant-btn");
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("passes props to ButtonAntd", () => {
    const { getByText } = render(<Button type="primary">Click Me</Button>);
    const buttonElement = getByText("Click Me");
    expect(buttonElement).toHaveClass("ant-btn-primary");
  });
});
