import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterMobile } from "./index"; // Adjust the import path if necessary

describe("FilterMobile", () => {
  it("renders the button and drawer", () => {
    render(<FilterMobile />);

    const button = screen.getByRole("button", { name: /filters & sort/i });
    expect(button).toBeInTheDocument();

    const drawer = screen.queryByRole("dialog");
    expect(drawer).not.toBeInTheDocument();
  });

  it("opens the drawer when the button is clicked", () => {
    render(<FilterMobile />);

    const button = screen.getByRole("button", { name: /filters & sort/i });
    fireEvent.click(button);

    const drawer = screen.getByRole("dialog");
    expect(drawer).toBeInTheDocument();
  });

  it("closes the drawer when the close button is clicked", () => {
    render(<FilterMobile />);

    const button = screen.getByRole("button", { name: /filters & sort/i });
    fireEvent.click(button);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    const drawer = screen.queryByRole("dialog");
    expect(drawer).not.toBeInTheDocument();
  });
});
