// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import StudentProfileForm from '../../components/ProfilePage/StudentProfileForm';
import { getApiResource } from '../../utils/network';
import styles from './ProfilePage.module.css';


const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);

    // const getResource = async (url) => {
    //     const res = await getApiResource(url);

    //     if (res) {
    //         // console.log(res);
    //         for (let key in res) {
    //             console.log(`${key}`, res[key]);
    //         }
    //         setProfileData(res);
    //         console.log(profileData);
    //     } else {
    //         console.log('no data!');
    //     }
    // };

    // useEffect(() => {
    //     getResource('http://localhost:8000/api/v1/users/10')
    // }, []);

    return (
        <div className={styles['profile-page__container']}>
            <div className={styles['profile__container']}>
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
    )
};

export default ProfilePage;