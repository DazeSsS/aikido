import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './containers/App/App';
import MainLayout from './layouts/MainLayout/MainLayout';
import Layout from './layouts/DashBoard/Layout';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import RegistrationPage from './containers/RegistrationPage/RegistrationPage';
import LoginPage from './containers/LoginPage/LoginPage';
import DashBoard from './containers/DashBoard/DashBoard';
import ScheduleContent from './components/DashBoard/ScheduleContent/ScheduleContent';
import PaymentsTable from './components/DashBoard/PaymentsTable/PaymentsTable'; // поменять на paymentscontent!!!!!!!!!!
import GroupsContent from './components/DashBoard/GroupsContent/GroupsContent';
import StudentsContent from './components/DashBoard/StudentsContent/StudentsContent';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'trainer',
        element: <MainLayout view="trainer" />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage view={'trainer'} />,
          },
          {
            path: 'dashboard',
            element: <Layout view="trainer" />,
            children: [
              {
                path: 'dashboard',
                element: <DashBoard view={'trainer'} />,
              },
              {
                path: 'groups',
                element: <GroupsContent />,
              },
              {
                path: 'schedule',
                element: <ScheduleContent view={'trainer'} />,
              },
              {
                path: 'students',
                element: <StudentsContent />,
              },
              {
                path: 'checks',
                element: <PaymentsTable />,
              },
            ],
          },
        ],
      },
      {
        path: 'student',
        element: <MainLayout view="student" />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage view={'student'} />,
          },
          {
            path: 'dashboard',
            element: <Layout view="student" />,
            children: [
              {
                path: 'dashboard',
                element: <DashBoard view={'student'} />,
              },
              {
                path: 'schedule-future',
                element: (
                  <ScheduleContent view={'student'} scheduleView={'schedule'} />
                ),
              },
              {
                path: 'schedule-past',
                element: (
                  <ScheduleContent
                    view="student"
                    scheduleView="student-attendance"
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegistrationPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
