import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const App = () => {
  const appTheme = {
    token: {
      colorPrimary: '#722ED1',
      fontFamily: 'Inter, sans-serif',
      fontWeightStrong: 700,
    },
    components: {
      Button: {
        fontWeight: 600,
      },
    },
  };

  const waveDisabled = {
    disabled: true,
  };

  useLocalStorage();

  return (
    <ConfigProvider theme={appTheme} wave={waveDisabled}>
      <Outlet />
    </ConfigProvider>
  );
};

export const StudentApp = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const TrainerApp = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
