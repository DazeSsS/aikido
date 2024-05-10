import PropTypes from 'prop-types';
import { Spin } from 'antd';
import InfoTable from '../InfoTable/InfoTable';
import { useState, useEffect } from 'react';
import { getApiResource } from '../../../utils/network';
import styles from './GroupMembersTable.module.css';


const GroupMembersTable = ({ id }) => {
    const [groupMembers, setGroupMembers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const formatGroupMembersData = (fetchedGroupMembersData) => {
        const formattedGroupMembersData = [];
        console.log(fetchedGroupMembersData)

        for (let member of fetchedGroupMembersData) {
            const groupMembersData = {
              key: member.id,
              id: member.id,
              name: member.first_name + ' ' + member.middle_name + ' ' + member.last_name,
              debt: member.account.debt,
              parentContact: {
                name: member.parents[0].first_name + ' ' + member.parents[0].middle_name + ' ' + member.parents[0].last_name,
                contact: member.parents[0].contact
              },
              groupNumber: "1",
            };

            formattedGroupMembersData.push(groupMembersData);
        }

        console.log(formattedGroupMembersData)

        return formattedGroupMembersData;
    };

    useEffect(() => {
        const fetchGroupMembers = async () => {
            const res = await getApiResource(`http://localhost:8000/api/v1/trainer/groups/${id}/students`, {
                headers: {
                    Authorization: 'Token 8703bb12b24af015a1464ebd7b6828bffdd0bcf8',
                }
            });

            if (res) {
                console.log(res);
                setGroupMembers(formatGroupMembersData(res));
                setTimeout(() => setIsLoading(false), 150)
            } else {
                console.log('что то не так')
            }
        };

        fetchGroupMembers();
    }, []);

    return (
      <>
        <div className={styles["table__container"]}>
          {isLoading ? (
            <div className={styles["spin__container"]}>
              <Spin size="large" />
            </div>
          ) : (
            <InfoTable
              layout={"groupMembers"}
              data={groupMembers}
              enableRowClick={false}
              onRowClick={null}
            />
          )}
        </div>
      </>
    );
};

GroupMembersTable.propTypes = {
    testProp: PropTypes.string
}

export default GroupMembersTable;