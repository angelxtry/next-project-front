import React from 'react';
import Head from 'next/head';

import Layout from '../components/Layout';

const signup = () => {
  return (
    <div>
      <Head>
        <title>C And C</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.min.css"
        />
      </Head>
      <Layout>Signup</Layout>
    </div>
  );
};

export default signup;
