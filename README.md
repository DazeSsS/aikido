aikido log for trainers and students

- Refactoring and additions:
1) create component for toggle switch (OPTIONAL)
2) extract styles for "a" link in RegistrationForm in another class (PERHAPS NOT NEEDED)
3) recreate login form and make it universal (?) &checkmark;
4) add functionality to login form (NEEDS AXIOS LIBRARY TO BE ADDED) &checkmark;
5) create fake data 
6) extract more variables in :root 
7) add logos for main components
8) extract color styles for "a" in index style file

- Components to be made:
1) Login page with login form &checkmark;
2) Registration page with registration form
3) User's profile page
4) Header for main page
5) List of groups and students
6) Trainings schedule

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
        4) PaymentChecksPage: page with payment checks
        5) RegistrationPage
        6) LoginPage
        7) Not found page

    - Header:
        1) Header: general header component

    - SideBar:
        1) DashboardSidebar: dashboard sidebar
        2) DashboardSidebarItem: sidebar elements (Groups, Schedule, Students list)

    - Group components:
        1) GroupList: component with list of students
        2) GroupItem: grouplist element

    - Trainings Schedule components:
        1) TrainingSchedule: component with schedule
        2) TrainingScheduleItem: schedule items

    - Students List component:
        1) StudentList: component with list of students
        2) StudentListItem: elemnt of studentsList


small and urgent fixes:
1) registration page and login page small refactoring &checkmark;
1) add divider in registration and in login page &checkmark;
3) small profile page refactoring (positioning + dividers) &checkmark;
4) restyle header and make it adaptive
5) restyle and refactor sidebar
6) add server logic to registration and login pages
7) add server logic to group list
8) restyle and refactor dashboard (positioning)
9) add form data logic to profile page
9) check fonts on every page
10) extract small logic and variables in component's functional scope 
11) remove unused imports and components