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
        <img src="https://media.licdn.com/dms/image/C4E22AQEc3c9vriOYhQ/feedshare-shrink_1280/0/1675472515403?e=1678924800&v=beta&t=CzMKcIQH7chCPDnXrlIKcLxHG-2UvjHCDZ0p107MTeQ" width="75%" height="75%" alt="baby got slack" />
      </div>
      <h1>
        WELCOME TO BABY GOT SLACK!
      </h1>
    </>
  );
}

export default MainPage;
