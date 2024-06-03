import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Input, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ControlsPanel from "../ControlsPanel/ControlsPanel";
import { PROTOCOL, HOST, MEDIA, MEDIA_PATH, API_URL } from "../../../constants/api";
import { getToken } from "../../../utils/authToken";

import styles from "./CreateGroupForm.module.css";

const onMenuClick = (e) => {
  console.log("click", e);
};

const formatPlacesData = (fetchedPlacesData) => {
  const formattedPlacesData = [];

  for (const place of fetchedPlacesData) {
    const placeItem = {
      key: place.id,
      label: place.address,
    };

    formattedPlacesData.push(placeItem);
  }

  return formattedPlacesData;
} 



const CreateGroupForm = ({ onBack }) => {

let addressItems;


const handleDropdownChange = async (e) => {
  // const { label } = e.target;
  console.log(addressItems[+e.key - 1]);

  setFormData({
    ...formData,
    place: +e.key
  });
}

const handleInputChange = async (e) => {
  const { id, value } = e.target;

  console.log(id, value)

  setFormData({
    ...formData,
    [id]: value 
  });
}



const menuProps = {
  items: addressItems,
  selectable: true,
  onClick: handleDropdownChange
}

const getPlaces = async () => {
  const res = await axios.get(
    API_URL + `trainer/places`,
    {
      headers: {
        Authorization: `Token ${getToken()}`
      }
    }
  );

  if (res) {
    console.log(res.data)
    addressItems = formatPlacesData(res.data);

    menuProps.items = addressItems;

    console.log(addressItems);
    
  } else {
    console.log('ERROR FETCHING PLACES');
  }
};

  useEffect(() => {getPlaces()}, []);
  
  

  const [formData, setFormData] = useState(null);

  

  


  const handleCreateGroup = async () => {
    console.log(formData)

    const res = await axios.post( // API_URL + `trainer/groups`
      API_URL + `trainer/groups`,
      formData,
      {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    );

    if (res) {
      console.log('Группа успешно создана');
      onBack();
    } else {
      console.log('Группу создать не получилось')
    }
  }

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
                <label htmlFor="title">Название*</label>
                <Input 
                  id="title" 
                  size="large" 
                  placeholder="Группа 1" 
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles["form-input"]}>
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

          <div className={styles["form-buttons__container"]}>
            <div className={styles["form-buttons__container__inner"]}>
              <Button size="large">Отменить</Button>
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
  testProp: PropTypes.string,
};

export default CreateGroupForm;
