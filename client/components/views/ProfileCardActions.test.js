import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileCardActions from "./ProfileCardActions.jsx";

const application = []

describe("ProfileCardActions.jsx", () => {

  it("Renders ProfileCardActions component", async () => {    
    render(<ProfileCardActions application={application}/>);

    expect(await screen.getByLabelText('Edit post')).toBeTruthy();
    expect(await screen.getByLabelText('Remove post')).toBeTruthy();
    expect(await screen.getByText('0 in review')).toBeTruthy();
  });
 
});