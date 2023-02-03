import Head from 'next/head';
import React from 'react';
import MessageForm from '../../components/forms/MessageForm';

export default function NewTeam() {
  return (
    <>
      <Head>
        <title>New Message Form</title>
      </Head>
      <MessageForm />
    </>
  );
}
