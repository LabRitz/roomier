import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../Profile.jsx";

jest.mock('../ProfileFeed.jsx', () => {
  return () => <div data-testid="ProfileFeed" /> 
});

describe("Profile.jsx", () => {

  it("Renders Profile component", async () => {    
    render(<Profile />);

    expect(await screen.getByTestId('ProfileFeed')).toBeTruthy();
  });
 
});