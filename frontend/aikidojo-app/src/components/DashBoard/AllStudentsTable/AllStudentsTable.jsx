import PropTypes from 'prop-types';
import axios from 'axios';
import { Spin } from 'antd';
import InfoTable from '../InfoTable/InfoTable';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { useState, useEffect } from 'react';
import styles from './AllStudentsTable.module.css';
import { getApiResource } from '../../../utils/network';
import { MEDIA_PATH, API_URL } from '../../../constants/api';
import { getToken } from '../../../utils/authToken';

const AllStudentsTable = ({ onCreateStudentClick }) => {
  const [students, setStudents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [labelData, setLabelData] = useState('считаем участников...');

  const formatStudentsData = (fetchedStudentsData) => {
    const formattedStudentsData = [];

    console.log('fetched: ', fetchedStudentsData);

    for (const student of fetchedStudentsData) {
      console.log(student.account.debt);

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
    console.log('ffffstudentData', formattedStudentsData);
    return formattedStudentsData;
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getApiResource(
        //API_URL + `trainer/students`
        API_URL + 'trainer/students',
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );

      if (res) {
        console.log(res);
        const formattedData = formatStudentsData(res);
        setStudents(formattedData);
        setTimeout(() => {
          setIsLoading(false);
          setLabelData(`${formattedData.length} участников`);
        }, 150);

        console.log(formattedData.length);
        console.log('Успешно');
      } else {
        console.log('ERRROR');
      }
    };

    fetchStudents();
  }, []);

  const handleDeleteStudent = async (id) => {
    // API_URL + `trainer/students/${id}`
    const res = await axios.delete(API_URL + `trainer/students/${id}`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });

    if (res) {
      console.log('student successfully deleted');
    } else {
      console.log('error');
    }
  };

  return (
    <>
      <ControlsPanel
        title={'Список учеников из всех групп'}
        actionTitle={'Создать нового ученика'}
        onBack={null}
        onAction={onCreateStudentClick}
        labelData={labelData}
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
            onDeleteClick={handleDeleteStudent}
          />
        )}
      </div>
    </>
  );
};

AllStudentsTable.propTypes = {
  testProp: PropTypes.string,
};

export default AllStudentsTable;
