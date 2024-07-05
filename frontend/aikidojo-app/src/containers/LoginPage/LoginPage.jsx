import PropTypes from 'prop-types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../utils/authToken';
import LoginForm from '../../components/LoginPage/LoginForm/LoginForm';
import styles from './LoginPage.module.css';


const LoginPage = () => {
    const navigate = useNavigate();

    const onLogin = () => {
        console.log(getUserRole())  
        if (getUserRole() === 'trainer') {
            console.log(111)
            navigate('/trainer/dashboard/groups')
        } else if (getUserRole() === 'student') {
            navigate('/student/dashboard/schedule-future')
        }
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