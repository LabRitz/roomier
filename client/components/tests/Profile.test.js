import React from "react";

import { screen } from "@testing-library/react";

import mockContext from "./__mocks__/mockContext.js";
import Profile from "../Profile.jsx";

jest.mock('../ProfileFeed.jsx', () => {
  return () => <div data-testid="ProfileFeed" /> 
});

const userInfo = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'test@gmail.com'
}

describe("Profile.jsx", () => {

  let providerProps;
  beforeEach(() => {
    providerProps = {
      userInfo: userInfo
    }
  });

  it("Renders Profile component", async () => {    
    mockContext(<Profile />, {providerProps});

    expect(await screen.getByTestId('ProfileFeed')).toBeTruthy();
  });
 
});