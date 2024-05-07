// import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { NavLink, resolvePath } from 'react-router-dom';
import userStore from '../../store/userStore';

import styles from './Header.module.css';


const Header = observer(() => {
    const role = userStore.role;
    
    // console.log(role);

    return (
        <>
            <div className={styles.header__container}>
                <div className={styles.logo__container}>
                    <img className={styles['logo-img']} src="/logo.svg" alt="" />
                    <h1 className={styles['logo-text']}>AikiDojo</h1>
                </div>
                <ul className={styles.header__list}>
                    {
                        role === 'trainer' ? (
                            <>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/profile">Профиль</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/dashboard">Дэшборд</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/pricing">Стоимость тренировок</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/profile">Профиль</NavLink></li>
                                <li><NavLink to="/trainer/dashboard">Расписание</NavLink></li>
                                <li><NavLink to="/pricing">Стоимость тренировок</NavLink></li>
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
});

// Header.propTypes = {
//     testProp: PropTypes.string
// }

export default Header;