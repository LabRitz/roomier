import React from 'react';

import { screen, fireEvent } from '@testing-library/react';

import mockContext from './__mocks__/mockContext';
import DisplayCard from '../DisplayCard';

jest.mock('@react-google-maps/api', () => function () {
  return { GoogleMap: <div data-testid="GoogleMaps" /> };
});

const userInfo = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'test@gmail.com',
};

const postInfo = {
  address: {
    street1: 'Street 1',
    street2: 'Street 2',
    city: 'City',
    state: 'State',
    zipCode: '12345',
  },
  roommate: { gender: 'male' },
  description: {
    BR: 1,
    BA: 1,
    sqFt: 100,
    parking: true,
    smoking: true,
    pets: true,
  },
  moveInDate: Date.now(),
  rent: 100,
  bio: 'Description',
  images: {
    imgUrl: '',
    imgPath: '',
  },
  currUser: {
    firstName: 'John',
    lastName: 'Smith',
    username: 'test@gmail.com',
  },
};

xdescribe('DisplayCard.jsx', () => {
  let originalFetch;
  let providerProps;
  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(false),
    }));
    providerProps = {
      userInfo,
    };
  });

  const date = Date.now();

  it('Renders Login component', async () => {
    mockContext(<DisplayCard postInfo={postInfo} view="user" />, { providerProps });

    expect(await screen.getByText('Street 1 Street 2')).toBeTruthy();
    expect(await screen.getByText('City, State 12345')).toBeTruthy();
    expect(await screen.getByText('Description')).toBeTruthy();
    expect(await screen.getByText('$100/mo')).toBeTruthy();
    expect(await screen.getByText('1BR | 1BA | 100 sqft')).toBeTruthy();
    expect(await screen.getByText(`Available: ${new Date(date).toLocaleDateString()}`)).toBeTruthy();
    expect(await screen.getByText('Looking for: male')).toBeTruthy();
  });

  it('Cycles images', async () => {
    mockContext(<DisplayCard postInfo={postInfo} view="user" />, { providerProps });

    const leftImg = await screen.getByTestId('leftImg');
    const rightImg = await screen.getByTestId('rightImg');

    fireEvent.click(leftImg);
    fireEvent.click(rightImg);
  });

  it('Populates user view', async () => {
    mockContext(<DisplayCard postInfo={postInfo} view="user" />, { providerProps });

    expect(await screen.getByText('Apply')).toBeTruthy();
  });

  /**
   * NEED TO TEST ABSENCE OF APPLY BUTTON
   */
  xit('Populates profile view', async () => {
    mockContext(<DisplayCard postInfo={postInfo} view="profile" />, { providerProps });

    expect(await screen.getByText('Apply')).toBeFalsy();
  });
});
