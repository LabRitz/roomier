import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import Context from './context/Context';
import Phrases from './Phrases';
import '../stylesheets/login.scss';

function Signup() {
  const navigate = useNavigate();
  const { setAlert } = useContext(Context);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [zipcode, setZipcode] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (firstName.length === 0
        || lastName.length === 0
        || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(username)
        || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/.test(password)
        || !/[0-9]{5}/.test(zipcode)) {
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
      console.log('ERROR: Cannot signup user', err);
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
        <FormControl
          sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', m: 1,
          }}
          size="small"
        >
          <TextField
            required
            placeholder="Rich"
            label="First Name"
            value={firstName}
            sx={{ m: 1, width: 300 }}
            size="small"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            inputProps={{ style: { fontSize: 14 } }}
          />
          <TextField
            required
            placeholder="Barton"
            label="Last Name"
            value={lastName}
            sx={{ m: 1, width: 300 }}
            size="small"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            inputProps={{ style: { fontSize: 14 } }}
          />
          <TextField
            required
            placeholder="r.barton@zillow.com"
            label="Email"
            value={username}
            sx={{ m: 1, width: 300 }}
            size="small"
            type="email"
            inputProps={{ style: { fontSize: 14 } }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            placeholder="ForbesCEO2021"
            label="Password"
            value={password}
            sx={{ m: 1, width: 300 }}
            size="small"
            type="password"
            inputProps={{ style: { fontSize: 14 } }}
            onChange={(e) => { setPassword(e.target.value); }}
          />
          <TextField
            required
            placeholder="10001"
            label="Zipcode"
            value={zipcode}
            sx={{ m: 1, width: 300 }}
            size="small"
            type="number"
            inputProps={{ style: { fontSize: 14 } }}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </FormControl>

        <Button sx={{ m: 1, width: 100 }} onClick={handleSignUp}>Signup</Button>
        <Button sx={{ m: 1, width: 100 }} onClick={() => navigate('/')}>Back</Button>

      </div>
    </div>
  );
}

export default Signup;
