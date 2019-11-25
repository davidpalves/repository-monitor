import React, { useState } from 'react';
import TopNavbar from '../app/MonitorApp/components/TopNavbar/TopNavbar';
import SideBar from '../app/MonitorApp/components/SideBar/SideBar'

import '../../sass/pages/home.scss'

const Home = () => {

  return (
    <>
    <TopNavbar/>
    <SideBar/>
    </>
  );
};

export default Home;
