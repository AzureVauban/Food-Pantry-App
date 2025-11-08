Repo Link: https://github.com/AzureVauban/Food-Pantry-App

## <span style="color: #60a5fa; font-weight: 500">Group Members</span>

| Michael Elder  | Project Manager/Virtual Pantry/Collaborative Pantry |
| -------------- | --------------------------------------------------- |
| Ali Jalil      | Virtual Pantry/Recipe Searching                     |
| Rene Sanchez   | Virtual Pantry                                      |
| Ethan Perez    | Authentication (Web)                                |
| Martin Mendoza | Grocery List Generator                              |

---

## <span style="color: #60a5fa; font-weight: 500">Project Progress Since Status Report</span>

- <span style="color: #f97316; font-weight: 500">Rene</span> completed the base logic and interface components for the <span style="color: #60a5fa; font-weight: 500">Virtual Pantry</span>, integrating item tracking and synchronization with local storage and Firestore.
- <span style="color: #f97316; font-weight: 500">Ali</span> implemented the <span style="color: #60a5fa; font-weight: 500">Recipe Search Functionality</span> using the <span style="color: #60a5fa; font-weight: 500">FatSecret API</span> and connected it with the pantry data system, allowing users to cross-reference pantry items with recipe requirements.
- <span style="color: #f97316; font-weight: 500">Ethan</span> completed the <span style="color: #60a5fa; font-weight: 500">Google Authentication</span> system for web, ensuring proper session persistence and logout redirection. He also resolved a bug where the authentication session was lost on page refresh.
- <span style="color: #f97316; font-weight: 500">Michael</span> refactored and consolidated major tasks across the repository to clarify project scope and eliminate overlap between team members. The <span style="color: #60a5fa; font-weight: 500">API integration issues</span> in `pantryview` were originally assigned to him but proved to be complex, leading <span style="color: #f97316; font-weight: 500">Rene</span> and <span style="color: #f97316; font-weight: 500">Ali</span> to assist in resolving the issue and refactoring the affected code. Together, they reorganized the project to maintain a consistent structure and naming convention.
- <span style="color: #f97316; font-weight: 500">Martin</span> continues development on the <span style="color: #60a5fa; font-weight: 500">Grocery List Generator</span>, focusing on integrating it with recipe data to dynamically populate missing ingredients.
- The team jointly integrated the <span style="color: #60a5fa; font-weight: 500">Recipe Search UI</span> and ensured smooth backend interaction between the <span style="color: #60a5fa; font-weight: 500">Recipe</span> and <span style="color: #60a5fa; font-weight: 500">Pantry Systems</span>.

| <span style="color:#22c55e; font-weight:600">Completed Features</span> | <span style="color:#f97316; font-weight:600">Features Still in Progress</span> |
| :--------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| Google OAuth on Web                                                    | Polished (High Fidelity) UI                                                    |
| Recipe Searching                                                       | Grocery List Generation                                                        |
| Pantry Creation and Implementation                                     | Collaborative Pantry                                                           |

![Gantt Chart Timeline](./gnatt_chart_timeline.png)

---

- Seamless integration between the <span style="color: #60a5fa; font-weight: 500">Pantry Inventory System</span> and <span style="color: #60a5fa; font-weight: 500">Recipe Discovery Flow</span>, enabling dynamic ingredient comparison.
- Consistent <span style="color: #60a5fa; font-weight: 500">code formatting</span> and <span style="color: #60a5fa; font-weight: 500">repository refactoring</span> improved maintainability and developer collaboration.
- Enhanced <span style="color: #60a5fa; font-weight: 500">project management structure</span>, ensuring clearer task ownership, dependency mapping, and reduced overlap during feature development.

---

## <span style="color: #60a5fa; font-weight: 500">Next Steps</span>

- Complete and finalize the <span style="color: #60a5fa; font-weight: 500">Grocery List Generator</span> and ensure its integration with recipe and pantry data.
- Conduct final <span style="color: #60a5fa; font-weight: 500">bug fixes</span> and <span style="color: #60a5fa; font-weight: 500">UI polish</span> for the web platform.
- Prepare the system for <span style="color: #60a5fa; font-weight: 500">final testing</span> and <span style="color: #60a5fa; font-weight: 500">documentation</span>, including a walkthrough of core user flows such as pantry management, recipe search, and grocery list creation.
- If time permits, the team will revisit the <span style="color: #60a5fa; font-weight: 500">mobile implementation</span> of the app as a <span style="color: #60a5fa; font-weight: 500">stretch goal</span>. The current priority remains ensuring complete functionality and stability on the <span style="color: #60a5fa; font-weight: 500">web platform</span>.
