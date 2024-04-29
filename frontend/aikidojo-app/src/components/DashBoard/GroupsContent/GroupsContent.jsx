import PropTypes from 'prop-types';

import { Button, Table } from 'antd';

import GroupMembers from '../GroupMembers/GroupMembers';
import CreateGroupForm from '../CreateGroupForm/CreateGroupForm';

import { useState } from 'react';

import styles from './GroupsContent.module.css';

import { mockGroupData } from '../../../mock/mockData';


const columns = [
    {
        title: 'Группа',
        dataIndex: 'group',
        // render: (text) => (<><strong>{text.title}</strong><br /><span>{text.ageGroup}</span></>)
        render: (text) => (<div className={styles['member-name__container']}><img src="./group-avatar.png" alt="" />{text.title}</div>)
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


const GroupsContent = () => {

    const [isGroupSelected, setIsGroupSelected] = useState(false);
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);

    const handleGroupClick = () => {
        setIsGroupSelected(true);
    };

    const handleCreateGroupClick = () => {
        setIsCreatingGroup(true);
    };

    const handleBackToTable = () => {
        setIsGroupSelected(false);
        setIsCreatingGroup(false);
    }


    // оглавление с кнопкой + таблица 
    // (весь функционал данного раздела будет содержаться здесь)

    return (
        <>
            {
                isCreatingGroup ? (
                    <CreateGroupForm onBack={handleBackToTable}/>
                ) :
                isGroupSelected ? (
                    <>
                        <div className={styles['section-button__container']}>
                            <div className={styles['section-button__container__inner']}>
                                <div className={styles['title-with-button__container']}>
                                    <Button size="large" onClick={() => handleBackToTable()}>назад</Button>
                                    <h3>Ученики 1-ой группы</h3>
                                </div>
                                
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
                                    onClick={() => handleCreateGroupClick()}
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
        </>
    )
};

GroupsContent.propTypes = {
    testProp: PropTypes.string
}

export default GroupsContent;

// {
//     isGroupSelected ? (
//         <>
//             <div className={styles['section-button__container']}>
//                 <div className={styles['section-button__container__inner']}>
//                     <h3>Ученики 1-ой группы</h3>
//                     <Button
//                         className={styles['section-button']}
//                         type="primary"
//                         size="large"
//                     >
//                         Добавить новых участников
//                     </Button>
//                 </div>
//             </div>
//             <div className={styles['table__container']}>
//                 <GroupMembers onBack={handleBackToTable} />
//             </div>    
//         </>

//         ) : (
//             <>
//                 <div className={styles['section-button__container']}>
//                     <div className={styles['section-button__container__inner']}>
//                         <h3>Группы</h3>
//                         <Button
//                             className={styles['section-button']}
//                             type="primary"
//                             size="large"
//                         >
//                             Создать группу
//                         </Button>
//                     </div>
//                 </div>
//                 <div className={styles['table__container']}>
//                 <Table className={styles['group-table']}
//                     columns={columns}
//                     dataSource={mockGroupData}
//                     onRow={(record) => {
//                         return {
//                             onClick: (event) => handleGroupClick()
//                         }
//                     }}
                
//                 />
//                 </div>
//             </>
//             )
//     }