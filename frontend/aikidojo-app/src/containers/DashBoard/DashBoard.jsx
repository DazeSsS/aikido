import PropTypes from 'prop-types';
import SideBar from '../../components/DashBoard/SideBar/SideBar';
import Table from 'antd/es/table/Table';

import styles from './DashBoard.module.css';
import { Button } from 'antd';

import { useState } from 'react';

import { mockGroupData, mockGroupMembersData } from '../../mock/mockData';
import GroupMembers from '../../components/DashBoard/GroupMembers/GroupMembers';

const columns = [
    {
        title: 'Группа',
        dataIndex: 'group',
        // render: (text) => (<><strong>{text.title}</strong><br /><span>{text.ageGroup}</span></>)
        render: (text) => (<div className={styles['member-name__container']}><img src="/group-avatar.png" alt="" />{text.title}</div>)
    },
    {
        title: 'Состав группы',
        dataIndex: 'group-people'
    },
    {
        title: 'Место проведения',
        dataIndex: 'place',
        render: (text) => (<><strong>{text.mainPlace}</strong><br /><span>{text.address}</span></>)
    },
    // {
    //     title: '',
    //     dataIndex: '',
    //     render: () => (<button>111</button>)
    // }
];



const DashBoard = () => {

    const [isGroupSelected, setIsGroupSelected] = useState(false);

    const handleGroupClick = () => {
        setIsGroupSelected(true);
    };

    const handleBackToTable = () => {
        setIsGroupSelected(false);
    }

    return (
        <>
            <div className={styles['dashboard__container']}>
        
                <SideBar />

                

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
                    
                
                
                    {
                    isGroupSelected ? (
                        <>
                            <div className={styles['section-button__container']}>
                                <div className={styles['section-button__container__inner']}>
                                    <h3>Ученики 1-ой группы</h3>
                                    <Button
                                        className={styles['section-button']}
                                        type="primary"
                                        size="large"
                                    >
                                        Добавить новых участников
                                    </Button>
                                </div>
                            </div>
                            <div className={styles['table__container']}>
                                <GroupMembers onBack={handleBackToTable} />
                            </div>    
                        </>

                        ) : (
                            <>
                                <div className={styles['section-button__container']}>
                                    <div className={styles['section-button__container__inner']}>
                                        <h3>Группы</h3>
                                        <Button
                                            className={styles['section-button']}
                                            type="primary"
                                            size="large"
                                        >
                                            Создать группу
                                        </Button>
                                    </div>
                                </div>
                                <div className={styles['table__container']}>
                                <Table className={styles['group-table']}
                                    columns={columns}
                                    dataSource={mockGroupData}
                                    onRow={(record) => {
                                        return {
                                            onClick: (event) => handleGroupClick()
                                        }
                                    }}
                                
                                />
                                </div>
                            </>
                            )
                    }
                    
                
            </div> 
        </>
    )
};

DashBoard.propTypes = {
    testProp: PropTypes.string
}

export default DashBoard;