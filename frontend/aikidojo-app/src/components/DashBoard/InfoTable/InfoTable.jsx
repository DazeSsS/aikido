import PropTypes from 'prop-types';
import { Table } from 'antd';
import styles from './InfoTable.module.css';


const groupsTableColumns = [
    {
        title: 'Группа',
        dataIndex: 'group',
        render: (text) => (<div className={styles['member-name__container']}><img src="/group-avatar.png" alt="" />{text.title}</div>)
    },
    {
        title: 'Состав группы',
        dataIndex: 'population',
        render: (population) => (<>{population} чел.</>)
    },
    {
        title: 'Место проведения',
        dataIndex: 'place',
        render: (place) => (<><strong>{place.description}</strong><br /><span>{place.address}</span></>)
    },
    // {
    //     title: '',
    //     dataIndex: '',
    //     render: () => (<button>111</button>)
    // }
];


const groupMembersColumns = [
    {
        title: 'Имя',
        dataIndex: 'name',
        render: (name) => (<div className={styles['member-name__container']}><img src="/group-member-avatar.png" alt="" />{name}</div>)
    },
    {   
        title: 'Задолженность',
        dataIndex: 'debt',
        render: (debt) => (<>{debt} руб.</>)
    },
    {
        title: 'Контактные данные родителя',
        dataIndex: 'parentContact',
        render: (parentContact) => (<>{parentContact.name} <br /> {parentContact.contact}</>)
    },
    {
        title: 'Группа',
        dataIndex: 'groupNumber',
        render: (groupNumber) => (<>{groupNumber} (заглушка)</>)
    }
];


const InfoTable = ({ layout, data, enableRowClick, onRowClick }) => {

    const determineColumnsLayout = () => {
        switch(layout) {
            case 'groups':
                return groupsTableColumns;
            case 'groupMembers':
                return groupMembersColumns;
            default: 
                return null;
        }
    }

    const tableProps = {
        className: styles['group-table'],
        columns: determineColumnsLayout(),
        dataSource: data,
    };

    if (enableRowClick) {
        tableProps.onRow = (record) => {
            return {
                onClick: () => onRowClick(record.id)
            }
        }
    }

    return (
        <>
           <Table
            {...tableProps}
            />
        </>
    )
};

InfoTable.propTypes = {
    testProp: PropTypes.string
}

export default InfoTable;