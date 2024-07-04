import PropTypes from 'prop-types';

import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginPage/LoginForm/LoginForm';
import styles from './LoginPage.module.css';


const LoginPage = () => {
    const navigate = useNavigate();

    const onLogin = () => {
        navigate('/trainer/dashboard/groups');
    }

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