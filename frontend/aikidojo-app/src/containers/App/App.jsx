import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.css'

import { ConfigProvider } from 'antd'

import LoginPage from '../LoginPage/LoginPage'

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

        <LoginPage />

      </ConfigProvider>
    </>
  )
}

export default App
