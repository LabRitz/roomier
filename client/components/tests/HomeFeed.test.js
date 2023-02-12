import React from "react";

import { screen, fireEvent } from "@testing-library/react";

import mockContext from "./__mocks__/mockContext.js";
import HomeFeed from "../HomeFeed.jsx";

jest.mock('../ContainerFeed.jsx', () => {
  return () => <div data-testid="ContainerFeed" /> 
});

const userInfo = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'test@gmail.com'
}

const posts = [{
  address: {
    street1: 'Street 1',
    street2: 'Street 2',
    city: 'City',
    state: 'State',
    zipCode: '12345'
  },
  roommate: {gender: 'male'},
  description: {
    BR: 1,
    BA: 1,
    sqFt: 100,
    parking: true,
    smoking: true,
    pets: true
  },
  moveInDate: Date.now(),
  rent: 100,
  bio: 'Description',
  images: {
    imgUrl: '',
    imgPath: ''
  },
  currUser: {
    firstName: 'John',
    lastName: 'Smith',
    username: 'test@gmail.com'
  }
}]

describe("HomeFeed.jsx", () => {

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

  it("Renders HomeFeed component", async () => {    
    mockContext(
      <HomeFeed 
        posts={posts} 
        zipCode={10000} 
        distance={1609.344} 
        filterArr={[]} 
        priceRange={[0,100]} 
        sqftRange={[0,100]} 
        br={0} 
        ba={0}/>, { providerProps })

    expect(await screen.getByTestId('homeFeed')).toBeTruthy();
    expect(await screen.getByLabelText('Zipcode')).toBeTruthy();
    expect(await screen.getByLabelText('Distance (mi)')).toBeTruthy();
    expect(await screen.getByLabelText('# of Posts')).toBeTruthy();
  });

  it("Populates props input", async () => {
    mockContext(
      <HomeFeed 
        posts={posts} 
        zipCode={10000} 
        distance={1609.344} 
        filterArr={[]} 
        priceRange={[0,100]} 
        sqftRange={[0,100]} 
        br={0} 
        ba={0}/>, { providerProps })

  })

  it("Open filter options will lazy load", async () => {
    mockContext(
      <HomeFeed 
        posts={posts} 
        zipCode={10000} 
        distance={1609.344} 
        filterArr={[]} 
        priceRange={[0,100]} 
        sqftRange={[0,100]} 
        br={0} 
        ba={0}/>, { providerProps })

    const toggleFilterBtn = await screen.getByTestId('toggleFilter')
    fireEvent.click(toggleFilterBtn)

    expect(await screen.getByTestId('loadingFilter')).toBeTruthy();
  })

 
});
