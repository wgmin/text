import React, { useState } from 'react';
import Trigger from 'rc-trigger';

const NewTrigger = (props) => {
  const { children } = props;
  const [visible, setVisible] = useState(false);
  const handleVisible = (val) => {
    setVisible(val);
  };
  return (
    <Trigger
      action={['click']}
      popup={visible && <div>123412421242</div>}
      popupVisible={visible}
      onPopupVisibleChange={handleVisible}
    >
      {children}
    </Trigger>
  );
};

export default NewTrigger;
