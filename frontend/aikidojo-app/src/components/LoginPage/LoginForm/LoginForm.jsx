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
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        setErrors({
            ...errors, 
            [e.target.id]: e.target.value ? false : true
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !formData.username || 
            !formData.password
        ) {
            setErrors({
                username: !formData.username,
                password: !formData.password 
            });
            return;
        } 

        console.log(formData);
    }

    return (
        <>
            <form>
                <div className={styles.inputs_container}>
                    <div className={styles.form_input}>
                        <label htmlFor="username">
                            Логин {errors.username && <span className={styles['error-message']}>обязателен для заполнения</span>}
                        </label>
                        <Input 
                            id="username" 
                            size="large" placeholder="введите e-mail или номер телефона" allowClear
                            onChange={handleChange}
                            value={formData.username} 
                            status={errors.username ? 'error' : undefined}
                        />
                    </div>
                    <div className={styles.form_input}>
                        <label htmlFor="password">
                            Пароль {errors.password && <span className={styles['error-message']}>обязателен для заполнения</span>}
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

// RegistrationForm.propTypes = {
//     testProp: PropTypes.string
// }

export default LoginForm;