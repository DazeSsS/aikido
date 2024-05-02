// import PropTypes from 'prop-types';

// подумать насчет проптайпов

import { Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = () => {
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

        console.log(formData);
    }

    const renderError = (id) => {
        return errors[id] && <span className={styles['error-message']}>обязателен для заполнения</span>;
    };

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
                <NavLink to="/register" end>Создать новый аккаунт</NavLink>
            </div>
        </>
    )
};

export default LoginForm;