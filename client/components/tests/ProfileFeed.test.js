import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileFeed from "../ProfileFeed.jsx";

jest.mock('../ContainerApplication.jsx', () => {
  return () => <div data-testid="ContainerApplication" /> 
});

jest.mock('../ImageGallery.jsx', () => {
  return () => <div data-testid="ImageGallery" /> 
});

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

describe("ProfileFeed.jsx", () => {

  it("Renders ProfileFeed component", async () => {    
    render(<ProfileFeed posts={posts}/>);

    expect(await screen.getByTestId('ContainerApplication')).toBeTruthy();
  });
 
});