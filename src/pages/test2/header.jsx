import React, { forwardRef } from 'react';
import Content from './content';

const Header = (props, ref) => {
  return (
    <>
      <input type="text" ref={ref} />
      <Content ref={ref} />
    </>
  );
};

export default forwardRef(Header);
