# Habit Buddy Mobile App

Habit Buddy is a mobile application designed to help users track and maintain their habits. It allows users to create, monitor, and reflect on their daily habits and routines.

## Data Model

Our application utilizes Firestore as a NoSQL database and includes the following collections:

1. **Users**: Stores user profiles, including authentication data, preferences, and related habits.
2. **Habits**: Contains details of the habits tracked by users, such as habit name, frequency, and progress.
3. **CheckIns**: Used for tracking daily check-ins for habits, storing dates, whether the habit was completed and users' diary entries, allowing them to reflect on their daily activities and habit progress.

### Firebase Rule

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

## Team Members and Contributions

1. Jiaomei Zhou (Jamie): Home, Profile, Habit detail, Signup, Login
2. Weiyi Gao: Add habit, Edit habit, Post diary, All diaries

## Development log

### Jamie

#### Completed

##### 03/22/2024

1. Firebase setup
2. Signup/Login/logout
3. Home screen v1 and v2: habit list, progress bar, checkin box, pet
4. Profile screen: display user profile, allow edit
5. Navigation: Bottom tabs, allow navigate from signup/login to home

##### 03/27/2024

1. Read checkin and habits data from DB, allow navigation
2. Read user profile from database
3. Allow user checkin by clicking on the checkin box
4. Allow user write and delete checkin data to database

##### 03/28/2024

1. Fix checkin bug
2. Update the data, listen to real time update from database
3. Calculate habit progress and display the progress bar
4. Display the real time stats on profile screen

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

##### 04/07/2024

1. Update DiaryDetail component to fix Image missing bug.
2. Update PostDiary componenet to use the Imagemanager component and upload and fetch Img link from firebase storage.

##### 04/09/2024

1. Add Map component to locate user location or let user choose location from the map.
2. Add LocationManager component to handle the location functionality.
3. Add TrackMap component to show multiple check in locations of a user.

##### 04/11/2024

1. Update LocationManager component to fix bug and improve UI layout
2. Update Diary component to add a add button to let user to add a check in record easily.
3. Update PostDiary component to add a function of link a habit to a check in record.
4. Update Diary and PostDiary componenets' UI display.

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

### Iteration 2:

During the 2nd iteration of our project, we focused on enhancing the app by integrating some functionalities such as authentication, camera usage, location services, UI optimizations, and bug fixes. This iteration aimed at enriching the user experience and laying a robust foundation for future features.

1. **Authentication**:
   Improved a secure login and signup functionality using Firebase Authentication.
   Implemented password reset functionality to aid users who forget their login credentials.
2. **Camera Use**:
   Integrated camera functionality to allow users to add pictures to their diary entries directly from their device's camera.
   Users can also upload images from their gallery to personalize their diary entries further.
3. **Location Use**:
   Integrated geolocation services to enable users to add location data to their habits and diary entries.
   This feature allows the app to automatically capture the user's current location during a check-in or allow users to manually select a location on a map.
4. **UI Enhancements**:
   Overhauled the user interface to make it more visually appealing and user-friendly.
   Improved the navigation flow within the app, making it easier for users to switch between different features and screens.
5. **Bug Fixes**:
   Addressed various bugs reported in the first iteration, including issues with data synchronization, UI glitches, and performance bottlenecks.

### Current State of the Application:

The app is now in a functional state with a clear structure and the ability to manage user data and habits. While the UI is still in development, the core functionalities related to user management, habit tracking, and daily check-ins are operational.

### Iteration 1:

_The Home welcome screen displaying default habits that users can adopt into their daily routine._

<img src="assets/IterationProgress/Home.png" alt="drawing" width="200"/>

_The Home screen showcasing a list of user habits._

<img src="assets/IterationProgress/Home2.png" alt="drawing" width="200"/>

_The Habit Detail Screen providing detailed information about a specific user habit._

<img src="assets/IterationProgress/HabitDetail.png" alt="drawing" width="200"/>

_The Add Habit Screen allows users to create new habits, customizing details such as habit name, frequency, and reminders._

<img src="assets/IterationProgress/AddHabit.png" alt="drawing" width="200"/>

_The Post Diary Screen enables users to record their daily activities and reflections related to their habits._

<img src="assets/IterationProgress/PostDiary.png" alt="drawing" width="200"/>

_The Diary List Screen displays a comprehensive list of diary entries._

<img src="assets/IterationProgress/DiaryList.png" alt="drawing" width="200"/>

_The Profile Screen provides users with an overview of their personal information and settings, allowing for customization and updates to their account details._

<img src="assets/IterationProgress/Profile.png" alt="drawing" width="200"/>

### Iteration 2:

_The Home welcome screen displaying default habits that users can adopt into their daily routine._

<img src="assets/IterationProgress/Home_iteration2.png" alt="drawing" width="200"/>

_The Home screen showcasing a list of user habits._

<img src="assets/IterationProgress/Home_v2_Iteration2.png" alt="drawing" width="200"/>

_The Post Diary Screen enables users to record their daily activities and reflections related to their habits._

<img src="assets/IterationProgress/Post_diary_iteration2.png" alt="drawing" width="200"/>

_The Diary List Screen displays a comprehensive list of diary entries._

<img src="assets/IterationProgress/Diary_list_iteration2.png" alt="drawing" width="200"/>

_The Diary Detail Screen displays a detailed information of a diary entries._

<img src="assets/IterationProgress/Diary_detail_iteration2.png" alt="drawing" width="200"/>

_The My Track Screen displays the user's all shared locations with their diary content._

<img src="assets/IterationProgress/My_track.png" alt="drawing" width="200"/>

_The Profile Screen provides users with an overview of their personal information and settings, allowing for customization and updates to their account details._

<img src="assets/IterationProgress/Profile_iteration2.png" alt="drawing" width="200"/>

_The Edit Profile Screen lets users to update to their account details._

<img src="assets/IterationProgress/Edit_profile_iteration2.png" alt="drawing" width="200"/>
