// import PropTypes from 'prop-types';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
    return (
        <>
            <form>
                <div className={styles['form-group']}>
                    <label htmlFor="username">Логин</label>
                    <input 
                        type="text" 
                        id="username"
                        placeholder="введите e-mail или номер телефона"
                        required
                    />
                </div>
                <div className={styles['form-group']}>
                <label htmlFor="password">Пароль</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="введите пароль"
                        required
                    />
                <div className={styles['password-buttons']}>
                    <a href="">Запомнить меня</a>
                    <a href="">Забыли пароль?</a>
                </div>
                </div>
                <button className={styles['form-button']} type="submit">Войти</button>
            </form>
            <div className={styles['decorative-line']}></div>
            {/* <hr className={styles['decorative-line']}/> */}
            <div className={styles['registration-link']}>
                <span>Еще не зарегестрированы?</span>
                <a href="">Создать новый аккаунт</a>
            </div>
        </>
    )
};

// RegistrationForm.propTypes = {
//     testProp: PropTypes.string
// }

export default RegistrationForm;