import enUS from 'antd/es/locale/en_US';

const initState = {
  language: enUS,
};

export default {
  namespace: 'common',
  state: initState,
  effects: {},
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
};
