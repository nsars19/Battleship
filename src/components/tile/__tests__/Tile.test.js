import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Tile from "./../Tile";

test("renders without crashing", () => {
  render(<Tile />);
});
