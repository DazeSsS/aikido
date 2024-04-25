// import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    return (
        <> 
            <Header />
            <div className={styles.profile__container}>
                <div className={styles['profile__main-info__container']}>
                    <img src="" alt="" />
                    <h1>Вася Васильевич Пупкин</h1>
                </div>
            </div>
        </>
    )
};

// ProfilePage.propTypes = {
//     testProp: PropTypes.string
// }

export default ProfilePage;