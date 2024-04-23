// import PropTypes from 'prop-types';

// подумать насчет проптайпов

import { Input, Button } from 'antd';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    return (
        <>
            <form>
                <div className={styles.inputs_container}>
                    <div className={styles.form_input}>
                        <label htmlFor="username">Логин</label>
                        <Input id="username" size="large" placeholder="введите e-mail или номер телефона" />
                    </div>
                    <div className={styles.form_input}>
                        <label htmlFor="password">Пароль</label>
                        <Input.Password id="password" size="large" placeholder="введите пароль" />
                    </div>
                </div>
                <Button type="primary" size="large" block>Войти</Button>
            </form>

            <div className={styles['decorative-line']}></div>

            <div className={styles['registration-link']}>
                <span>Еще не зарегистрированы?</span>
                <a href="">Создать новый аккаунт</a>
            </div>
        </>
    )
};

// RegistrationForm.propTypes = {
//     testProp: PropTypes.string
// }

export default LoginForm;