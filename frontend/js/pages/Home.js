import React, { useState } from 'react';
import TopNavbar from '../app/MonitorApp/components/TopNavbar/TopNavbar'

const Home = () => {

  return (
    <>
    <TopNavbar/>
      <h1>Welcome, { context.login } { context.name }</h1>
    </>
  );
};

export default Home;
