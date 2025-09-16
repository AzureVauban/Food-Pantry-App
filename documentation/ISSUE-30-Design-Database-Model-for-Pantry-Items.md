# ISSUE-30-Design-Database-Model-for-Pantry-Items

**Issue Type:** Documentation

## Objective:
Key Requirements:
- Design the database schema/structure for pantry items
- Define data fields for food items (name, quantity, expiration date, category, etc.)
- Establish relationships between users and their pantry items
- Consider data types and constraints for each field
- Plan for scalability and efficient querying
 -Integrate with Firebase database structure


## Description:
- This branch is used to for setting up the database and confirming that it has been enabled
## Learnings:
- learned how to firebase and how to call servieces from firebase
## What's next:
- next objective is we need to do authentication, I have set up the serviecs now just the person incharge of that task has to implement it 
## Miscellaneous Notes:
```
users (collection)
  └── userId (document)
        ├── name: string
        ├── email: string
        └── pantries (subcollection)
              └── pantryId (document)
                    ├── name: string
                    ├── createdAt: timestamp
                    └── items (subcollection)
                          └── itemId (document)
                                ├── name: string
                                ├── quantity: number
                                ├── expirationDate: timestamp
                                ├── category: string
                                └── imageUrl: string

```

