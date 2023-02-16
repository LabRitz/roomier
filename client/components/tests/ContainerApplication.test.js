import React from 'react';
import { screen } from '@testing-library/react';
import ContainerApplication from '../ContainerApplication';
import mockContext from './__mocks__/mockContext';

jest.mock('../ContainerFeed.jsx', () => function () {
  return <div data-testid="ContainerFeed" />;
});

const userInfo = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'test@gmail.com',
};

describe('ContainerApplication.jsx', () => {
  let providerProps;
  beforeEach(() => {
    providerProps = {
      userInfo,
    };
  });

  it('Renders ContainerApplication component', async () => {
    mockContext(<ContainerApplication />, { providerProps });

    expect(await screen.getByTestId('ContainerFeed')).toBeTruthy();
  });
});
