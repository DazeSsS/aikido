import { useState } from 'react';
import CreateTrainingForm from '../CreateTrainingForm/CreateTrainingForm';
import AttendanceTable from '../AttendanceTable/AttendanceTable';
import TrainingsSchedule from '../TrainingsSchedule/TrainingsSchedule';

const ScheduleContent = ({ view, scheduleView }) => {
  const [isCreatingTraining, setIsCreatingTraining] = useState(false);
  const [isPatchingAttendance, setIsPatchingAttendance] = useState(false);
  const [practiceId, setPracticeId] = useState(null);
  const [practiceDate, setPracticeDate] = useState(null);
  const [groupId, setGroupId] = useState(null);

  const handleCreateTrainingClick = () => {
    setIsCreatingTraining(true);
  };

  const handleOnPracticeClick = (pracId, pracDate, groupId) => {
    setIsPatchingAttendance(true);
    setPracticeId(pracId);
    setPracticeDate(pracDate);
    setGroupId(groupId);
  };

  const handleBackToTable = () => {
    setIsCreatingTraining(false);
    setIsPatchingAttendance(false);
  };

  return (
    <>
      {view === 'trainer' ? (
        isCreatingTraining ? (
          <CreateTrainingForm onBack={handleBackToTable} />
        ) : isPatchingAttendance ? (
          <AttendanceTable
            onBack={handleBackToTable}
            practiceId={practiceId}
            practiceDate={practiceDate}
            groupId={groupId}
          />
        ) : (
          <>
            <TrainingsSchedule
              onBack={handleBackToTable}
              onCreateTrainingClick={handleCreateTrainingClick}
              onPracticeClick={handleOnPracticeClick}
              view={view}
              scheduleView={scheduleView}
            />
          </>
        )
      ) : (
        <TrainingsSchedule
          onBack={handleBackToTable}
          onCreateTrainingClick={handleCreateTrainingClick}
          onPracticeClick={handleOnPracticeClick}
          view={view}
          scheduleView={scheduleView}
        />
      )}
    </>
  );
};

export default ScheduleContent;
