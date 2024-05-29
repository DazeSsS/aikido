import PropTypes from 'prop-types';


import PaymentsTable from '../PaymentsTable/PaymentsTable';
import { Button } from 'antd';
import AllStudentsTable from '../AllStudentsTable/AllStudentsTable';

import { useState } from 'react';

import styles from './PaymentsContent.module.css';


const PaymentsContent = () => {

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