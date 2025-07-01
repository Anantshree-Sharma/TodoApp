# Todo Api Documentation

## `/user/signup` Endpoint

### Description:

This endpoint allows new users to register by providing their personal information.

### HTTP Method : `POST`

### URL : `/user/signup`

### Request Format :

#### Headers

```
Content-Type: application/json
```

#### Request Body `Object`

| Field       | Type   | Required | Description                                     |
| ----------- | ------ | -------- | ----------------------------------------------- |
| `firstName` | String | Yes      | User's first name                               |
| `lastName`  | String | No       | User's last name                                |
| `email`     | String | Yes      | User's email address (must be unique)           |
| `password`  | String | Yes      | User's password (will be hashed before storage) |

#### Request Example

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "confirmpassword": "securePassword123"
}
```

### Response Format :

#### Success Response

**Status Code :** `201 Created`

```json
{
  "msg": "User Registration Success"
}
```

#### Error Responses

##### Validation Error

**Status Code:** `401 Unauthorized`

```json
{
  "error": "Validation error message"
}
```

- When required fields are missing or validation fails:

##### Server Error :

**Status Code:** `500 Internal Server Error`

```json
{
  "error": "Something went wrong"
}
```

- When an unexpected server error occurs:

### Notes :

- Password Hashing: Passwords are hashed using bcrypt with a salt rounds of 10 before storage
- Unique Email: System prevents duplicate accounts with the same email address
- Input Validation: All input data is validated before processing

---

---

## `/user/login` Endpoint

### Description:

This endpoint allows existing users to access their accounts.

### HTTP Method : `POST`

### URL : `/user/login`

### Request Format :

#### Headers

```
Content-Type: application/json
```

#### Request Body `Object`

| Field      | Type   | Required | Description          |
| ---------- | ------ | -------- | -------------------- |
| `email`    | String | Yes      | User's email address |
| `password` | String | Yes      | User's password      |

#### Request Example

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Response Format :

#### Success Response

**Status Code :** `200 ok`

```json
{
  "msg": "Login SuccessFull"
}
```

#### Error Responses

##### Validation Error

**Status Code :** `401 Unauthorized`

```json
{
  "error": "Invalid email or password"
}
```

- When required fields are missing or validation fails:

##### Server Error :

**Status Code :** `500 Internal Server Error`

```json
{
  "error": "Something went wrong"
}
```

- When an unexpected server error occurs:

### Notes :

- Authentication is handled via JWT tokens.
- The Tokens is sent in an httpOnly, which:
  - Prevents client-side js from accessing it.
  - Is automatically included in every request (when `credentials: include` is used on frontend).
- Both email and pasword are validated on server.Invalid credentials returns `401 unauthorized`

---

---

## `/user/profile` Endpoint

### Description:

This endpoint allows an authenticated user to fetch user details.

### HTTP Method : `GET`

### URL : `/user/profile`

### Request Format :

#### Headers

```
Cookie: token='jwt token'
```

- Requires authentication - the JWT token must be present in cookies

#### Request Body

- No request body is required.

### Response Format :

#### Success Response

**Status Code :** `200 ok`

```json
{
  "_id": "8665c07b64ud3814b1d23d76",
  "firstName": "Sam",
  "email": "example@example.com"
}
```

#### Error Responses

##### Anuthorized Access

**Status Code:** `401 Unauthorized`

```json
{
  "error": "unauthorized"
}
```

- When the user is not authenticated or token is missing/invalid:

##### Server Error :

**Status Code:** `500 Internal Server Error`

```json
{
  "error": "Something went wrong"
}
```

- When an unexpected server error occurs:

---

---

## `/user/logout` Endpoint

### Description:

This endpoint logs out the currently authenticated user. It blacklists the JWT token by storing it in the database, ensuring it can no longer be used for authenticated request.

### HTTP Method : `POST`

### URL : `/user/logout`

### Request Format :

#### Headers

```
Cookie: token='jwt token'
```

- Requires authentication - the JWT token must be present in cookies

#### Request Body

- No request body is required.

### Response Format :

#### Success Response

**Status Code :** `200 ok`

```json
{
  "msg": "Logout Successfull"
}
```

#### Error Responses

##### Anuthorized Access

**Status Code:** `401 Unauthorized`

```json
{
  "error": "unauthorized"
}
```

- When the user is not authenticated or token is missing/invalid:

##### Server Error :

**Status Code:** `500 Internal Server Error`

```json
{
  "error": "Something went wrong"
}
```

- When an unexpected server error occurs:

### Notes:

- Extracts the JWT from the cookie or header.

- Saves the token in a blacklist collection.

- Clears the cookie on the client (if cookie-based auth is used).

- Prevents blacklisted tokens from being used in future requests.

---

---

## `/task/add` Endpoint

### Description:

Creates a new task for the authenticated user.

### HTTP Method : `POST`

### URL : `/task/add`

### Request Format :

#### Headers

```
Content-Type: application/json
```

#### Request Body `Object`

| Field         | Type   | Required | Default         | Description                        |
| ------------- | ------ | -------- | --------------- | ---------------------------------- |
| `title`       | String | Yes      | None            | Title of the task                  |
| `description` | String | No       | None            | Desciption of task                 |
| `status`      | String | Yes      | Pending         | Pending , In Progress or Completed |
| `category`    | String | Yes      | Others          | study , presional , personal etc.  |
| `userId`      | String | Yes      | User's ObjectId | id of authenticates user           |

- #### Enum Values:

  - **status** : `pending`, `in-progress`, `completed`
  - **category**: `study` ,`professional`,`personal`,`home`,`heath`,`shopping`,`social`,`others`,

#### Request Example

```json
{
  "title": "Home Work",
  "description": "Finish calculas chapter 1 and 2",
  "status": "in-progress",
  "category": "study",
  "date": "25-02-2024",
  "userId": "gshbh36437g63r364g36t7437"
}
```

### Response Format :

#### Success Response

**Status Code :** `201 Created`

```json
{
  "title": "Home Work",
  "description": "Finish calculas chapter 1 and 2",
  "status": "in-progress",
  "category": "study",
  "date": "01-07-2025",
  "_id": "68632e78e80e2e20a4afee0c"
}
```

#### Error Responses

| Status Code | Message                         |
| ----------- | ------------------------------- |
| `401`       | Unauthorized (if not logged in) |
| `500`       | Something went wrong            |

---

---

## `/task/all` Endpoint

### Description:

Fetches all tasks associated with the authenticated user.

### HTTP Method : `GET`

### URL : `/task/all`

### Request Format :

#### Headers

```
Content-Type: application/json
```

#### Request Body

- No body required

### Response Format :

#### Success Response

**Status Code :** `200 ok`

```json
[
  {
    "_id": "68632e78e80e2e20a4afee0c",
    "title": "Home Work",
    "description": "Finish calculas chapter 1 and 2",
    "status": "in-progress",
    "category": "study",
    "date": "01-07-2025"
  },
  {
    "_id": "68632e78e80e2e20a4afea1b",
    "title": "Buy Groceries",
    "description": "Milk, Bread, Eggs",
    "status": "pending",
    "category": "shopping",
    "date": "01-07-2025"
  }
]
```

#### Error Responses

| Status Code | Message                         |
| ----------- | ------------------------------- |
| `401`       | Unauthorized (if not logged in) |
| `500`       | Something went wrong            |

```json
{
  "error": "Something went wrong"
}
```

---

---

## `/task/delete/:id` Endpoint

### Description:

Deletes a specific task belonging to the authenticated user by task ID.

### HTTP Method : `DELETE`

### URL : `/task/delete/:id`

### Request Format:

#### Headers

```
Content-Type: application/json

```

#### URL Parameters

| Param | Type   | Required | Description              |
| ----- | ------ | -------- | ------------------------ |
| `id`  | String | Yes      | The ObjectId of the task |

#### Request Body

- No request body is required.

### Response Format:

#### Success Response

**Status Code : `204 No Content`**

```json
{
  "msg": "deleted"
}
```

#### Error Response

| Status Code | Message                         |
| ----------- | ------------------------------- |
| `400`       | Unauthorized                    |
| `404`       | Task not found                  |
| `401`       | Unauthorized (if not logged in) |
| `500`       | Something went wrong            |

```json
{
  "error": "Task not found"
}
```

---

---

## `/task/edit/:id` Endpoint

### Description:

Updates an existing task owned by the authenticated user using the task's unique ID.

### HTTP Method : `PATCH`

### URL : `/task/edit/:id`

### Request Format:

#### Headers

```
Content-Type: application/json
```

#### URL Parameters

| Param | Type   | Required | Description              |
| ----- | ------ | -------- | ------------------------ |
| `id`  | String | Yes      | The ObjectId of the task |

#### Request Body `Object`

| Field         | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| `title`       | String | Yes      | Title of the task                  |
| `description` | String | Yes      | Desciption of task                 |
| `status`      | String | Yes      | Pending , In Progress or Completed |
| `category`    | String | Yes      | study , presional , personal etc.  |

Example:-

```json
{
  "title": "Home Work-1.1v",
  "description": "Finish calculas chapter 1 and 2 -1.1v",
  "status": "in-progress -1.1v",
  "category": "study 1.1v"
}
```

### Response Format:

##### Success Response

**Status Code : `200 OK`**

```json
{
  "_id": "68632e78e80e2e20a4afee0c",
  "title": "Revise Algebra",
  "description": "Revise chapters 3 and 4",
  "status": "in-progress",
  "category": "study",
  "date": "01-07-2025"
}
```

#### Error Responses

| Status Code | Message                  |
| ----------- | ------------------------ |
| `400`       | Missing or invalid input |
| `401`       | Unauthorized             |
| `404`       | Task not found           |
| `500`       | Something went wrong     |
