import { useMemo } from 'react';
import { Table } from 'antd';
import styles from './InfoTable.module.css';

const groupsTableColumns = [
  {
    title: 'Группа',
    dataIndex: 'group',
    render: (text) => (
      <div className={styles['member-name__container']}>
        <img src="/group-avatar.png" alt="" />
        {text.title}
      </div>
    ),
  },
  {
    title: 'Состав группы',
    dataIndex: 'population',
    render: (population) => <>{population} чел.</>,
  },
  {
    title: 'Место проведения',
    dataIndex: 'place',
    render: (place) => (
      <>
        <strong>{place.description}</strong>
        <br />
        <span>{place.address}</span>
      </>
    ),
  },
];

const groupMembersColumns = [
  {
    title: 'Имя',
    dataIndex: 'student',

    render: (student) => (
      <div className={styles['member-name__container']}>
        <img
          className={styles['user-photo__container']}
          src={student.photo}
          alt=""
        />
        {student.full_name}
      </div>
    ),
  },
  {
    title: 'Задолженность',
    dataIndex: 'debt',

    render: (debt) => <>{debt} руб.</>,
  },
  {
    title: 'Контактные данные родителя',
    dataIndex: 'parentContact',
    render: (parentContact) => (
      <>
        {parentContact.name} <br /> {parentContact.contact}
      </>
    ),
  },
];

const paymentsColumns = [
  {
    title: 'Имя',
    dataIndex: 'student', // name + photo appearence
    render: (student) => (
      <div className={styles['member-name__container']}>
        <img
          className={styles['user-photo__container']}
          src={student.photo}
          alt=""
        />
        {student.full_name}
      </div>
    ),
  },
  {
    title: 'Чек на сумму',
    dataIndex: 'amount',
    width: 150,
    render: (debt) => <>{debt} руб.</>,
  },
  {
    title: 'Задолженность',
    dataIndex: 'debt',
    width: 150,
    render: (debt) => <>{debt} руб.</>,
  },
  {
    title: 'Ссылка на чек',
    dataIndex: 'file',
    width: 200,
    render: (file) => (
      <>
        <a target="_blank" href={file.link}>
          Чек от {file.date}
        </a>
      </>
    ),
  },
  {
    title: 'Баланс',
    dataIndex: 'balance',
    render: (balance) => <>{balance} руб</>,
  },
];

// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
//     getCheckboxProps: (record) => ({
//       disabled: record.name === 'Disabled User',
//       // Column configuration not to be checked
//       name: record.name,
//     }),
//   };

// убрал временно

const InfoTable = ({
  layout,
  data,
  enableRowClick,
  onRowClick,
  enableDeleteClick,
  onDeleteClick,
  withTicks,
  rowsPreselected,
  onRowSelectionChange,
}) => {
  const determineColumnsLayout = useMemo(() => {
    let columns = [];

    switch (layout) {
      case 'groups':
        columns = [...groupsTableColumns];
        break;
      case 'groupMembers':
        columns = [...groupMembersColumns];
        break;
      case 'payments':
        columns = [...paymentsColumns];
        break;
      default:
        columns = [];
    }

    if (enableDeleteClick) {
      console.log('zzzzzzzzzzz');
      columns.push({
        title: '',
        dataIndex: '',
        render: (_, record) => (
          <div
            className={styles['delete-button']}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(record.id);
            }}
          >
            <span className="material-icons">delete_outline</span>
          </div>
        ),
      });
    }

    return columns;
  }, [layout, enableDeleteClick, onDeleteClick]);

  const tableProps = {
    className: styles['group-table'],
    columns: determineColumnsLayout,
    dataSource: data,
  };

  if (enableRowClick) {
    tableProps.onRow = (record) => {
      return {
        onClick: () => onRowClick(record.id),
      };
    };
  }

  if (withTicks) {
    tableProps.rowSelection = {
      type: 'checkbox', // Указание типа выбора строк
      onChange: onRowSelectionChange, // Функция обратного вызова при изменении выбранных строк
      selectedRowKeys: rowsPreselected, // Выбранные строки
    };
  }

  return (
    <>
      <Table
        {...tableProps}
        scroll={{
          x: 900,
        }}
      />
    </>
  );
};

export default InfoTable;
