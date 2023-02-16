import React from 'react';

import { screen, waitFor } from '@testing-library/react';

import mockContext from './__mocks__/mockContext.js';
import ContainerFeed from '../ContainerFeed.jsx';

jest.mock('../views/UserCardActions.jsx', () => function () {
  return <div data-testid="UserCardActions" />;
});

jest.mock('../views/ProfileCardActions.jsx', () => function () {
  return <div data-testid="ProfileCardActions" />;
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
  applicantData: [],
  currUser: {
    firstName: 'John',
    lastName: 'Smith',
    username: 'test@gmail.com',
  },
};

describe('ContainerFeed.jsx', () => {
  let providerProps;
  beforeEach(() => {
    providerProps = {
      userInfo,
    };
  });

  it('Renders ContainerFeed component', () => {
    mockContext(<ContainerFeed post={postInfo} view="user" />, { providerProps });

    expect(screen.getByText('$100/mo')).toBeTruthy();
    expect(screen.getByText('Street 1 Street 2')).toBeTruthy();
    expect(screen.getByText('1BR | 1BA | 100 sqft')).toBeTruthy();
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('Renders ContainerFeed component in profile view', async () => {
    mockContext(<ContainerFeed post={postInfo} view="profile" />, { providerProps });
    await waitFor(() => expect(screen.getByTestId('ProfileCardActions')).toBeTruthy());
  });

  it('Renders ContainerFeed component in user view', async () => {
    mockContext(<ContainerFeed post={postInfo} view="user" />, { providerProps });
    await waitFor(() => expect(screen.getByTestId('UserCardActions')).toBeTruthy());
  });
});
