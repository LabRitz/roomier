import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App.jsx";

jest.mock("../Login.jsx", () => {
  return () => <div data-testid="Login">Login</div>;
});

jest.mock("../Signup.jsx", () => {
  return () => <div data-testid="Signup">Signup</div>;
});

jest.mock("../Home.jsx", () => {
  return () => <div data-testid="Home">Home</div>;
});

jest.mock("../CreatePost.jsx", () => {
  return () => <div data-testid="CreatePost">CreatePost</div>;
});

jest.mock("../Profile.jsx", () => {
  return () => <div data-testid="Profile">Profile</div>;
});

jest.mock("../NavBar.jsx", () => {
  return () => <div data-testid="NavBar">NavBar</div>;
});

describe("App.jsx", () => {

  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
      // json: () => Promise.resolve({
      //   _id: new ObjectId("123),
      //   firstName: 'Johhn',
      //   lastName: 'Smith',
      //   username: 'jsmith@gmail.com',
      //   password: '$HG8ujfsfghds',
      //   zipCode: '10000',
      //   __v: 0
      // })
      json: () => Promise.resolve(false)
    }));
  });

  it("renders Login component when no user session", async () => {    
    render(<App />);
    expect(await screen.getByTestId("Login")).toBeTruthy();
  });

  xit("renders Home, CreatePost, and Profile components with NavBar when user has session", async () => {
    render(<App />);

    expect(await screen.getByTestId("Home")).toBeTruthy();
    expect(await screen.getByTestId("CreatePost")).toBeTruthy();
    expect(await screen.getByTestId("Profile")).toBeTruthy();
    expect(await screen.getByTestId("NavBar")).toBeTruthy();
  });
});
