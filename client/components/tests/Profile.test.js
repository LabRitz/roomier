import React from 'react';
import { screen } from '@testing-library/react';

import mockContext from './__mocks__/mockContext';
import Profile from '../Profile';

jest.mock('../ProfileFeed', () => function () {
  return <div data-testid="ProfileFeed" />;
});

const userInfo = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'test@gmail.com',
};

const setAlert = () => {};

describe('Profile.jsx', () => {
  let providerProps;
  beforeEach(() => {
    providerProps = {
      userInfo,
      setAlert,
    };
  });

  it('Renders Profile component', async () => {
    mockContext(<Profile />, { providerProps });

    expect(await screen.getByTestId('ProfileFeed')).toBeTruthy();
  });
});
