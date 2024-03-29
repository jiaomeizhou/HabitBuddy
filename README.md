# Habit Buddy Mobile App

Habit Buddy is a mobile application designed to help users track and maintain their habits. It allows users to create, monitor, and reflect on their daily habits and routines.

## Data Model

Our application utilizes Firestore as a NoSQL database and includes the following collections:

1. **Users**: Stores user profiles, including authentication data, preferences, and related habits.
2. **Habits**: Contains details of the habits tracked by users, such as habit name, frequency, and progress.
3. **CheckIns**: Used for tracking daily check-ins for habits, storing dates, whether the habit was completed and users' diary entries, allowing them to reflect on their daily activities and habit progress.

## Team Members and Contributions

1. Jiaomei Zhou (Jamie)
2. Weiyi Gao

## Development log

### Jamie (updated on 03/27/2024)

#### Completed

1. Firebase setup
2. Signup/Login/logout
3. Home screen v1 and v2: read data from DB, allow navigation
4. Profile screen: display user profile, allow edit
5. Navigation: Bottom tabs, allow navigate from signup/login to home

### Weiyi

#### Completed

##### 03/24/2024

1. Add addHabitScreen and editHabitScreen
2. Create CRUD operations of habit related logic
3. Add new custom component (IconButton).
4. Add helpers file to convert time format.

##### 03/25/2024

1. Create custom component (PressableButton, CustomTextInput, CustomText, CustomSwitch, CustomDropDownPicker, CustomDateTimePicker)
2. Update addHabitScreen to use the custom components.

##### 03/27/2024

1. Add postDiary screen.
2. Add custom component (CustomCheckBox)
3. Add diary screen.
4. Fix conflict code.

##### 03/28/2024

1. Add diaryDetail screen.
2. Fix postDiary screen bug to refresh the component.
3. Update custom component to support more functionality.
4. Update addHabit and editHabit screen to use the data from the database.
5. Fix addHaibt and editHabit screen bugs.
6. Fix profile screen rendering error.

## App Progress and Screenshots

### Iteration 1:

During the 1st iteration of our project, we focused on laying the groundwork for the Habit Buddy Mobile App, including the initial setup of our development environment, establishing the app's overall structure, and beginning the implementation of core functionalities.

1. **React Native Components**: Created foundational components to represent the main functionalities we plan to build. This includes components for user habits, diaries, and the navigation structure.

2. **Navigation**: Implemented the basic navigation structure using React Navigation. This includes navigation between screens such as Home, Diary, Add Habit, and Profile.

3. **CRUD Operations**: Established the basis for CRUD operations with Firestore. This allows for the creation, reading, updating, and deletion of data across our app's features.

4. **Data Model Design**:

   - **Users**: Handles basic user data, including user profiles. Users can update their names and other profile details.
   - **Habits**: Allows users to create, edit, and delete custom habits. The Home screen fetches and displays all habits associated with the user.
   - **CheckIns**: Enables users to add daily check-in records related to each habit, including mood logs and completion status. The Diary screen showcases all public check-in records from users.

5. **CRUD Operations Detail**:
   - **Users Collection**: Implemented read and update operations for user profiles.
   - **Habits Collection**: Fully implemented CRUD operations, enabling users to manage their habits directly from the app.
   - **CheckIns Collection**: Implemented create update and read operations, allowing users to log daily activities and view them in a diary format.

### Current State of the Application:

The app is now in a functional state with a clear structure and the ability to manage user data and habits. While the UI is still in development, the core functionalities related to user management, habit tracking, and daily check-ins are operational.

![Screenshot of Home Welcome Screen](assets/IterationProgress/Home.png)

*The Home welcome screen displaying default habits that users can adopt into their daily routine.*

![Screenshot of Home Screen](assets/IterationProgress/Home2.png)

*The Home screen showcasing a list of user habits.*

![Screenshot of Habit Detail Screen](assets/IterationProgress/HabitDetail.png)

*The Habit Detail Screen providing detailed information about a specific user habit.*

![Screenshot of Add Habit Screen](assets/IterationProgress/AddHabit.png)

*The Add Habit Screen allows users to create new habits, customizing details such as habit name, frequency, and reminders.*

![Screenshot of Post Diary Screen](assets/IterationProgress/PostDiary.png)

*The Post Diary Screen enables users to record their daily activities and reflections related to their habits.*

![Screenshot of Post Diary List Screen](assets/IterationProgress/DiaryList.png)

*The Diary List Screen displays a comprehensive list of diary entries.*


![Screenshot of Profile Screen](assets/IterationProgress/Profile.png)

*The Profile Screen provides users with an overview of their personal information and settings, allowing for customization and updates to their account details.*


#### TODO

1. Read data from firebase: pet, checkin
2. Display data on stats board
3. UI and style
4. Update the avatar by uploading an image
5. Add more professional Authentication options
6. Habit detail screen
