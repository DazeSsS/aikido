import axios from 'axios';
import { Spin } from 'antd';
import InfoTable from '../InfoTable/InfoTable';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { useState, useEffect } from 'react';
import { getApiResource } from '../../../utils/network';
import styles from './GroupMembersTable.module.css';
import { MEDIA_PATH, API_URL } from '../../../constants/api';
import { getToken } from '../../../utils/authToken';

const GroupMembersTable = ({ id, onBack, onAddNewMemberClick }) => {
  const [groupMembers, setGroupMembers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatGroupMembersData = (fetchedGroupMembersData) => {
    const formattedGroupMembersData = [];
    console.log(fetchedGroupMembersData);

    for (let member of fetchedGroupMembersData) {
      const groupMembersData = {
        key: member.id,
        id: member.id,
        student: {
          full_name:
            member.first_name +
            ' ' +
            member.middle_name +
            ' ' +
            member.last_name,
          photo: MEDIA_PATH + member.photo,
        },
        debt: member.account.debt,
        parentContact: {
          name:
            member.parents[0].first_name +
            ' ' +
            member.parents[0].middle_name +
            ' ' +
            member.parents[0].last_name,
          contact: member.parents[0].contact,
        },
        groupNumber: '1',
      };

      formattedGroupMembersData.push(groupMembersData);
    }

    console.log(formattedGroupMembersData);

    return formattedGroupMembersData;
  };

  useEffect(() => {
    const fetchGroupMembers = async () => {
      const res = await getApiResource(
        API_URL + `trainer/groups/${id}/students`,
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );

      if (res) {
        console.log(res);
        setGroupMembers(formatGroupMembersData(res));
        setTimeout(() => setIsLoading(false), 150);
      } else {
        console.log('что то не так');
      }
    };

    fetchGroupMembers();
  }, []);

  const handleDeleteGroupMember = async (studentId) => {
    const filteredGroup = groupMembers.filter(
      (member) => member.id !== studentId
    );
    const filteredGroupIds = filteredGroup.map((member) => member.id);

    const res = await axios.patch(
      API_URL + `trainer/groups/${id}`,
      {
        students: filteredGroupIds,
      },
      {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    );

    if (res) {
      setGroupMembers(filteredGroup);
      console.log('student with selected id was deleted');
    } else {
      console.log('error deleting student in group');
    }
  };

  return (
    <>
      <ControlsPanel
        title={`Ученики ${id}-ой группы`}
        actionTitle={'Добавить новых участников'}
        onBack={onBack}
        onAction={onAddNewMemberClick}
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
            data={groupMembers}
            enableRowClick={false}
            onRowClick={null}
            enableDeleteClick={true}
            onDeleteClick={handleDeleteGroupMember}
          />
        )}
      </div>
    </>
  );
};

export default GroupMembersTable;
