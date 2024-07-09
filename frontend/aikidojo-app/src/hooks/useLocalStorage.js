import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, setUserRole as updateUserRole } from '../utils/authToken';

export const useLocalStorage = () => {
  const [userRole, setUserRole] = useState(getUserRole());
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole) {
      navigate('/login');
    } else {
      if (userRole === 'trainer') {
        navigate('/trainer/dashboard/groups');
      } else if (userRole === 'student') {
        navigate('/student/dashboard/schedule-future');
      }
    }
  }, [userRole]);
};
