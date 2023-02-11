/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div style={{ backgroundColor: 'purple', color: 'white' }}>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <div style={{ marginTop: '3%', marginBottom: '2%' }}>
          <img src="https://static.tvtropes.org/trope_videos_transcoded/images/sd/s3wz9c.jpg" width="95%" height="95%" alt="baby got slack" />
        </div>
        <h1>Oh. My. God.</h1>
        <h2>Becky.</h2>
        <h3>Look at her message.</h3>
        <h4>It is so</h4>
        <h1>BIG.</h1>
        <button type="button" className="btn btn-primary btn-lg copy-btn" onClick={signIn}>
          Join The Conversation
        </button>
      </div>
    </div>
  );
}

export default Signin;
