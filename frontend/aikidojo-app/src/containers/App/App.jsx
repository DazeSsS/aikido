import { ConfigProvider } from 'antd'

import axios from 'axios';

import LoginPage from '../LoginPage/LoginPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import DashBoard from '../DashBoard/DashBoard';
import Header from '../../components/Header/Header';

import { useEffect, useState } from 'react';

import { BrowserRouter as Router, NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { getApiResource } from '../../utils/network';

import userStore from '../../store/userStore';

import styles from './App.module.css'

import { getToken } from '../../utils/authToken';

const App = () => {

  const appTheme = {
    token: {
      colorPrimary: '#722ED1',
      fontFamily: 'Inter, sans-serif',
      fontWeightStrong: 700,
    },
    components: {
      Button: {
        fontWeight: 600
      }
    }
  };

  const waveDisabled = {
    disabled: true
  };

  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // if (token) => request to aknowledge the role from app and set the user role, then navigate
  // else navigate to /login and request the role from app and set the user role, then navigate

  const nullifyUserRole = () => { // temporal solution
    setUserRole(null);
  };

  const updateUserRole = (role) => {
    setUserRole(role);
  } 
  
  useEffect(() => {
    const fetchUserRole = async () => {
      const res = await getApiResource("http://localhost:8000/api/v1/me", {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });

      if (res) {
        const user = res;

        updateUserRole(user.role);
        console.log('63', user.role);
      } else {
        console.log("No user data");
      }
    };

    if (getToken()) {
      // request role
      fetchUserRole();
    } else {
      navigate('/login')
    }
  }, []);


  useEffect(() => {
    console.log('navigation effect')

    console.log(userRole)

    if (userRole) {
      if (userRole === 'trainer') {
        navigate('/trainer/');
      } else if (userRole === 'student') {
        navigate('/student/');
      } 
    } else {
      navigate('/login');
    }

  }, [userRole]);


  
  return (
      <ConfigProvider theme={appTheme} wave={waveDisabled}>
        <Routes>
          {!getToken() && <Route path="/" element={<Navigate to="/login" /> } />}

          <Route path="/login" element={<LoginPage onLogin={updateUserRole}/>} />
          <Route path="/register" element={<RegistrationPage />} />

          <Route path="/trainer/*" element={<TrainerApp onLogoutCallback={nullifyUserRole}/>} />
          <Route path="/student/*" element={<StudentApp onLogoutCallback={nullifyUserRole}/>} />
        </Routes>
      </ConfigProvider>
  );
}


const StudentApp = ({ onLogoutCallback }) => {

  return (  
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/student/profile" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashBoard onLogoutCallback={onLogoutCallback}/>} />
      </Routes>
    </>
  );
};  

const TrainerApp = ({ onLogoutCallback }) => {

  return (  
    <>
      <Header view={'trainer'}/> 
        <Routes>
        <Route path="/" element={<Navigate to="/trainer/dashboard" />} />
        <Route path="/profile" element={<ProfilePage view={'trainer'} />} />
        <Route path="/dashboard" element={<DashBoard onLogoutCallback={onLogoutCallback}/>} />
        </Routes>  
    </>
  );
};


export default App


