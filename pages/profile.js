import React from 'react';
import Head from 'next/head';

import Layout from '../components/Layout';

const profile = () => {
  return (
    <div>
      <Head>
        <title>C And C</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.min.css"
        />
      </Head>
      <Layout>Profie</Layout>
    </div>
  );
};

export default profile;
