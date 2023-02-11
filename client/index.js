import React from 'react';
import { createRoot } from 'react-dom/client';

import ToggleLightDark from './components/ToggleLightDark.jsx';

import './stylesheets/styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ToggleLightDark /> 
);