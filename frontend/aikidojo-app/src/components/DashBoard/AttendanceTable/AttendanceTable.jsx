import PropTypes from "prop-types";
import axios from "axios";
import { Button, Spin } from "antd";
import InfoTable from "../InfoTable/InfoTable";
import ControlsPanel from "../ControlsPanel/ControlsPanel";
import { useState, useEffect } from "react";
import styles from "./AttendanceTable.module.css";
import { getApiResource } from "../../../utils/network";
import { getToken } from "../../../utils/authToken";

const AttendanceTable = ({ onBack, practiceId, practiceDate, groupId }) => {
//   console.log(practiceId)
  const [students, setStudents] = useState(null);
  const [selectedRows, setSelectedRows] = useState(null);
  const [attendedStudents, setAttendedStudents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatStudentsData = (fetchedStudentsData) => {
    const formattedStudentsData = [];

    console.log('fetched: ', fetchedStudentsData);

    for (const student of fetchedStudentsData) {
      console.log(student.account.debt)

      const studentData = {
        key: student.id,
        id: student.id,
        debt: student.account.debt,
        student: {
          full_name: student.first_name + ' ' +
                student.middle_name + ' ' +
                student.last_name,
          photo: "http://localhost:8000/media/" + student.photo
        },
        parentContact: {
          name:
            student.parents[0]?.first_name +
            " " +
            student.parents[0]?.middle_name +
            " " +
            student.parents[0]?.last_name,
          contact: student.parents[0]?.contact,
        },
      };

      formattedStudentsData.push(studentData);
    }
    console.log('ffffstudentData', formattedStudentsData)
    return formattedStudentsData;
  };

  const formatAttendedStudents = (fetchedAttendedStudents) => {
    return fetchedAttendedStudents.reduce((studentsIds, student) => {
      studentsIds.push(student.id);
      return studentsIds;
    }, []);
  };

    useEffect(() => {
        const fetchPracticeInfo = async () => { 
            const res = await getApiResource(`http://localhost:8000/api/v1/trainer/practices/${practiceId}`, {
                headers: {
                    Authorization: `Token ${getToken()}`,
                }
            });
    
            if (res) {
                setAttendedStudents(formatAttendedStudents(res.attended));
            } else {
                console.log('что то не так')
            }
        };

        
        fetchPracticeInfo();
    }, []);


    useEffect(() => {
        if (attendedStudents !== null) {
            const fetchGroupMembers = async () => {
                const res = await getApiResource(`http://localhost:8000/api/v1/trainer/groups/${groupId}/students`, {
                    headers: {
                        Authorization: `Token ${getToken()}`,
                    }
                });
    
                if (res) {
                    const groupMembers = formatStudentsData(res);
                    console.log(groupMembers)
                    console.log(attendedStudents)
                    const filteredStudents = groupMembers.filter(student => !attendedStudents.includes(student.id));
                    console.log(filteredStudents)
                    setStudents(filteredStudents)
                    setTimeout(() => setIsLoading(false), 150)
                } else {
                    console.log('что то не так')
                }
            };
            
            fetchGroupMembers();
        }
    }, [attendedStudents]);

  const handleRowSelectionChange = (ids) => {
    console.log(ids);
    setSelectedRows(ids);
  }

  const handlePatchAttended = async () => {
    const attendedResult = [...attendedStudents, ...selectedRows];

    const res = await axios.patch(
        `http://localhost:8000/api/v1/trainer/practices/${practiceId}`,
        {
            attended: attendedResult
        }, 
        {
            headers: {
                Authorization: `Token ${getToken()}`
            }
        }
    )

    if (res) {
        console.log('success');
        onBack();
    } else {
        console.log('error')
    }
  }

  return (
    <>
      <ControlsPanel
        title={"Посещаемость тренировки " + practiceDate}
        actionTitle={"Отметить выбранных участников"}
        onBack={onBack}
        onAction={handlePatchAttended}
        labelData={null}
      />
      <div className={styles["table__container"]}>
        {isLoading ? (
          <div className={styles["spin__container"]}>
            <Spin size="large" />
          </div>
        ) : (
          <InfoTable
            layout={"groupMembers"}
            data={students}
            enableRowClick={false}
            onRowClick={null}
            enableDeleteClick={false}
            withTicks={true}
            onRowSelectionChange={handleRowSelectionChange}
            onDeleteClick={null}
          />
        )}
      </div>
    </>
  );
};

AttendanceTable.propTypes = {
  testProp: PropTypes.string,
};

export default AttendanceTable;