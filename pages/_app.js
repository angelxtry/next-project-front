import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import rootReducer from '../reducers';
import Layout from '../components/Layout';

const CandC = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>C And C</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.min.css"
        />
      </Head>
      <Layout>
        <Component />
      </Layout>
    </Provider>
  );
};

CandC.propTypes = {
  Component: PropTypes.elementType
};

export default withRedux((initialState, options) => {
  const middlewares = [];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    !options.isServer &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  );
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
})(CandC);
