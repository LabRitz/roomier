import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { screen, fireEvent } from '@testing-library/react';
import Signup from '../Signup';
import mockContext from './__mocks__/mockContext';

jest.mock('../Phrases.jsx', () => function () {
  return <div data-testid="phrases" />;
});

const userInfo = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'test@gmail.com',
};

describe('Signup.jsx', () => {
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

  it('Renders Signup component', async () => {
    mockContext(
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
        </Routes>
      </Router>,
      { providerProps },
    );
    expect(await screen.getByText('a LabRitz thing')).toBeTruthy();
    expect(await screen.getByText('looking for a Zillow corporate sponsorship')).toBeTruthy();
    expect(await screen.getByPlaceholderText('Rich')).toBeTruthy();
    expect(await screen.getByPlaceholderText('Barton')).toBeTruthy();
    expect(await screen.getByPlaceholderText('r.barton@zillow.com')).toBeTruthy();
    expect(await screen.getByPlaceholderText('ForbesCEO2021')).toBeTruthy();
    expect(await screen.getByPlaceholderText('10001')).toBeTruthy();
    expect(await screen.getByText('Signup')).toBeTruthy();
    expect(await screen.getByText('Back')).toBeTruthy();
  });

  it('Populates values in state', async () => {
    mockContext(
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
        </Routes>
      </Router>,
      { providerProps },
    );

    const firstNameInput = await screen.getByPlaceholderText('Rich');
    const lastNameInput = await screen.getByPlaceholderText('Barton');
    const usernameInput = await screen.getByPlaceholderText('r.barton@zillow.com');
    const passwordInput = await screen.getByPlaceholderText('ForbesCEO2021');
    const zipcodeInput = await screen.getByPlaceholderText('10001');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    fireEvent.change(usernameInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'abc123' } });
    fireEvent.change(zipcodeInput, { target: { value: '12345' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Smith');
    expect(usernameInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('abc123');
    expect(zipcodeInput.value).toBe('12345');
  });

  /**
   * FIRST SHOULD CHANGE SIGNUP WINDOW ALERT TO TOAST ALERT
   * THEN TEST SHOULD LISTEN FOR TOAST
   */
  xit('Attempt to login with bad credentials', async () => {
    mockContext(
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </Router>,
      { providerProps },
    );

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    expect(await screen.getByTestId('Signup')).toBeTruthy();
  });
});
