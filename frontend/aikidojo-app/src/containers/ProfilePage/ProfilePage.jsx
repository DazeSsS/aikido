import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import StudentProfileForm from '../../components/ProfilePage/StudentProfileForm';
import { getApiResource } from '../../utils/network';
import { getToken } from '../../utils/authToken';
import { MEDIA_PATH, API_URL, BASE_URL } from '../../constants/api';
import styles from './ProfilePage.module.css';

const ProfilePage = ({ view }) => {
  const [profileData, setProfileData] = useState(null);
  const [profileDataChanged, setProfileDataChanged] = useState(false);
  const [tokenGoogleData, setTokenGoogleData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const formatProfileData = (fetchedProfileData) => {
    const formattedProfileData = {
      fullname:
        fetchedProfileData.last_name +
        ' ' +
        fetchedProfileData.first_name +
        ' ' +
        fetchedProfileData.middle_name,
      email: fetchedProfileData.email,
      contact: fetchedProfileData?.phone_number || 'Нет данных',
      role: fetchedProfileData.role,
      rang: fetchedProfileData.rang,
      debt: fetchedProfileData.account?.debt,
      balance: fetchedProfileData.account?.balance,
      photo: fetchedProfileData.photo,
      date_of_birth: fetchedProfileData.date_of_birth,
      gender: fetchedProfileData.gender === 'male' ? 'М' : 'Ж',
      parent_name:
        view === 'student' && fetchedProfileData.parents?.length !== 0
          ? fetchedProfileData?.parents[0]?.last_name +
            ' ' +
            fetchedProfileData?.parents[0]?.first_name +
            ' ' +
            fetchedProfileData?.parents[0]?.middle_name
          : 'Нет данных',
      parent_contact:
        view === 'student' && fetchedProfileData.parents?.length !== 0
          ? fetchedProfileData.parents[0].contact
          : 'Нет данных',
    };

    console.log(formattedProfileData);

    return formattedProfileData;
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchProfileData = async () => {
      const res = await getApiResource(API_URL + 'me', {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });

      if (res) {
        console.log(res);
        setProfileData(formatProfileData(res));
        //
      } else {
        console.log('No data vailable for /me endpoint');
      }
    };

    const checkGoogleToken = async () => {
      const res = await getApiResource(
        BASE_URL + 'accounts/google/checkToken',
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );

      if (res == 'false' || res === false || res) {
        console.log(res);
        // Обновляем profileData с данными о токене Google
        setTokenGoogleData(res);
        setTimeout(() => {
          setIsLoading(false);
        }, 150);
      } else {
        console.log('No data vailable for /me endpoint');
      }
    };

    fetchProfileData();
    checkGoogleToken();
  }, [profileDataChanged]);

  const handleProfileDataEdit = () => {
    console.log(profileDataChanged);
    setProfileDataChanged((profileDataChanged) => !profileDataChanged);
  };

  return (
    <div className={styles['profile-page__container']}>
      {isLoading ? (
        <div className={styles['spin__container']}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className={styles['profile__container']}>
            <div className={styles['profile__main-info__container']}>
              <img
                className={styles['profile__main-info__img']}
                src={MEDIA_PATH + profileData.photo}
                alt=""
              />
              <div className={styles['profile__main-info-text__container']}>
                <h1>{profileData ? profileData.fullname : 'Loading...'}</h1>
                {view == 'trainer' ? (
                  <span>Сэнсэй</span>
                ) : (
                  <span>Ученик, {profileData.rang || 1} кю</span>
                )}
              </div>
            </div>
          </div>

          <div className={styles['student-profile__form__container']}>
            <StudentProfileForm
              view={view}
              data={profileData}
              hasToken={tokenGoogleData}
              onSubmition={handleProfileDataEdit}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
