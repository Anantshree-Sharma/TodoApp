# Todo Api Documentation

## `/user/signup` Endpoint

### Description:

This endpoint allows new users to register by providing their personal information. The system will validate the input data, check for existing accounts with the same email, hash the password for security, and create a new user record in the database.

### HTTP Method : `POST`

### Endpoint : `/user/signup`

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

**Status Code:** `201 Created`

```json
{
  "msg": "User Registration Success"
}
```

#### Error Responses

##### Validation Error

**Status Code:** `401 Unauthorized`

When required fields are missing or validation fails:

```json
{
  "error": "Validation error message"
}
```

##### Server Error :

**Status Code:** `500 Internal Server Error`

When an unexpected server error occurs:

```json
{
  "error": "Something went wrong"
}
```

### Status Codes Summary

| Status Code | Description                                 |
| ----------- | ------------------------------------------- |
| `201`       | User successfully created                   |
| `401`       | Validation failed or account already exists |
| `500`       | Internal server error                       |
