import styles from './App.module.css'

import { ConfigProvider } from 'antd'

import LoginPage from '../LoginPage/LoginPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import Header from '../../components/Header/Header';

import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <>
      <ConfigProvider
        theme={
          {
            token: {
              colorPrimary: '#7F56D9',
              fontFamily: 'Roboto, sans-serif',
              fontWeightStrong: 700,
              fontWeight: 700
            }
          }
        }
        wave={
          {
            disabled: true
          }
        }
      >
        <BrowserRouter>
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
          </Routes>

        </BrowserRouter>

      </ConfigProvider>
    </>
  )
}

export default App
