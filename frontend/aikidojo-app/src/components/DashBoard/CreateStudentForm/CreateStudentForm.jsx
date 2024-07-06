import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { Button, Input, Dropdown, Space, notification } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getToken } from '../../../utils/authToken';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import { API_URL } from '../../../constants/api';
import styles from './CreateStudentForm.module.css';

const items = [
  {
    key: '1',
    label: 'Врослая',
  },
  {
    key: '2',
    label: 'Детская',
  },
];

const genderItems = [
  {
    key: '1',
    label: 'Мужской',
  },
  {
    key: '2',
    label: 'Женский',
  },
];

const CreateStudentForm = ({ onBack }) => {
  const [formData, setFormData] = useState(null);

  const handleChange = async (e) => {
    const { id, value } = e.target;

    if (id === 'name') {
      console.log('changin name');
      const [last_name, first_name] = value.split(' ');

      setFormData({
        ...formData,
        first_name: first_name,
        last_name: last_name,
      });
    } else if (id === 'date_of_birth') {
      const [day, month, year] = value.split('.');
      const formattedDateOfBirth = year + '-' + month + '-' + day;

      setFormData({
        ...formData,
        date_of_birth: formattedDateOfBirth,
      });
    } else if (id === 'parent-name') {
      const [last_name, first_name] = value.split(' ');

      setFormData({
        ...formData,

        parent: {
          ...formData.parent,
          first_name: first_name,
          last_name: last_name,
        },
      });
      console.log(formData.parent);
    } else if (id === 'parent-contact') {
      setFormData({
        ...formData,
        parent: {
          ...formData.parent,
          contact: value,
        },
      });
      console.log(formData.parent);
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleDropdownChange = async (e) => {
    setFormData({
      ...formData,
      gender: genderItems[+e.key - 1].label === 'Мужской' ? 'male' : 'female',
    });
  };

  const menuProps = {
    firstProp: {
      items,
      selectable: true,
      onClick: handleDropdownChange,
    },
    secondProp: {
      items: genderItems,
      selectable: true,
      onClick: handleDropdownChange,
    },
  };

  const handleCreateStudent = async () => {
    console.log(formData);

    try {
      const studentCreationRes = await axios.post(
        API_URL + 'trainer/students',
        formData,
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );

      if (studentCreationRes.data) {
        formData.parent.childs = [studentCreationRes.data.id];

        const parentCreationRes = await axios.post(
          API_URL + 'parents',
          formData.parent,
          {
            headers: {
              Authorization: `Token ${getToken()}`,
            },
          }
        );

        if (parentCreationRes) {
          console.log('student successfully created');
          notification.success({
            message:
              'Ученик успешно создан, учетные данные отправлены на его почту',
          });
          onBack();
        } else {
          notification.error({ message: 'Не удалось создать ученика' });
        }
      } else {
        notification.error({ message: 'Не удалось создать ученика' });
      }
    } catch (error) {
      notification.error({ message: 'Ошибка при создании ученика' });
    }
  };

  return (
    <>
      <ControlsPanel
        title={'Регистрация нового ученика'}
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
                <label htmlFor="name">ФИО ребенка*</label>
                <Input
                  id="name"
                  size="large"
                  placeholder="Иванов Иван Иванович"
                  onChange={handleChange}
                />
              </div>

              <div className={styles['form-input']}>
                <label htmlFor="date_of_birth">Дата рождения ребенка*</label>
                <Input
                  id="date_of_birth"
                  size="large"
                  placeholder="В формате дд.мм.гггг"
                  onChange={handleChange}
                />
              </div>

              <div className={styles['form-input']}>
                <label htmlFor="email">Эл. почта*</label>
                <Input
                  id="email"
                  size="large"
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles['form-input__row']}>
              <div className={styles['form-input']}>
                <label htmlFor="parent-name">ФИО родителя*</label>
                <Input
                  id="parent-name"
                  size="large"
                  placeholder="Иванов Иван Иванович"
                  onChange={handleChange}
                />
              </div>

              <div className={styles['form-input']}>
                <label htmlFor="parent-contact">Номер телефона родителя*</label>
                <Input
                  id="parent-contact"
                  size="large"
                  placeholder="Начиная с 8"
                  onChange={handleChange}
                />
              </div>

              <div className={styles['form-input']}>
                <label htmlFor="gender">Пол ребенка*</label>
                <br />
                <Dropdown menu={menuProps.secondProp}>
                  <Button size="large">
                    <Space>
                      Пол
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
              <Button size="large" type="primary" onClick={handleCreateStudent}>
                Создать
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

CreateStudentForm.propTypes = {
  testProp: PropTypes.string,
};

export default CreateStudentForm;
