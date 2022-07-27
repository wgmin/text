import React, { useRef } from 'react';
import Header from './header';
import { Card } from 'antd';
import NewTrigger from './trigger';
import Draggable from 'react-draggable';

const Test2 = (props) => {
  const headerRef = useRef();
  const handleFocus = () => {
    const _ref = headerRef.current;
    _ref.focus();
  };

  const handleAdd = () => {
    const _ref = headerRef.current;
    // const { count } = _ref
    console.log(_ref, 'refs');
  };

  return (
    <div>
      <div>
        1.
        传递ref,把自身的ref绑定到其他地方（eg你把文件交给总裁秘书，总裁秘书把文件交给总裁）
      </div>
      <div>
        2. ref和key有点特殊，不会作为props参数向下传递，this.props拿不到ref对象
      </div>
      <div>3. 函数组件时没有实例的，可以用useImperativeHandle实现部分功能</div>
      <div>4. 高阶组件需做特殊处理</div>

      <button onClick={handleFocus}>使用子组件中dom元素的方法</button>
      <button onClick={handleAdd}>使用子组件中class组件的属性和方法</button>
      <Header ref={headerRef} />

      <Card
        title={
          <NewTrigger>
            <button>add</button>
          </NewTrigger>
        }
      ></Card>
      <div style={{ background: 'pink', padding: 20 }}>
        <Draggable
          axis="x"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[25, 25]}
          scale={1}
        >
          <div>
            <div className="handle">Drag from here</div>
            <div>This readme is really dragging on...</div>
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default Test2;
