import PropTypes from 'prop-types';

import { Button } from 'antd';

import styles from './ScheduleContent.module.css';

const ScheduleContent = () => {
    return (
        <>  
            <div className={styles['section-button__container']}>
                            <div className={styles['section-button__container__inner']}>
                                <h3>Текущее расписание</h3>
                                <Button
                                    className={styles['section-button']}
                                    type="primary"
                                    size="large"
                                    onClick={() => handleCreateGroupClick()}
                                >
                                    Запланировать тренировку
                                </Button>
                            </div>
                        </div>
            <div className={styles['schedule__container__inner']}>
                <div className={styles['schedule-items__container-grid']}>
                <ul className={styles['schedule-items__container']}>
                    <li className={styles['schedule-item-li']}>
                        <div className={styles['schedule-item']}>
                            <h1>Понедельник 22.04</h1>

                            <div className={styles['schedule-item-practice__container']}>
                                <div className={styles['practice-title']}>
                                    <h3>Группа 1</h3>
                                    <span>Общая тренировка</span>
                                </div>
                                
                                <div className={styles['decorative-line']}></div>

                                <div className={styles['practice-info']}>
                                    <div className={styles['practice-info-item']}>
                                        <h4>Место: </h4>
                                        <h4 className={styles['practice-info-item-value']}>Зал 1</h4>
                                    </div>
                                    <div className={styles['practice-info-item']}>
                                        <h4>Время: </h4>
                                        <h4 className={styles['practice-info-item-value']}>10:00 - 10:55</h4>
                                    </div>
                                    

                                </div>

                                
                                
                            </div>

                            <div className={styles['schedule-item-practice__container']}>
                                <div className={styles['practice-title']}>
                                    <h3>Группа 2</h3>
                                    <span>Общая тренировка</span>
                                </div>
                                
                                <div className={styles['decorative-line']}></div>

                                <div className={styles['practice-info']}>
                                    <div className={styles['practice-info-item']}>
                                        <h4>Место: </h4>
                                        <h4 className={styles['practice-info-item-value']}>Зал 2</h4>
                                    </div>
                                    <div className={styles['practice-info-item']}>
                                        <h4>Время: </h4>
                                        <h4 className={styles['practice-info-item-value']}>11:00 - 11:55</h4>
                                    </div>
                                    

                                </div>

                            
                                
                            </div>

                        
                        </div>
                    </li>

                    <li className={styles['schedule-item-li']}>
                        <div className={styles['schedule-item']}>
                            <h1>Среда 24.04</h1>

                            <div className={styles['schedule-item-practice__container']}>
                                <div className={styles['practice-title']}>
                                    <h3>Группа 3</h3>
                                    <span>Общая тренировка</span>
                                </div>
                                
                                <div className={styles['decorative-line']}></div>

                                <div className={styles['practice-info']}>
                                    <div className={styles['practice-info-item']}>
                                        <h4>Место: </h4>
                                        <h4 className={styles['practice-info-item-value']}>Главный зал</h4>
                                    </div>
                                    <div className={styles['practice-info-item']}>
                                        <h4>Время: </h4>
                                        <h4 className={styles['practice-info-item-value']}>9:00 - 9:55</h4>
                                    </div>
                                    

                                </div>

                                
                                
                            </div>

                            <div className={styles['schedule-item-practice__container']}>
                                <div className={styles['practice-title']}>
                                    <h3>Группа 2</h3>
                                    <span>Общая тренировка</span>
                                </div>
                                
                                <div className={styles['decorative-line']}></div>

                                <div className={styles['practice-info']}>
                                    <div className={styles['practice-info-item']}>
                                        <h4>Место: </h4>
                                        <h4 className={styles['practice-info-item-value']}>Зал 1</h4>
                                    </div>
                                    <div className={styles['practice-info-item']}>
                                        <h4>Время: </h4>
                                        <h4 className={styles['practice-info-item-value']}>10:00 - 10:55</h4>
                                    </div>
                                    

                                </div>

                            
                                
                            </div>

                        
                        </div>
                    </li>

                    
                </ul>
                </div>
                
            </div>
            
        </>
    )
};

ScheduleContent.propTypes = {
    testProp: PropTypes.string
}

export default ScheduleContent;