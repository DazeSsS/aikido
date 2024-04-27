import PropTypes from 'prop-types';
import styles from './GroupMembers.module.css';

import { Table } from 'antd';

import { mockGroupMembersData } from '../../../mock/mockData';


const columns = [
    {
        title: 'Имя',
        dataIndex: 'name',
        render: (name) => (<div className={styles['member-name__container']}><img src="/group-member-avatar.png" alt="" />{name}</div>)
    },
    {   
        title: 'Задолженность',
        dataIndex: 'debt'
    },
    {
        title: 'Контактные данные родителя',
        dataIndex: 'parentContact'
    },
    {
        title: 'Группа',
        dataIndex: 'groupNumber'
    }
];

const GroupMembers = ({ onBack }) => {
    return (
        <>
            <Table 
                columns={columns}
                dataSource={mockGroupMembersData}
                onRow={(record) => { 
                    return {
                        onClick: (event) => handleGroupClick()
                    } 
                }}
            />
            <h1>group members component</h1>
            <button onClick={() => onBack()}>назад</button>
        </>
    )
};

GroupMembers.propTypes = {
    testProp: PropTypes.string
}

export default GroupMembers;