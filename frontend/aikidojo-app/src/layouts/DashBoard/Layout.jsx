import { Outlet } from 'react-router-dom';
import SideBar from '../../components/DashBoard/SideBar/SideBar';
import styles from './Layout.module.css';

const Layout = ({ view }) => {
  return (
    <>
      <div className={styles['dashboard__container']}>
        <SideBar view={view} />
        <div className={styles['content']}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
