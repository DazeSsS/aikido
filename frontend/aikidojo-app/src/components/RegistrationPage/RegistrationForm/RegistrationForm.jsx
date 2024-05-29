import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './RegistrationForm.module.css';
import { PROTOCOL, HOST, MEDIA, MEDIA_PATH, API_URL, AUTH_URL } from "../../../constants/api";
import { postApiResource } from '../../../utils/network';

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
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value
        });

        setErrors({
            ...errors,
            [id] : !value
        })

        console.log(formData);
        console.log(errors)
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const { fullName, userName, password } = formData;

        if (!fullName || !userName || !password) {
            setErrors({
                fullName: !fullName,
                userName: !userName,
                password: !password
            });

            return;
        }

        const userData = {
            email: userName,
            password: password,
            role: 'trainer',
            first_name: fullName.split(' ')[0],
            last_name: fullName.split(' ')[1],
        }

        handleRegister(userData);

        // console.log(formData);
    };

    const renderError = (id) => {
        return errors[id] && <span className={styles['error-message']}>обязателен для заполнения</span>;
    };

    const handleRegister = async (userData) => {

        const res = await postApiResource(API_URL + 'trainers', {body: userData});

        console.log(res)

        if (res) {
          
          console.log(res);

          navigate('/login')
        }

      }

    return (
        <>
            <form>
                <div className={styles['inputs_container']}>
                    <div className={styles['form_input']}>
                        <label htmlFor="fullName">
                            ФИО {renderError('fullName')}
                        </label>
                        <Input 
                            id="fullName"
                            size="large" placeholder="введите фио" allowClear
                            onChange={handleChange}
                            status={errors.fullName ? 'error' : undefined}
                        />
                    </div>
                    <div className={styles['form_input']}>
                        <label htmlFor="userName">
                            Логин {renderError('userName')}
                        </label>
                        <Input 
                            id="userName"
                            size="large" placeholder="введите e-mail" allowClear
                            onChange={handleChange}
                            status={errors.userName ? 'error' : undefined}
                        />
                    </div>
                    <div className={styles['form_input']}>
                        <label htmlFor="password">
                            Пароль {renderError('password')}
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