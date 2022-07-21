import React, { useEffect, useState } from 'react';
import { Dropdown, Menu, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const TopMenu = (props) => {
  const { menuData, language, handleLanguage } = props;

  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === '3') {
      setVisible(false);
    }
  };

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: '12',
          key: '1',
        },
        {
          label: '34',
          key: '2',
        },
        {
          label: '56',
          key: '3',
        },
      ]}
    />
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
      }}
    >
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={menuData.map((item) => ({
          key: item.key,
          label: item.text,
        }))}
        style={{ width: '80%' }}
      />
      <Space size={16}>
        <Button onClick={handleLanguage}>
          {language === 'en' ? '中文' : 'English'}
        </Button>
        <Dropdown
          overlay={menu}
          onVisibleChange={handleVisibleChange}
          visible={visible}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>设置</Space>
          </a>
        </Dropdown>
        <UserOutlined />
        <span>wangminer</span>
      </Space>
    </div>
  );
};

export default TopMenu;
