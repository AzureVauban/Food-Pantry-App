# ISSUE-00B Project Propsal - Food Pantry App

## <span style="color: #60a5fa; font-weight: 500">Group Members</span>

| Member         | Role                                              |
| -------------- | ------------------------------------------------- |
| Michael Elder  | Project Manager/Virtual Pantry/Collabative Pantry |
| Ali Jalil      | Virtual Pantry                                    |
| Renne Sanchez  | Virtual Pantry/Recipe Searching                   |
| Ethan Perez    | Authentication                                    |
| Martin Mendoza | Grocery List Generator                            |

## <span style="color: #60a5fa; font-weight: 500">Description</span>

This is an inventory manager for food. The main uses for the project would be to upload and "Inventorize" food items to help the end user be more efficient in meal planning, grocery overspending, and knowledge gap in cookings (finding new and learning new recipes). The target audience is college students and couples

## <span style="color: #60a5fa; font-weight: 500">Deliverables</span>

The deliverables for this project will include both a mobile app and a web app. The mobile app emphasizes portability, enabling users to check off items at the store, quickly scan pantry goods, and manage lists on the go. The web app complements this by offering broader accessibility across devices and a more convenient interface for planning tasks such as bulk editing, recipe entry, and collaborative pantry management. Together, these deliverables ensure the project goes beyond a simple food inventory tool to become a comprehensive platform for meal planning and grocery organization, designed to support both everyday use and long-term adoption.

## <span style="color: #60a5fa; font-weight: 500">Project Milestones</span>

| <span style="color: #ea580c; font-weight: 500">Features (Milestones)</span>                        | <span style="color: #16a34a; font-weight: 500">Description (Potential User Stories)</span>                                           | <span style="color: #c084fc; font-weight: 500">Estimated Timeline</span> |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Virtual Pantry                                                                                     | As a user, I want to add and view items in my pantry so I can keep track of what I already have at home.                             | 9-8-2025 - <br>9-29-2025                                                 |
| Recipe Searching                                                                                   | As a user, I want to search for or upload recipes so that i can discover meals I can cook with my pantry items                       | 10-1-2025 -<br>10-20-2025                                                |
| Collaborative Pantry <br>\*<span style="color: #ef4444; font-weight: 500">Suggested by Omar</span> | As a user, I want to share and manage a pantry with others so that my household, roommates, or I can coordinate what we buy and use. | 10-1-2025 - 10-27-2025                                                   |
| Grocery List Generation                                                                            | As a user, I want the app to generate a grocery list based on a recipe so that I know exactly what ingredients I need to buy.        | 10-23-2025 - 11-10-2025                                                  |
| Authentication                                                                                     | As a user, I want to register and log into my account so that my pantry, recipes, and lists are accessible across devices.           | 9-8-2025 - <br>9-22-2025                                                 |

## <span style="color: #60a5fa; font-weight: 500">Milestones Responability</span>

| <span style="color: #a855f7; font-weight: 500">Milestone</span> | <span style="color: #22c55e; font-weight: 500">Task</span>              | <span style="color: #f97316; font-weight: 500">Task-Type</span>                                                                | Assigned |
| --------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- |
| Virtual Pantry                                                  | Model Pantry Items (schema/structure)                                   | <span style="color: #22c55e; font-weight: 500">Database</span>                                                                 | AJ       |
| Virtual Pantry                                                  | Add Pantry Item (UI + Storage)                                          | <span style="color: #f97316; font-weight: 500">Frontend</span> + <span style="color: #3b82f6; font-weight: 500">Backend</span> | ME       |
| Virtual Pantry                                                  | View Pantry List                                                        | <span style="color: #f97316; font-weight: 500">Frontend</span> + <span style="color: #3b82f6; font-weight: 500">Backend</span> | RS       |
| Virtual Pantry                                                  | Edit/Delete Pantry Items                                                | <span style="color: #f97316; font-weight: 500">Frontend</span> + <span style="color: #3b82f6; font-weight: 500">Backend</span> | RS       |
| Recipe Searching                                                | Search Bar UI                                                           | <span style="color: #f97316; font-weight: 500">Frontend</span>                                                                 | AJ       |
| Recipe Searching                                                | Recipe API Integration                                                  | <span style="color: #3b82f6; font-weight: 500">Backend</span>                                                                  | MM       |
| Recipe Searching                                                | Filter by Pantry Items                                                  | <span style="color: #3b82f6; font-weight: 500">Backend</span> + <span style="color: #22c55e; font-weight: 500">Database</span> | RS       |
| Recipe Searching                                                | Recipe Detail View                                                      | <span style="color: #f97316; font-weight: 500">Frontend</span>                                                                 | RS       |
| Collaborative Pantry                                            | Shared Pantry Model (multi-user schema)                                 | <span style="color: #22c55e; font-weight: 500">Database</span>                                                                 | MM       |
| Collaborative Pantry                                            | Invite/Join Pantry                                                      | <span style="color: #f97316; font-weight: 500">Frontend</span> + <span style="color: #3b82f6; font-weight: 500">Backend</span> | ME       |
| Collaborative Pantry                                            | Sync Across Users (live updates)                                        | <span style="color: #3b82f6; font-weight: 500">Backend</span> + <span style="color: #22c55e; font-weight: 500">Database</span> | ME       |
| Collaborative Pantry                                            | Permissions & Roles                                                     | <span style="color: #3b82f6; font-weight: 500">Backend</span> + <span style="color: #22c55e; font-weight: 500">Database</span> | ME       |
| Grocery List Generation                                         | Generate Missing Ingredients                                            | <span style="color: #3b82f6; font-weight: 500">Backend</span> + <span style="color: #22c55e; font-weight: 500">Database</span> | MM       |
| Grocery List Generation                                         | List Creation UI                                                        | <span style="color: #f97316; font-weight: 500">Frontend</span>                                                                 | MM       |
| Grocery List Generation                                         | Export/Share List (PDF/share flow)                                      | <span style="color: #f97316; font-weight: 500">Frontend</span> + <span style="color: #3b82f6; font-weight: 500">Backend</span> | MM       |
| Authentication                                                  | Implement Google Authentication w/Firebase                              | <span style="color: #f97316; font-weight: 500">Frontend</span> + <span style="color: #3b82f6; font-weight: 500">Backend</span> | EP       |
| Authentication                                                  | Implement Password & Email Authentication                               | <span style="color: #f97316; font-weight: 500">Frontend</span> + <span style="color: #3b82f6; font-weight: 500">Backend</span> | EP       |
| Authentication                                                  | Secure Storage (tokens/credentials)                                     | <span style="color: #22c55e; font-weight: 500">Database</span> + <span style="color: #3b82f6; font-weight: 500">Backend</span> | EP       |
| Authentication                                                  | Connect Auth → Pantry Data                                              | <span style="color: #3b82f6; font-weight: 500">Backend</span> + <span style="color: #22c55e; font-weight: 500">Database</span> | AJ       |
| Global App                                                      | Create high-fidelity mockups for Pantry, Recipes, Lists                 | <span style="color: #ec4899; font-weight: 500">Design</span>                                                                   | ME       |
| Global App                                                      | Define color palette + typography system                                | <span style="color: #ec4899; font-weight: 500">Design</span>                                                                   | ME       |
| Virtual Pantry                                                  | Design Add Item flow mockups                                            | <span style="color: #ec4899; font-weight: 500">Design</span>                                                                   | ME       |
| Recipe Searching                                                | Design Recipe Detail screen mockups                                     | <span style="color: #ec4899; font-weight: 500">Design</span>                                                                   | ME       |
| Authentication                                                  | Design Login/Signup mockups                                             | <span style="color: #ec4899; font-weight: 500">Design</span>                                                                   | ME       |
| Deployment                                                      | Set up environment variables (API keys, secrets) to deploy via EAS-EXPO | <span style="color: #a855f7; font-weight: 500">DevOps</span>                                                                   | ME,AJ    |

## <span style="color: #60a5fa; font-weight: 500">Tech Stack and Project Workflow</span>

### Tech Stack

| React Native | Gives the group flexibility to divert between a mobile app or a web app and vice versa                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Firebase     | Having a database is critical for this project, it will store user authentication data and pantry data                                      |
| APIs         | Unresearched as of now, but APIs would most likely be utilized for the following features: Recipe Searching, Grocery Store Price Comparison |
| Expo-EAS     | If mobile app, using a framework such as Expo will take care of deployment to the App Store and Google Play. For website maybe vercel       |

### Project Workflow

The team has chosen to adopt a SCRUM-LITE approach, implemented through GitHub Projects. While traditional SCRUM relies on Epics, User Stories, and Tasks, this project will instead organize work using Milestones and Issues. Milestones serve as high-level goals that can function like Epics or User Stories, while Issues represent the actionable tasks required to complete them.

A key reason for selecting this approach is its flexibility. Milestones and Issues can be easily added, adjusted, or reprioritized without the technical and mental overhead often associated with full SCRUM. At the same time, this method preserves the benefits of clear deadlines and structured planning. By keeping all workflow management within GitHub, the team avoids reliance on third-party tools such as Jira or Bitbucket, ensuring a lightweight and adaptable process that fits the project’s scope.

### Hardware Requirements

The only hardware requirements are a having a computer to code on and a mobile device (Android or IOS) to test on mobile platforms via Expo Go. There is no server needed because Firebase functions as a BAAS (Backend As a Service), the team will be utilizing this service to offload the work with the backend development.
