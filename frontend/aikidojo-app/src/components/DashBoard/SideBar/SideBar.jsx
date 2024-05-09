import PropTypes from 'prop-types';
import MiniProfile from '../MiniProfile/MiniProfile';
import { useState } from 'react';

import { deleteToken } from '../../../utils/authToken';

import { useNavigate } from 'react-router-dom';

import styles from './SideBar.module.css';

const SideBar = ({ onTabClick }) => {

    const [selectedTab, setSelectedTab] = useState('groups');
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        console.log(selectedTab);
        setSelectedTab(tab);
        onTabClick(tab);
    }

    const handleLogout = () => {
        deleteToken();
        navigate('/login');
    }


    return (
      <>
        <div className={styles["sidebar__container"]}>
          <div className={styles["sidebar-title__container"]}>
            <h1>Дэшборд</h1>
          </div>

          <div className={styles["sidebar__navigation"]}>
            <ul>
              <li
                className={
                  selectedTab === "groups"
                    ? styles["navigation-item-active"]
                    : styles["navigation-item"]
                }
                onClick={() => handleTabClick("groups")}
              >
                Группы
              </li>
              <li
                className={
                  selectedTab === "schedule"
                    ? styles["navigation-item-active"]
                    : styles["navigation-item"]
                }
                onClick={() => handleTabClick("schedule")}
              >
                Расписание тренировок
              </li>
              <li
                className={
                  selectedTab === "students"
                    ? styles["navigation-item-active"]
                    : styles["navigation-item"]
                }
                onClick={() => handleTabClick("students")}
              >
                Список учеников
              </li>
              <li
                className={
                  selectedTab === "payments"
                    ? styles["navigation-item-active"]
                    : styles["navigation-item"]
                }
                onClick={() => handleTabClick("payments")}
              >
                Чеки об оплате
              </li>
            </ul>
          </div>

          <div className={styles["sidebar-profile__container"]}>
            {/* <img
              className={styles["user-profile-avatar"]}
              src="/user-sidebar-avatar.png"
              alt=""
            />
            <div className={styles["profile-name__container"]}>
              <h2>Киссёмару Уэсиба</h2>
              <span>k.ueshiba@aikidojo.ru</span>
            </div>

            <div onClick={handleLogout} className={styles["logout-button"]}>
              <span className="material-icons">logout</span>
            </div> */}

            <MiniProfile handleLogout={handleLogout}/>

          </div>
        </div>
      </>
    );
};

SideBar.propTypes = {
    testProp: PropTypes.string
}

export default SideBar;