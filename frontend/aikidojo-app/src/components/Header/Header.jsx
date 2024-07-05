// import PropTypes from 'prop-types';
import { NavLink, resolvePath } from 'react-router-dom';
import cn from 'classnames';
// import userStore from '../../store/userStore';

import styles from './Header.module.css';
import { useState } from 'react';


const Header = ({view}) => {    
    console.log(view);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(state => !state);
    };

    return (
        <>
            <div className={styles.header__container}>
                <div className={styles.logo__container}>
                    <img className={styles['logo-img']} src="/logo.svg" alt="" />
                    <h1 className={styles['logo-text']}>AikiDojo</h1>
                </div>
                <img src="/header-open.png" className={styles['header-btn']} onClick={toggleDropdown}></img>
                <ul className={styles.header__list}
                >
                    {
                        view === 'trainer' ? (
                            <> 
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/profile">Профиль</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/dashboard/groups">Дэшборд</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/student/profile">Профиль</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/student/dashboard/schedule-future">Расписание</NavLink></li>
                            </>
                        )
                    }
                </ul>
            </div>

            <ul className={cn(styles.header__list_dropdown, {
                [styles['open']]: isOpen
            })
            }>
                    {
                        view === 'trainer' ? (
                            <> 
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/profile">Профиль</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/dashboard/groups">Группы</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/dashboard/schedule">Расписание тренировок</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/dashboard/students">Список учеников</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/trainer/dashboard/checks">Чеки об оплате</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/student/profile">Профиль</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/student/dashboard/schedule-future">Текущее расписание</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to="/student/dashboard/schedule-past">Посещаемость</NavLink></li>
                            </>
                        )
                    }
            </ul>
        </>
    )
}

export default Header;