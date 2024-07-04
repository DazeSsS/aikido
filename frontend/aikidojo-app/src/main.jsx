import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './containers/App/App'
import './index.css'
import MainLayout from './layouts/MainLayout/MainLayout'
import ProfilePage from './containers/ProfilePage/ProfilePage'
import DashBoard from './containers/DashBoard/DashBoard'
import LoginPage from './containers/LoginPage/LoginPage'
import { TrainerApp } from './containers/App/App'
import Layout from './layouts/DashBoard/Layout'
import AllStudentsTable from './components/DashBoard/AllStudentsTable/AllStudentsTable'
import AttendanceTable from './components/DashBoard/AttendanceTable/AttendanceTable'
import ScheduleContent from './components/DashBoard/ScheduleContent/ScheduleContent'
import GroupsTable from './components/DashBoard/GroupsTable/GroupsTable'
import PaymentsTable from './components/DashBoard/PaymentsTable/PaymentsTable'

import GroupsContent from './components/DashBoard/GroupsContent/GroupsContent'
import StudentsContent from './components/DashBoard/StudentsContent/StudentsContent'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "trainer",
        element:  <MainLayout view='trainer' />,
        children: [
              {
                path: 'profile',
                element: <ProfilePage view={'trainer'}/>
              },
              {
                path: 'dashboard',
                element: <Layout view='trainer' />,
                children: [
                  {
                    path: 'dashboard',
                    element: <DashBoard view={'trainer'}/>
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
                  }
                ]
              },
          
          // {
          //   path: '/login',
          //   element: <LoginPage />
          // },
          // {
          //   path: '/profile',
          //   element: <ProfilePage />
          // }
        ]
      },
      {
        path: 'student',
        element: <MainLayout view='student' />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage view={'student'}/>
          },
          {
            path: 'dashboard',
            element: <Layout view='student' />,
            children: [
              {
                path: 'dashboard',
                element: <DashBoard view={'student'}/>
              },
              {
                path: 'schedule-future',
                element: <ScheduleContent view={'student'} scheduleView={'schedule'}/>,
              },
              {
                path: 'schedule-past',
                element: <ScheduleContent view='student' scheduleView='student-attendance' />,
              }
            ]
          },
        ]
      },
      {
        path: 'login',
        element: <LoginPage />
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
