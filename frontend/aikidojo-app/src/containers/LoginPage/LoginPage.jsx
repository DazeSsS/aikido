import PropTypes from 'prop-types';

import { Button, Input } from 'antd';
import LoginForm from '../../components/LoginPage/LoginForm/LoginForm';
import styles from './LoginPage.module.css';


const LoginPage = ({ onLogin }) => {
    return (
        <>
            <div className={styles['center-wrapper']}>
                <div className={styles.container}>
                    <h1 className={styles['login-welcome']}>Добро пожаловать!</h1>
                    <LoginForm onLogin={onLogin}/>
                </div>
            </div>
            
        </>
    )
};

// RegistrationPage.propTypes = {
//     testProp: PropTypes.string
// }

export default LoginPage;