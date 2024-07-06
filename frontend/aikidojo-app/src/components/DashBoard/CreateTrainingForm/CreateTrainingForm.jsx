import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Button, Input, Dropdown, Space, notification } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { getToken } from '../../../utils/authToken';
import { API_URL } from '../../../constants/api';
import { getApiResource } from '../../../utils/network';
import styles from './CreateTrainingForm.module.css';

const CreateTrainingForm = ({ onBack }) => {
  const [formData, setFormData] = useState(null);
  const [dropdownMenuItems, setDropdownMenuItems] = useState(null);

  let items = [];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await getApiResource(API_URL + 'trainer/groups', {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        });

        if (res) {
          console.log(res);

          const fetchedGroups = res;
          let mappedGroups = fetchedGroups.map((group) => {
            return {
              key: group.id,
              label: group.title,
            };
          });

          setDropdownMenuItems(mappedGroups);

          console.log(items);
        } else {
          console.log('error setting groups');
        }
      } catch (error) {
        notification.error({ message: 'Ошибка при загрузке групп' });
      }
    };

    fetchGroups();
  }, []);

  const handleDropdownChange = async (e) => {
    // const { label } = e.target;
    console.log(dropdownMenuItems[+e.key - 1]);

    setFormData({
      ...formData,
      group: +e.key,
    });
  };

  const handleInputChange = async (e) => {
    const { id, value } = e.target;

    console.log(id, value);

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const menuProps = {
    items: dropdownMenuItems,
    selectable: true,
    onClick: handleDropdownChange,
  };

  const handleCreatePractice = async () => {
    if (formData && formData.group) {
      const date = formData['date-day']; // Дата в формате "DD.MM.YYYY"
      const time = formData['date-start-time']; // Время в формате "HH:mm"

      const dateTimeString = `${date} ${time}`;
      const parsedDateTime = dayjs(dateTimeString, 'DD.MM.YYYY HH:mm');
      const formattedDateTime = parsedDateTime.format('YYYY-MM-DDTHH:mm:ss');

      const newPractice = {
        price: 300,
        date: formattedDateTime,
        duration: formData.duration,
        group: formData.group,
      };

      try {
        const res = await axios.post(
          API_URL + `trainer/groups/${formData.group}/practices`,
          newPractice,
          {
            headers: {
              Authorization: `Token ${getToken()}`,
            },
          }
        );

        if (res) {
          console.log('Тренировка успешно создана');
          notification.success({ message: 'Тренировка успешно создана' });
          onBack();
        } else {
          notification.error({ message: 'Тренировку создать не получилось' });
        }
      } catch (error) {
        notification.error({ message: 'Ошибка при создании тренировки' });
      }
    } else {
      notification.warning({ message: 'Выберите группу' });
    }
  };

  return (
    <>
      <ControlsPanel
        title={'Планирование новой тренировки'}
        actionTitle={null}
        onBack={onBack}
        onAction={null}
        labelData={null}
      />

      {/* // форма */}
      <div className={styles['create-group-form__container']}>
        <form>
          <div className={styles['create-group-form__container__inner']}>
            <div className={styles['form-input__row']}>
              <div className={styles['form-input']}>
                <label htmlFor="date-day">Дата*</label>
                <Input
                  id="date-day"
                  size="large"
                  placeholder="дд.мм.гггг"
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles['form-input']}>
                <label htmlFor="date-start-time">Время начала*</label>
                <Input
                  id="date-start-time"
                  size="large"
                  placeholder="чч:мм"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles['form-input__row']}>
              <div className={styles['form-input']}>
                <label htmlFor="duration">Длительность занятия*</label>
                <Input
                  id="duration"
                  size="large"
                  placeholder="В минутах"
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles['form-input']}>
                <label htmlFor="group">Группа*</label>
                <br />
                <Dropdown menu={menuProps}>
                  <Button size="large">
                    <Space>
                      Группа
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className={styles['form-buttons__container']}>
            <div className={styles['form-buttons__container__inner']}>
              <Button size="large">Отменить</Button>
              <Button
                size="large"
                type="primary"
                onClick={handleCreatePractice}
              >
                Создать
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTrainingForm;
