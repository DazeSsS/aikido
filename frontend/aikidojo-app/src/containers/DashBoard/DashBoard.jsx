import PropTypes from 'prop-types';
import SideBar from '../../components/DashBoard/SideBar/SideBar';
import Table from 'antd/es/table/Table';

import GroupsContent from '../../components/DashBoard/GroupsContent/GroupsContent';
import ScheduleContent from '../../components/DashBoard/ScheduleContent/ScheduleContent';

import styles from './DashBoard.module.css';
import { Button } from 'antd';

import { useState } from 'react';

import GroupMembers from '../../components/DashBoard/GroupMembers/GroupMembers';

const DashBoard = () => {

    const [selectedTab, setSelectedTab] = useState('groups');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'groups':
                return <GroupsContent />;
            case 'schedule':
                return <ScheduleContent />;
            case 'students':
                return 'students component'
            case 'payments':
                return 'payments component';
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
        
                <SideBar onTabClick={handleTabClick} />

                

                    {/* <div className={styles['section-button__container']}>
                    <div className={styles['section-button__container__inner']}>
                        <h3>Группы</h3>
                        <Button
                            className={styles['section-button']}
                            type="primary"
                            size="large"
                        >
                            Создать группу
                        </Button>
                    </div> */}
                    
                    <div className={styles['dashboard-component__container']}>
                        {renderContent()}
                    </div>;
                
            </div> 
        </>
    )
};

DashBoard.propTypes = {
    testProp: PropTypes.string
}

export default DashBoard;