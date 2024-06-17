// import PropTypes from 'prop-types';
import { NavLink, resolvePath } from 'react-router-dom';
// import userStore from '../../store/userStore';

import styles from './Header.module.css';


const Header = ({view}) => {
    // const role = userStore.role;
    
    console.log(view);

    return (
        <>
            <div className={styles.header__container}>
                <div className={styles.logo__container}>
                    <img className={styles['logo-img']} src="/logo.svg" alt="" />
                    <h1 className={styles['logo-text']}>AikiDojo</h1>
                </div>
                <ul className={styles.header__list}>
                    {
                        view === 'trainer' ? (
                            <>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/profile">Профиль</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/dashboard">Дэшборд</NavLink></li>
                                {/* <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/pricing">Стоимость тренировок</NavLink></li> */}
                            </>
                        ) : (
                            <>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/student/profile">Профиль</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/student/dashboard">Расписание</NavLink></li>
                                {/* <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/student/pricing">Стоимость тренировок</NavLink></li> */}
                            </>
                        )
                    }
{/* 
                    <li><NavLink to="/main">Главная</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/profile">Профиль</NavLink></li>
                    <li><NavLink to="/schedule">Расписание</NavLink></li>
                    <li><NavLink to="/pricing">Стоимость тренировок</NavLink></li> */}
                </ul>
            </div>
        </>
    )
}

// Header.propTypes = {
//     testProp: PropTypes.string
// }

export default Header;