import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App Layout", async () => {
  render(<App />);
  const header = await screen.findByRole("header");
  expect(header).toBeTruthy();
});
