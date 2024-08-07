import classNames from 'classnames';
import { Button, Input } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './ControlsPanel.module.css';

const ControlsPanel = ({
  title,
  actionTitle,
  deleteActionTitle,
  onBack,
  onAction,
  onDeleteAction,
  labelData,
  onGetCurrentWeekClick,
  withArrows,
  onLeftArrowClick,
  onRightArrowClick,
  leftArrowState,
  rightArrowState,
  onSearchBarAction,
}) => {
  return (
    <>
      <div className={styles['section-button__container']}>
        <div className={styles['section-button__container__inner']}>
          {onBack ? (
            <div className={styles['title-with-button__container']}>
              <Button size="large" onClick={() => onBack()}>
                назад
              </Button>
              <div className={styles['title__container']}>
                <h3>{title}</h3>
              </div>
            </div>
          ) : (
            <>
              <div
                className={
                  labelData
                    ? styles['label__container']
                    : styles['title__container__wrapper']
                }
              >
                <div className={styles['title__container']}>
                  <h3>{title}</h3>
                  {withArrows && (
                    <div className={styles['arrows_container']}>
                      <div
                        className={
                          leftArrowState !== null
                            ? classNames(styles['arrow'], {
                                [styles['blocked']]: leftArrowState == 0,
                              })
                            : classNames(styles['arrow'])
                        }
                        onClick={onLeftArrowClick}
                      >
                        {console.log()}
                        <LeftOutlined />
                      </div>
                      <div
                        className={
                          rightArrowState !== null
                            ? classNames(styles['arrow'], {
                                [styles['blocked']]: rightArrowState == 0,
                              })
                            : classNames(styles['arrow'])
                        }
                        onClick={onRightArrowClick}
                      >
                        <RightOutlined />
                      </div>
                      {onGetCurrentWeekClick && (
                        <div
                          className={styles['get-curr-week-btn']}
                          onClick={onGetCurrentWeekClick}
                        >
                          Текущая неделя
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {labelData && (
                  <div className={styles['label']}>{labelData}</div>
                )}
              </div>
            </>
          )}

          <div className={styles['searchbar-and-button__container']}>
            {onSearchBarAction && (
              <Input
                className={styles['searchbar']}
                id="name"
                size="large"
                placeholder="ФИО"
                onChange={onSearchBarAction}
              />
            )}
            {deleteActionTitle && (
              <Button
                className={styles['section-button']}
                type="primary"
                size="large"
                onClick={() => onDeleteAction()}
                style={{ backgroundColor: '#F5222D' }}
              >
                {deleteActionTitle}
              </Button>
            )}
            {actionTitle && (
              <Button
                className={styles['section-button']}
                type="primary"
                size="large"
                onClick={() => onAction()}
              >
                {actionTitle}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlsPanel;
