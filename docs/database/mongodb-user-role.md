# MongoDB User&Role Memo



Name    Description
createUser  Creates a new user.
updateUser  Updates a user’s data.
dropUser    Removes a single user.
dropAllUsersFromDatabase    Deletes all users associated with a database.
grantRolesToUser    Grants a role and its privileges to a user.
revokeRolesFromUser Removes a role from a user.
usersInfo   Returns information about the specified users.


## createUser

    { 
        createUser: "<name>",
        pwd: "<cleartext password>",
        customData: { <any information> },
        roles: [
            { role: "<role>", db: "<database>" } | "<role>",
            ...
        ],
        writeConcern: { <write concern> }
    }

