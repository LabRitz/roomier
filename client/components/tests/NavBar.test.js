import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { screen, fireEvent } from "@testing-library/react";

import mockContext from "./__mocks__/mockContext.js";
import NavBar from "../NavBar.jsx";

jest.mock('../Phrases.jsx', () => {
  return () => <div data-testid="phrases" /> 
});

const setUserInfo = jest.fn()

const userInfo = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'test123@gmail.com',
  zipCode: '12345'
}

describe("Signup.jsx", () => {

  let originalFetch;
  let providerProps;
  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(false)
    }));
    providerProps = {
      userInfo: userInfo
    }
  });

  it("Renders NavBar component", async () => {    
    mockContext(
      <Router>
        <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
        <Routes>
          <Route exact path="/" element={<div data-testid="Home">Home</div>} />
          <Route path="/createPost" element={<div data-testid="CreatePost">CreatePost</div>} />
          <Route path="/profile" element={<div data-testid="Profile">Profile</div>} />
        </Routes>
      </Router>
    , { providerProps })

    expect(await screen.getByTestId("phrases")).toBeTruthy();
    expect(await screen.getByTestId("Home")).toBeTruthy();
  });

  it("Navigate to CreatePost", async () => {    
    mockContext(
      <Router>
        <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
        <Routes>
          <Route exact path="/" element={<div data-testid="Home">Home</div>} />
          <Route path="/createPost" element={<div data-testid="CreatePost">CreatePost</div>} />
          <Route path="/profile" element={<div data-testid="Profile">Profile</div>} />
        </Routes>
      </Router>
    , { providerProps })

    const createButton = await screen.getByTestId('createPostBtn');
    fireEvent.click(createButton)
    expect(await screen.getByTestId("CreatePost")).toBeTruthy();
  });

  it("Navigate to Home", async () => {    
    mockContext(
      <Router>
        <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
        <Routes>
          <Route exact path="/" element={<div data-testid="Home">Home</div>} />
          <Route path="/createPost" element={<div data-testid="CreatePost">CreatePost</div>} />
          <Route path="/profile" element={<div data-testid="Profile">Profile</div>} />
        </Routes>
      </Router>
    , { providerProps })

    const createButton = await screen.getByTestId('createPostBtn');
    fireEvent.click(createButton)

    const homeButton = await screen.getByTestId('homeBtn');
    fireEvent.click(homeButton)
    expect(await screen.getByTestId("Home")).toBeTruthy();
  });

  it("Navigate to Home in Menu", async () => {    
    mockContext(
      <Router>
        <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
        <Routes>
          <Route exact path="/" element={<div data-testid="Home">Home</div>} />
          <Route path="/createPost" element={<div data-testid="CreatePost">CreatePost</div>} />
          <Route path="/profile" element={<div data-testid="Profile">Profile</div>} />
        </Routes>
      </Router>
    , { providerProps })

    const createButton = await screen.getByTestId('createPostBtn');
    fireEvent.click(createButton)

    const homeButton = await screen.getByTestId('menuHomeBtn');
    fireEvent.click(homeButton)
    expect(await screen.getByTestId("Home")).toBeTruthy();
  });

});
