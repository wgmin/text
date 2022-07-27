import React from 'react';
import { ConfigProvider, Layout, Pagination } from 'antd';
import { connect } from 'umi';

import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';
import 'moment/locale/zh-cn';

import TopMenu from './topMenu';
// import SideMenu from './sideMenu';
import menuData from './menuData';
import './baseLayout.less';

moment.locale('zh-cn');

const { Footer, Content } = Layout;
const BaseLayout = (props) => {
  const { children, common, dispatch } = props;
  const { language } = common;
  // console.log(12345, props);

  // 切换语言
  const handleLanguage = () => {
    moment.locale(language.locale === 'en' ? 'zh-cn' : 'en');
    dispatch({
      type: 'common/update',
      payload: {
        language: language.locale === 'en' ? zhCN : enUS,
      },
    });
  };

  const Menu = () => {
    return (
      <Layout
        theme={'light'}
        style={{ background: 'white' }}
        key={language ? language.locale : 'en'}
      >
        <TopMenu
          menuData={menuData}
          handleLanguage={handleLanguage}
          language={language.locale}
        />
        <Layout>
          {/* <SideMenu /> */}
          <Content style={{ height: 'calc(100vh - 86px)' }}>{children}</Content>
        </Layout>
      </Layout>
    );
  };

  return <ConfigProvider locale={language}>{Menu()}</ConfigProvider>;
};

export default connect(({ common }) => ({ common }))(BaseLayout);
