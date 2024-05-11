import PropTypes from 'prop-types';
import GroupsTable from '../GroupsTable/GroupsTable';
import GroupMembersTable from '../GroupMembersTable/GroupMembersTable';
import AllStudentsTable from '../AllStudentsTable/AllStudentsTable';
import CreateGroupForm from '../CreateGroupForm/CreateGroupForm';
import { useState } from 'react';
import styles from './GroupsContent.module.css';


const GroupsContent = () => {

    const [isGroupSelected, setIsGroupSelected] = useState(false);
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [isAddingMembers, setIsAddingMembers] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    const handleAddNewMembersClick = () => {
        setIsAddingMembers(true);
        setIsGroupSelected(false);
        console.log('1')
    };

    const handleGroupClick = (id) => {
        setIsGroupSelected(true);
        setSelectedGroupId(id);
    };

    const handleCreateGroupClick = () => {
        setIsCreatingGroup(true);
    };

    const handleBackToTable = () => {
        setIsGroupSelected(false);
        setIsCreatingGroup(false);
        setIsAddingMembers(false);
    }


    // оглавление с кнопкой + таблица 
    // (весь функционал данного раздела будет содержаться здесь)

    return (
      <>
        {isCreatingGroup ? (
          <CreateGroupForm onBack={handleBackToTable} />
        ) : isGroupSelected ? (
          <>
            <div className={styles["table__container"]}>
              <GroupMembersTable
                onBack={handleBackToTable}
                id={selectedGroupId}
              />
            </div>
          </>
        ) : isAddingMembers ? (
          <>
            {console.log("1")}
            <div className={styles["table__container"]}>
              <AllStudentsTable onBack={handleBackToTable} />
            </div>
          </>
        ) : (
          <>
            <div className={styles["table__container"]}>
              <GroupsTable onGroupClick={handleGroupClick} />
            </div>
            {console.log("1")}
          </>
        )}
      </>
    );
};

GroupsContent.propTypes = {
    testProp: PropTypes.string
}

export default GroupsContent;