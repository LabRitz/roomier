import React, { useState } from 'react';

const Phrases = () => {
  const [phrase, setPhrase] = useState('Roommate');
  const phrases = ['Roommate', 'Future', 'Life', 'Friend', 'Bed']

  setInterval(()=> {
    const index = phrases.indexOf(phrase);
    const newPhrase = (index === phrases.length - 1) ? phrases[0] : phrases[index+1];
    setPhrase(newPhrase)
  }, 5000)

  return (
    <h2>Find a {phrase}</h2>
  )

}

export default Phrases;