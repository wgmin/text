import React from 'react';

import { Context } from './createContext';
import Nav from './nav';

const Test = () => {
  return (
    <Context.Provider value={{ value: '使用useContext得到' }}>
      <Nav />
    </Context.Provider>
  );
};

export default Test;
