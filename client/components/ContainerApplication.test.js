import React from "react";
import { render, screen } from "@testing-library/react";
import ContainerApplication from "./ContainerApplication.jsx";

jest.mock('./ContainerFeed.jsx', () => {
  return () => <div data-testid="ContainerFeed" /> 
});

describe("ContainerApplication.jsx", () => {

  it("Renders ContainerApplication component", async () => {    
    render(<ContainerApplication />);

    expect(await screen.getByTestId('ContainerFeed')).toBeTruthy();
  });
 
});
