import PropTypes from 'prop-types';
import { Button, Spin } from 'antd';
import InfoTable from '../InfoTable/InfoTable';
import { useState, useEffect } from 'react';
import styles from './GroupsTable.module.css';
import { getApiResource } from '../../../utils/network';
import { getToken } from '../../../utils/authToken';


const GroupsTable = ({ onGroupClick }) => {

    // const [isGroupSelected, setIsGroupSelected] = useState(false);
    // const [isCreatingGroup, setIsCreatingGroup] = useState(false);

    const handleGroupClick = () => {
        setIsGroupSelected(true);
    };

    const handleCreateGroupClick = () => {
        setIsCreatingGroup(true);
    };

    const handleBackToTable = () => {
        setIsGroupSelected(false);
        setIsCreatingGroup(false);
    }

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
            // setIsLoading(false);
            // console.log('GROUPS:', );
            setTimeout(() => setIsLoading(false), 150);
          } else {
            console.log('could not fetch groups');
          }
        };  

        fetchGroups();
    }, []);

    return (
      <>
        {/* вытащить панель с кнопками в отдельный компонент */}
        <div className={styles["section-button__container"]}>
          <div className={styles["section-button__container__inner"]}>
            <h3>Группы</h3>
            <Button
              className={styles["section-button"]}
              type="primary"
              size="large"
              onClick={() => handleCreateGroupClick()}
            >
              Создать группу
            </Button>
          </div>
        </div>
        <div className={styles["table__container"]}>

          {isLoading ? (
              <div className={styles['spin__container']}>
                <Spin size="large"/>
              </div>
          ) : (
            <InfoTable layout={'groups'} data={groups} enableRowClick={true} onRowClick={onGroupClick}/>
          )}
        </div>
      </>
    );
};

GroupsTable.propTypes = {
    testProp: PropTypes.string
}

export default GroupsTable;
