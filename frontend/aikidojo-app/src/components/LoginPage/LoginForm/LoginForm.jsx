// import PropTypes from 'prop-types';

// подумать насчет проптайпов
import axios from 'axios';
import { Input, Button } from 'antd';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { setToken, getToken } from '../../../utils/authToken';
import { getApiResource, postApiResource } from '../../../utils/network';
import styles from './LoginForm.module.css';

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: false,
        password: false
    });

    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value
        });
        setErrors({
            ...errors, 
            [id]: !value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { username, password } = formData;

        if (!username || !password) {
            setErrors({
                username: !username,
                password: !password 
            });
            return;
        } 

        const userData = {email: username, password}
        handleLogin(userData);

        console.log(formData);
    }

    const renderError = (id) => {
        return errors[id] && <span className={styles['error-message']}>обязателен для заполнения</span>;
    };

    const handleLogin = async (userData) => {
        const res = await axios.post('http://localhost:8000/auth/token/login', userData);


        // const res = await postApiResource('http://localhost:8000/auth/token/login', {body: userData});
    
        if (res) {
          const data = res.data;
          const token = data['auth_token'];
          console.log(token)
          setToken(token);
        }

        const fetchUserRole = async () => {
            try {
              const res = await getApiResource('http://localhost:8000/api/v1/me', {
                headers: {
                  'Authorization': `Token ${getToken()}`
                }
              });
              if (res) {
                const user = res;
                onLogin(user.role);
                // console.log(userRole)
              } else {
                console.log('No user data');
              }
            } catch (error) {
              console.log('Error fetching user data:', error);
            }
          };
      
          if (getToken()) {
            fetchUserRole();
          } 
      }

    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register')
    }

    return (
        <>
            <form>
                <div className={styles['inputs_container']}>
                    <div className={styles['form_input']}>
                        <label htmlFor="username">
                            Логин {renderError('username')}
                        </label>
                        <Input 
                            id="username" 
                            size="large" placeholder="введите e-mail" allowClear
                            onChange={handleChange}
                            value={formData.username} 
                            status={errors.username ? 'error' : undefined}
                        />
                    </div>
                    <div className={styles['form_input']}>
                        <label htmlFor="password">
                            Пароль {renderError('password')}
                        </label>
                        <Input.Password 
                            id="password" 
                            size="large" placeholder="введите пароль" allowClear
                            onChange={handleChange} 
                            value={formData.password}
                            status={errors.password ? 'error' : undefined}
                        />
                    </div>
                </div>
                <Button onClick={handleSubmit} type="primary" size="large" block>Войти</Button>
            </form>

            <div className={styles['decorative-line']}></div>

            <div className={styles['registration-link']}>
                <span>Еще не зарегистрированы?</span>
                <NavLink onClick={handleRegisterClick} to="/register">Создать новый аккаунт</NavLink>
            </div>
        </>
    )
};

export default LoginForm;