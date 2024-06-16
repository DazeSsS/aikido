import PropTypes from "prop-types";
import axios from "axios";
import classNames from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Spin } from "antd";
import ControlsPanel from "../ControlsPanel/ControlsPanel";
import { useState, useEffect } from "react";
import { getToken, getUserId } from "../../../utils/authToken";
import { PROTOCOL, HOST, MEDIA, MEDIA_PATH, API_URL } from "../../../constants/api";
import styles from "./TrainingsSchedule.module.css";
import { getApiResource } from "../../../utils/network";

dayjs.locale("ru");

const TrainingsSchedule = ({ onBack, onCreateTrainingClick, onPracticeClick, view, scheduleView }) => {
  console.log(scheduleView)
  const [practices, setPractices] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentScheduleView, setCurrentScheduleView] = useState('schedule');

  const startOfWeek = dayjs().startOf('week').add(currentOffset, 'week').format('DD.MM.YYYY');
  const endOfWeek = dayjs().endOf('week').add(currentOffset, 'week').format('DD.MM.YYYY');

  useEffect(() => {
    setCurrentScheduleView(scheduleView);
  }, [scheduleView]);

  const formatPracticesData = (fetchedPracticesData) => {
    let datesDict = {};
    for (let i = 0; i < 7; i++) {
      const date = dayjs().startOf('week').add(currentOffset, 'week').add(i, 'day').format('YYYY-MM-DD');
      datesDict[date] = [];
    }

    fetchedPracticesData.forEach(practice => {
      const date = dayjs(practice.date).format("YYYY-MM-DD");
      if (!datesDict[date]) {
        datesDict[date] = [];
      }
      datesDict[date].push(practice);
    });

    console.log("Dates Dict:", datesDict);
    
    return datesDict;
  };

  useEffect(() => {
    const fetchPractices = async () => {
      setIsLoading(true);
      const res = await getApiResource(
        API_URL + `${view}/practices?offset=${currentOffset}&past=${scheduleView === 'student-attendance'}`,
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );

      if (res) {
        setPractices(formatPracticesData(res));
        setTimeout(() => setIsLoading(false), 150);
      } else {
        console.log("Error getting practices");
      }
    };

    fetchPractices();
  }, [scheduleView, currentOffset]);

  const handleGetPreviousWeek = () => {
    setCurrentOffset(prevOffset => prevOffset - 1);
  };

  const handleGetNextWeek = () => {
    setCurrentOffset(prevOffset => prevOffset + 1);
  };

  return (
    <>
      <ControlsPanel 
        title={`Текущее расписание (${startOfWeek} - ${endOfWeek})`}
        actionTitle={view === "trainer" ? 'Запланировать тренировку' : null}
        onAction={onCreateTrainingClick}
        withArrows={true}
        onLeftArrowClick={handleGetPreviousWeek}
        onRightArrowClick={handleGetNextWeek}
        leftArrowState={view === "student" && scheduleView === 'schedule' ? currentOffset : null}
        rightArrowState={view === "student" && scheduleView === 'student-attendance' ? currentOffset : null}
      />
      <div className={styles['schedule__container__inner']}>
        <div className={styles["schedule-items__container-grid"]}>
          <ul className={styles["schedule-items__container"]}>
            {isLoading ? (
              <div className={styles["spin__container"]}>
                <Spin size="large" />
              </div>
            ) : (
              Object.keys(practices).length === 0 ? (<h4 className={styles['empty-alert']}>Тренировок на эту неделю нет</h4>) :
              practices &&
              Object.entries(practices).map(([date, dayPractices]) => (
                <li key={date} className={styles["schedule-item-li"]}>
                  <div 
                    className={currentScheduleView === "student-attendance" ? 
                      classNames(styles["schedule-item"], {
                        [styles['attended']]: dayPractices.every(practice => practice.attended.includes(Number(getUserId()))), 
                        [styles['missed']]: !dayPractices.every(practice => practice.attended.includes(Number(getUserId())))
                      }) 
                      : styles["schedule-item"]}
                  >
                    <h1>{dayjs(date).format("dddd, DD.MM")}</h1>
                    {dayPractices.length === 0 ? (
                      <p>Нет тренировок</p>
                    ) : (
                      dayPractices.map((practice) => (
                        <div key={practice.id} onClick={() => onPracticeClick(practice.id, dayjs(date).format("DD.MM.YYYY"), practice.group.id)} className={styles["schedule-item-practice__container"]}>
                          <div className={styles["practice-title"]}>
                            <h3>{practice.group.title}</h3>
                            <span>Общая тренировка</span>
                          </div>
                          <div className={styles["decorative-line"]}></div>
                          <div className={styles["practice-info"]}>
                            <div className={styles["practice-info-item"]}>
                              <h4>Место: </h4>
                              <h4 className={styles["practice-info-item-value"]}>
                                {practice.place.description}
                              </h4>
                            </div>
                            <div className={styles["practice-info-item"]}>
                              <h4>Время: </h4>
                              <h4 className={styles["practice-info-item-value"]}>
                                {dayjs(practice.date).format('HH:mm')} - {dayjs(practice.end_time).format('HH:mm')}
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

TrainingsSchedule.propTypes = {
  testProp: PropTypes.string,
};

export default TrainingsSchedule;
