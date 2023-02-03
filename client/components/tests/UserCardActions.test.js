import React from "react";
import { render, screen } from "@testing-library/react";
import UserCardActions from "../views/UserCardActions.jsx";

const application = []

describe("UserCardActions.jsx", () => {

  it("Renders UserCardActions component when user has applied", async () => {    
    render(<UserCardActions application={application} hasApplied={true}/>);

    expect(await screen.getByText('Applied')).toBeTruthy();
    expect(await screen.getByText('0 in review')).toBeTruthy();
  });

  it("Renders UserCardActions component when user has not applied", async () => {    
    render(<UserCardActions application={application} hasApplied={false}/>);

    expect(await screen.getByText('Apply')).toBeTruthy();
  });
 
});