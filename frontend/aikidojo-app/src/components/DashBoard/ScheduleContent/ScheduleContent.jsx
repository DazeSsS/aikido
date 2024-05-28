import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import CreateTrainingForm from '../CreateTrainingForm/CreateTrainingForm';
import AttendanceTable from '../AttendanceTable/AttendanceTable';
import styles from './ScheduleContent.module.css';
import TrainingsSchedule from '../TrainingsSchedule/TrainingsSchedule';

const ScheduleContent = () => {
    const [isCreatingTraining, setIsCreatingTraining] = useState(false);
    const [isPatchingAttendance, setIsPatchingAttendance] = useState(false);
    const [practiceId, setPracticeId] = useState(null);
    const [practiceDate, setPracticeDate] = useState(null);
    const [groupId, setGroupId] = useState(null);

    const handleCreateTrainingClick = () => {
        setIsCreatingTraining(true);
    }

    const handleOnPracticeClick = (pracId, pracDate, groupId) => {
        setIsPatchingAttendance(true);
        setPracticeId(pracId);
        setPracticeDate(pracDate);
        setGroupId(groupId)
    } 
    
    const handleBackToTable = () => {
        setIsCreatingTraining(false);
        setIsPatchingAttendance(false);
    }

    return (
        <>  
            { isCreatingTraining ? (
                <CreateTrainingForm onBack={handleBackToTable} />
            ) : ( 
                isPatchingAttendance ? (
                    <AttendanceTable onBack={handleBackToTable} practiceId={practiceId} practiceDate={practiceDate} groupId={groupId}/>
                ) : (
                    <>
                        <TrainingsSchedule onBack={handleBackToTable} onCreateTrainingClick={handleCreateTrainingClick} onPracticeClick={handleOnPracticeClick}/>  
                    </>
                )
            )}     
        </>
    )
};

ScheduleContent.propTypes = {
    testProp: PropTypes.string
}

export default ScheduleContent;