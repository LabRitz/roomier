import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import Context from './context/Context';
import Phrases from './Phrases';
import '../stylesheets/login.scss';
import { isPassword } from '../utils/isPassword';
import { isUsername } from '../utils/isUsername';
import { isNonNumberString } from '../utils/isNonNumberString';
import { isZipcode } from '../utils/isZipcode';
import { styled } from '@mui/material';

const Signup = () => {
  const navigate = useNavigate();
  const { setAlert } = useContext(Context);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [zipcode, setZipcode] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (firstName.length === 0 || !isNonNumberString(firstName) 
        || lastName.length === 0 || !isNonNumberString(lastName)
        || !isUsername(username) || !isPassword(password)
        || !isZipcode(zipcode)) {
      return setAlert((alerts) => [...alerts, { severity: 'warn', message: 'Please fill out the required fields' }]);
    }

    try {
      const reqBody = {
        firstName,
        lastName,
        username,
        password,
        zipCode: zipcode,
      };

      const res = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });
      const data = await res.json();
      if (data !== null) {
        navigate('/');
      } else {
        setAlert((alerts) => [...alerts, { severity: 'error', message: 'User already exists in the database' }]);
      }
    } catch (err) {
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error occurred while creating new user' }]);
    }
  };

  return (
    <div className="router">
      <div className="logo">
        <img src="roomier.svg" alt="Roomier Logo" />
        <h4>a LabRitz thing</h4>
        <h6>looking for a Zillow corporate sponsorship</h6>
      </div>
      <div className="signup" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Phrases />
        <FormWrapper size="small">
          <TextFieldWrapper
            required
            placeholder="Rich"
            label="First Name"
            value={firstName}
            size="small"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextFieldWrapper
            required
            placeholder="Barton"
            label="Last Name"
            value={lastName}
            size="small"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextFieldWrapper
            required
            placeholder="r.barton@zillow.com"
            label="Email"
            value={username}
            size="small"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextFieldWrapper
            required
            placeholder="ForbesCEO2021"
            label="Password"
            value={password}
            size="small"
            type="password"
            onChange={(e) => { setPassword(e.target.value); }}
          />
          <TextFieldWrapper
            required
            placeholder="10001"
            label="Zipcode"
            value={zipcode}
            size="small"
            type="number"
            onChange={(e) => setZipcode(e.target.value)}
          />
        </FormWrapper>

        <ButtonWrapper onClick={handleSignUp}>Signup</ButtonWrapper>
        <ButtonWrapper onClick={() => navigate('/')}>Back</ButtonWrapper>

      </div>
    </div>
  );
}

export default Signup;

const FormWrapper = styled(FormControl)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '4px',
}))

const TextFieldWrapper = styled(TextField)(() => ({
  margin: '4px',
  'label': {
    fontSize: '14px',
  },
  'input': {
    fontSize: '14px',
  },
}))

const ButtonWrapper = styled(Button)(() => ({
  margin: '4px',
  width: '100px',
}))
