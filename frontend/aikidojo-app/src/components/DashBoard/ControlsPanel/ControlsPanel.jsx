import PropTypes from "prop-types";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./ControlsPanel.module.css";

const ControlsPanel = ({ title, actionTitle, onBack, onAction, labelData, withArrows, onLeftArrowClick, onRightArrowClick }) => {
  return (
    <>
      <div className={styles["section-button__container"]}>
        <div className={styles["section-button__container__inner"]}>
          {onBack ? (
            <div className={styles["title-with-button__container"]}>
              <Button size="large" onClick={() => onBack()}>
                назад
              </Button>
              <div className={styles['title__container']}>
                <h3>{title}</h3>
              </div>
              
            </div>
          ) : (
            <>
            <div className={styles['title__container']}>
              <h3>{title}</h3>
              {withArrows && (
                <div className={styles['arrows_container']}>
                  <div className={styles['arrow']} onClick={onLeftArrowClick}>
                    <LeftOutlined />
                  </div>
                  <div className={styles['arrow']} onClick={onRightArrowClick}>
                    <RightOutlined />
                  </div>
                </div>
              )}
            </div>
            </>
          )}

          {actionTitle && (
            <Button
              className={styles["section-button"]}
              type="primary"
              size="large"
              onClick={() => onAction()}
            >
              {actionTitle}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

ControlsPanel.propTypes = {
  testProp: PropTypes.string,
};

export default ControlsPanel;
