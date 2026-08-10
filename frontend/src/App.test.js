import React from "react";
import { render } from "@testing-library/react";
import SmokeTest from "./SmokeTest";

test("application renders successfully", () => {
  const { getByText } = render(<SmokeTest />);

  expect(getByText("Application is working")).toBeInTheDocument();
});
