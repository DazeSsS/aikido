import { useState } from 'react';
import AllStudentsTable from '../AllStudentsTable/AllStudentsTable';
import CreateStudentForm from '../CreateStudentForm/CreateStudentForm';

const StudentsContent = () => {
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);

  // const handleAddNewMembersClick = () => {
  //     setIsAddingMembers(true);
  //     setIsGroupSelected(false);
  //     console.log('1')
  // };

  // const handleGroupClick = (id) => {
  //     setIsGroupSelected(true);
  //     setSelectedGroupId(id);
  // };

  const handleCreateStudentClick = () => {
    setIsCreatingStudent(true);
  };

  const handleBackToTable = () => {
    setIsCreatingStudent(false);
  };

  return (
    <>
      {isCreatingStudent ? (
        <CreateStudentForm onBack={handleBackToTable} />
      ) : (
        <AllStudentsTable
          onBack={handleBackToTable}
          onCreateStudentClick={handleCreateStudentClick}
        />
      )}
    </>
  );
};

export default StudentsContent;
