import PropTypes from 'prop-types';

import { Spin } from 'antd';

import { useState, useEffect } from 'react';

import styles from './MiniProfile.module.css';
import { getApiResource } from '../../../utils/network';
import { PROTOCOL, HOST, MEDIA, MEDIA_PATH, API_URL } from "../../../constants/api";
import { getToken } from '../../../utils/authToken';

const MiniProfile = ({ handleLogout }) => {
    const [miniProfileData, setMiniProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMiniProfileData = async () => {
            const res = await getApiResource(API_URL + 'me', {
                headers: {
                    Authorization: `Token ${getToken()}`
                },
            });

            if (res) {
                console.log(res);
                
                const formattedMiniProfileData = {
                    fullname: `${res.first_name} ${res.last_name}`,
                    email: res.email,
                    photo: res.photo
                }

                setMiniProfileData(formattedMiniProfileData);
                setTimeout(() => setIsLoading(false), 150); // added some timeout for smooth
            } else {
                console.log('Mini profile fetch is not working...');
            }
        }

        fetchMiniProfileData();
    }, []);

    return (
      <>
        {isLoading ? (
            <div className={styles['spin__container']}>
                 <Spin size="large"/>
            </div>
        ) : (
          <>
            <img
              className={styles["user-profile-avatar"]}
              src={MEDIA_PATH + miniProfileData.photo}
              alt=""
            />
            <div className={styles["profile-name__container"]}>
              <h2>{miniProfileData.fullname.length >= 2 ? miniProfileData.fullname.slice() : miniProfileData.fullname}</h2>
              <span>{miniProfileData.email}</span>
            </div>

            <div onClick={handleLogout} className={styles["logout-button"]}>
              <span className="material-icons">logout</span>
            </div>
          </>
        )}
      </>
    );
};

MiniProfile.propTypes = {
    testProp: PropTypes.string
}

export default MiniProfile;
