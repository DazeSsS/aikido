import axios from 'axios';
import { Spin } from 'antd';
import InfoTable from '../InfoTable/InfoTable';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { useState, useEffect } from 'react';
import styles from './GroupsTable.module.css';
import { getApiResource } from '../../../utils/network';
import { API_URL } from '../../../constants/api';
import { getToken } from '../../../utils/authToken';

const GroupsTable = ({ onGroupClick, onCreateGroupClick }) => {
  const [groups, setGroups] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatGroupsData = (fetchedGroupsData) => {
    const formattedGroupsData = [];

    for (let group of fetchedGroupsData) {
      const groupData = {
        key: group.id,
        id: group.id,
        group: {
          title: group.title,
        },
        population: group.students.length,
        place: {
          address: group.place.address,
          description: group.place.description,
        },
      };

      formattedGroupsData.push(groupData);
    }

    return formattedGroupsData;
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await getApiResource(API_URL + 'trainer/groups', {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });

      if (res) {
        setGroups(formatGroupsData(res));
        setTimeout(() => setIsLoading(false), 150);
      } else {
        console.log('could not fetch groups');
      }
    };

    fetchGroups();
  }, []);

  const handleDeleteGroup = async (id) => {
    console.log(id);

    console.log(groups);
    const res = await axios.delete(API_URL + `trainer/groups/${id}`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });

    if (res) {
      console.log('успешно удалена группа');
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== id));
    } else {
      console.log('не смог удалить группу');
    }
  };

  return (
    <>
      <ControlsPanel
        title={'Группы'}
        actionTitle={'Создать новую группу'}
        onBack={null}
        onAction={onCreateGroupClick}
        labelData={null}
      />
      <div className={styles['table__container']}>
        {isLoading ? (
          <div className={styles['spin__container']}>
            <Spin size="large" />
          </div>
        ) : (
          <InfoTable
            layout={'groups'}
            data={groups}
            enableRowClick={true}
            onRowClick={onGroupClick}
            enableDeleteClick={true}
            onDeleteClick={handleDeleteGroup}
          />
        )}
      </div>
    </>
  );
};

export default GroupsTable;
