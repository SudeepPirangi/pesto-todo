import { render, screen } from "@testing-library/react";

import Header from "..";

describe("Header", () => {
  it("Should render Header", async () => {
    render(<Header />);
    const header = await screen.findByRole("header");
    expect(header).toHaveTextContent("TODO App");
  });
});
