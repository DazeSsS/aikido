import PropTypes from 'prop-types';
import styles from './SideBar.module.css';

const SideBar = () => {
    return (
        <>
            <div className={styles['sidebar__container']}>
                <div className={styles['sidebar-title__container']}>
                    <h1>Дэшборд</h1>
                </div>

                <div className={styles['sidebar__navigation']}>
                    <ul>
                        <li className={styles['navigation-item']}>Группы</li>
                        <li>Расписание тренировок</li>
                        <li>Список учеников</li>
                        <li>Чеки об оплате</li>
                    </ul>
                </div>
                
                <div className={styles['sidebar-profile__container']}>
                <img className={styles['user-profile-avatar']} src="/user-sidebar-avatar.png" alt="" />
                    <div className={styles['profile-name__container']}>
                        <h2>Киссёмару Уэсиба</h2>
                        <span>k.ueshiba@aikidojo.ru</span>
                    </div>

                    <div className={styles['logout-button']}>
                            <img src="/logout.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
};

SideBar.propTypes = {
    testProp: PropTypes.string
}

export default SideBar;