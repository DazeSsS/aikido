import PropTypes from 'prop-types';

import { Button, Input, Dropdown , Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './CreateGroupForm.module.css';


const onMenuClick = (e) => {
    console.log('click', e);
  };

const items = [
    {
        key: '1',
        label: 'Врослая'
    },
    {
        key: '2',
        label: 'Детская'
    }
];

const addressItems = [
    {
        key: '1',
        label: 'Денисова-Уральского 5а, зал 1'
    },
    {
        key: '2',
        label: 'Денисова-Уральского 7, главный зал'
    },
    {
        key: '3',
        label: 'ФОК'
    }
];

const menuProps = {
    items,
    onClick: onMenuClick,
  };

const addressMenuProps = {
    addressItems,
    onClick: onMenuClick,
}


const CreateGroupForm = ({ onBack }) => {
    return (
        <>  
            <div className={styles['section-button__container']}>
                <div className={styles['section-button__container__inner']}>
                    <div className={styles['title-with-button__container']}>
                        <Button size="large" onClick={() => onBack()}>назад</Button>
                        <h3>Создание группы</h3>
                    </div>
                </div>
            </div>

            {/* // форма */}
            <div className={styles['create-group-form__container']}>
                <form>
                    <div className={styles['create-group-form__container__inner']}>
                        <div className={styles['form-input__row']}>
                            <div className={styles['form-input']}>
                                <label htmlFor="group-name">Название*</label>
                                <Input 
                                    id="group-name"
                                    size="large"
                                    placeholder="Группа 1"
                                />
                            </div>
                            
                            <div className={styles['form-input']}>
                                <label htmlFor="group-name">ФИО тренера*</label>
                                <Input 
                                    id="group-name"
                                    size="large"
                                    placeholder="О'сэнсей Морихэй Уэсиба"
                                />
                            </div>

                            <div className={styles['form-input']}>
                                <label htmlFor="group-name">Ранг*</label>
                                <Input 
                                    id="group-name"
                                    size="large"
                                    placeholder="6 Кю"
                                />
                            </div>
                            

                        </div>

                        <div className={styles['form-input__row']}>
                            <div className={styles['form-input']}>
                                <label htmlFor="group-name">Максимальное количество участников*</label>
                                <Input 
                                    id="group-name"
                                    size="large"
                                    placeholder="30"
                                />
                            </div>
                            
                            <div className={styles['form-input']}>
                                <label htmlFor="group-name">Категория по возрасту занимающихся*</label>
                                <br />
                                <Dropdown menu={menuProps} id="group-name">
                                    <Button size="large">
                                        <Space>
                                            Категория
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </div>

                            <div className={styles['form-input']}>
                                <label htmlFor="group-name">Место проведения*</label>
                                <br />
                                <Dropdown menu={addressMenuProps} >
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
                                <Button size="large">Отменить</Button>
                                <Button size="large" type="primary">Создать</Button>
                            </div>   
                    </div>
                </form>
            </div>
            
        </>
    )
};

CreateGroupForm.propTypes = {
    testProp: PropTypes.string
}

export default CreateGroupForm;