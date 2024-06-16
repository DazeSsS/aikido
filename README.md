aikido crm system for trainers and students

final and important additions to be done:
- [ ]  add info modal (popup) about pricing
- [ ]  consider server requests refactoring (for consistency)
- [x]  redo the schedule display (all day cards of the week)
- [ ]  add return to current week button (needs button design)
- [ ]  add validation to forms
- [ ]  change authorization mechanism
- [ ]  probably remake app routing (?)
- [x]  switch student's attendance from color to icons
- [ ]  add user's balance in profile (balance if balance > 0 else debt)
- [ ]  add labels in control panel
- [ ]  add search bar to all students table
- [x]  add toasts to improve ux
- [ ]  add adaptive for mobile
- [ ]  rewrite readme
- [ ]  refactor code

- Refactoring and additions:
1) create component for toggle switch (OPTIONAL)
2) extract styles for "a" link in RegistrationForm in another class (PERHAPS NOT NEEDED)
3) extract more variables in :root 
4) extract color styles for "a" in index style file
5) restyle header and make it adaptive
6) check fonts on every page
7) extract small logic and variables in component's functional scope 
8) remove unused imports and components

- dev additions
1) add aliases
2) include classNames library
3) include propTypes library
4) create routes configuration
5) consider to create utils/services/network/constants folder
6) include mobx library


- general app components structure (not final):
    - Pages:
        1) HomePage: main app page
        2) DashboardPage: dashboard page
        3) ProfilePage: profile page
        5) RegistrationPage
        6) LoginPage
        7) Not found page

    - Header:
        1) Header: general header component

    - DashBoard:
        1) SideBar

    - SideBar:
        1) DashboardSidebar: dashboard sidebar
        2) DashboardSidebarItem: sidebar elements (Groups, Schedule, Students list, Payments)

    - Sidebar Items:
        1) GroupsContent (Trainer)
        2) ScheduleContent (Trainer / Student)
        3) StudentsContent (Trainer)
        4) PaymentsContent (Trainer)

    - GroupsContent components:
        1) GroupsTable
        2) GroupMembersTable
        3) AllStudentsTable
        4) CreateGroupForm

    - ScheduleContent (view = Trainer -> trainer can click on trainings and check attendance):
        1) TrainingsSchedule
        2) AttendanceTable
        3) CreateTrainingForm

    - ScheduleContent (view = Student -> student can only view his trainings):   
        1) TrainingsSchedule scheduleView = schedule (can only view coming trainings)
        2) TrainingsSchedule scheduleView = student-attendance (can only view which trainings were attended and skipped)

    - StudentsContent components:
        1) AllStudentsTable
        2) CreateStudentForm

    - PaymentsContent:
        1) PaymentsTable



