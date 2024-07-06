import MiniProfile from '../MiniProfile/MiniProfile';
import { deleteToken } from '../../../utils/authToken';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { deleteUserId, deleteUserRole } from '../../../utils/authToken';
import styles from './SideBar.module.css';

const SideBar = ({ view }) => {
  const navigate = useNavigate();

  const nullifyUserRole = () => {
    // temporal solution
    deleteUserId();
    deleteUserRole();
    deleteToken();
  };

  const handleLogout = () => {
    nullifyUserRole();
    navigate('/login');
  };

  return (
    <>
      <div className={styles['sidebar__container']}>
        <div className={styles['sidebar-title__container']}>
          <h1>Дэшборд</h1>
        </div>

        <div className={styles['sidebar__navigation']}>
          <ul>
            {view === 'trainer' ? (
              <>
                <NavLink
                  to="/trainer/dashboard/groups"
                  className={({ isActive }) =>
                    isActive ? styles['navigation-link-active'] : undefined
                  }
                >
                  <li className={styles['navigation-item']}>
                    <img
                      className={styles['navigation-item-img']}
                      src="/groups-icon.svg"
                      alt=""
                    />
                    <span>Группы</span>
                  </li>
                </NavLink>

                <NavLink
                  to="/trainer/dashboard/schedule"
                  className={({ isActive }) =>
                    isActive ? styles['navigation-link-active'] : undefined
                  }
                >
                  <li className={styles['navigation-item']}>
                    <img
                      className={styles['navigation-item-img']}
                      src="/schedule-icon.svg"
                      alt=""
                    />
                    <span>Расписание тренировок</span>
                  </li>
                </NavLink>

                <NavLink
                  to="/trainer/dashboard/students"
                  className={({ isActive }) =>
                    isActive ? styles['navigation-link-active'] : undefined
                  }
                >
                  <li className={styles['navigation-item']}>
                    <img
                      className={styles['navigation-item-img']}
                      src="/list-icon.svg"
                      alt=""
                    />
                    <span>Список учеников</span>
                  </li>
                </NavLink>

                <NavLink
                  to="/trainer/dashboard/checks"
                  className={({ isActive }) =>
                    isActive ? styles['navigation-link-active'] : undefined
                  }
                >
                  <li className={styles['navigation-item']}>
                    <img
                      className={styles['navigation-item-img']}
                      src="/payments-icon.svg"
                      alt=""
                    />
                    <span>Чеки об оплате</span>
                  </li>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/student/dashboard/schedule-future"
                  className={({ isActive }) =>
                    isActive ? styles['navigation-link-active'] : undefined
                  }
                >
                  <li className={styles['navigation-item']}>
                    <img
                      className={styles['navigation-item-img']}
                      src="/schedule-icon.svg"
                      alt=""
                    />
                    <span>Текущее расписание</span>
                  </li>
                </NavLink>

                <NavLink
                  to="/student/dashboard/schedule-past"
                  className={({ isActive }) =>
                    isActive ? styles['navigation-link-active'] : undefined
                  }
                >
                  <li className={styles['navigation-item']}>
                    <img
                      className={styles['navigation-item-img']}
                      src="/list-icon.svg"
                      alt=""
                    />
                    <span>Моя посещаемость</span>
                  </li>
                </NavLink>
              </>
            )}
          </ul>
        </div>

        <div className={styles['decorative-line']}></div>

        <div className={styles['sidebar-profile__container']}>
          <MiniProfile handleLogout={handleLogout} />
        </div>
      </div>
    </>
  );
};

export default SideBar;
