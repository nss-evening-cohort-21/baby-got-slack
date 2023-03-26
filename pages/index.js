/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Head from 'next/head';

function MainPage() {
  return (
    <>
      <Head>
        <title>Welcome To Baby Got Slack!</title>
      </Head>
      <div style={{ marginTop: '3%', marginBottom: '2%' }}>
        <img src="https://i.imgur.com/xe22uuW.jpg" width="75%" height="75%" alt="baby got slack" />
      </div>
      <h1>
        WELCOME TO BABY GOT SLACK!
      </h1>
    </>
  );
}

export default MainPage;
