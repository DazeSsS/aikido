import PropTypes from "prop-types";
import { Button, Spin } from "antd";
import InfoTable from "../InfoTable/InfoTable";
import ControlsPanel from "../ControlsPanel/ControlsPanel";
import { useState, useEffect } from "react";
import styles from "./AllStudentsTable.module.css";
import { getApiResource } from "../../../utils/network";
import { getToken } from "../../../utils/authToken";

const AllStudentsTable = ({ onCreateStudentClick }) => {
  const [students, setStudents] = useState(null);
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
        groupNumber: 1,
      };

      formattedStudentsData.push(studentData);
    }
    console.log('ffffstudentData', formattedStudentsData)
    return formattedStudentsData;
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getApiResource(
        "http://localhost:8000/api/v1/trainer/students",
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );

      if (res) {
        console.log(res);
        setStudents(formatStudentsData(res));
        setTimeout(() => setIsLoading(false), 150);
        console.log("Успешно");
      } else {
        console.log("ERRROR");
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      <ControlsPanel
        title={"Список учеников из всех групп"}
        actionTitle={"Создать нового ученика"}
        onBack={null}
        onAction={onCreateStudentClick}
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
            enableDeleteClick={true}
            onDeleteClick={(id) => console.log(id)}
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
