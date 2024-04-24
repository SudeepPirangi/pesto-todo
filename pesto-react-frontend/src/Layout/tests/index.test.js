import { render, screen } from "@testing-library/react";

import Layout from "..";

describe("Layout", () => {
  it("Should render Header and Home", async () => {
    render(<Layout />);
    const header = await screen.findByRole("header");
    const homeTitle = await screen.findByRole("group");

    expect(header).toHaveTextContent("TODO App");
    expect(homeTitle).toBeInTheDocument();
  });
});
