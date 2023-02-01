import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login.jsx";

jest.mock('./Phrases.jsx', () => {
  return () => <div data-testid="phrases" /> 
});

describe("Login.jsx", () => {

  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(false)
    }));
  });

  it("Renders Login component", async () => {    
    render(
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </Router>
    );
    expect(await screen.getByText("a LabRitz thing")).toBeTruthy();
    expect(await screen.getByText("looking for a Zillow corporate sponsorship")).toBeTruthy();
    expect(await screen.getByPlaceholderText("Enter your email address")).toBeTruthy();
    expect(await screen.getByPlaceholderText("Enter your password")).toBeTruthy();
    expect(await screen.getByText("Login")).toBeTruthy();
    expect(await screen.getByText("Google Login")).toBeTruthy();
    expect(await screen.getByText("Sign up")).toBeTruthy();
    expect(await screen.getByTestId('phrases')).toBeTruthy();;

  });

  it("Renders Signup component when clicked", async () => {
    render(
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<div data-testid="Signup">Signup</div>} />
        </Routes>
      </Router>
    );
    
    const signupButton = screen.getByText('Sign up');
    fireEvent.click(signupButton);

    expect(await screen.getByTestId("Signup")).toBeTruthy();
  });

  xit("Attempt to login with bad credentials", async () => {
    render(
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </Router>
    );
    
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    expect(await screen.getByTestId("Signup")).toBeTruthy();
  });
});
