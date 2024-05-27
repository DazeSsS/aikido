import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import CreateTrainingForm from '../CreateTrainingForm/CreateTrainingForm';

import styles from './ScheduleContent.module.css';
import CreateStudentForm from '../CreateStudentForm/CreateStudentForm';
import TrainingsSchedule from '../TrainingsSchedule/TrainingsSchedule';

const ScheduleContent = () => {
    const [isCreatingTraining, setIsCreatingTraining] = useState(false);

    const handleCreateTrainingClick = () => {
        setIsCreatingTraining(true);
    }
    
    const handleBackToTable = () => {
        setIsCreatingTraining(false);
    }

    return (
        <>  

            { isCreatingTraining ? (
                <CreateTrainingForm onBack={handleBackToTable} />
            ) : (
                <>
                <div className={styles['section-button__container']}>
                            <div className={styles['section-button__container__inner']}>
                                <h3>Текущее расписание</h3>
                                <Button
                                    className={styles['section-button']}
                                    type="primary"
                                    size="large"
                                    onClick={() => handleCreateTrainingClick()}
                                >
                                    Запланировать тренировку
                                </Button>
                            </div>
                        </div>
            <div className={styles['schedule__container__inner']}>
                <TrainingsSchedule />
                
            </div>
                </>
        
            )}
            
        </>
    )
};

ScheduleContent.propTypes = {
    testProp: PropTypes.string
}

export default ScheduleContent;