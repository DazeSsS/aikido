import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
    return (
        <>
            <form>
                <div className={styles.inputs_container}>
                    <div className={styles.form_input}>
                        <label htmlFor="fullname">ФИО</label>
                        <Input 
                            id="fullname"
                            size="large" placeholder="введите фио" allowClear
                        />
                    </div>
                    <div className={styles.form_input}>
                        <label htmlFor="username">Логин</label>
                        <Input 
                            id="username"
                            size="large" placeholder="введите e-mail или номер телефона" allowClear
                        />
                    </div>
                    <div className={styles.form_input}>
                        <label htmlFor="password">Пароль</label>
                        <Input.Password 
                            id="password"
                            size="large" placeholder="придумайте пароль" allowClear
                        />
                    </div>
                </div>
                <Button type="primary" size="large" block>Зарегистрироваться</Button>
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