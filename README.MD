## Requests:

#### GET: /users - returns all users
#### DELETE: /users - removes all users

#### GET: /user/:id - return user by id
#### POST: /user - creates new user
body: { firstName, lastName, email, gender, birthday, password, workplaces }
#### PUT: /user/:id - changes user (overrides current user data)
body:{ firstName, lastName, email, gender, birthday, password, workplaces }
#### DELETE: /user/:id - deletes user
