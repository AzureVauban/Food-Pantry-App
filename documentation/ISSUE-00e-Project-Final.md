Repo: https://github.com/Food-Pantry-App-CS4398-Capstone/Food-Pantry-App
## <span style="color: #60a5fa; font-weight: 500">Group Members</span>

| Michael Elder  | Project Manager/Documentation       |
| -------------- | ----------------------------------- |
| Ali Jalil      | Virtual Pantry/Collaborative Pantry |
| Rene Sanchez   | Virtual Pantry                      |
| Ethan Perez    | Authentication                      |
| Martin Mendoza | Grocery List Generator              |

## <span style="color: #60a5fa; font-weight: 500">Project Overview</span>

The Food Pantry App is a web-based food inventory and recipe management system designed to help users track pantry items, discover recipes they can cook, and generate grocery lists based on missing ingredients. The project originally aimed to support both web and mobile platforms, but the team prioritized delivering a stable, fully functional web application after persistent issues with mobile authentication. The target audience includes college students, young adults, and households seeking a streamlined way to organize food items, reduce grocery waste, and improve meal planning.

## <span style="color: #60a5fa; font-weight: 500">Tech Stack</span>

- React Native + Expo
- Firebase (Authentication + Firestore Database)
- FatSecret API (Recipe searching)
- GitHub Projects (SCRUM-Lite workflow)
- Vercel / Web Deployment Environment
## <span style="color: #60a5fa; font-weight: 500">Setup Instructions</span>


1. Clone the repository.
2. Install dependencies using `npx expo install`.
3. Create an `.env` file with:
   - `FATSECRET_CLIENT_ID`
   - `FATSECRET_CLIENT_SECRET`
   - Firebase keys (API key, auth domain, project ID, etc.)
4. Run the development server: `npx expo start --clear`
5. Ensure Firestore rules and authentication providers are properly configured in Firebase Console.
## <span style="color: #60a5fa; font-weight: 500">Features</span>

| Feature                                                                            | Description                                                                                                                                                                     |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span style="color: #60a5fa; font-weight: 500">Virtual Pantry</span>               | Allows users to add, edit, delete, and view pantry items. Supports item name, quantity, and optional expiration data. All items are stored in Firestore with real-time syncing. |
| <span style="color: #60a5fa; font-weight: 500">Collaborative Virtual Pantry</span> | Enables multiple users to share a pantry using a shared schema with real-time updates, roles, and permissions.                                                                  |
| <span style="color: #60a5fa; font-weight: 500">Grocery List Generator</span>       | Compares recipe ingredient requirements with the user’s pantry inventory and generates a list of missing items.                                                                 |
| <span style="color: #60a5fa; font-weight: 500">Recipe Searching</span>             | Allows users to search recipes via the FatSecret API. Integrates with pantry data to show which needed ingredients are available or missing.                                    |

## <span style="color: #ef4444; font-weight: 500">Dropped Features</span>

| Dropped Features                                                                             | Reason                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span style="color: #ef4444; font-weight: 500">Location Based Price Comparator</span>        | High data-access costs, and large feature scope relative to remaining time. Also is a logistical nightmare aggregating all the APIs, other grocery store chains tend to keep the information not publicly available                                                                                                                                                                                                                                                                          |
| <span style="color: #ef4444; font-weight: 500">Mobile Version (due to Authentication)</span> | Discontinued because Firebase + Google Auth had persistent configuration failures on iOS and Android, shifting focus to a stable web application. Also Firebase for react-native was deprecated, preventing a proper implementation of authentication with google unless IOS or Android build files are modified individually, defeating the main appear of utilizing React-Native and Expo. If one has the intention of turning this into a mobile app, utilize Supabase for authentication |

## <span style="color: #a855f7; font-weight: 500">Desired Features</span>

| Desired Feature                                                                                  | Description                                                                                                          |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| <span style="color: #a855f7; font-weight: 500">Light/Dark Mode Theming</span>                    | Adds customizable appearance settings, improving usability and accessibility across different lighting environments. |
| <span style="color: #a855f7; font-weight: 500">Settings for Virtual Pantries</span>              | Allows users to configure pantry-specific preferences such as naming, sorting, default quantities, and visibility.   |
| <span style="color: #a855f7; font-weight: 500">Barcode Scanner for Adding Items to Pantry</span> | Enables faster item entry by scanning UPC codes and auto-filling item data when possible.                            |

