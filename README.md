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
9) registration page and login page small refactoring &checkmark;
10) add divider in registration and in login page &checkmark;
11) small profile page refactoring (positioning + dividers) &checkmark;
12) make navlinks active coloring &checkmark;
13) make sidebar navigation active coloring &checkmark;
14) restyle header and make it adaptive
15) restyle and refactor sidebar &checkmark;
16) add server logic to registration and login pages
17) add server logic to group list
18) restyle and refactor dashboard (positioning)
19) add form data logic to profile page
20) check fonts on every page
21) extract small logic and variables in component's functional scope 
22) remove unused imports and components
23) make header and sidebar universal
24) add missing styles to profile page
25) consider server requests refactoring
-----11.05.2024-----
26) separate buttons in another component &checkmark;
27) refactor tables 
28) create controls panel &checkmark;


- Components to be made:
1) Login page with login form &checkmark;
2) Registration page with registration form &checkmark;
3) User's profile page &checkmark;
4) Header for main page &checkmark;
5) List of groups and students 
6) Trainings schedule
7) error page
8) payments page

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

    - DashBoard:
        1) SideBar

    - SideBar:
        1) DashboardSidebar: dashboard sidebar
        2) DashboardSidebarItem: sidebar elements (Groups, Schedule, Students list)

    - Sidebar Items:
        1) GroupsContent
        2) ScheduleContent
        3) StudentsContent
        4) PaymentsContent

    - GroupsContent components:
        1) GroupsTable
        2) GroupMembersTable
        3) AllStudentsTable
        4) CreateGroupForm

    - StudentsContent components:
        1) AllStudentsTable
        2) CreateStudentForm



