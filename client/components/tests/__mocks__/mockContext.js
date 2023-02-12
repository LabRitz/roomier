import React from 'react';
import { render } from "@testing-library/react";

import Context from '../../context/Context.js'

const mockContext = (children, { providerProps, ...renderOptions }) => {
  return render(
    <Context.Provider value={providerProps}>{
      children}
    </Context.Provider>,
    renderOptions
  );
}

export default mockContext;
