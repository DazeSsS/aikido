import PropTypes from 'prop-types';
import { Input, Button, Upload } from 'antd';

import styles from './StudentProfileForm.module.css';

const StudentProfileForm = () => {
    return (
        <>
            <form>
                {/* инпут с задолженностью */}
                <div className={styles['add-check__input']}>
                    <label htmlFor="payment-sum">Задолженность: X руб.</label>
                    <Input
                        id="payment-sum"
                        placeholder="Введите сумму"
                        size="large"
                    />
                    <Button type="primary" size="large" block>Отправить чек об оплате</Button>
                </div>

                <div className={styles['user-info__container']}>
                    <div className={styles['user-info-row__container']}>
                        <div className={styles['user-info-row__input']}>
                            <label htmlFor="">ФИО</label>
                            <Input 
                                placeholder="Пупкин Василий Васильевич"
                                size="large"
                            />
                        </div>

                        <div className={styles['user-info-row__input']}>
                            <label htmlFor="">Эл. почта</label>
                            <Input 
                                placeholder="k.ueshiba@aikidojo.ru"
                                size="large"
                            />
                        </div>
                        
                        
                        
                    </div>

                    <div className={styles['decorative-line']}></div>

                    <div className={styles['user-info-row__container']}>
                        <div className={styles['user-info-row__input']}>
                            <label htmlFor="">Дата рождения</label>
                            <Input
                                placeholder="08.11.2010"
                                size="large"
                            />
                        </div>

                        <div className={styles['user-info-row__input']}>
                            <label htmlFor="">Пол</label>
                            <Input
                                placeholder="М"
                                size="large"
                            />
                        </div>
                    </div>

                      

                </div>

                <div className={styles['decorative-line']}></div>

                <div className={styles['user-parent-info__container']}>
                    <div className={styles['user-info-row__container']}>
                        <div className={styles['user-info-row__input']}>
                            <label htmlFor="">ФИО родителя</label>
                            <Input
                                placeholder="Иванов Иван Иванович"
                                size="large"
                            />
                        </div>

                        <div className={styles['user-info-row__input']}>
                            <label htmlFor="">Номер телефона родителя</label>
                            <Input
                                placeholder="89120389145"
                                size="large"
                            />
                        </div>

                    </div>

                    <div className={styles['decorative-line']}></div>
                </div>

                <div className={styles['user-info-row__container']}>
                        <div className={styles['user-info-row__input']}>
                            <label htmlFor="">Пароль</label>
                            <Input
                                placeholder="Пароль"
                                size="large"
                            />
                        </div>
                        
                        {/* <div className={styles['decorative-line']}></div> */}
                    </div>   

                <div className={styles['avatar-upload__container']}>


                    <Upload
                        name="avatar"
                        listType="picture-card"
                        style={{display: 'block'}}
                    >
                        Загрузить аватар
                    </Upload>

                </div>
                
                <div className={styles['form-buttons__container']}>
                    <Button size="large">Отмена</Button>
                    <Button type="primary" size="large">Сохранить</Button>
                </div>

            
            </form>
        </>
    )
};

StudentProfileForm.propTypes = {
    testProp: PropTypes.string
}

export default StudentProfileForm;