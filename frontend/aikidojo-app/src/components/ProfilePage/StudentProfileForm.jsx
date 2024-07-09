import PropTypes from 'prop-types';
import axios from 'axios';
import { Input, Button, Upload, notification } from 'antd';
import { useState } from 'react';
import styles from './StudentProfileForm.module.css';
import { API_URL, GOOGLE } from '../../constants/api';
import { getToken, getUserId } from '../../utils/authToken';

const StudentProfileForm = ({ view, data, hasToken, onSubmition }) => {
  const [formData, setFormData] = useState({
    full_name: data.full_name,
    email: data.email,
    date_of_birth: data.date_of_birth,
    gender: data.gender,
    contact: data.phone_number,
    photo: data?.photo,
  });

  const handleUpload = async () => {
    try {
      const formData2 = new FormData();
      formData2.append('file', formData.newfile);
      formData2.append('amount', formData.amount);

      console.log();
      const res = await axios.post(API_URL + 'student/checks', formData2, {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });

      if (res) {
        console.log('succesffuly added check');
        notification.success({ message: 'Чек успешно загружен' });
        onSubmition();
      } else {
        console.log('nope./');
        notification.error({ message: 'Не удалось загрузить чек' });
      }
    } catch (error) {
      notification.error({ message: 'Ошибка при отправке чека' });
    }
  };

  const handleChange = async (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value || data[id],
    });

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedData = {
      first_name: formData.full_name?.split(' ')[1],
      middle_name: formData.full_name?.split(' ')[2],
      last_name: formData.full_name?.split(' ')[0],
      date_of_birth: formData.date_of_birth,
      email: formData.email,
      gender: formData.gender === 'М' ? 'male' : 'female',
      parents: [
        {
          id: '3',
          first_name: 'Danzel',
          contact: formData.contact,
        },
      ],
      phone_number: formData.contact,
      contact: formData.contact,
    };

    console.log(formData);
    console.log(editedData);

    handleEditUser(editedData);
  };

  const handleEditUser = async (editedData) => {
    const res = await axios.patch(API_URL + 'me', editedData, {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });

    if (res) {
      console.log('Успешно');
      onSubmition();
    } else {
      console.log('Не успешно');
    }
  };

  return (
    <>
      <form>
        {view === 'trainer' ? (
          <>
            <div className={styles['user-info__container']}>
              <div className={styles['user-info-row__container']}>
                <div className={styles['user-info-row__input']}>
                  <label htmlFor="full_name">ФИО</label>
                  <Input
                    id="full_name"
                    placeholder={data.fullname}
                    size="large"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles['user-info-row__input']}>
                  <label htmlFor="email">Эл. почта</label>
                  <Input
                    id="email"
                    placeholder={data.email}
                    size="large"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles['decorative-line']}></div>

              <div className={styles['user-info-row__container']}>
                <div className={styles['user-info-row__input']}>
                  <label htmlFor="date_of_birth">Дата рождения</label>
                  <Input
                    id="date_of_birth"
                    placeholder={data.date_of_birth || 'гггг-мм-дд'}
                    size="large"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles['user-info-row__input']}>
                  <label htmlFor="gender">Пол</label>
                  <Input
                    id="gender"
                    placeholder={data.gender}
                    size="large"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles['decorative-line']}></div>

              <div className={styles['user-info-row__container']}>
                <div className={styles['user-info-row__input']}>
                  <label htmlFor="contact">Номер телефона</label>
                  <Input
                    id="contact"
                    placeholder={data.contact || 'Нет данных'}
                    size="large"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles['user-info-row__input']}>
                  <span htmlFor="contact">Привязка Google Calendar</span>
                  <a href={`${GOOGLE}${getUserId()}`}>
                    <Button type="primary" disabled={hasToken} size="large">
                      {console.log(hasToken)}
                      {hasToken ? 'Привязан' : 'Привязать'}
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <div className={styles['decorative-line']}></div>

            <div className={styles['avatar-upload__container']}>
              <Upload
                name="photo"
                listType="picture-card"
                style={{ display: 'block' }}
                action={API_URL + 'me'}
                headers={{ Authorization: `Token ${getToken()}` }}
                method="PATCH"
              >
                Загрузить аватар
              </Upload>
            </div>
          </>
        ) : (
          <>
            <div className={styles['add-check__input']}>
              <label htmlFor="amount">
                {data.debt > 0
                  ? `Задолженность: ${data.debt} руб.`
                  : `Баланс: ${data.balance} руб.`}
              </label>
              <Input
                id="amount"
                placeholder="Введите сумму"
                size="large"
                onChange={handleChange}
              />
              <div className={styles['check-upload__container']}>
                <Upload
                  name="photo"
                  listType="picture-card"
                  style={{ display: 'block' }}
                  beforeUpload={(file) => {
                    setFormData({ ...formData, newfile: file });
                    return false;
                  }}
                >
                  Загрузить чек
                </Upload>
              </div>
              <Button type="primary" size="large" block onClick={handleUpload}>
                Отправить чек об оплате
              </Button>
            </div>

            <div className={styles['user-info__container']}>
              <div className={styles['user-info-row__container']}>
                <div className={styles['user-info-row__input']}>
                  <label htmlFor="full_name">ФИО</label>
                  <Input
                    id="full_name"
                    placeholder={data.fullname}
                    size="large"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles['user-info-row__input']}>
                  <label htmlFor="email">Эл. почта</label>
                  <Input
                    id="email"
                    placeholder={data.email}
                    size="large"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles['decorative-line']}></div>

              <div className={styles['user-info-row__container']}>
                <div className={styles['user-info-row__input']}>
                  <label htmlFor="date_of_birth">Дата рождения</label>
                  <Input
                    id="date_of_birth"
                    placeholder={data.date_of_birth}
                    size="large"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles['user-info-row__input']}>
                  <label htmlFor="gender">Пол</label>
                  <Input
                    id="gender"
                    placeholder={data.gender}
                    size="large"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles['decorative-line']}></div>

            <div className={styles['user-parent-info__container']}>
              <div className={styles['user-info-row__container']}>
                <div className={styles['user-info-row__input']}>
                  <label htmlFor="parent_full_name">ФИО родителя</label>
                  <Input
                    id="parent_full_name"
                    placeholder={data.parent_name}
                    size="large"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles['user-info-row__input']}>
                  <label htmlFor="parent_contact">
                    Номер телефона родителя
                  </label>
                  <Input
                    id="contact"
                    placeholder={data.parent_contact}
                    size="large"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles['decorative-line']}></div>
            </div>

            <div className={styles['avatar-upload__container']}>
              <Upload
                name="photo"
                listType="picture-card"
                style={{ display: 'block' }}
                action={API_URL + 'me'}
                headers={{ Authorization: `Token ${getToken()}` }}
                method="PATCH"
              >
                Загрузить аватар
              </Upload>
            </div>
          </>
        )}

        <div className={styles['form-buttons__container']}>
          <Button size="large">Отмена</Button>
          <Button type="primary" size="large" onClick={handleSubmit}>
            Сохранить изменения
          </Button>
        </div>
      </form>
    </>
  );
};

StudentProfileForm.propTypes = {
  testProp: PropTypes.string,
};

export default StudentProfileForm;
