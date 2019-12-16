import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "./app";

function sum(a, b) {
    return a + b;
}

test("app must render without crashing", () => {
    const { asFragment } = render(<App />);
    expect(asFragment).toMatchSnapshot();
});

test("app must contain Menu and Board", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("app")).toHaveTextContent("Board", "Menu");
});

test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
});
