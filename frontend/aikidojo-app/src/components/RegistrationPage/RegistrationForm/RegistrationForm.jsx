import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        fullName: false,
        userName: false,
        password: false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.id] : e.target.value ? false : true
        })

        console.log(formData);
        console.log(errors)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.fullName ||
            !formData.userName ||
            !formData.password 
        ) {
            setErrors({
                ...errors, 
                fullName: !formData.fullName,
                userName: !formData.userName,
                password: !formData.password
            });

            return;
        }

        console.log(formData);
    };

    return (
        <>
            <form>
                <div className={styles.inputs_container}>
                    <div className={styles.form_input}>
                        <label htmlFor="fullName">
                            ФИО {errors.fullName && <span className={styles['error-message']}>обязателен для заполнения</span>}
                        </label>
                        <Input 
                            id="fullName"
                            size="large" placeholder="введите фио" allowClear
                            onChange={handleChange}
                            status={errors.fullName ? 'error' : undefined}
                        />
                    </div>
                    <div className={styles.form_input}>
                        <label htmlFor="username">
                            Логин {errors.userName && <span className={styles['error-message']}>обязателен для заполнения</span>}
                        </label>
                        <Input 
                            id="username"
                            size="large" placeholder="введите e-mail или номер телефона" allowClear
                            onChange={handleChange}
                            status={errors.userName ? 'error' : undefined}
                        />
                    </div>
                    <div className={styles.form_input}>
                        <label htmlFor="password">
                            Пароль {errors.password && <span className={styles['error-message']}>обязателен для заполнения</span>}
                        </label>
                        <Input.Password 
                            id="password"
                            size="large" placeholder="придумайте пароль" allowClear
                            onChange={handleChange}
                            status={errors.password ? 'error' : undefined}
                        />
                    </div>
                </div>
                <Button onClick={handleSubmit} type="primary" size="large" block>Зарегистрироваться</Button>
            </form>

            <div className={styles['decorative-line']}></div>

            <div className={styles['login-link']}>
                <span>Уже зарегистрированы?</span>
                <NavLink to="/login">Войти в существующий аккаунт</NavLink>
            </div>
        </>
    )
};

// RegistrationForm.propTypes = {
//     testProp: PropTypes.string
// }

export default RegistrationForm;