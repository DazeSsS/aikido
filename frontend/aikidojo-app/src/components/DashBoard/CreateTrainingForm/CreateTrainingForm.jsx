import PropTypes from "prop-types";
import axios from "axios";
import { Button, Input, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ControlsPanel from "../ControlsPanel/ControlsPanel";
import { getToken } from "../../../utils/authToken";
import styles from "./CreateTrainingForm.module.css";


const onMenuClick = (e) => {
  console.log("click", e);
};

const items = [
  {
    key: "1",
    label: "Врослая",
  },
  {
    key: "2",
    label: "Детская",
  },
];

const addressItems = [
  {
    key: "4",
    label: "Денисова-Уральского 5а, зал 1",
  },
  {
    key: "5",
    label: "Денисова-Уральского 7, главный зал",
  },
];

const menuProps = {
  firstProp: {
    items,
    selectable: true,
    onClick: onMenuClick,
  },
  secondProp: {
    items: addressItems,
    selectable: true,
    onClick: () => console.log(),
  },
};

const CreateTrainingForm = ({ onBack }) => {


  const handleCreatePractice = async () => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/trainer/groups/1/practices",
      {
        price: 300,
        date: "2024-05-21T12:00",
        duration: 60,
        group: 1
      },
      {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    );

    if (res) {
      console.log('Тренировка успешно создана');
      onBack();
    } else {
      console.log('Тренировку создать не получилось')
    }
  };
  
  return (
    <>
      <ControlsPanel
        title={"Планирование новой тренировки"}
        actionTitle={null}
        onBack={onBack}
        onAction={null}
        labelData={null}
      />

      {/* // форма */}
      <div className={styles["create-group-form__container"]}>
        <form>
          <div className={styles["create-group-form__container__inner"]}>
            <div className={styles["form-input__row"]}>
              <div className={styles["form-input"]}>
                <label htmlFor="group-name">Дата*</label>
                <Input 
                  id="group-name" 
                  size="large" 
                  placeholder="дд.мм.гггг" 
                />
              </div>

              <div className={styles["form-input"]}>
                <label htmlFor="group-name">Время начала*</label>
                <Input 
                  id="group-name" 
                  size="large" 
                  placeholder="чч:мм" 
                />
              </div>

              <div className={styles["form-input"]}>
                <label htmlFor="group-name">Комментарий</label>
                <Input 
                  id="group-name" 
                  size="large" 
                  placeholder="Особые замечания" 
                />
              </div>

              {/* <div className={styles["form-input"]}>
                <label htmlFor="group-name">Место проведения*</label>
                <br />
                <Dropdown menu={menuProps.secondProp}>
                  <Button size="large">
                    <Space>
                      Адрес
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div> */}
            </div>

            <div className={styles["form-input__row"]}>
              <div className={styles["form-input"]}>
                <label htmlFor="group-name">Место проведения*</label>
                <Input 
                  id="group-name" 
                  size="large" 
                  placeholder="Адрес" 
                />
              </div>

              <div className={styles["form-input"]}>
                <label htmlFor="group-name">Длительность занятия*</label>
                <Input 
                  id="group-name" 
                  size="large" 
                  placeholder="В минутах" 
                />
              </div>

              <div className={styles["form-input"]}>
                <label htmlFor="group-name">Группа*</label>
                <br />
                <Dropdown menu={menuProps.secondProp}>
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

          <div className={styles["form-buttons__container"]}>
            <div className={styles["form-buttons__container__inner"]}>
              <Button size="large">Отменить</Button>
              <Button size="large" type="primary" onClick={handleCreatePractice}>
                Создать
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

CreateTrainingForm.propTypes = {
  testProp: PropTypes.string,
};

export default CreateTrainingForm;
