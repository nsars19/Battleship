import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Ship from "./../Ship";

test("renders without crashing", () => {
  render(<Ship />);
});
