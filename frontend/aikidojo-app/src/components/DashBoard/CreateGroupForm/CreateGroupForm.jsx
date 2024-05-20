import PropTypes from "prop-types";

import { Button, Input, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ControlsPanel from "../ControlsPanel/ControlsPanel";

import styles from "./CreateGroupForm.module.css";

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

const CreateGroupForm = ({ onBack }) => {
  return (
    <>
      <ControlsPanel
        title={"Создание группы"}
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
                <label htmlFor="group-name">Название*</label>
                <Input id="group-name" size="large" placeholder="Группа 1" />
              </div>

              <div className={styles["form-input"]}>
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
              </div>
            </div>
          </div>

          <div className={styles["form-buttons__container"]}>
            <div className={styles["form-buttons__container__inner"]}>
              <Button size="large">Отменить</Button>
              <Button size="large" type="primary">
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
  testProp: PropTypes.string,
};

export default CreateGroupForm;
