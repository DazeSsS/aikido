import PropTypes from 'prop-types';
import RegistrationForm from '../../components/RegistrationPage/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
    return (
        <>
            <div className={styles['center-wrapper']}>
                <div className={styles['container']}>
                    <h1 className={styles['registration-welcome']}>Создание аккаунта</h1>
                    <RegistrationForm />
                </div>
            </div>
        </>
    )
};

// RegistrationPage.propTypes = {
//     testProp: PropTypes.string
// }

export default RegistrationPage;