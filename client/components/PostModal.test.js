import React from "react";
import { render, screen } from "@testing-library/react";
import PostModal from "./PostModal.jsx";

jest.mock('./DisplayCard.jsx', () => {
  return () => <div data-testid="DisplayCard" /> 
});

describe("PostModal.jsx", () => {

  it("Renders PostModal component", async () => {    
    render(<PostModal open={true}/>);

    expect(await screen.getByTestId('DisplayCard')).toBeTruthy();
  });
 
});