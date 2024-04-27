import styles from './App.module.css'

import { ConfigProvider } from 'antd'

import LoginPage from '../LoginPage/LoginPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import DashBoard from '../DashBoard/DashBoard';
import Header from '../../components/Header/Header';

import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import userStore from '../../store/userStore';

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

  const determineUserRole = () => 'trainer'; // to be implemented later

  userStore.setRole(determineUserRole());

  return (
    <>
      <ConfigProvider
        theme={appTheme}
        wave={waveDisabled}
      >
        
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path={'/login'}
              element={<LoginPage />}
            />
            <Route
              path={'/register'}
              element={<RegistrationPage />}
            />
            <Route
              path={'/profile'}
              element={<ProfilePage />}
            />
            <Route
              path={'/dashboard'}
              element={<DashBoard />}
            />
          </Routes>

        </BrowserRouter>

      </ConfigProvider>
    </>
  )
}

export default App
