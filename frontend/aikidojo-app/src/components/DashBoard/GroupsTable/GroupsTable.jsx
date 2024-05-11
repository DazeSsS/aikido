import PropTypes from 'prop-types';
import { Spin } from 'antd';
import InfoTable from '../InfoTable/InfoTable';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { useState, useEffect } from 'react';
import styles from './GroupsTable.module.css';
import { getApiResource } from '../../../utils/network';
import { getToken } from '../../../utils/authToken';


const GroupsTable = ({ onGroupClick }) => {

    const [groups, setGroups] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const formatGroupsData = (fetchedGroupsData) => {
      const formattedGroupsData = [];

      for (let group of fetchedGroupsData) {
        const groupData = {
          key: group.id,
          id: group.id,
          group: {
            title: group.title
          },
          population: group.students.length,
          place: {
            address: group.place.address,
            description: group.place.description
          },
          
        };

        formattedGroupsData.push(groupData);
      }

      return formattedGroupsData;
    }

    useEffect(() => {
        const fetchGroups = async () => {
          const res = await getApiResource('http://localhost:8000/api/v1/trainer/groups', {
            headers: {
              Authorization: `Token ${getToken()}`
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

    return (
      <>
        <ControlsPanel
          title={"Группы"}
          actionTitle={"Создать группу"}
          onBack={null}
          onAction={null}
          labelData={null}
        />
        <div className={styles["table__container"]}>
          {isLoading ? (
            <div className={styles["spin__container"]}>
              <Spin size="large" />
            </div>
          ) : (
            <InfoTable
              layout={"groups"}
              data={groups}
              enableRowClick={true}
              onRowClick={onGroupClick}
            />
          )}
        </div>
      </>
    );
};

GroupsTable.propTypes = {
    testProp: PropTypes.string
}

export default GroupsTable;
