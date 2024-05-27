import PropTypes from 'prop-types';


import PaymentsTable from '../PaymentsTable/PaymentsTable';
import { Button } from 'antd';
import AllStudentsTable from '../AllStudentsTable/AllStudentsTable';

import { useState } from 'react';

import styles from './PaymentsContent.module.css';


const PaymentsContent = () => {

    // const handleAddNewMembersClick = () => {
    //     setIsAddingMembers(true);
    //     setIsGroupSelected(false);
    //     console.log('1')
    // };

    // const handleGroupClick = (id) => {
    //     setIsGroupSelected(true);
    //     setSelectedGroupId(id);
    // };

    // const handleCreateGroupClick = () => {
    //     setIsCreatingGroup(true);
    // };

    // const handleBackToTable = () => {
    //     setIsCreatingStudent(false);
    // }


    return (
        <>  
            <PaymentsTable />
        </>
    )
};

PaymentsContent.propTypes = {
    testProp: PropTypes.string
}

export default PaymentsContent;