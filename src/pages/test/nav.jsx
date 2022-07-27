import React, { useContext } from 'react';
import { Context } from './createContext';

const Nav = (props) => {
  const tt = useContext(Context);
  return <div>{tt.value}</div>;
};

export default Nav;
