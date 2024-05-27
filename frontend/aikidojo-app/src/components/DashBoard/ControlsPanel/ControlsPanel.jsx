import PropTypes from "prop-types";
import { Button } from "antd";
import styles from "./ControlsPanel.module.css";

const ControlsPanel = ({ title, actionTitle, onBack, onAction, labelData }) => {
  return (
    <>
      <div className={styles["section-button__container"]}>
        <div className={styles["section-button__container__inner"]}>
          {onBack ? (
            <div className={styles["title-with-button__container"]}>
              <Button size="large" onClick={() => onBack()}>
                назад
              </Button>
              <h3>{title}</h3>
            </div>
          ) : (
            <h3>{title}</h3>
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
