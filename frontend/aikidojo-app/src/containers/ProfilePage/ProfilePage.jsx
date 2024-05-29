// import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import StudentProfileForm from "../../components/ProfilePage/StudentProfileForm";
import { Spin } from "antd";
import { getApiResource } from "../../utils/network";
import { getToken } from "../../utils/authToken";
import { PROTOCOL, HOST, MEDIA, MEDIA_PATH, API_URL, AUTH_URL } from "../../constants/api";
import styles from "./ProfilePage.module.css";

const ProfilePage = ({ view }) => {
  const [profileData, setProfileData] = useState(null);
  const [profileDataChanged, setProfileDataChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatProfileData = (fetchedProfileData) => {
    const formattedProfileData = {
      fullname:
        fetchedProfileData.first_name +
        " " +
        fetchedProfileData.middle_name +
        " " +
        fetchedProfileData.last_name,
      email: fetchedProfileData.email,
      contact: fetchedProfileData?.phone_number,
      role: fetchedProfileData.role,
      rang: fetchedProfileData.rang,
      debt: fetchedProfileData.account?.debt,
      photo: fetchedProfileData.photo,
      date_of_birth: fetchedProfileData.date_of_birth,
      gender: fetchedProfileData.gender === "male" ? "М" : "Ж",
      parent_name:
      view === 'student' && fetchedProfileData.parents?.length !== 0 ? fetchedProfileData?.parents[0]?.first_name +
        " " +
        fetchedProfileData?.parents[0]?.middle_name +
        " " +
        fetchedProfileData?.parents[0]?.last_name : 'Нет данных',
      parent_contact: view === 'student' &&  fetchedProfileData.parents?.length !== 0 ? fetchedProfileData.parents[0].contact : 'Нет данных',
    };

    return formattedProfileData;
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchProfileData = async () => {
      const res = await getApiResource(API_URL + "me", {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });

      if (res) {
        console.log(res);
        setProfileData(formatProfileData(res));
        setTimeout(() => {
          setIsLoading(false);
        }, 150);
      } else {
        console.log("No data vailable for /me endpoint");
      }
    };

    fetchProfileData();
  }, [profileDataChanged]);

  const handleProfileDataEdit = () => {
    console.log(profileDataChanged);
    setProfileDataChanged((profileDataChanged) => !profileDataChanged);
  };

  return (
    <div className={styles["profile-page__container"]}>
      {isLoading ? (
        <div className={styles["spin__container"]}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className={styles["profile__container"]}>
            <div className={styles["profile__main-info__container"]}>
              <img
                className={styles["profile__main-info__img"]}
                src={MEDIA_PATH + profileData.photo}
                alt=""
              />
              <div className={styles["profile__main-info-text__container"]}>
                <h1>{profileData ? profileData.fullname : "Loading..."}</h1>
                {view == "trainer" ? (
                  <span>Сэнсэй</span>
                ) : (
                  <span>Ученик, {profileData.rang} кю</span>
                )}
              </div>
            </div>
          </div>

          <div className={styles["student-profile__form__container"]}>
            <StudentProfileForm
              view={view}
              data={profileData}
              onSubmition={handleProfileDataEdit}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
