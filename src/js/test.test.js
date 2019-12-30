import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "./app";

function sum(a, b) {
    return a + b;
}

test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
});
