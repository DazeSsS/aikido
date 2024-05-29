import PropTypes from "prop-types";
import MiniProfile from "../MiniProfile/MiniProfile";
import { useState } from "react";

import { deleteToken } from "../../../utils/authToken";

import { useNavigate } from "react-router-dom";

import styles from "./SideBar.module.css";

const SideBar = ({ onTabClick, onLogoutCallback, view }) => {
  const [selectedTab, setSelectedTab] = useState(view === "trainer" ? "groups" : "schedule");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    console.log(selectedTab);
    setSelectedTab(tab);
    onTabClick(tab);
  };

  const handleLogout = () => {
    deleteToken();
    onLogoutCallback();
    navigate("/login");
  };

  return (
    <>
      <div className={styles["sidebar__container"]}>
        <div className={styles["sidebar-title__container"]}>
          <h1>Дэшборд</h1>
        </div>

        <div className={styles["sidebar__navigation"]}>
          <ul>
            {view === "trainer" ? (
              <>
                <li
                  className={
                    selectedTab === "groups"
                      ? styles["navigation-item-active"]
                      : styles["navigation-item"]
                  }
                  onClick={() => handleTabClick("groups")}
                >
                  <img
                    className={styles["navigation-item-img"]}
                    src="/groups-icon.svg"
                    alt=""
                  />
                  <span>Группы</span>
                </li>
                <li
                  className={
                    selectedTab === "schedule"
                      ? styles["navigation-item-active"]
                      : styles["navigation-item"]
                  }
                  onClick={() => handleTabClick("schedule")}
                >
                  <img
                    className={styles["navigation-item-img"]}
                    src="/schedule-icon.svg"
                    alt=""
                  />
                  <span>Расписание тренировок</span>
                </li>
                <li
                  className={
                    selectedTab === "students"
                      ? styles["navigation-item-active"]
                      : styles["navigation-item"]
                  }
                  onClick={() => handleTabClick("students")}
                >
                  <img
                    className={styles["navigation-item-img"]}
                    src="/list-icon.svg"
                    alt=""
                  />
                  <span>Список учеников</span>
                </li>
                <li
                  className={
                    selectedTab === "payments"
                      ? styles["navigation-item-active"]
                      : styles["navigation-item"]
                  }
                  onClick={() => handleTabClick("payments")}
                >
                  <img
                    className={styles["navigation-item-img"]}
                    src="/payments-icon.svg"
                    alt=""
                  />
                  <span>Чеки об оплате</span>
                </li>
              </>
            ) : (
              <>
                <li
                  className={
                    selectedTab === "schedule"
                      ? styles["navigation-item-active"]
                      : styles["navigation-item"]
                  }
                  onClick={() => handleTabClick("schedule")}
                >
                  <img
                    className={styles["navigation-item-img"]}
                    src="/schedule-icon.svg"
                    alt=""
                  />
                  <span>Текущее расписание</span>
                </li>
                <li
                  className={
                    selectedTab === "attendance"
                      ? styles["navigation-item-active"]
                      : styles["navigation-item"]
                  }
                  onClick={() => handleTabClick("attendance")}
                >
                  <img
                    className={styles["navigation-item-img"]}
                    src="/list-icon.svg"
                    alt=""
                  />
                  <span>Моя посещаемость</span>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={styles["decorative-line"]}></div>

        <div className={styles["sidebar-profile__container"]}>
          <MiniProfile handleLogout={handleLogout} />
        </div>
      </div>
    </>
  );
};

SideBar.propTypes = {
  testProp: PropTypes.string,
};

export default SideBar;
