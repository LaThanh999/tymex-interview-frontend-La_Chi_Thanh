import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingPage from "./index"; // Adjust the import path if necessary

describe("LoadingPage", () => {
  it("renders loading spinner initially", () => {
    render(<LoadingPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("hides loading spinner after timeout", async () => {
    render(<LoadingPage />);
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull(), {
      timeout: 1300,
    });
  });
});
