import PropTypes from 'prop-types';
import SideBar from '../../components/DashBoard/SideBar/SideBar';

import GroupsContent from '../../components/DashBoard/GroupsContent/GroupsContent';
import ScheduleContent from '../../components/DashBoard/ScheduleContent/ScheduleContent';
import StudentsContent from '../../components/DashBoard/StudentsContent/StudentsContent';
import PaymentsContent from '../../components/DashBoard/PaymentsContent/PaymentsContent';
import AttendanceContent from '../../components/DashBoard/AttendanceContent/AttendanceContent';

import styles from './DashBoard.module.css';
import { Button } from 'antd';

import { useState } from 'react';


const DashBoard = ({ onLogoutCallback, view }) => {

    const [selectedTab, setSelectedTab] = useState(view === "trainer" ? 'groups' : 'schedule');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'groups':
                return <GroupsContent />;
            case 'schedule':
                console.log('case schedule')
                return <ScheduleContent view={view} scheduleView={'schedule'}/>;
            case 'students':
                return <StudentsContent />;
            case 'payments':
                return <PaymentsContent />;
            case 'attendance':
                console.log('case attendance')
                return <ScheduleContent view={view} scheduleView={'student-attendance'}/>;
            default: 
                return null;
        }
    }

    // для таблицы групп
    // const [isGroupSelected, setIsGroupSelected] = useState(false);

    // const handleGroupClick = () => {
    //     setIsGroupSelected(true);
    // };

    // const handleBackToTable = () => {
    //     setIsGroupSelected(false);
    // }

    return (
        <>
            <div className={styles['dashboard__container']}>
        
                <SideBar onTabClick={handleTabClick} onLogoutCallback={onLogoutCallback} view={view}/>
                    
                    <div className={styles['dashboard-component__container']}>
                        {renderContent()}
                    </div>
                
            </div> 
        </>
    )
};

DashBoard.propTypes = {
    testProp: PropTypes.string
}

export default DashBoard;