import PropTypes from 'prop-types';
import styles from './RegistrationPage.module.css';

import RegistrationForm from '../../components/RegistrationPage/RegistrationForm/RegistrationForm';

const RegistrationPage = () => {
    return (
        <>
        <h1 className={styles['registration-welcome']}>Добро пожаловать!</h1>
        {/* {Тут форма регистрации} */}
        <RegistrationForm />
        </>
    )
};

// RegistrationPage.propTypes = {
//     testProp: PropTypes.string
// }

export default RegistrationPage;