import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Board from "./../Board";

describe("Board", () => {
  it("renders without crashing", () => {
    render(<Board />);
  });

  it("renders with the correct amount of tiles", () => {
    const { container } = render(<Board />);
    expect(container.firstChild.children.length).toBe(100);
  });

  it("registers drop events", () => {
    const { container } = render(<Board />);
    const target = container.firstChild.firstChild;

    expect(target).toHaveStyle("background: #78f");

    fireEvent.drop(target, {
      dataTransfer: {
        getData: () => 1
      }
    });

    expect(target).toHaveStyle("background: #222")
  });
});
