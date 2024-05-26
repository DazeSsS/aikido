import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import InfoTable from '../InfoTable/InfoTable';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { getApiResource } from '../../../utils/network';
import { getToken } from '../../../utils/authToken';
import styles from './PaymentsTable.module.css';


const PaymentsTable = ({ }) => {

    const [payments, setPayments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const formatPaymentsData = (fetchedPaymentsData) => {
      const formattedPaymentsData = [];
      console.log(fetchedPaymentsData)

      for (let payment of fetchedPaymentsData) {
        const paymentData = {
          key: payment.id,
          id: payment.id,
          student: {
            full_name: payment.user.first_name + ' ' +
                       payment.user.middle_name + ' ' +   
                       payment.user.last_name, 
            photo: "http://localhost:8000/media/" + payment.user.photo
          },
          amount: payment.amount,
          debt: payment.account.debt,
          file: {
            link: "http://localhost:8000/media/" + payment.file,
            date: payment.date,
          },
          balance: payment.account.balance
          
        };

        formattedPaymentsData.push(paymentData);
      }

      return formattedPaymentsData;
    }

    useEffect(() => {
        const fetchPayments = async () => {
            const res = await getApiResource('http://localhost:8000/api/v1/trainer/checks', {
                headers: {
                    Authorization: `Token ${getToken()}`,
                }
            });

            if (res) {
                console.log(res)
                setPayments(formatPaymentsData(res));
                setTimeout(() => setIsLoading(false), 150);
            } else {
                console.log('check not found!!!')
            }
        };

        fetchPayments();
    }, []);

    return (
      <>
        <ControlsPanel
          title={"Присланные чеки"}
          actionTitle={"Подтвердить"}
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
              layout={"payments"}
              data={payments}
              enableRowClick={false}
              onRowClick={null}
              withTicks={true}
            />
          )}
        </div>
      </>
    );
};

PaymentsTable.propTypes = {
    testProp: PropTypes.string
}

export default PaymentsTable;