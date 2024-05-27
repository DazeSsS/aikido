import PropTypes from "prop-types";
import axios from "axios";
import { Input, Button, Upload } from "antd";
import { useState } from "react";
import styles from "./StudentProfileForm.module.css";
import { getToken } from "../../utils/authToken";

const StudentProfileForm = ({ view, data, onSubmition }) => {
  const [formData, setFormData] = useState({
    full_name: data.full_name,
    email: data.email,
    date_of_birth: data.date_of_birth,
    gender: data.gender,
    parent_name: data.parent_name,
    parent_contact: data.parent_contact,
    contact: data.contact,
    photo: data?.photo
  });

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
      first_name: formData.full_name?.split(" ")[0],
      middle_name: formData.full_name?.split(" ")[1],
      last_name: formData.full_name?.split(" ")[2],
      date_of_birth: formData.date_of_birth,
      gender: formData.gender === "М" ? "male" : "female",
      parent_name: formData.parent_name,
      contact: formData.contact,
      parent_contact: formData.parent_contact,
    };

    console.log(formData);
    console.log(editedData);

    handleEditUser(editedData);
  };

  const handleEditUser = async (editedData) => {
    const res = await axios.patch(
      "http://localhost:8000/api/v1/me",
      editedData,
      {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    );

    if (res) {
      console.log("Успешно");
      onSubmition();
    } else {
      console.log("Не успешно");
    }
  };

  return (
    <>
      <form>
        {view === "trainer" ? (
          <>
            <div className={styles["user-info__container"]}>
              <div className={styles["user-info-row__container"]}>
                <div className={styles["user-info-row__input"]}>
                  <label htmlFor="full_name">ФИО</label>
                  <Input
                    id="full_name"
                    placeholder={data.fullname}
                    size="large"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles["user-info-row__input"]}>
                  <label htmlFor="email">Эл. почта</label>
                  <Input 
                    id="email" 
                    placeholder={data.email} 
                    size="large" 
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles["decorative-line"]}></div>

              <div className={styles["user-info-row__container"]}>
                <div className={styles["user-info-row__input"]}>
                  <label htmlFor="date_of_birth">Дата рождения</label>
                  <Input
                    id="date_of_birth"
                    placeholder={data.date_of_birth}
                    size="large"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles["user-info-row__input"]}>
                  <label htmlFor="gender">Пол</label>
                  <Input 
                    id="gender" 
                    placeholder={data.gender} 
                    size="large" 
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles["decorative-line"]}></div>

              <div className={styles["user-info-row__container"]}>
                <div className={styles["user-info-row__input"]}>
                  <label htmlFor="contact">Номер телефона</label>
                  <Input 
                    id="contact" 
                    placeholder={data.contact} 
                    size="large" 
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles["decorative-line"]}></div>

            <div className={styles["avatar-upload__container"]}>
              <Upload
                name="photo"
                listType="picture-card"
                style={{ display: "block" }}
                action="http://localhost:8000/api/v1/me"
                headers={{Authorization: `Token ${getToken()}`}}
                method="PATCH"
              >
                Загрузить аватар
              </Upload>
            </div>
          </>
        ) : (
          <>
            <div className={styles["add-check__input"]}>
              <label htmlFor="payment-sum">
                Задолженность: {data.debt} руб.
              </label>
              <Input
                id="payment-sum"
                placeholder="Введите сумму"
                size="large"
              />
              <Button type="primary" size="large" block>
                Отправить чек об оплате
              </Button>
            </div>

            <div className={styles["user-info__container"]}>
              <div className={styles["user-info-row__container"]}>
                <div className={styles["user-info-row__input"]}>
                  <label htmlFor="full_name">ФИО</label>
                  <Input
                    id="full_name"
                    placeholder={data.fullname}
                    size="large"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles["user-info-row__input"]}>
                  <label htmlFor="email">Эл. почта</label>
                  <Input
                    id="email"
                    placeholder={data.email}
                    size="large"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles["decorative-line"]}></div>

              <div className={styles["user-info-row__container"]}>
                <div className={styles["user-info-row__input"]}>
                  <label htmlFor="date_of_birth">Дата рождения</label>
                  <Input
                    id="date_of_birth"
                    placeholder={data.date_of_birth}
                    size="large"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles["user-info-row__input"]}>
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

            <div className={styles["decorative-line"]}></div>

            <div className={styles["user-parent-info__container"]}>
              <div className={styles["user-info-row__container"]}>
                <div className={styles["user-info-row__input"]}>
                  <label htmlFor="parent_name">ФИО родителя</label>
                  <Input
                    id="parent_name"
                    placeholder={data.parent_name}
                    size="large"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles["user-info-row__input"]}>
                  <label htmlFor="parent_contact">
                    Номер телефона родителя
                  </label>
                  <Input
                    id="parent_contact"
                    placeholder={data.parent_contact}
                    size="large"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles["decorative-line"]}></div>
            </div>

            <div className={styles["avatar-upload__container"]}>
              <Upload
                name="photo"
                listType="picture-card"
                style={{ display: "block" }}
                action="http://localhost:8000/api/v1/me"
                headers={{Authorization: `Token ${getToken()}`}}
                method="PATCH"
              >
                Загрузить аватар
              </Upload>
            </div>
          </>
        )}

        <div className={styles["form-buttons__container"]}>
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
