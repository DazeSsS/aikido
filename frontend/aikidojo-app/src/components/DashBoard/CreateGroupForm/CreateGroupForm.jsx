import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Input, Dropdown, Space, notification } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { API_URL } from '../../../constants/api';
import { getToken } from '../../../utils/authToken';

import styles from './CreateGroupForm.module.css';

const formatPlacesData = (fetchedPlacesData) => {
  return fetchedPlacesData.map((place) => ({
    key: place.id.toString(),
    label: place.address,
  }));
};

const CreateGroupForm = ({ onBack }) => {
  const [addressItems, setAddressItems] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(API_URL + 'trainer/places', {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        });

        if (res) {
          const formattedPlaces = formatPlacesData(res.data);
          setAddressItems(formattedPlaces);
        } else {
          console.log('ERROR FETCHING PLACES');
        }
      } catch (error) {
        console.error('Failed to fetch places', error);
        notification.error({ message: 'Ошибка при загрузке мест' });
      }
    };

    fetchPlaces();
  }, []);

  const handleDropdownChange = (e) => {
    setFormData({
      ...formData,
      place: +e.key,
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleCreateGroup = async () => {
    try {
      const res = await axios.post(API_URL + 'trainer/groups', formData, {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });

      if (res) {
        notification.success({ message: 'Группа успешно создана' });
        onBack();
      } else {
        notification.error({ message: 'Не удалось создать группу' });
      }
    } catch (error) {
      console.error('Failed to create group', error);
      notification.error({ message: 'Ошибка при создании группы' });
    }
  };

  const menuProps = {
    items: addressItems,
    selectable: true,
    onClick: handleDropdownChange,
  };

  return (
    <>
      <ControlsPanel
        title={'Создание группы'}
        actionTitle={null}
        onBack={onBack}
        onAction={null}
        labelData={null}
      />

      <div className={styles['create-group-form__container']}>
        <form>
          <div className={styles['create-group-form__container__inner']}>
            <div className={styles['form-input__row']}>
              <div className={styles['form-input']}>
                <label htmlFor="title">Название*</label>
                <Input
                  id="title"
                  size="large"
                  placeholder="Группа 1"
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles['form-input']}>
                <label htmlFor="address">Место проведения*</label>
                <br />
                <Dropdown id="address" menu={menuProps}>
                  <Button size="large">
                    <Space>
                      Адрес
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className={styles['form-buttons__container']}>
            <div className={styles['form-buttons__container__inner']}>
              <Button size="large" onClick={onBack}>
                Отменить
              </Button>
              <Button size="large" type="primary" onClick={handleCreateGroup}>
                Создать
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

CreateGroupForm.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default CreateGroupForm;
