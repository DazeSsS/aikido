import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Spin } from 'antd';
import InfoTable from '../InfoTable/InfoTable';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { useState, useEffect } from 'react';
import { getApiResource } from '../../../utils/network';
import { getToken } from '../../../utils/authToken';
import { mockGroupMembersData } from '../../../mock/mockData';
import { PROTOCOL, HOST, MEDIA, API_URL } from '../../../constants/api';
import styles from './AllGroupsStudentsTable.module.css';

const AllGroupsStudentsTable = ({ onBack, id }) => {
  const [students, setStudents] = useState(null);
  const [currentGroupStudents, setCurrentGroupStudents] = useState(null);
  const [selectedRows, setSelectedRows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // fetch students in current group -> filter all students with fetched students -> render result students

  const formatStudentsData = (fetchedStudentsData) => {
    const formattedStudentsData = [];

    for (const student of fetchedStudentsData) {
      const studentData = {
        key: student.id,
        id: student.id,
        debt: student.account.debt,
        student: {
          full_name:
            student.first_name +
            ' ' +
            student.middle_name +
            ' ' +
            student.last_name,
          photo: PROTOCOL + HOST + MEDIA + student.photo,
        },
        parentContact: {
          name:
            student.parents[0]?.first_name +
            ' ' +
            student.parents[0]?.middle_name +
            ' ' +
            student.parents[0]?.last_name,
          contact: student.parents[0]?.contact,
        },
        groupNumber: 1,
      };

      formattedStudentsData.push(studentData);
    }

    return formattedStudentsData;
  };

  const formatCurrentStudents = (fetchedCurrentStudents) => {
    return fetchedCurrentStudents.reduce((studentsIds, student) => {
      studentsIds.push(student.id);
      return studentsIds;
    }, []);
  };

  useEffect(() => {
    const fetchCurrentStudents = async () => {
      const res = await getApiResource(
        API_URL + `trainer/groups/${id}/students`,
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );

      if (res) {
        setCurrentGroupStudents(formatCurrentStudents(res));
      } else {
        console.log('что-то пошло не так');
      }
    };

    fetchCurrentStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentGroupStudents !== null) {
      const fetchStudents = async () => {
        const res = await getApiResource(
          // eslint-disable-next-line quotes
          API_URL + `trainer/students`,
          {
            headers: {
              Authorization: `Token ${getToken()}`,
            },
          }
        );

        if (res) {
          const formattedStudents = formatStudentsData(res);
          const filteredStudents = formattedStudents.filter(
            (student) => !currentGroupStudents.includes(student.id)
          );
          setStudents(filteredStudents);
          setIsLoading(false);
          console.log('Успешно');
        } else {
          console.log('ERROR');
        }
      };

      fetchStudents();
    }
  }, [currentGroupStudents]);

  const handleRowSelectionChange = (ids) => {
    console.log(ids);
    setSelectedRows(ids);
  };

  const handlePatchGroupClick = () => {
    const addNewMembersToGroup = async () => {
      const res = await axios.patch(
        API_URL + `trainer/groups/${id}`,
        {
          students: [...currentGroupStudents, ...selectedRows],
        },
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );

      if (res) {
        console.log('new members successfully added');
        onBack();
      } else {
        console.log('error');
      }
    };

    addNewMembersToGroup();
  };

  return (
    <>
      <ControlsPanel
        title={'Поиск участника для добавления в группу'}
        actionTitle={'Добавить выбранных участников'}
        onBack={onBack}
        onAction={handlePatchGroupClick}
        labelData={null}
      />

      <div className={styles['table__container']}>
        {isLoading ? (
          <div className={styles['spin__container']}>
            <Spin size="large" />
          </div>
        ) : (
          <InfoTable
            layout={'groupMembers'}
            data={students}
            enableRowClick={false}
            onRowClick={null}
            withTicks={true}
            onRowSelectionChange={handleRowSelectionChange}
          />
        )}
      </div>
    </>
  );
};

AllGroupsStudentsTable.propTypes = {
  testProp: PropTypes.string,
};

export default AllGroupsStudentsTable;
