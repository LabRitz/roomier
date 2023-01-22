import React, { useState } from 'react';
import Typography from '@mui/material/Typography';

const Phrases = () => {
  const [phrase, setPhrase] = useState('roommate');
  const phrases = ['roommate', 'future', 'life', 'friend', 'bed']

  setInterval(()=> {
    const index = phrases.indexOf(phrase);
    const newPhrase = (index === phrases.length - 1) ? phrases[0] : phrases[index+1];
    setPhrase(newPhrase)
  }, 5000)

  return (
    <Typography sx={{ my: 2, font:'DM Sans', fontSize: 28, fontWeight: '500', color: 'text.darkBlue', display: 'block' }}>
      find a {phrase}...
    </Typography>
  )

}

export default Phrases;