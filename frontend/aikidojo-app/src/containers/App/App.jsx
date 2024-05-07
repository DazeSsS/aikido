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
  // const [token, setToken] = useState(getToken());

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log('getting user role effect')
  //   const fetchUserRole = async () => {
  //     try {
  //       const res = await getApiResource('http://localhost:8000/api/v1/me', {
  //         headers: {
  //           'Authorization': `Token ${getToken()}`
  //         }
  //       });
  //       if (res) {
  //         const user = res;
  //         setUserRole(user.role);
  //         console.log(userRole)
  //       } else {
  //         console.log('No user data');
  //       }
  //     } catch (error) {
  //       console.log('Error fetching user data:', error);
  //     }
  //   };

  //   if (token) {
  //     fetchUserRole();
  //   } 
  // }, [token]);

  // useEffect(() => {
  //   setToken(getToken())
  //   console.log('token effect')
  // }, []);

  // useEffect(() => {
  //   console.log(111)
  //   if (!userRole) {
  //     navigate('/login')
  //   }
  // }, [])


  useEffect(() => {
    console.log('navigation effect')

    console.log(userRole)

    if (userRole) {
      if (userRole === 'trainer') {
        navigate('/trainer/');
      } else if (userRole === 'student') {
        navigate('/student/');
      } else {
        navigate('/login');
      }
    } 

  }, [userRole]);


  const updateUserRole = (role) => {
    setUserRole(role);
  } 

  return (
    
      <ConfigProvider theme={appTheme} wave={waveDisabled}>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}

          {!getToken() && <Route path="/" element={<Navigate to="/login" /> } />}
          
          {/* {userRole === 'trainer' && <Route path="/" element={<Navigate to="/trainer/" />} />} */}

          <Route path="/login" element={<LoginPage onLogin={updateUserRole}/>} />
          <Route path="/register" element={<RegistrationPage />} />

          <Route path="/trainer/*" element={<TrainerApp />} />
          <Route path="/student/*" element={<StudentApp />} />

          {/* <Route path="/profile" element={<ProfilePage />} /> */}


          {userRole === 'student' && <Route path="/student/*" element={<StudentApp />} />}

          {/* <Route path="/trainer/profile" element={<ProfilePage />}/>
          <Route path="/trainer/dashboard" element={<DashBoard />}/> */}

          {/* <Route path="/studentapp" element={<StudentApp />} />
          <Route path="/trainerapp" element={<TrainerApp />} /> */}
          {/* onLogin={handleLogin} */}
        </Routes>
      </ConfigProvider>
  );
}


const StudentApp = () => {
  console.log('11')

  return (  
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/student/profile" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </>
  );
};  

const TrainerApp = () => {
  console.log('11')

  return (  
    <>
      <Header />
      
        <Routes>
        <Route path="/" element={<Navigate to="/trainer/profile" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
        
    </>
  );
};

// const PrivateRoute = () => {
//     const userRole = determineUserRole();

//     if (userRole === 'trainer') {
//       return <Navigate to="" />
//     } else if (userRole === 'student') {
//       return <Navigate to="/profile" />
//     } else {
//       return <Navigate to="/login" />
//     }
// }




export default App


