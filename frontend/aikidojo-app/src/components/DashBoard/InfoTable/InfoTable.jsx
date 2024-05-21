import PropTypes from 'prop-types';
import { useMemo } from 'react';
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
    },
    // {
    //     title: '',
    //     dataIndex: '',
    //     render: (_, record) => (<button onClick={() => onDeleteClick(record.id)}>111</button>)
    // }
];


const paymentsColumns = [
    {
        title: 'Имя',
        dataIndex: 'name',
        width: 150,
        render: (name) => (<div className={styles['member-name__container']}><img src="/group-member-avatar.png" alt="" />{name}</div>)
    },
    {   
        title: 'Чек на сумму',
        dataIndex: 'summ',
        width: 150,
        render: (debt) => (<>{debt} руб.</>)
    },
    {   
        title: 'Задолженность',
        dataIndex: 'debt',
        render: (debt) => (<>{debt} руб.</>)
    },
    {
        title: 'Ссылка на чек',
        dataIndex: 'checkLink',
        // render: (parentContact) => (<>{parentContact.name} <br /> {parentContact.contact}</>)
    },
    {
        title: 'Баланс',
        dataIndex: 'balance',
        render: (balance) => (<>{balance} руб</>)
    },
];


const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };



const InfoTable = ({ layout, data, enableRowClick, onRowClick, enableDeleteClick, onDeleteClick }) => {

    const determineColumnsLayout = useMemo(() => {
        let columns = [];

        switch(layout) {
            case 'groups':
                columns = [...groupsTableColumns];
                break;
            case 'groupMembers':
                columns = [...groupMembersColumns];
                break;
            case 'payments':
                return paymentsColumns;
                break;
            default: 
                columns = [];
        }

        if (enableDeleteClick) {
            console.log('zzzzzzzzzzz')
            columns.push({
                title: '',
                dataIndex: '',
                render: (_, record) => (<button onClick={() => onDeleteClick(record.id)}>111</button>)
            }); 
        }

        return columns;
    }, [layout, enableDeleteClick, onDeleteClick])

    const tableProps = {
        className: styles['group-table'],
        columns: determineColumnsLayout,
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
            rowSelection={{
                
                ...rowSelection
            }}
            scroll={{
                x: 900,
              }}
            />
        </>
    )
};

InfoTable.propTypes = {
    testProp: PropTypes.string
}

export default InfoTable;