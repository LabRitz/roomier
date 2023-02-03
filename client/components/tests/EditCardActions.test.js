import React from "react";
import { render, screen } from "@testing-library/react";
import EditCardActions from "../views/EditCardActions.jsx";

describe("EditCardActions.jsx", () => {

  it("Renders EditCardActions component", async () => {    
    render(<EditCardActions />);

    expect(await screen.getByLabelText('Restore changes')).toBeTruthy();
    expect(await screen.getByLabelText('Save changes')).toBeTruthy();
  });
 
});