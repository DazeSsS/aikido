import axios from 'axios';
import { Spin } from 'antd';
import InfoTable from '../InfoTable/InfoTable';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { useState, useEffect } from 'react';
import styles from './AttendanceTable.module.css';
import { getApiResource } from '../../../utils/network';
import { MEDIA_PATH, API_URL } from '../../../constants/api';
import { getToken } from '../../../utils/authToken';

const AttendanceTable = ({ onBack, practiceId, practiceDate, groupId }) => {
  const [students, setStudents] = useState(null);
  const [selectedRows, setSelectedRows] = useState(null);
  const [attendedStudents, setAttendedStudents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          photo: MEDIA_PATH + student.photo,
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
      };

      formattedStudentsData.push(studentData);
    }

    return formattedStudentsData;
  };

  const formatAttendedStudents = (fetchedAttendedStudents) => {
    return fetchedAttendedStudents.reduce((studentsIds, student) => {
      studentsIds.push(student.id);
      return studentsIds;
    }, []);
  };

  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchPracticeInfo = async () => {
      // API_URL + `trainer/practices/${practiceId}`
      const res = await getApiResource(
        API_URL + `trainer/practices/${practiceId}`,
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );

      if (res) {
        console.log(res);
        setAttendedStudents(formatAttendedStudents(res.attended));
        setTest(formatAttendedStudents(res.attended));
        console.log(formatAttendedStudents(res.attended));
      } else {
        console.log('что то не так');
      }
    };

    fetchPracticeInfo();
  }, []);

  useEffect(() => {
    if (attendedStudents !== null) {
      const fetchGroupMembers = async () => {
        // API_URL + `trainer/groups/${groupId}/students`
        const res = await getApiResource(
          API_URL + `trainer/groups/${groupId}/students`,
          {
            headers: {
              Authorization: `Token ${getToken()}`,
            },
          }
        );

        if (res) {
          const groupMembers = formatStudentsData(res);
          setStudents(groupMembers);
          setTimeout(() => setIsLoading(false), 150);
        } else {
          console.log('что то не так');
        }
      };

      fetchGroupMembers();
    }
  }, [attendedStudents]);

  const handleRowSelectionChange = (ids) => {
    setSelectedRows([...ids, ...attendedStudents]);
    setTest(ids);
  };

  const handlePatchAttended = async () => {
    const attendedResult = [...test];

    const res = await axios.patch(
      // API_URL + `trainer/practices/${practiceId}`
      API_URL + `trainer/practices/${practiceId}`,
      {
        attended: attendedResult,
      },
      {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    );

    if (res) {
      console.log(res);
      console.log('success');
      onBack();
    } else {
      console.log('error');
    }
  };

  const handleDeletePractice = async () => {
    const res = await axios.delete(
      API_URL + `trainer/practices/${practiceId}`,
      {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    );

    if (res) {
      console.log(res);
      console.log('successfully deleted');
      onBack();
    } else {
      console.log('error');
    }
  };

  return (
    <>
      <ControlsPanel
        title={'Посещаемость тренировки ' + practiceDate}
        actionTitle={'Отметить выбранных участников'}
        onBack={onBack}
        onAction={handlePatchAttended}
        deleteActionTitle={'Удалить тренировку'}
        onDeleteAction={handleDeletePractice}
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
            enableDeleteClick={false}
            withTicks={true}
            rowsPreselected={test}
            onRowSelectionChange={handleRowSelectionChange}
            onDeleteClick={null}
          />
        )}
      </div>
    </>
  );
};

export default AttendanceTable;
