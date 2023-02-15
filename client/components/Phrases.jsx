import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

function Phrases() {
  const [phrase, setPhrase] = useState('roommate');
  const phrases = ['roommate', 'future', 'life', 'friend', 'bed'];

  useEffect(() => {
    const index = phrases.indexOf(phrase);
    const newPhrase = (index === phrases.length - 1) ? phrases[0] : phrases[index + 1];
    setTimeout(() => {
      setPhrase(newPhrase);
    }, 5000);
  }, [phrase]);

  return (
    <Typography sx={{
      m: 2, font: 'DM Sans', fontSize: 28, fontWeight: '500', color: 'text.darkBlue', display: 'block',
    }}
    >
      find a
      {' '}
      {phrase}
      ...
    </Typography>
  );
}

export default Phrases;
