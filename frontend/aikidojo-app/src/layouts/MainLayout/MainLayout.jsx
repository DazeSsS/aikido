import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';


const MainLayout = ({view}) => {
    
    return (
        <>
        <Header view={view}/>
        <div className={styles['content']}>
            <Outlet />
        </div>
        </>
    );
}

export default MainLayout;