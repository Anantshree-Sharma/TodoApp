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
