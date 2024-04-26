// import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Input from 'antd/es/input/Input';
import StudentProfileForm from '../../components/ProfilePage/StudentProfileForm';

import styles from './ProfilePage.module.css';


const ProfilePage = () => {
    return (
        <> 
            <div className={styles['profile-page__container']}>
                <Header />
                <div className={styles.profile__container}>
                    <div className={styles['profile__main-info__container']}>

                        <img className={styles['profile__main-info__img']} src="/user-avatar.png" alt="" />
                        <div className={styles['profile__main-info-text__container']}>
                            <h1>Вася Васильевич Пупкин</h1>
                            <span>Ученик, 6 кю</span>
                        </div>
                    </div>

                </div>

            

                <div className={styles['student-profile__form__container']}>
                    <StudentProfileForm />
                </div>
            </div>   
        </>
    )
};

// ProfilePage.propTypes = {
//     testProp: PropTypes.string
// }

export default ProfilePage;