import axios from 'axios';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import InfoTable from '../InfoTable/InfoTable';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { getApiResource } from '../../../utils/network';
import { getToken } from '../../../utils/authToken';
import { MEDIA_PATH, API_URL } from '../../../constants/api';
import styles from './PaymentsTable.module.css';

const PaymentsTable = () => {
  const [payments, setPayments] = useState(null);
  const [selectedRows, setSelectedRows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [labelData, setLabelData] = useState('считаем количество чеков...');

  const formatPaymentsData = (fetchedPaymentsData) => {
    const formattedPaymentsData = [];
    console.log(fetchedPaymentsData);

    for (let payment of fetchedPaymentsData) {
      const paymentData = {
        key: payment.id,
        id: payment.id,
        student: {
          full_name:
            payment.user.first_name +
            ' ' +
            payment.user.middle_name +
            ' ' +
            payment.user.last_name,
          photo: MEDIA_PATH + payment.user.photo,
        },
        amount: payment.amount,
        debt: payment.account.debt,
        file: {
          link: MEDIA_PATH + payment.file,
          date: payment.date,
        },
        balance: payment.account.balance,
      };

      formattedPaymentsData.push(paymentData);
    }

    return formattedPaymentsData;
  };

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await getApiResource(API_URL + 'trainer/checks', {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });

      if (res) {
        const formattedData = formatPaymentsData(res);
        console.log(res);
        setPayments(formattedData);
        setTimeout(() => {
          setLabelData(`${formattedData.length} чеков`);
          setIsLoading(false);
        }, 150);
      } else {
        console.log('check not found!!!');
      }
    };

    fetchPayments();
  }, []);

  const handleRowSelectionChange = (ids) => {
    console.log(ids);
    setSelectedRows(ids);
  };

  const handleConfirmChecksClick = () => {
    const confirmChecks = async () => {
      const res = await axios.post(
        API_URL + 'trainer/checks/setConfirmed',
        {
          confirmed: [...selectedRows],
        },
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );

      if (res) {
        console.log('check was confirmed');

        setPayments(
          payments.filter((payment) => !selectedRows.includes(payment.id))
        );
      } else {
        console.log('check wasnt confrimed');
      }
    };

    confirmChecks();
  };

  return (
    <>
      <ControlsPanel
        title={'Присланные чеки'}
        actionTitle={'Подтвердить'}
        onBack={null}
        onAction={handleConfirmChecksClick}
        labelData={labelData}
      />
      <div className={styles['table__container']}>
        {isLoading ? (
          <div className={styles['spin__container']}>
            <Spin size="large" />
          </div>
        ) : (
          <InfoTable
            layout={'payments'}
            data={payments}
            enableRowClick={false}
            onRowClick={null}
            withTicks={true}
            onRowSelectionChange={handleRowSelectionChange}
          />
        )}
      </div>
    </>
  );
};

export default PaymentsTable;
