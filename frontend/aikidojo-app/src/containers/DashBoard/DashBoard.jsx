import PropTypes from 'prop-types';
import SideBar from '../../components/DashBoard/SideBar/SideBar';
import Table from 'antd/es/table/Table';

import styles from './DashBoard.module.css';

const DashBoard = () => {
    return (
        <>
            <div className={styles['dashboard__container']}>
        
                <SideBar />

                <div className={styles['table__container']}>
                    <Table />
                </div>
                
            </div> 
        </>
    )
};

DashBoard.propTypes = {
    testProp: PropTypes.string
}

export default DashBoard;